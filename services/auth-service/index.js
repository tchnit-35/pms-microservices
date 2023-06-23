require("../../shared/config/passport");
const express = require("express");
const cors = require("cors"); 
const connectDb = require("../../shared/config/db");
const authRoute = require("./routes/auth");
const app = express();

//json parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//cors middleware

app.use(  
  cors({
    origin: "http://localhost:4000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("4000", () => {
  console.log("Server is running at %d!",4000);
});

 //Load db
 connectDb()


  