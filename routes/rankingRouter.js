const express = require('express')
const router = express.Router()
const rankingController = require('../controllers/ranking')

router.get('/getranking',rankingController.ranking)

module.exports = router