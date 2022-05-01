const express = require("express");
const app = express();
const cors = require("cors");

// const ejs = require("ejs");
const router = require("./router/route");
const port = 5000 | process.env.PORT;

const connectDB = require("./db/db");

require("dotenv").config();

//Connect to DB
connectDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(router);

// //Engeine Setup
// app.set("view engine", "html");
// app.engine("html", ejs.renderFile);

// //Public Folder
// app.use(express.static(__dirname + "/public"));

//Get Request
app.get("/", (req, res) => {
  res.send("hello");
});

//Server Listen
app.listen(port, () => {
  console.log("Listening Port", port);
});
