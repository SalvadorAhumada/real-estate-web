const db = require("../../../models");
require("dotenv").config();
const PAYMENTS = db.payments;

/**
 * Add one payment
 * GET  api/payments/unit_payments
 * @param { financialId } Integer 
 */
const unit_payments = async (req, res) => {

    const { id } = req.params;

    try {
        let payments = await PAYMENTS.findAll({
            where: {
                financialId: parseInt(id)
            },
            order: [
                ['id', 'ASC']
            ]
        });

        if (payments.length === 0) payments = { noPayments: true };

        return res.status(200).send(payments);

    } catch (ex) {
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
        res.status(400).send({ error: ex })
    }
}

/**
 * Deletes payment
 * DELETE  api/payments/delete_payment
 * @param { paymentId } Integer 
 */
const delete_payment = async (req, res) => {
    const { paymentId } = req.body;

    try {
        const deletedPayment = await PAYMENTS.destroy({ where: { id: paymentId } });

        res.status(200).send({ data: deletedPayment });

    } catch (ex) {
        res.status(400).send({ error: ex })
    }
};

/**
 * Update payment
 * POST api/payments/update_payment
 * @param { Payment } payment
 */
const update_payment = async (req, res) => {

    let updatedPayment = req.body;
    const id = updatedPayment.id;
    delete updatedPayment.id;
    delete updatedPayment.createdAt;
    delete updatedPayment.updatedAt;

    let toUpdate = {};

    try {

        const existingPayment = PAYMENTS.findOne({ where: { id } });

        for (let key in updatedPayment) {
            const updatedValue = updatedPayment[key];
            const existingValue = existingPayment[key];

            if (updatedValue !== existingValue) {
                toUpdate[key] = updatedValue;
            }
        }

        console.log("TO UPDATE:", toUpdate);
        const payment = await PAYMENTS.update(
            { ...toUpdate },
            { where: { id } }
        )
        res.status(200).send({ data: payment });

    } catch (ex) {
        
        console.log(ex);
        res.status(400).send({ error: ex })
    }
}

module.exports = {
    add_payment,
    unit_payments,
    delete_payment,
    update_payment
};