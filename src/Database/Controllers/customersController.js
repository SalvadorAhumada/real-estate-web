const db = require("../../../models");
require("dotenv").config();
const CUSTOMER = db.customers;
/**
 * All customers
 * GET api/customers/  
 */
const customers = async (_req, res) => {

    try {

        let customers = await CUSTOMER.findAll({
            attributes: { exclude: ['password'] }
          })

        res.status(200).send(customers);

    } catch (err) {
        res.status(400).send({ msg: "Error!", err })
    }
}

module.exports = {
    customers
};