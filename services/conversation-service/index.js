
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const conversationRoute = require("./routes/Conversation");
const app = express();
const PORT  = 3006

require('./controllers/messageHandler')

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

app.use("/conversation", conversationRoute);

app.listen(PORT, () => {
  console.log("Server is running at %d!",PORT);
});

 //Load db
 connectDb()
