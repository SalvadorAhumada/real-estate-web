'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, _Sequelize) {
        return queryInterface.bulkInsert('clusters', [
            {
                name: 'CLUSTER',
                code: 2,
                abb: 'CL',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'CLUSTER2',
                code: 1,
                abb: 'CL2',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    async down(_queryInterface, _Sequelize) { }

};
