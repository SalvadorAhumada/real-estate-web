'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFile = __dirname + '/csv/payments.csv';
const { getData } = require('./helpers/helpers');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, _Sequelize) {

        const element = new Promise(async (resolve, _reject) => {
            let seed = [];
            fs.createReadStream(csvFile).pipe(csv()).on('data', function (data) {
                seed.push({
                    paymentno:  getData(data, 0),
                    duedate:  getData(data, 1),
                    paymentdate:  getData(data, 2),
                    paymenttype:  getData(data, 3),
                    paymentamount:  getData(data, 4),
                    currency:  getData(data, 5),
                    url:  getData(data, 6),
                    comment:  getData(data, 7),
                    otherData:  getData(data, 8),
                    financialId: getData(data, 9),
                    createdAt: new Date(),
                    updatedAt: new Date()
                })

            }).on('end', function (_data) {
                resolve(seed)
            })
        }).then(seed => {
            return queryInterface.bulkInsert('payments', seed, {})
        })
        return element;
    },

    async down(_queryInterface, _Sequelize) { }

};
