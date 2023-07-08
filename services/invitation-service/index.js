const express = require("express");
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
app.use('/',invitationRoute)

app.listen(PORT, () => {
    console.log(`Invitation-Service at ${PORT}`);
});  