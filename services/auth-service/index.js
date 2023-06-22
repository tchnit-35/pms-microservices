require("./config/passport");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("../../shared/config/db");
const passport = require("passport");
const authRoute = require("./routes/auth");
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const app = express();

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

app.listen("3000", () => {
  console.log("Server is running at %d!",3000);
});

 //Load db
 connectDb()


app.get('/',(req,res)=>{
  res.send("Working")
})