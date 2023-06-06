//importing modules
const express = require('express')
const unitController = require('../Controllers/unitController')
const { all, count, cluster, clusters } = unitController
const router = express.Router();
const userAuth = require('../Middleware/userAuth');

router.get('/', userAuth.authenticateUser, all);

router.get('/count', userAuth.authenticateUser, count);

router.get('/clusters', userAuth.authenticateUser, clusters);

router.get('/cluster/:clusterId', userAuth.authenticateUser, cluster);

module.exports = router