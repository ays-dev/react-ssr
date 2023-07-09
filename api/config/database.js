import config from './config.json';

const env = process.env.NODE_ENV;
const { knex: bddConfig } = config[env];

const Knex = require('knex');
const { Model } = require('objection');

const knex = Knex(bddConfig);

if (process.env.NODE_ENV !== 'production') {
  knex.on('query', data => {
    console.info('SQL', data.sql, data.bindings);
  });
}

Model.knex(knex);
