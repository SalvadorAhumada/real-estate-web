const db = require("../../../models");
require("dotenv").config();
const PAYMENTS = db.payments;

/**
 * Add one payment
 * GET  api/payments/add_payment
 * @param { financialId } Integer 
 */
const unit_payments = async (req, res) => {

    const { id } = req.params;

    try {
        const payments = await PAYMENTS.findAll({
            where: {
                financialId: parseInt(id)
            },
            order: [
                ['id', 'ASC']
              ]
        });
        return res.status(200).send(payments);

    } catch(ex) {
        console.log(ex)
        return res.status(400).send({ msg: "Error!" })
    }
}

/**
 * Add one payment
 * POST  api/payments/add_payment
 * @param { Payment } Payment 
 */
const add_payment = async (req, res) => {

    const { body } = req;

    try {
        const newPayment = await PAYMENTS.create(body);
        res.status(200).send({ data: newPayment });
    } catch (ex) {
        res.status(400).send({ msg: "Error!" })
    }
}

module.exports = {
    add_payment,
    unit_payments
};