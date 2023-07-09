const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('mz/fs');
const moment = require('moment');
const util = require('util');

const categories = require('../utils/categories');
const i18n = require('../utils/i18n');
const mongodbClient = require('../utils/mongodbClient');
const knex = require('../utils/mysqlClient');

let collection;
let client;
const PAGE_SIZE = 50000;

function parseTag(rawTag) {
  const tag = {
    base: {
      wikidataId: rawTag.id,
    },
    translations: [{
      label: rawTag.labels.en,
      description: rawTag.descriptions.en,
      languageCode: 'en'
    }]
  };
  // tag.base.images = [
  //   ...(rawTag.claims['P18'] || []).map(item => item.value),
  // ];
  return tag;
}

(async function() {
  try {
    const ids = JSON.parse((await fs.readFile('tag_ids.json')).toString());
    ({ collection, client } = await mongodbClient('items'));
    const tags = await getAllTagByIds(ids);
    const updateTags = fs.createWriteStream('update_tags.sql');
    await fs.truncate('update_tags.sql');
    const updateTagTranslations = fs.createWriteStream('update_tag_translations.sql');
    await fs.truncate('update_tag_translations.sql');
    for (const rawTag of tags) {
      const tag = parseTag(rawTag);
      const upsertTags = makeUpsertTagQuery(tag);
      const upsertTagTranslation = makeUpsertTagTranslationQuery(tag);
      // console.log('tag', JSON.stringify(tag.base.translations));
      updateTags.write(upsertTags);
      updateTagTranslations.write(upsertTagTranslation);
      // process.exit();
    }
    updateTags.on('finish', () => {
      console.log('done');
      updateTags.close();
    });
    updateTagTranslations.on('finish', () => {
      console.log('done');
      updateTagTranslations.close();
    });
    updateTags.end();
    updateTagTranslations.end();
    client.close();

  } catch (err) {
    console.log('err', err);
  }
})();


function getAllTagByIds(ids) {
  return collection.find({ id: { '$in': ids } })
    .toArray();
}

function makeUpsertTagQuery(article) {
  const entity = {
    ...article.base
  };

  const insert = knex('tags').insert(entity).toString();

  const update = knex('tags')
    .update(entity);

  return util.format(
    '%s ON DUPLICATE KEY UPDATE %s;\n',
    insert.toString(),
    update.toString().replace(/^update `tags` set\s/i, '')
  );
}

function makeUpsertTagTranslationQuery(article) {
  const entity = {
    ...article.translations[0],
    languageCode: 'en',
    tagId: knex.raw('(select id from tags where wikidataId = "' + article.base.wikidataId + '")')
  };

  const insert = knex('tag_translations').insert(entity).toString();

  const update = knex('tag_translations')
    .update(entity);

  return util.format(
    '%s ON DUPLICATE KEY UPDATE %s;\n',
    insert.toString(),
    update.toString().replace(/^update `tag_translations` set\s/i, '')
  );
}
