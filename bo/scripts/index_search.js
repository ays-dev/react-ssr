// const _ = require('lodash');
// const Promise = require('bluebird');
// const fs = require('mz/fs');
// const sharp = require('sharp');
// const md5 = require('md5');
// const fetch = require('isomorphic-fetch');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const knex = require('../utils/mysqlClient');

(async function() {
  try {
    // console.log('page', index)
    const ids = (await knex('articles')
      .leftJoin('article_translations', 'articles.id', 'article_translations.articleId')
      .where({ status: 'ENABLED' })
      .andWhere({ 'article_translations.languageCode': 'en' })
      .andWhere({ 'articles.category': 'films' })
      .limit(30000));
    const body = [];

    for (const [line, entity] of ids.entries()) {
      // console.log('entity', JSON.stringify(entity, null, 2));
      body.push({ index: { _index: 'db', _type: 'article', _id: line + 1 } });
      body.push({ label: entity.label, ...entity.aliases ? { aliases: entity.aliases } : {}, ...entity.description ? { description: entity.description } : {} });
    }
    console.log('body', body);

    await new Promise((resolve, reject) => {
      client.bulk({
        body
      }, function (err, resp) {
        if (err) return reject(err);
        return resolve(resp);
      });
    });

    console.log('done')
  } catch (err) {
    console.log('err', err);
  }
})();


/*
GET _search
{
  "query": {
    "match_all": {}
  }
}

GET db

DELETE db

PUT db
{
    "settings" : {
        "number_of_shards" : 1,
        "number_of_replicas": 0,
        "analysis": {
          "analyzer": {
            "custom_analyzer" : {
              "type": "custom",
              "tokenizer": "nGram",
              "filter": ["asciifolding" ,"lowercase", "snowball", "worddelimiter"]
            },
            "custom_search_analyzer" : {
              "type": "custom",
              "tokenizer": "standard",
              "filter": ["asciifolding" ,"lowercase", "snowball", "worddelimiter"]
            },
            "custom_body_analyzer" : {
              "type": "custom",
              "tokenizer": "nGram",
              "filter": ["stopwords", "asciifolding" ,"lowercase", "snowball", "worddelimiter"]
            },
            "custom_body_search_analyzer" : {
              "type": "custom",
              "tokenizer": "standard",
              "filter": ["stopwords", "asciifolding" ,"lowercase", "snowball", "worddelimiter"]
            }
          },
          "filter": {
              "snowball": {
                "type": "snowball",
                "language": "English"
              },
              "stopwords": {
                "type": "stop",
                "stopwords": ["_english_"],
                "ignore_case": "true"
              },
              "worddelimiter": {
                "type": "word_delimiter"
              }
            },
          "tokenizer": {
            "nGram": {
              "type": "nGram",
              "min_gram": "4",
              "max_gram": "5"
            }
          }
        }
    },
    "mappings" : {
        "article" : {
          "properties": {
            "title": {
              "type": "text",
              "analyzer": "custom_analyzer",
              "search_analyzer": "custom_search_analyzer"
            },
            "altTitles": {
              "type": "text",
              "analyzer": "custom_analyzer",
              "search_analyzer": "custom_search_analyzer"
            },
            "description": {
              "type": "text",
              "analyzer": "custom_body_analyzer",
              "search_analyzer": "custom_body_search_analyzer"
            }
          }
        }
    }
}


GET db/article/1

PUT db/article/1
{
  "title": "hey",
  "altTitles": ["hey"],
  "description": "hey"
}

 */
