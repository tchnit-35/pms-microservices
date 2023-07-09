const kafka = require('kafka-node')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const projectRoute = require("./routes/Project");
const app = express();
const PORT  = 3002
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const topicsToCreate = [
  { topic: 'project-create', partitions: 2 , replicationFactor: 1  },{ topic: 'project-deletion', partitions: 2 , replicationFactor: 1},{ topic: 'project-update', partitions: 2, replicationFactor: 1 },{ topic: 'join-project', partitions: 2 , replicationFactor: 1},{ topic: 'message-sent', partitions: 2 , replicationFactor: 1}
]; 

client.createTopics(topicsToCreate, (error, result) => {
  if (error) {
    console.error('Error creating topics:', error);
  } else {
    console.log('Topics created successfully:', result);
  }
}); 
// require('./controllers/permission')


//json parsing middleware
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))


//cors middleware

app.use(  
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
  
app.use("/projects", projectRoute);

app.listen(PORT, () => {
  console.log("Server is running at %d!",PORT);
}) 
    
 //Load db 
 connectDb()
