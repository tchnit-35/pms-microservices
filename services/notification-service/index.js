const express = require("express");
const cors = require("cors");
const app = express();

const PORT =  9091;
const mongoose = require("mongoose");
const { getNotifications, deleteNotification } = require("./notificationController");
const {isAuth} = require('../isAuthenticated')
require('./notificationController')

app.get('/notifications',isAuth,getNotifications)
app.delete('/notifications/:notifId',isAuth,deleteNotification)

 mongoose.connect(
    "mongodb://127.0.0.1/notification-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(  
  cors({
    origin: "http://localhost:3000",
    methods: "GET,DELETE",
    allowedHeaders: '*'
  })
);

app.listen(PORT, () => {
    console.log(`Notification-Service at ${PORT}`);
}); 