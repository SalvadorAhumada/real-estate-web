'use strict';

const fs = require('fs');
const csv = require('fast-csv');
const csvFile = __dirname + '/csv/financials.csv';
const { getData } = require('./helpers/helpers');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, _Sequelize) {

        const element = new Promise(async (resolve, _reject) => {
            let seed = [];
            fs.createReadStream(csvFile).pipe(csv()).on('data', function (data) {
                seed.push({
                    plan: getData(data, 0),
                    method: getData(data, 1),
                    deliverydate: getData(data, 2),
                    plansoptions: getData(data, 3),
                    methodsoptions: getData(data, 4),
                    createdAt: new Date(),
                    updatedAt: new Date()
                })

            }).on('end', function (_data) {
                resolve(seed)
            })
        }).then(seed => {
            return queryInterface.bulkInsert('financials', seed, {})
        })
        return element;
    },

    async down(_queryInterface, _Sequelize) { }

};
