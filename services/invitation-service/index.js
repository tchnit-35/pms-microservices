const express = require("express");
const cors = require("cors");
const app = express();
const PORT =  9090;
const mongoose = require("mongoose");
const invitationRoute = require('./routes/invitation')

 mongoose.connect(
    "mongodb://127.0.0.1/invitation-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//cors middleware

app.use(  
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );
app.use('/invitations',invitationRoute)

app.listen(PORT, () => {
    console.log(`Invitation-Service at ${PORT}`);
});  