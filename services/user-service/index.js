const express = require("express");
const app = express();
const PORT =  9000;
const mongoose = require("mongoose");
const UserProfile = require("./UserProfile");
const amqp = require("amqplib");
const userRoute = require('./routes/users')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// var channel, connection;



// function createProfile(lastname,firstname, userEmail) {
//     const newUser = new UserProfile({
//       firstname,
//       lastname,
//       userEmail
//     });
//     newUser.save();
//     return newUser;
// }

// async function connect() {
//     const amqpServer = "";
//     connection = await amqp.connect('amqp://localhost:5672');          
//     channel = await connection.createChannel();
//     await channel.assertQueue("ORDER");
//     channel.consume("PROFILE", (data) => {
//       console.log("Consuming USER service");
//       const { firstname,lastname, userEmail } = JSON.parse(data.content);
//       const newUser = createProfile(firstname,lastname, userEmail);
//       channel.ack(data);
//       channel.sendToQueue(
//         "AUTH",
//         Buffer.from(JSON.stringify({ newUser}))
//       );
//         });

// }
// connect()

const conn = mongoose.connect(
    "mongodb://127.0.0.1/user-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Set up multer storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  // Set up multer middleware for file upload
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images only!');
      }
    }
  }).single('profilePicture');

app.use(express.json());
app.use('/users',userRoute)

app.listen(PORT, () => {
    console.log(` User-Service at ${PORT}`);
}); 