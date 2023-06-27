const express = require("express");
const app = express();
const PORT =  4040;
const mongoose = require("mongoose");
const teamRoute = require('./routes/team')


 mongoose.connect(
    "mongodb://127.0.0.1/team-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.use(express.json());
app.use('/',teamRoute)

app.listen(PORT, () => {
    console.log(`Team-Service at ${PORT}`);
}); 