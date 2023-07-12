const { map } = require("..");
const User = require("../models/users");

const ranking = async (req, res) => {
  let list = await User.find({}, { username: 1, totalpoints: 1, _id: 0 })
    .sort({ totalpoints: -1 })
    .limit(10);
  if (list) {
    res.status(200).send(list);
  } else {
    res.status(400).send("Bad request. An error occured");
  }
};

const yourRank = async (req, res) => {
  let sentIndex = 0;
  let list = await User.find({}, { username: 1, totalpoints: 1, _id: 0 }).sort({
    totalpoints: -1,
  });
  if (list) {
    let user = await User.findOne(
      { username: req.params.username },
      { username: 1, totalpoints: 1, _id: 0 }
    );
    if (user) {
      await Promise.all(
        list.map((usr, idx) => {
          let stringusr = usr.toString();
          let curruser = user.toString();
          if (stringusr === curruser) sentIndex = idx;
        })
      );
      let sentData = {
        position:sentIndex+1
      }
      res.status(200).send(sentData);
    } else {
        res.status(404).send("User not found")
    }
  } else {
    res.status(401).send("No data to show")
  }
};

module.exports = { ranking, yourRank };
