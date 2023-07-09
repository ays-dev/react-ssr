const config = require('../../api/config/config.json');
const Knex = require('knex');

const { knex: bddConfig } = config['development'];

bddConfig.connection.typeCast = function (field, next) {
  // console.log('field', field)
  if (field.type === 'JSON') {
    return (JSON.parse(field.string()))
  }
  return next()
}
// console.log('bddConfig', bddConfig)

const knex = Knex(bddConfig);

if (!process.env.NODE_ENV) {
  knex.on('query', data => {
    console.info('SQL', data.sql, data.bindings);
  });
}

module.exports = knex;
