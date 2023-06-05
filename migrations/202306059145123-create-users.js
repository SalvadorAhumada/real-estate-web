'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      level: {
        type: DataTypes.STRING
      },
      discount: {
        type: DataTypes.INTEGER
      },
      bedrooms: {
        type: DataTypes.INTEGER
      },
      bathrooms: {
        type: DataTypes.FLOAT
      },
      m2total: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.FLOAT
      },
      otherData: { 
        type: DataTypes.STRING, 
        defaultValue: "{}"
       },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};