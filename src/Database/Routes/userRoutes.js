//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { signup, login } = userController
const userAuth = require('../Middleware/userAuth');

const router = express.Router();

router.post('/signup', userAuth.saveUser, signup);

router.post('/login', login);

router.get('/protected', userAuth.validateUser, (_req, res) => {
    res.json({ message: "You are authorized to access me" });
  })

module.exports = router