const express = require('express')
const router = express.Router()
const assignPasswordController = require('../controllers/assignPassword')

router.patch('/reassign',assignPasswordController.assignPass)

module.exports = router