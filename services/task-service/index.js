const amqp = require('amqplib')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const taskRoute = require("./routes/task");
const Task = require('./models/Task');
const app = express();
const PORT  = 3003

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

app.use("/", taskRoute);

app.listen(PORT, () => {
  console.log("Server is running at %d!",PORT);
});

 //Load db
 connectDb()

 //Connect to rabbitMQ server
 async function start() {
  await amqp.connect('amqp://localhost:5672',async()=>{ 
    const channel = await connection.createChannel();

  const exchangeName = 'project';
  const routingKey = 'project.change';

  await channel.assertExchange(exchangeName, 'topic', {
    durable: true
  });

  const queueName = 'task.delete';
  await channel.assertQueue(queueName, {
    durable: true
  });
 
  await channel.bindQueue(queueName, exchangeName, routingKey);

  console.log(`Task microservice listening for project deletion events`);

  channel.consume(queueName, async (msg) => {
    try {
      const event = JSON.parse(msg.content.toString());
      if (event.action === 'delete') {
        const { projectId } = event;
        await Task.deleteMany({ projectId });
        console.log(`Deleted tasks for project ${projectId}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      channel.ack(msg);
    }
  });})
 
}

start();
