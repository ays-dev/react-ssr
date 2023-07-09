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

async function updateAllCategoryIds(items, category, pageCount) {
  const ids = items;
  await Promise.map([...new Array(pageCount)], async (page, index) => {
    const slice = ids.slice(index * PAGE_SIZE, index * PAGE_SIZE + PAGE_SIZE);
    console.log('page index', index)
    await collection.update({ id : { $in: slice } }, { $set: { category } }, { multi: true });
  }, { concurrency: 1 });
}

async function resetAllCategoryIds(category) {
  return collection.update({ category }, { $unset: { category: true } }, { multi: true });
}

(async function() {
  try {
    const ids = JSON.parse((await fs.readFile('people_ids.json')).toString());
    ({ collection, client } = await mongodbClient('items'));
    console.log('ids', ids.length)
    const categoryCount = ids.length;
    const pageCount = Math.ceil(categoryCount / PAGE_SIZE);
    await resetAllCategoryIds('peoples');
    await updateAllCategoryIds(ids, 'peoples', pageCount);
    console.log('done')
    client.close();

  } catch (err) {
    console.log('err', err);
  }
})();
