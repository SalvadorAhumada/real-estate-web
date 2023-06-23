//importing modules
const express = require('express')
const paymentsController = require('../Controllers/paymentsController')
const { 
    add_payment,
    unit_payments
 } = paymentsController;

const router = express.Router();
const userAuth = require('../Middleware/userAuth');

router.get('/:id', 
/* userAuth.authenticateUser,  */
unit_payments);

router.post('/add_payment', 
/* userAuth.authenticateUser, */
 add_payment);


module.exports = router