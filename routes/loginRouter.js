const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')

router.get('/finduser', loginController.login)

module.exports = router