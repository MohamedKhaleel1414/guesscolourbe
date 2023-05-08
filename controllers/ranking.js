const User = require('../models/users')

const ranking = async (req,res) => {
    let list = await User.find({},{username:1,totalpoints:1,_id:0}).sort({totalpoints:-1}).limit(10)
    if(list){
        res.status(200).send(list)
    } else {
        res.status(400).send("Bad request. An error occured")
    }
}

module.exports = {ranking}