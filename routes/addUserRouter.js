const express = require('express')
const router = express.Router()
const addUserController = require('../controllers/addUser')

router.post('/adduser',addUserController.addUser)

module.exports = router