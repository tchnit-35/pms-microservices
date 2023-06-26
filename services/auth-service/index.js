require("./config/passport");
const express = require("express");
const cors = require("cors"); 
const connectDb = require("./config/db");
const authRoute = require("./routes/auth");
const User = require('./models/User')
const app = express();
const amqp = require('amqplib/callback_api')

//json parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//amqp connection 
// amqp.connect("amqp:admin:admin@localhost", async (err,connection)=>{
// try{
//   await connection.createChannel(async (err,channel)=>{
//     try{
//      await channel.assertQueue("AUTH")
//     }catch{
//       console.log(err.message)
//     }
//   })}
//   catch{
//     console.log(err.message)
//   }
// })

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


//Registering User

app.post("auth/register", async (req, res) => {
  const { email, password, firstname,lastname } = req.body;
  const username = `@${firstname.slice(0,4)}${lastname.slice(0,4)}${Math.floor(Math.random()*10000)}`
  const userExists = await User.findOne({ email });
  if (userExists) {
      return res.json({ message: "User already exists" });
  } else {
      const newUser = new User({
          email:email,
          firstname:firstname,
          lastname:lastname,
          acc_password:password,
          username:username
      });
      newUser.save(); 
    //   channel.sendToQueue(
    //     "ORDER",
    //     Buffer.from(
    //         JSON.stringify({
    //             userId:newUser._id,
    //             firstname,
    //             lastname,
    //             userEmail:email
    //         })
    //     )
    // );
    //  channel.consume("AUTH", (data) => {
    //     const userProfile = JSON.parse(data.content);
    // });
      return res.json(newUser);
      
      
  }
});
 //Load db
 connectDb()


  