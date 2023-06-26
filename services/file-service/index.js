const express = require("express");
const app = express();
const PORT =  4040;
const mongoose = require("mongoose");
const File = require("./File");
const fileRoute = require('./routes/file')

// Set up GridFS storage for file uploads
const mongoURI = 'mongodb://127.0.0.1/file-service';
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// Set up multer storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Set up multer middleware for file upload
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images, PDF, DOC and DOCX only!');
    }
  }
}).single('myFile');


app.use(express.json());
app.use('/users',userRoute)

app.listen(PORT, () => {
    console.log(` User-Service at ${PORT}`);
}); 
