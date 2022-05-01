const express = require("express");
const { route } = require("express/lib/application");
const User = require("../model/userSignUp");
const router = express.Router();
const bcrypt = require("bcrypt");

//Post Request
router.post("/", async (req, res) => {
  //Data Capture from client
  const { email, password } = req.body;

  //Check if email is already is Databse
  const registeredEmail = await User.findOne({ email });

  if (registeredEmail) {
    return res.status(400).send("Email Already Exists");
  }

  //Hasing the password

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Make user object from captured Data
  const user = new User({
    email,
    password: hashPassword,
  });
  try {
    //Data post to database
    const savedUser = await user.save();
    res.send({ userId: savedUser._id });
    console.log(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Registered Email Exists or Not
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).send("Email and Password is not registered");

  //If Registered
  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) return res.status(400).send("Invalid Password");

  res.send("Logged In");
});
module.exports = router;
