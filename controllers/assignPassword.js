const User = require("../models/users");
const incryption = require("crypto");
// var emailSent = "";

// const saveEmail = async (req, res) => {
//   if (req.body.email && emailSent === "") {
//     emailSent = req.body.email;
//     res.status(200).send("Email Saved");
//   } else {
//     res.status(400).send("Failed to save email");
//   }
// };

const assignPass = async (req, res) => {
  // console.log(emailSent)
  let userlogged = await User.findOne({ generatedCode: req.body.code }, {});
  if (userlogged) {
    let cipher = incryption.createCipher(
      process.env.ALGORITHM,
      req.body.password
    );
    let crypted = cipher.update(
      req.body.password,
      process.env.INPUT_ENCODING,
      process.env.OUTPUT_ENCODING
    );
    crypted += cipher.final(process.env.OUTPUT_ENCODING);
    userlogged.password = crypted;
    userlogged
      .save()
      .then((data) => {
        emailSent = "";
        res.status(201).send("Password updated successfully");
      })
      .catch((err) => {
        console.log(err);
        emailSent = "";
        res.status(401).send("failed");
      });
  }
};

module.exports = { assignPass };
