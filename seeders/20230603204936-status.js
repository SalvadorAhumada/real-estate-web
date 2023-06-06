  'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, _Sequelize) {
        return queryInterface.bulkInsert('status', [
            {
                name: 'DISPONIBLE',
                color_hex: '#35ce41',
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'VENDIDO',
                color_hex: '#cd110f',
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'RESERVADO',
                color_hex: '#cd8e0f',
                createdAt: new Date(),
                updatedAt: new Date()
              },
        ], {});
    },

    async down(_queryInterface, _Sequelize) { }

};
