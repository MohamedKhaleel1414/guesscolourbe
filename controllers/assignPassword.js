const User = require("../models/users");

const assignPass = async (req,res) => {
    let userlogged = await User.findById(req.body.id)
    if(userlogged){
        let cipher = incryption.createCipher(process.env.ALGORITHM, req.body.password);
        let crypted = cipher.update(req.body.password, process.env.INPUT_ENCODING, process.env.OUTPUT_ENCODING);
        crypted += cipher.final(process.env.OUTPUT_ENCODING);
        userlogged.password = crypted
        userlogged.save().then((data) => {
            res.status(201).send("Password updated successfully");
          })
          .catch((err) => {
            console.log(err);
            res.status(401).send("failed"); 
        });
    }
}

module.exports = {assignPass}