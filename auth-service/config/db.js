const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://root:UEqUn0YNrED7tuOa@auth.syj0nix.mongodb.net/?retryWrites=true&w=majority'
const connectDb = async()=>{
  try {
      const conn = await mongoose.connect(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
      })
      console.log("Mongodb Connected: %s",conn.connection.host)
  }
  catch(err){
      console.log(err)
      process.exit(1)
  }
}

module.exports = connectDb