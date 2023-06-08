//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { 
    signup, 
    login, 
    authenticate, 
    logout,
    users
} = userController

const userAuth = require('../Middleware/userAuth');

const router = express.Router();

router.get('/', userAuth.authenticateUser, users);

router.post('/signup', userAuth.saveUser, signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/authenticate', authenticate);

module.exports = router