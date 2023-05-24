require("./config/passport");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const passport = require("passport");
const authRoute = require("./routes/auth");
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const app = express();

//json parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//cors middleware

app.use(  
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("3000", () => {
  console.log("Server is running at %d!",3000);
});

 //Load db
 connectDb()

// //Registering User
// app.post("/auth/register", async (req, res) => {
//   const { email, password, name } = req.body;
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//       return res.json({ message: "User already exists" });
//   } else {
//       const newUser = new User({
//           email:email,
//           display_name:name,
//           acc_password:password,
//       });
//       newUser.save();
//       return res.json(newUser);
//   }
// });

// //Login User
//  app.post("/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//       return res.json({ message: "User doesn't exist" });
//   } else {
//       if (password !== user.acc_password) {
//           return res.json({ message: "Password Incorrect" });
//       }
//       const payload = {
//           email:user.email,
//           display_name: user.display_name
//       };
//       jwt.sign(payload, "secret", (err, token) => {
//           if (err) console.log(err);
//           else return res.json({ token: token });
//       });
//   }
// });

app.get('/',(req,res)=>{
  res.send("Working")
})