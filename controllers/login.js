const dotenv = require('dotenv').config()
const User = require('../models/users')
const incryption = require('crypto')
const jwt = require('jsonwebtoken')

const login = async (req,res) => {
    console.log(req.body)
    let decipher = incryption.createDecipher(process.env.ALGORITHM, req.body.password);
    let decrypted = decipher.update(req.body.password, process.env.INPUT_ENCODING, process.env.OUTPUT_ENCODING);
    decrypted += decipher.final(process.env.OUTPUT_ENCODING);
    let loggedUser = await User.findOne({
        $and:[{username:req.body.email},{password:decrypted}]
    })
    if (loggedUser) {
        let token = jwt.sign(loggedUser._id, process.env.TOKEN_SECRET);
        res.header("Authentication",token)
        res.status(200).send(loggedUser)
    } else {
        res.status(401).send("Invalid email or password")
    }
}

module.exports = {login}