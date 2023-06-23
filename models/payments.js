'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      payments.belongsTo(models.financials)
    }
  }
  payments.init({
    paymentno: { type: DataTypes.INTEGER },
    duedate: { type: DataTypes.DATE },
    paymentdate: { type: DataTypes.DATE, defaultValue: new Date() },
    paymenttype: { type:DataTypes.STRING },
    paymentamount: { type: DataTypes.INTEGER },
    currency: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING },
    otherData: { type: DataTypes.STRING, defaultValue: '{}' }
  }, {
    sequelize,
    modelName: 'payments',
  });
  
  return payments;
};