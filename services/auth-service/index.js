require("./config/passport");
const express = require("express");
const cors = require("cors"); 
const connectDb = require("./config/db");
const authRoute = require("./routes/auth");
const User = require('./User')
const app = express();
const kafka = require('kafka-node');




//json parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

 

//cors middleware

app.use(  
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("4000", () => {
  console.log("Server is running at %d!",4000);
});

module.exports = {
  User,
};

 //Load db
 connectDb()


  