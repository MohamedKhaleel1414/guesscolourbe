const dotenv = require('dotenv').config()
const User = require("../models/users");
const incryption = require("crypto");

const addUser = async (req, res) => {
  let cipher = incryption.createCipher(process.env.ALGORITHM, req.body.password);
  let crypted = cipher.update(req.body.password, process.env.INPUT_ENCODING, process.env.OUTPUT_ENCODING);
  crypted += cipher.final(process.env.OUTPUT_ENCODING);
  let saveData = {
    username: req.body.username,
    email: req.body.email,
    password: crypted,
  };
  let checkEmail = await User.findOne({email:saveData.email})
  let checkUsername = await User.findOne({username:saveData.username})
  if(!checkEmail && !checkUsername){
    let newMan = new User(saveData);
    newMan
    .save()
    .then((data) => {
      res.status(201).send("New user has been added successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send("failed"); 
    });
  } else if(checkEmail){
    res.status(403).send("This email is registered")
  } else if(checkUsername){
    res.status(403).send("This username is used")
  }
};

module.exports = { addUser };
