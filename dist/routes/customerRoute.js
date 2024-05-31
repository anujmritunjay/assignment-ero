"use strict";

var customerController = require('./../controller/customerController');
var auth = require('./../middleware/auth');
var express = require('express');
var router = express.Router();
router.post('/add-customer', auth, customerController.addCustomer);
router.get('/get-customer/:customerId', auth, customerController.getCustomer);
router["delete"]('/get-customer/:customerId', auth, customerController.deleteCustomer);
router.put('/get-customer/:customerId', auth, customerController.updateCustomer);
router.get('/get-customers', auth, customerController.getAllCustomers);
module.exports = router;