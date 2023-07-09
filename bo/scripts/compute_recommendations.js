const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('mz/fs');
const moment = require('moment');
const util = require('util');

const categories = require('../utils/categories');
const i18n = require('../utils/i18n');
const knex = require('../utils/mysqlClient');
const mongodbClient = require('../utils/mongodbClient');

const PAGE_SIZE = 50000;

let collection;
let client;

async function countAllCategoryIds(category) {
  return collection.count({ category, 'labels.en': { '$exists': true } });
}

(async function() {
  try {
    const output = fs.createWriteStream('article_tags.csv');
    await fs.truncate('article_tags.csv');
    const ids = JSON.parse(await fs.readFile('all_items.json'));


    let count = 0;
    for (const category of categories) {
      console.log('category', category.slug)
      // if (category.production) {
        const categoryCount = ids[category.slug].length;
        const pageCount = Math.ceil(categoryCount / PAGE_SIZE);
        await Promise.map([...new Array(pageCount)], async (page, index) => {
          console.log('page', index)
          const ids = (await knex('articles')
            .select('wikidataId')
            .where({ status: 'ENABLED', category: category.slug })
            .limit(PAGE_SIZE)
            .offset(index * PAGE_SIZE))
          .map(id => id.wikidataId);
          count = count + ids.length;
          console.log('count', count)

          const select = await knex('articles')
            .select(
              'articles.id as ai',
              'articles.wikidataId as aw',
              knex.raw('JSON_EXTRACT(CONCAT("[", GROUP_CONCAT(distinct CONCAT(\'"\', tags.wikidataId, \'"\')), "]"), "$[*]") as tw'),
              knex.raw('JSON_EXTRACT(CONCAT("[", GROUP_CONCAT(distinct CONCAT(\'"\', countries.wikidataId, \'"\')), "]"), "$[*]") as cw'),
              'articles.relations as arw'
            )
            .leftJoin('article_tags', { 'article_tags.articleId': 'articles.id' })
            .leftJoin('tags', { 'article_tags.tagId': 'tags.id' })
            .leftJoin('article_countries', { 'article_countries.articleId': 'articles.id' })
            .leftJoin('countries', { 'article_countries.countryId': 'countries.id' })
            .whereIn('articles.wikidataId', ids)
            .groupBy('articles.wikidataId');

          for (const item of select) {
            const wikidataIds = _.concat(item.tw, item.cw, item.arw).filter(id => id);
            for (const wikidataId of wikidataIds) {
              output.write(item.ai + ',' + wikidataId + '\n');
            }
          }
          console.log('done')
        }, { concurrency: 1 });
      // }
    }
    output.on('finish', () => {
      console.log('done');
      output.close();
    });
    output.end();
    // client.close();
  } catch (err) {
    console.log('err', err);
  }
})();
