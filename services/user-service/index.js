const express = require("express");
const app = express();
const PORT =  9000;
const mongoose = require("mongoose");
const userRoute = require('./routes/users')
const multer = require('multer');
const kafka = require('kafka-node') 
const UserProfile = require('./UserProfile');
const cors = require('cors') 
 
app.use(  
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);  
 
const consumer = new kafka.ConsumerGroup({
  kafkaHost: 'localhost:9092',
  groupId: 'user-profile-creation-group',
}, 'user-creation');

consumer.on('message', async function(message) {
  const { userId, username, email, firstname, lastname} = JSON.parse(message.value);
  try {
    const userProfile = await UserProfile.create({ userId, username, email, firstname, lastname });
    console.log('User profile created:', userProfile);
  } catch (err) { 
    console.error('Error creating user profile:', err);  
  }
});

 mongoose.connect(
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
app.use('/user',userRoute)

app.listen(PORT, () => {
    console.log(`User-Service at ${PORT}`);
}); 