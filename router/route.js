const express = require("express");
const User = require("../model/userSignUp");
const router = express.Router();

//Post Request
router.post("/", async (req, res) => {
  //Data Capture from client
  const { email, password } = req.body;

  //Make user object from captured Data
  const user = new User({
    email,
    password,
  });

  //Check if email is already is Databse
  const registeredEmail = await User.findOne(email);
  if (registeredEmail) {
    return res.status(400).send("Email Already Exists");
  } else {
  }

  try {
    //Data post to database
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
