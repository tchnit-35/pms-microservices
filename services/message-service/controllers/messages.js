const mongoose = require('mongoose')
const Message = require('../models/Message')

exports.sendMessage = async(req,res)=>{
  const conversationId = req.params.cid
  const senderId = req.user._id
  const {message} = req.body
  const newMessage = new Message({
    conversationId,
    senderId,
    message
  })
  .save()
  .then((msg)=>{
    res.status(200)
    .json({
      message:msg
    })
  })
  .catch((err)=>{
    res.status(401)
    .json({error:err.message})
  })
}
exports.getMessages = async(req,res)=>{
  const conversationId = req.params.cid
  await Message.find({conversationId})
  .then((msg)=>{
    res.status(200)
    .json({
      message:msg
    })
  })
  .catch((err)=>{
    res.status(401)
    .json({error:err.message})
  })
}
