const User = require('../models/users')

const modifyPoints = async (req,res) => {
    let player = await User.findOneAndUpdate({username:req.body.username},{$inc:{totalpoints:req.body.totalpoints}})
    if(player){
        res.status(200).send("Points added")
    } else {
        res.status(404).send("Couldn't add points")
    }
}

module.exports = {modifyPoints}