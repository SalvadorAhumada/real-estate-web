//importing modules
const express = require('express')
const clusterController = require('../Controllers/clusterController')
const {
    count,
    cluster,
    clusters
} = clusterController

const router = express.Router();
const userAuth = require('../Middleware/userAuth');

router.get('/', userAuth.authenticateUser, clusters);

router.get('/clusters', userAuth.authenticateUser, clusters);

router.get('/count', userAuth.authenticateUser, count);

router.get('/:clusterId', userAuth.authenticateUser, cluster);

module.exports = router