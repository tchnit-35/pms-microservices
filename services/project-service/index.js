
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("../../shared/config/db");
const projectRoute = require("./routes/Project");
const app = express();
const PORT  = 3002


//json parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//cors middleware

app.use(  
  cors({
    origin: "http://localhost:"+PORT.toString(),
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/projects", projectRoute);

app.listen(PORT, () => {
  console.log("Server is running at %d!",PORT);
});

 //Load db
 connectDb()