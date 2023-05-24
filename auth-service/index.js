// const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./config/passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const connectDb = require("./config/db")
// const session = require('express-session');
const mongoose = require("mongoose");
// const MongoStore = require('connect-mongodb-session')(session);
const jwt = require('jsonwebtoken')
const app = express();
//json parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//jsonwebtoken middlwware 

app.use()

//cookie session middleware

// app.use(
//   cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
// );

//express session middleware

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection
//   })
// }))

//passport middleware

app.use(passport.initialize());
app.use(passport.session());

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

