const express = require('express')
const router = express.Router()
const forgetPasswordController = require('../controllers/forgetPassword')

router.post('/resetpassword',forgetPasswordController.forgetPass)

module.exports = router