require("./config/passport");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const Workspace = require('./models/Workspace');
const workspaceRoute = require('./routes/workspace')
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

app.use("/workspace", workspaceRoute);

app.listen("4000", () => {
  console.log("Server is running at %d!",3000);
});

 //Load db
 connectDb()



app.get('/',(req,res)=>{
  res.send("Working")
})

async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("WORKSPACE");
}
connect();