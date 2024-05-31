const customerController = require('./../controller/customerController')
const auth = require('./../middleware/auth')
const express = require('express')

const router = express.Router()

router.post('/add-customer', auth, customerController.addCustomer)
router.get('/get-customer/:customerId', auth, customerController.getCustomer)
router.delete('/get-customer/:customerId', auth, customerController.deleteCustomer)
router.put('/get-customer/:customerId', auth, customerController.updateCustomer)
router.get('/get-customers', auth, customerController.getAllCustomers)

module.exports = router
