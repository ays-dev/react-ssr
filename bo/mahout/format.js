const _ = require('lodash');
const fs = require('fs');


  fs.readFile('./tmp/product_to_product_by_tag_cooccurrence/docIndex.txt', (err, index) => {
    const docIndex = index.toString().split('\n');
    docIndex.splice(0, 2);
    docIndex.splice(docIndex.length - 2, 2);
    const map = docIndex.reduce((memo, val) => {
      const ids = val
        .replace(/Key: /, '')
        .replace(/: Value: \//, ',')
        .split(',');
        memo[ids[0]] = ids[1];
        return memo;
    }, {});

    fs.readFile('./tmp/product_to_product_by_tag_cooccurrence/similarity.txt', (err, res) => {
      const productToProductSim = res.toString().split('\n');
      productToProductSim.splice(0, 2);
      productToProductSim.splice(productToProductSim.length - 2, 2);
      const final = productToProductSim.reduce((memo, val) => {
        const ids = val
          .replace(/Key: /, '')
          .replace(/: Value: \{/, '_')
          .replace(/\}$/, '')
          .split('_');
        const similarities = ids[1].split(',')
          .map(id => {
            const sim = id.split(':');
            return {
              [map[sim[0]]]: Number(sim[1])
            }
          });

        if (!memo[map[ids[0]]]) {
          memo[map[ids[0]]] = [];
        }
        memo[map[ids[0]]].push(...similarities);
        return memo;
      }, {});
      fs.writeFile('productToProductSimByTags.txt', JSON.stringify(final, null, 2), () => console.log('done'));
    });
  });
