const dotenv = require("dotenv").config();
const { post } = require("..");
const User = require("../models/users");
const nodemailer = require("nodemailer");
const axios = require("axios");

const forgetPass = async (req, res) => {
  if (req.body.email) {
    const userRequested = await User.findOne({ email: req.body.email }, {});
    if (userRequested) {
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
        html: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Assign Password</title>
                  </head>
                  <body style="width: 100%;height: 50px;color:rgb(82, 81, 81);">
                    <p style="text-align: center;">
                      A request has been received to change the password for your Guess Colour
                      account. 
                    </p>
                    <div style="text-align: center;">
                        <a href='https://www.google.com'>CLick Here</a>
                    </div>
                  </body>
                </html>`,
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
