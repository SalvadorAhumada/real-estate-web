'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFile = __dirname + '/csv/units.csv';
const { getData } = require('./helpers/helpers');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, _Sequelize) {

    const element = new Promise(async (resolve, _reject) => {
      let seed = [];
      fs.createReadStream(csvFile).pipe(csv()).on('data', function (data) {
        seed.push({
          name: getData(data, 0),
          level: getData(data, 1),
          discount: getData(data, 2),
          bedrooms: getData(data, 3),
          bathrooms: getData(data, 4),
          m2total: getData(data, 5),
          price: getData(data, 6),
          otherData : getData(data, 7),
          clusterId: getData(data, 8),
          statusId: getData(data, 9),
          userId: getData(data, 10),
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
