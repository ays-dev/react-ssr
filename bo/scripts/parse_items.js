const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('mz/fs');
const moment = require('moment');
const util = require('util');
const md5 = require('md5');
const Case = require('case');

const categories = _.orderBy(require('../utils/categories'), 'precedence');
const i18n = require('../utils/i18n');
const mongodbClient = require('../utils/mongodbClient');
const knex = require('../utils/mysqlClient');

let collection;
let client;
let countryIds = [];
let tagIds = null;
let creditIds = [];
let cacheIds = new Set();
let creditSet = null;
const PAGE_SIZE = 50000;

function parseItem(item, category) {
  // + sources(-)
  // + external ids(-)
  // + aliases - ok
  // + images
  // + slugs(-)
  // + countries
  // + geo
  // console.log('item', item.category)
  // console.log('item', item)
  const article = {
    base: {
      wikidataId: item.id,
      status: 'ENABLED',
      category: category.slug,
      relations: [],
      images: []
    },
    countries: [],
    tags: []
  };
  article.translations = i18n(item);
  const basePropertyList = category.base;
  (basePropertyList || []).map(property => {
    article.base[property.to] = article.base[property.to] || _.get(_.get(item.claims[property.property], '0'), property.path);
  });
  const tagPropertyList = category.tags;
  (tagPropertyList || []).map(property => {
    const tags = (item.claims[property.property] || []).map(item => {
      if (!tagIds.has(item.value)) {
        tagIds.add(item.value);
      }
      return item.value;
    });
    article.tags.push(...tags);
  });
  const relationPropertyList = category.relations;
  (relationPropertyList || []).map(property => {
    const relations = (item.claims[property.property] || []).map(item => {
      if (/*(property.credit || property.creditable) && */creditSet.peoples.has(item.value)) {
        creditSet.peoplesFixed.add(item.value);
      } else if (/*(property.credit || property.creditable) && */creditSet.organizations.has(item.value)) {
        creditSet.organizationsFixed.add(item.value);
      }
      return item.value;
    });
    article.base.relations.push(...relations);
  });
  article.base.images = _.uniq([
    ...(item.claims['P18'] || []).map(item => item.value),
    ...(item.claims['P154'] || []).map(item => item.value),// logo
    // sheet music P3030
    // signature
  ])
  .map(image => {
    // const hash = md5(image.replace(/ /g, '_'));
    // const imageEncoded = encodeURIComponent(image.replace(/ /g, '_'));
    // return hash[0]
    //   + '/'
    //   + hash[0]
    //   + hash[1]
    //   + '/'
    //   + imageEncoded;
    return image.replace(/ /g, '_');
  });
  const countryPropertyList = category.countries;
  (countryPropertyList || []).map(property => {
    const countries = (item.claims[property.property] || []).forEach(item => {
      if (countryIds.has(item.value)) {
        article.countries.push(item.value);
      }
    });
  });
  // article.location = item.claims['P625'] && item.claims['P625'].value;
  // map P242
  // collage P2716
  // 3D model
  // geoshape
  return article;
}

(async function() {
  try {
    countryIds = new Set(await getAllCountryIds());
    tagIds = new Set();
    const ids = JSON.parse(await fs.readFile('all_items.json'));
    creditSet = {
      peoples: new Set(ids['peoples']),
      organizations: new Set(ids['organizations']),
      peoplesFixed: new Set(),
      organizationsFixed: new Set()
    };

    ({ collection, client } = await mongodbClient('items'));
    const updateRelations = fs.createWriteStream('update_relations.sql');
    await fs.truncate('update_relations.sql');
    for (const category of categories) {
      // if (category.slug === 'films') {
      if (category.production) {
        console.log('category', category.slug);

        // const categoryCount = await countAllCategoryIds(category.slug);
        const categoryCount = ids[category.slug].length;
        console.log('categoryCount', categoryCount)
        const pageCount = Math.ceil(categoryCount / PAGE_SIZE);
        console.log('pageCount', pageCount)
        await Promise.map([...new Array(pageCount)], async (page, index) => {
          const items = await getAllCategoryItems(ids[category.slug], PAGE_SIZE, index * PAGE_SIZE);
          await Promise.map(items, async item => {
            if (item && item.labels.en/* && !cacheIds.has(item.id)*/) {
              const article = parseItem(item, category);
              const upsertRelationQuery = makeUpsertRelationQuery(item, article, category);
              updateRelations.write(upsertRelationQuery);
            }
          }, { concurrency: 512 });
        }, { concurrency: 2 });
      }
    }
    for (const category of categories) {
      if (!category.production) {
        const categoryCount = creditSet[category.slug + 'Fixed'].size;
        console.log('category', category.slug)
        console.log('categoryCount', categoryCount)
        const pageCount = Math.ceil(categoryCount / PAGE_SIZE);
        console.log('pageCount', pageCount)
        await Promise.map([...new Array(pageCount)], async (page, index) => {
          const items = await getAllCategoryItems(Array.from(creditSet[category.slug + 'Fixed']), PAGE_SIZE, index * PAGE_SIZE);
          await Promise.map(items, async item => {
            if (item && item.labels.en/* && !cacheIds.has(item.id)*/) {
              const article = parseItem(item, category);
                const upsertRelationQuery = makeUpsertRelationQuery(item, article, category);
                updateRelations.write(upsertRelationQuery);
            }
          }, { concurrency: 512 });
        }, { concurrency: 2 });
      }
    }
    console.log('tagIds', tagIds.size)
    await fs.writeFile('tag_ids.json', JSON.stringify(Array.from(tagIds)));
    updateRelations.on('finish', () => {
      console.log('done');
      updateRelations.close();
    });
    updateRelations.end();

    client.close();
  } catch (err) {
    console.log('err', err);
  }
})();


function countAllCategoryIds(category) {
  return collection.count({ category });
}

function getAllCountryIds(category) {
  return knex('countries')
    .select('wikidataId')
    .then(countries => countries.map(country => country.wikidataId));
}

function getAllTagsIds(category) {
  return knex('tags')
    .select('wikidataId')
    .then(tags => tags.map(tag => tag.wikidataId));
}

async function getAllCategoryItems(ids, limit, skip) {
  const slice = ids.slice(skip, skip + limit);

  return collection.find({ 'id': { '$in': slice } }).toArray();
}

function makeUpsertTagRelationQuery(article, category) {
  let queries = '';
  article.tags.forEach(tag => {
    const entity = {
      tagId: knex.raw('(select id from tags where wikidataId = "' + tag + '")'),
      articleId: knex.raw('(select id from articles where category="' + category +'" and wikidataId = "' + article.base.wikidataId + '")')
    };

    const insert = knex('article_tags').insert(entity).toString();

    const update = knex('article_tags')
      .update(entity);

    queries = queries + util.format(
      '%s ON DUPLICATE KEY UPDATE %s;\n',
      insert.toString(),
      update.toString().replace(/^update `article_tags` set\s/i, '')
    );
  });
  return queries;
}

function makeUpsertCountryRelationQuery(article, category) {
  let queries = '';
  article.countries.forEach(country => {
    const entity = {
      countryId: knex.raw('(select id from countries where wikidataId = "' + country + '")'),
      articleId: knex.raw('(select id from articles where category="' + category +'" and wikidataId = "' + article.base.wikidataId + '")')
    };

    const insert = knex('article_countries').insert(entity).toString();

    const update = knex('article_countries')
      .update(entity);

    queries = queries + util.format(
      '%s ON DUPLICATE KEY UPDATE %s;\n',
      insert.toString(),
      update.toString().replace(/^update `article_countries` set\s/i, '')
    );
  });
  return queries;
}

function makeUpsertTranslationQuery(article, category) {
  const entity = {
    ...article.translations[0],
    languageCode: 'en',
    aliases: article.translations[0].aliases && article.translations[0].aliases.length ? JSON.stringify(article.translations[0].aliases) : null,
    articleId: knex.raw('(select id from articles where category="' + category +'" and wikidataId = "' + article.base.wikidataId + '")')
  };

  const insert = knex('article_translations').insert(entity).toString();

  const update = knex('article_translations')
    .update(entity);

  return util.format(
    '%s ON DUPLICATE KEY UPDATE %s;\n',
    insert.toString(),
    update.toString().replace(/^update `article_translations` set\s/i, '')
  );
}

function makeUpsertRelationQuery(item, article, category) {
  const queries = [];

  const relationPropertyList = category.relations;
  (relationPropertyList || []).map(property => {
    const relations = (item.claims[property.property] || []).map(item => {
      if (property.credit) {
        const entity = {
          articleId: knex.raw('(select id from articles where category="' + category.slug + '" and wikidataId = "' + article.base.wikidataId + '")'),
          toArticleId: knex.raw('(select id from articles where wikidataId = "' + item.value + '")'),
          type: Case.lower(property.key)
        };

        const insert = knex('article_relations').insert(entity).toString();

        const update = knex('article_relations')
          .update(entity);

        queries.push(...util.format(
          '%s ON DUPLICATE KEY UPDATE %s;\n',
          insert.toString(),
          update.toString().replace(/^update `article_relations` set\s/i, '')
        ));
      }
    });
  });

  return queries.join('');
}

function makeUpsertQuery(article) {
  const entity = {
    ...article.base,
    images: article.base.images.length ? JSON.stringify(article.base.images) : null,
    relations: article.base.relations.length ? JSON.stringify(article.base.relations) : null
  };

  const insert = knex('articles').insert(entity).toString();

  const update = knex('articles')
    .update(entity);

  return util.format(
    '%s ON DUPLICATE KEY UPDATE %s;\n',
    insert.toString(),
    update.toString().replace(/^update `articles` set\s/i, '')
  );
}
