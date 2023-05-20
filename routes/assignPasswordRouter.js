const express = require('express')
const router = express.Router()
const assignPasswordController = require('../controllers/assignPassword')

router.post('/saveemail',assignPasswordController.saveEmail)
router.patch('/reassign',assignPasswordController.assignPass)

module.exports = router