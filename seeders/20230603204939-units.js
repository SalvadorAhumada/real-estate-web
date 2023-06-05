'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFile = __dirname + '/csv/units.csv';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, _Sequelize) {

    const element = new Promise(async (resolve, _reject) => {
      let seed = [];
      fs.createReadStream(csvFile).pipe(csv()).on('data', function (data) {
        let count = 0;

        function getData(data) {
          const row = data[count];
          count++;
          return row;
        }

        seed.push({
          name: getData(data),
          level: getData(data),
          discount: getData(data),
          bedrooms: getData(data),
          bathrooms: getData(data),
          m2total: getData(data),
          price: getData(data),
          otherData : getData(data),
          createdAt: new Date(),
          updatedAt: new Date()
        })

      }).on('end', function (_data) {
        resolve(seed)
      })
    }).then(seed => {
      return queryInterface.bulkInsert('units', seed, {})
    })
    return element;
  },

  async down(_queryInterface, _Sequelize) {}

};
