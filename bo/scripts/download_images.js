const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('mz/fs');
const sharp = require('sharp');
const md5 = require('md5');
const fetch = require('isomorphic-fetch');

let orientation;
let strategy;
let resizeWidth;
let resizeHeight;
let ratio;
let first = false;
let file = 'test.png';

const knex = require('../utils/mysqlClient');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function() {
  try {
    // console.log('page', index)
    const ids = (await knex('articles')
      .select('wikidataId', 'images')
      .where({ status: 'ENABLED'})
      .whereNotNull('images'));
    console.log('ids', ids.length)
    console.log('done')
    for (const [line, entity] of ids.entries()) {
      console.log('line', line);
      if (line >= 0) {
        for (const [key, image] of entity.images.entries()) {
          console.log('key', key);
          if (key === 0) {
            first = true;
          } else {
            first = false;
          }

          const imageExists = await fs.exists('./cache/' + image + '.png');
          if (!imageExists) {
            await sleep(300);
            const imageMd5 = md5(image);
            const imagePath = `https://upload.wikimedia.org/wikipedia/commons/${imageMd5[0]}/${imageMd5[0]}${imageMd5[1]}/${encodeURIComponent(image)}`;
            let imageUrl = await (await fetch(`https://commons.wikimedia.org/w/api.php?action=query&titles=File%3A${encodeURIComponent(image)}&prop=imageinfo&iiprop=url&iiurlwidth=220&format=json`)).json();
            imageUrl = imageUrl.query.pages;
            if (!imageUrl[Object.keys(imageUrl)[0]].imageinfo) {
              imageUrl = imagePath;
            } else {
              imageUrl = imageUrl[Object.keys(imageUrl)[0]].imageinfo[0].url;
            }
            console.log('imageUrl', imageUrl, image);

            const imageBuffer = await (await fetch(imageUrl)).buffer();

            try {
              await new Promise((resolve, reject) => {
                sharp(imageBuffer)
                  .metadata()
                  .then(info => {
                    ratio = info.width / info.height;
                    orientation = (info.width <= info.height && ratio < 0.9)
                      ? 'portrait'
                      : 'landscape';
                    strategy = orientation === 'portrait'
                      ? sharp.strategy.attention
                      : sharp.strategy.entropy;

                    console.log('Image height is ', info);
                    console.log('ratio', ratio);
                    console.log('orientation', orientation);
                    console.log('strategy', orientation === 'portrait'
                      ? 'attention'
                      : 'entropy');

                    if (first) {
                      if (orientation === 'portrait') {
                        resizeWidth = 100;
                        resizeHeight = 144;
                      }
                      if (orientation === 'landscape') {
                        resizeWidth = 190;
                        resizeHeight = null;
                      }
                    } else {
                      if (orientation === 'portrait') {
                        resizeWidth = 60;
                        resizeHeight = 70;
                      }
                      if (orientation === 'landscape') {
                        resizeWidth = 190;
                        resizeHeight = null;
                      }
                    }
                    return resolve();
                  })
                  .catch(err => {
                    return reject(err);
                  });
              });
              await new Promise((resolve, reject) => {
                sharp(imageBuffer)
                  .resize(resizeWidth, resizeHeight)
                  .background('white')
                  .flatten()
                  .crop(strategy)
                  .toFormat(sharp.format.png)
                  .toFile('./cache/' + image + '.png', (err, info) => {
                    if (err) {
                      return reject(err);
                    }
                    console.log('info', info);
                    return resolve();
                  });
              });
            } catch (err) {
              console.log('err', err);
            }
            // process.exit();
            await sleep(300);
            console.log('imageBuffer', imageBuffer);
            // console.log('image', image);
          }
        }

      }
      // console.log('images', images);
    }

  } catch (err) {
    console.log('err', err);
  }
})();
