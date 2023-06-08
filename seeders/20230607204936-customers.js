'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFile = __dirname + '/csv/customers.csv';
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
          representative: getData(data, 2),
          nationality: getData(data, 3),
          country: getData(data, 4),
          dateofbirth: getData(data, 5),
          countryofbirth: getData(data, 6),
          stateofbirth: getData(data, 7),
          cityofbirth: getData(data, 8),
          rfc: getData(data, 9),
          curp: getData(data, 10),
          maritalstat: getData(data, 11),
          occupation: getData(data, 12),
          email: getData(data, 13),
          telephone: getData(data, 14),
          password: bcrypt.hashSync(getData(data, 3), salt),
          deleted: getData(data, 16),
          zipcode: getData(data, 17),
          extradata: getData(data, 18),
          stateaddress: getData(data, 19),
          cityaddress: getData(data, 20),
          streetaddress: getData(data, 21),
          numberaddress: getData(data, 22),
          zoneaddress: getData(data, 23),
          type: getData(data, 24),
          gender: getData(data, 25),
          createdAt: new Date(),
          updatedAt: new Date()
        })

      }).on('end', function (_data) {
        resolve(seed)
      })
    }).then(seed => {
      return queryInterface.bulkInsert('customers', seed, {})
    })
    return element;
  },

  async down(_queryInterface, _Sequelize) {}

};
