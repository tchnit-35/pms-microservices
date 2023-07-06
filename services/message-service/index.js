
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const messageRoute = require("./routes/Messages");
const app = express();
const PORT  = 3005

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

app.use("/", messageRoute);

app.listen(PORT, () => {
  console.log("Server is running at %d!",PORT);
}); 

 //Load db
 connectDb()
