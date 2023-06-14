//importing modules
const express = require('express')
const unitController = require('../Controllers/financialsController')
const { 
    get_one,
    update_plan
 } = unitController

const router = express.Router();
const userAuth = require('../Middleware/userAuth');

/* router.get('/', userAuth.authenticateUser, all); */

router.post('/', 
userAuth.authenticateUser,
update_plan);

router.get('/:unitId', 
/* userAuth.authenticateUser, */
 get_one);

module.exports = router