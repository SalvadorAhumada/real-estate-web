//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { signup, login, authenticate } = userController
const userAuth = require('../Middleware/userAuth');

const router = express.Router();

router.post('/signup', userAuth.saveUser, signup);

router.post('/login', login);

router.post('/authenticate', authenticate);

module.exports = router