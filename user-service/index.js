
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const userRoute = require("./routes/User");
const app = express();

//json parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//cors middleware

app.use(  
  cors({
    origin: "http://localhost:3002",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/user", userRoute);

app.listen("3002", () => {
  console.log("Server is running at %d!",3002);
});

 //Load db
 connectDb()

//  async function connect() {
//   const amqpServer = "amqp://localhost:5672";
//   const connection = await amqp.connect(amqpServer);
//   const channel = await connection.createChannel();
//   await channel.assertQueue("WORKSPACE");
// }
// connect();

