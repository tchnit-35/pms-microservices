const mongoose = require('mongoose')
const Conversation = require('../models/Conversation')

exports.createConversation = async (req,res)=>{
const {secondUser} = req.body
const firstUser = req.user._id
const newConvo = new Conversation({
  firstUser,
  secondUser
}).save()

}