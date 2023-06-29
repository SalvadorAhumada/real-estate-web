//importing modules
const express = require('express')
const paymentsController = require('../Controllers/paymentsController')
const {
    add_payment,
    unit_payments,
    delete_payment,
    update_payment
} = paymentsController;

const router = express.Router();
const userAuth = require('../Middleware/userAuth');

router.get('/:id', userAuth.authenticateUser, unit_payments);

router.post('/add_payment', userAuth.authenticateUser, add_payment);

router.delete('/delete_payment', userAuth.authenticateUser, delete_payment);

router.post('/update_payment', userAuth.authenticateUser, update_payment);

module.exports = router;