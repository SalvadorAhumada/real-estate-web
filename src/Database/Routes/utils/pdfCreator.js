//importing modules
const express = require('express')
const pdfController = require('../../Controllers/pdfController')
const {
    create_payments
} = pdfController

const router = express.Router();
const userAuth = require('../../Middleware/userAuth');

router.post('/payments', 
/* userAuth.authenticateUser,  */
create_payments);

module.exports = router