//importing modules
const express = require('express')
const unitController = require('../Controllers/unitController')
const { 
    all,
    status,
    update_status
 } = unitController
const router = express.Router();
const userAuth = require('../Middleware/userAuth');

router.get('/', userAuth.authenticateUser, all);

router.get('/status', userAuth.authenticateUser, status);

router.post('/update_status', userAuth.authenticateUser, update_status);

module.exports = router