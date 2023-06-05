const express = require('express')
const router = express.Router()
const rankingController = require('../controllers/ranking')

router.get('/getranking',rankingController.ranking)
router.get('/getyourrank',rankingController.yourRank)

module.exports = router