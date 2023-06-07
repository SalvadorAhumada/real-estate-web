  'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, _Sequelize) {
        return queryInterface.bulkInsert('status', [
            {
                name: 'DISPONIBLE',
                color_hex: '#16c624',
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'VENDIDO',
                color_hex: '#a96968',
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'RESERVADO',
                color_hex: '#ffcf6e',
                createdAt: new Date(),
                updatedAt: new Date()
              },
        ], {});
    },

    async down(_queryInterface, _Sequelize) { }

};
