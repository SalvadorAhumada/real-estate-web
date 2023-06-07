'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  units.init({
    name: DataTypes.STRING,
    level: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.FLOAT,
    m2total: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    otherData: { type: DataTypes.STRING, defaultValue: "{}" },
  }, {
    sequelize,
    modelName: 'units',
  });

  units.associate = function(models) {
    units.belongsTo(models.clusters)
    units.belongsTo(models.status)
    units.belongsTo(models.users)
  }
  
  return units;
};