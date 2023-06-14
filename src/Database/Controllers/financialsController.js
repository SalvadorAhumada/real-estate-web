const db = require("../../../models");
require("dotenv").config();
const FINANCIALS = db.financials;
/**
 * Financial plan data for one unit
 * GET  api/financials/:d
 * @param { unitId } integer 
 */
const get_one = async (req, res) => {

    const { unitId } = req.params;

    try {
        let financialPlan = await FINANCIALS.findOne({ where: { unitId } });

        if (financialPlan) {
            res.status(200).send(financialPlan);
        } else {
            res.status(200).send({});
        }

    } catch (ex) {
        console.log(ex);
        res.status(400).send({ msg: "Error!" })
    }
}
/**
 * Financial plan data for one unit
 * POST  api/financials/
 * @param { unitId } integer 
 * @param { plan } string
 */
const update_plan = async (req, res) => {
    const { unitId } = req.body;

    try {

        const unitHasPlan = await FINANCIALS.findOne({ where: { unitId } });

        if (!unitHasPlan) {
            const newPlan = await FINANCIALS.create({ unitId });
            res.status(200).send(newPlan);

        } else {

            let toUpdate = req.body;
            let unitId = req.body.unitId;

            delete req.body.unitId;
            
            const [_affectedRow, updatedUnit] = await FINANCIALS.update(
                { ...toUpdate },
                {
                    where: { unitId },
                    returning: true
                },

            )
            res.status(200).send(updatedUnit[0])
        }

    } catch (ex) {
        console.log(ex);
        res.status(400).send({ err: ex })
    }
}

module.exports = {
    get_one,
    update_plan
};