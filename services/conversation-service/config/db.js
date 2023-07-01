const mongoose = require('mongoose')
const mongodb = require('mongodb')
const MONGO_URI = 'mongodb://127.0.0.1/conversation-service'
const connectDb = async()=>{
  try {
      const conn = await mongoose.connect(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
      })
      console.log("Mongodb Connected") 
  }
  catch(err){
      console.log(err)
      process.exit(1)
  }
}

module.exports = connectDb