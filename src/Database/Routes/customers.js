//importing modules
const express = require('express')
const customersController = require('../Controllers/customersController');
const { 
    customers
} = customersController

const userAuth = require('../Middleware/userAuth');

const router = express.Router();

router.get('/', userAuth.authenticateUser, customers);

module.exports = router