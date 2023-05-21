const dotenv = require("dotenv").config();
const { post } = require("..");
const User = require("../models/users");
const nodemailer = require("nodemailer");
const axios = require("axios");
const fs = require('fs')

const forgetPass = async (req, res) => {
  if (req.body.email) {
    const userRequested = await User.findOne({ email: req.body.email }, {});
    if (userRequested) {
      const htmlFile = fs.readFileSync('./views/forgetEmailContent.html',{encoding:"utf-8"})
      axios.default
        .post(
          "https://guesscolour.onrender.com/assignpassword/saveemail",
          {
            email: req.body.email,
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        data: req.body.email,
      });
      const message = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Assign your Password",
        html: htmlFile,
      };
      transport.sendMail(message, (err, info) => {
        if (err) {
          // console.log(err)
          res.status(403).send("An error occured");
        } else {
          // console.log(info)
          res.status(200).send("Email sent");
        }
      });
    } else {
      res.status(404).send("Email not found");
    }
  }
};

module.exports = { forgetPass };
