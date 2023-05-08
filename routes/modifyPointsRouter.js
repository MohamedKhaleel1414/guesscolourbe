const express = require('express')
const router = express.Router()
const modifyPointsController = require('../controllers/modifyPoints')

router.patch('/addpoints',modifyPointsController.modifyPoints)

module.exports = router