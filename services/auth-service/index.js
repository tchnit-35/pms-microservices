require("./config/passport");
const express = require("express");
const cors = require("cors"); 
const connectDb = require("./config/db");
const authRoute = require("./routes/auth");
const User = require('./User')
const app = express();
const kafka = require('kafka-node');
const jwt = require('jsonwebtoken');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const topicsToCreate = [
  { topic: 'user-creation', partition: 0 }
];

client.createTopics(topicsToCreate, (error, result) => {
  if (error) {
    console.error('Error creating topics:', error);
  } else {
    console.log('Topics created successfully:', result);
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
  console.log("Server is running at %d!",4000);
});



// Function to remove expired tokens
async function removeExpiredTokens() {
  const users = await User.find();
  for (const user of users) {
    const newTokens = user.tokens.filter(token => {
      const decoded = jwt.decode(token.token);
      if (decoded && decoded.exp && decoded.exp > Date.now()) {
        return true;
      }
      return false;
    });
    user.tokens = newTokens;
    await user.save();
  }
}

// Schedule the job to run every hour
setInterval(removeExpiredTokens, 60 * 60 * 1000);
 
 //Load db
 connectDb()


  