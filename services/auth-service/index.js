require("./config/passport");
const express = require("express");
const cors = require("cors"); 
const connectDb = require("./config/db");
const authRoute = require("./routes/auth");
const User = require('./User')
const app = express();
const kafka = require('kafka-node');

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);
const userRegisteredEvent = {
   
};

const payloads = [
  { topic: 'userEvents', messages: JSON.stringify(userRegisteredEvent) }
];

producer.send(payloads, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User registered event published');
  }
});

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

app.use("/auth", authRoute);

app.listen("4000", () => {
  console.log("Server is running at %d!",3000);
});



 //Load db
 connectDb()


  