const amqp = require('amqplib')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const projectRoute = require("./routes/Project");
const app = express();
const PORT  = 3002

// Publish project delete event to RabbitMQ
async function publishEvent(event) {
  const connection = await amqp.connect('amqp://localhost',async()=>{  
    const channel = await connection.createChannel()

  const exchangeName = 'project'
  const routingKey = 'project.change'

  await channel.assertExchange(exchangeName, 'topic', {
    durable: true
  });

  const message = JSON.stringify(event);

  channel.publish(exchangeName, routingKey, Buffer.from(message), {
    persistent: true
  });

  console.log(`Published event: ${message}`);

  await channel.close();
  await connection.close();})

}


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
