'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING },
    representative: { type: DataTypes.STRING },
    nationality: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING, allowNull: false },
    dateofbirth: { type: DataTypes.STRING },
    countryofbirth: { type: DataTypes.STRING },
    stateofbirth: { type: DataTypes.STRING },
    cityofbirth: { type: DataTypes.STRING },
    rfc: { type: DataTypes.STRING },
    curp: { type: DataTypes.STRING },
    maritalstat: { type: DataTypes.STRING },
    occupation: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    telephone: { type: DataTypes.STRING, },
    password: { type: DataTypes.STRING, allowNull: true },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    zipcode: { type: DataTypes.STRING },
    extradata: { type: DataTypes.STRING },
    stateaddress: { type: DataTypes.STRING },
    cityaddress: { type: DataTypes.STRING },
    streetaddress: { type: DataTypes.STRING },
    numberaddress: { type: DataTypes.STRING },
    zoneaddress: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING }
  }, {
    sequelize,
    modelName: 'customers',
  });
  return customers;
};