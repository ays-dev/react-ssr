const Promise = require('bluebird');
const fs = require('mz/fs');
const util = require('util');

const knex = require('../utils/mysqlClient');

function makeUpsertArticleRecommendationQuery(articleId, toArticleId, score) {
  const entity = {
    articleId: knex.raw('(select id from articles where id = "' + articleId + '")'),
    toArticleId: knex.raw('(select id from articles where id = "' + toArticleId + '")'),
    score
  };

  const insert = knex('article_recommendations').insert(entity).toString();

  const update = knex('article_recommendations')
    .update(entity);

  return util.format(
    '%s ON DUPLICATE KEY UPDATE %s;\n',
    insert.toString(),
    update.toString().replace(/^update `article_recommendations` set\s/i, '')
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function() {
  try {
    const similarities = JSON.parse((await fs.readFile('bo/mahout/productToProductSimByTags.txt')).toString());
    const output = fs.createWriteStream('update_article_recommendations.sql');
    await fs.truncate('update_article_recommendations.sql');

    await Promise.map(Object.keys(similarities), async similarityKey => {
      for (const similarRecommendation of similarities[similarityKey]) {
        const similar = Object.keys(similarRecommendation)[0];
        const score = similarRecommendation[similar];
        if (similar !== similarityKey) {
          await sleep(1);
          output.write(makeUpsertArticleRecommendationQuery(similarityKey, similar, score));
        }
      }
    }, { concurrency: 512 })

    output.on('finish', () => {
      console.log('done');
      output.close();
    });
    output.end();

    // console.log('similarities', similarities)
  } catch (err) {
    console.log('err', err);
  }
})();
