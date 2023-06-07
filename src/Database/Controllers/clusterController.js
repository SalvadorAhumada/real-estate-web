const db = require("../../../models");
require("dotenv").config();
const sequelize = db.sequelize;
const UNITS = db.units;
const CLUSTERS = db.clusters;
const STATUS = db.status;
const USERS = db.users;
/**
 * Statuses from all units in all clusters 
 * GET api/clusters/count  
 */
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
/**
 * Specific ID cluster
 * GET api/clusters/:id
 * @param {clusterId} string  
 */
const cluster = async (req, res) => {
    
    const { clusterId } = req.params;

    try {
        const units = await UNITS.findAll({
            where: {
                clusterId: parseInt(clusterId)
            },
            include: [CLUSTERS, STATUS, USERS],
            order: [
                ['id', 'ASC']
              ]
        });
        return res.status(200).send({ units });

    } catch(ex) {
        return res.status(400).send({ msg: "Error!" })
    }
}
/**
 * All clusters
 * GET api/clusters
 */
const clusters = async(_req, res) => {
    try {

        const clusters = await CLUSTERS.findAll();

        return res.status(200).send({clusters});

    } catch(ex) {
        return res.status(400).send({ msg: "Error!" })
    }
}

module.exports = {
    count,
    cluster,
    clusters
};