const express = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const router = require("./router/route");
const port = 3000 | process.env.PORT;
const mongoose = require("mongoose");

require("dotenv").config();

//Connect to DB
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uw9ja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  () => {
    console.log("Connected");
  }
);

//Middleware
app.use(cors());
app.use(express.json());
app.use(router);

//Engeine Setup
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//Public Folder
app.use(express.static(__dirname + "/public"));

//Get Request
app.get("/", (req, res) => {
  res.render("index");
});

//Server Listen
app.listen(port, () => {
  console.log("Listening Port", port);
});
