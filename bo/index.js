// const wdk = require('wikidata-sdk');
// const fetch = require('isomorphic-fetch');
// const _ = require('lodash');
// const Promise = require('bluebird');
// const fs = require('mz/fs');
// const MongoClient = require('mongodb').MongoClient;
const commandLineUsage = require('command-line-usage');
const optionDefinitions = [
  { name: 'command', alias: 'c', type: String, defaultOption: true },
  { name: 'help', alias: 'h', type: Boolean },
]
const commandLineArgs = require('command-line-args');
const options = commandLineArgs(optionDefinitions);

const sections = [
  {
    header: 'Backoffice',
    content: 'Available {italic administrator} command list.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'command',
        alias: 'c',
        typeLabel: '{underline name}',
        description: 'Command names to process are:\n'
        + 'get_dump: download and unzip dump\n'
        + 'simplify_dump: simplify dump\n'
        + 'download_category_ids: download ids for categories using wikidata sparql endpoint to a json file\n'
        + 'push_to_mongodb: import simplified dump to mongo and create indexes\n'
        + 'categorize_items: categorize items inside mongo\n'
        + 'parse_items: parse items based on rules to an SQL file\n'
        + 'update_database: update SQL database with latest parsed items\n'
      },
      {
        name: 'help',
        alias: 'h',
        description: 'Print this usage guide.'
      }
    ]
  }
]

const usage = commandLineUsage(sections)
const commands = [
  'get_dump',
  'simplify_dump',
  'download_category_ids',
  'push_to_mongodb',
  'categorize_items',
  'parse_items',
  'missing_tags',
  'missing_peoples',
  'compute_recommendations',
  'update_database_recommendations',
  'download_images',
  'index_search'
];

if (commands.includes(options.command)) {
  require('./scripts/' + options.command);
} else if (options.help) {
  console.log(usage);
} else {
  console.log('unknown command, try --help');
}
// {
//   1: 'get_dump',
//   2: 'simplify_dump',
//   3: 'download_category_ids',
//   4: 'push_to_mongodb',
//   5: 'categorize_items',
//   6: 'parse_items',
// }

// (async function() {
//   try {
//     await getCommand(commandList, process.argv[1])
//   } catch (err) {
//     console.log('err', err);
//   }
// })();
// /*




// const coordinateLocation = 'P625';

// const PAGE_SIZE = 100000;
// const PAGE_SIZE_BIG = 250000;
// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));



// */
