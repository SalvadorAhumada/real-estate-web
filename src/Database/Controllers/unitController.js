const db = require("../../../models");
require("dotenv").config();
const UNITS = db.units;
const STATUS = db.status;

const all = async (_req, res) => {

    try {
        const units = await UNITS.findAll({});
        res.status(200).send({ data: units });
    } catch (ex) {
        res.status(400).send({ msg: "Error!" })
    }
}
/**
 * All statuses
 * GET  api/units/status
 */
const status = async (_req, res) => {

    try {
        const status = await STATUS.findAll();
        res.status(200).send({ data: status });
    } catch (ex) {
        res.status(400).send({ msg: "Error!" })
    }
}

const update_status = async (req, res) => {

    const { unitId, statusId } = req.body;

    try {

        const unit = await UNITS.update(
            { statusId },
            { where: { id: unitId } }
        )

        res.status(200).send({ data: unit });

    } catch (ex) {
        res.status(400).send({ msg: "Error!" })
    }
}
/**
 * Update userId in selectedUnit
 * GET api/units/update_users
 * @param { userId } integer 
 * @param { unitId } integer 
 */
const update_user = async (req, res) => {

    const { userId, unitId } = req.body;

    try {

        const updatedUnit = await UNITS.update(
            { userId },
            { where: { id: unitId } }
        )

        res.status(200).send({ data: updatedUnit });

    } catch (ex) {
        res.status(400).send({ msg: "Error!" })
    }

}

/**
 * Update userId in selectedUnit
 * POST api/units/update_customers
 * @param { userId } integer 
 * @param { unitId } integer 
 * @param { statusId } integer 
 */
const update_customer = async (req, res) => {

    const { customerId, unitId, statusId } = req.body;

    try {

        const updatedUnit = await UNITS.update(
            { customerId, statusId },
            { where: { id: unitId } }
        )

        res.status(200).send({ data: updatedUnit });

    } catch (ex) {
        res.status(400).send({ msg: "Error!" })
    }

}

module.exports = {
    all,
    status,
    update_status,
    update_user,
    update_customer
};