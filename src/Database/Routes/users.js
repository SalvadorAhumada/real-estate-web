//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { 
    signup, 
    login, 
    authenticate, 
    logout,
    all_users
} = userController

const userAuth = require('../Middleware/userAuth');

const router = express.Router();

router.post('/signup', userAuth.saveUser, signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/authenticate', authenticate);

router.get('/all_users', userAuth.authenticateUser, all_users);

module.exports = router