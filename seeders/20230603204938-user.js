'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFile = __dirname + '/csv/users.csv';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, _Sequelize) {
    
    const bcrypt = require('bcryptjs');
    let salt = bcrypt.genSaltSync(10);

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
          userName: getData(data),
          email: getData(data),
          password: bcrypt.hashSync(getData(data), salt),
          type: getData(data),
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
