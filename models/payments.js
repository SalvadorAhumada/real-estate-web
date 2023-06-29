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
    paymentamount: { type: DataTypes.FLOAT },
    currency: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING },
    otherData: { type: DataTypes.STRING, defaultValue: '{ "statuses": ["Pagado", "Por Pagar"] }' },
    paymentstatus: { type: DataTypes.STRING, defaultValue: "Por Pagar" }
  }, {
    sequelize,
    modelName: 'payments',
  });
  
  return payments;
};