const db = require("../../../models");
require("dotenv").config();
const sequelize = db.sequelize;
const UNITS = db.units;
const CLUSTERS = db.clusters;

const all = async (_req, res) => {

    try {
        const units = await UNITS.findAll();
        res.status(200).send({ data: units });
    } catch (ex) {
        res.status(400).send({ msg: "Error!" })
    }
}

const count = async (_req, res) => {

    try {

        const [data] = await sequelize.query(
            `SELECT
        clusters.id,
        clusters.name,
        (SELECT COUNT(*) FROM units WHERE "statusId" = 1 AND units."clusterId" = clusters.id) AS "DISPONIBLE",
        (SELECT COUNT(*) FROM units WHERE "statusId" = 2 AND units."clusterId" = clusters.id) AS "VENDIDO",
        (SELECT COUNT(*) FROM units WHERE "statusId" = 3 AND units."clusterId" = clusters.id) AS "RESERVADO"
      FROM
        clusters;`
        );

        res.status(200).send({ data });

    } catch (err) {
        res.status(400).send({ msg: "Error!", err })
    }
}

const cluster = async (req, res) => {
    
    const { clusterId } = req.params;

    try {
        const units = await UNITS.findAll({
            where: {
                clusterId: parseInt(clusterId)
            }
        });
        return res.status(200).send({ units });

    } catch(ex) {
        return res.status(400).send({ msg: "Error!" })
    }
}

const clusters = async(req, res) => {
    try {

        const clusters = await CLUSTERS.findAll();

        return res.status(200).send({clusters});

    } catch(ex) {
        return res.status(400).send({ msg: "Error!" })
    }
}

module.exports = {
    all,
    count,
    cluster,
    clusters
};