'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFile = __dirname + '/csv/users.csv';
const { getData } = require('./helpers/helpers');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, _Sequelize) {
    
    const bcrypt = require('bcryptjs');
    let salt = bcrypt.genSaltSync(10);

    const element = new Promise(async (resolve, _reject) => {
      let seed = [];
      fs.createReadStream(csvFile).pipe(csv()).on('data', function (data) {
        seed.push({
          name: getData(data, 0),
          lastname: getData(data, 1),
          email: getData(data, 2),
          password: bcrypt.hashSync(getData(data, 3), salt),
          type: getData(data, 4),
          createdAt: new Date(),
          updatedAt: new Date()
        })

      }).on('end', function (_data) {
        resolve(seed)
      })
    }).then(seed => {
      return queryInterface.bulkInsert('users', seed, {})
    })
    return element;
  },

  async down(_queryInterface, _Sequelize) {}

};
