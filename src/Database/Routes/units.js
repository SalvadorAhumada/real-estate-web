//importing modules
const express = require('express')
const unitController = require('../Controllers/unitController')
const { 
    all,
    status,
    update_status,
    update_user
 } = unitController
const router = express.Router();
const userAuth = require('../Middleware/userAuth');

router.get('/', userAuth.authenticateUser, all);

router.get('/status', userAuth.authenticateUser, status);

router.post('/update_status', userAuth.authenticateUser, update_status);

router.post('/update_user', userAuth.authenticateUser, update_user);

module.exports = router