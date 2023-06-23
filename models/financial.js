'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class financials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      financials.belongsTo(models.units)
    }
  }
  financials.init({
    plan: { type: DataTypes.STRING, defaultValue: 'Sin Plan' },
    method: { type: DataTypes.STRING, defaultValue: 'Sin método' },
    deliverydate: { type: DataTypes.DATE },
    plansoptions: { type:DataTypes.JSON, defaultValue: ['Sin Plan', '70/90', '10/90', '60/40']  },
    methodsoptions: { type: DataTypes.JSON, defaultValue: ['Sin método','Transferencia Bancaria', 'Deposito Bancario'] }
  }, {
    sequelize,
    modelName: 'financials',
  });
  
  return financials;
};