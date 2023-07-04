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
  { topic: 'project-create', partition: 0 },{ topic: 'project-deletion', partition: 0 },{ topic: 'project-update', partition: 0 },{ topic: 'join-project', partition: 0 },{ topic: 'message-sent', partition: 0 }
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
});

 //Load db
 connectDb()
