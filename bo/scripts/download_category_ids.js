const Promise = require('bluebird');
const _ = require('lodash');
const fs = require('mz/fs');
const wdk = require('wikidata-sdk');
const fetch = require('isomorphic-fetch');

const categories = require('../utils/categories');

const PAGE_SIZE = 50000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAllCategoryIds(claims, noclaims) {
  let index = 0;
  const accumulator = [];
  while (true) {
    console.log('index', index)
    const SPARQL = `
      SELECT ?item
      WHERE {
        ${claims.map(claim => `{ ?item wdt:P31/wdt:P279* wd:${claim} . }\n`).join('UNION')}
      }
      LIMIT ${PAGE_SIZE}
      OFFSET ${index * PAGE_SIZE}
    `;

    const url = wdk.sparqlQuery(SPARQL);
    await sleep(600);
    const res = await fetch(url);
    const ids = wdk.simplifySparqlResults(await res.json());
    if (!ids.length) {
      break;
    }
    accumulator.push(...ids);
    index++;
  }
  return accumulator;
}

// async function countCategory(claims) {
//   const SPARQL = `
//     SELECT (COUNT(?item) AS ?count)
//     WHERE {
//       ?item wdt:P31/wdt:P279* wd:${claims} .
//     }
//   `;

//   const url = wdk.sparqlQuery(SPARQL);
//   const res = await fetch(url);

//   return wdk.simplifySparqlResults(await res.json());
// }


async function countAllCategoryIds(category) {
  return collection.count({ category });
}

const sets = {};

(async function() {
  try {
    const ids = JSON.parse(await fs.readFile('all_items.json'));
      for (const category of categories) {
        sets[category.slug] = new Set(ids[category.slug]);
      }
      for (const category of categories) {
        console.log('category', category.slug)
        if (category.production) {
          if (ids[category.slug] && ids[category.slug].length) {
            ids[category.slug] = await getAllCategoryIds(category.claims, category.noclaims);
            console.log(category.slug, ids[category.slug].length, category.production ? '*' : '');
            // if (category.noclaims) {
            //   for (const claim of category.noclaims) {
            //     console.log('noclaim', claim)
            //     ids[category.slug] = _.filter(ids[category.slug], id => !sets[claim].has(id));
            //   }
            // }
            console.log('after', ids[category.slug].length, category.production ? '*' : '');
          } else {
            // const [categoryCount] = await countCategory(category.claims);
            // const pageCount = Math.ceil(categoryCount / PAGE_SIZE);
            // console.log(category.slug, categoryCount, category.production ? '*' : '');
            await sleep(500);
            // ids[category.slug] = await getAllCategoryIds(category.claims, category.noclaims);
            // console.log(category.slug, ids[category.slug].length, category.production ? '*' : '');
          }
        }
      }
    await fs.writeFile('all_items.json', JSON.stringify(ids));
  } catch (err) {
    console.log('err', err);
  }
})();
