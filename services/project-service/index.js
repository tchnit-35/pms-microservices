const kafka = require('kafka-node')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const projectRoute = require("./routes/Project");
const app = express();
const PORT  = 3002
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// const topicsToCreate = [
//   { topic: 'getUserProject', partitions: 1, replicationFactor: 1 },
//   { topic: 'isAdmin', partitions: 1, replicationFactor: 1 },
// ];

// client.createTopics(topicsToCreate, (error, result) => {
//   if (error) {
//     console.error('Error creating topics:', error);
//   } else {
//     console.log('Topics created successfully:', result);
//   }
// });
// require('./controllers/permission')


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
