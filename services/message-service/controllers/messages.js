const mongoose = require('mongoose')
const Message = require('../models/Message')
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

exports.sendMessage = async(req,res)=>{
  const conversationId = req.params.convoid
  const senderUsername = req.user.username
  const {message} = req.body
  const newMessage = new Message({
    conversationId,
    senderUsername,
    message
  })
  await newMessage.save()
  .then((msg)=>{
    const payload = {
      topic: 'project-create',
      messages: JSON.stringify(
        {
          topic:project.project_title,
          senderUsername:req.user.username,
        }
        ),
    };
    producer.send([payload], function(err, data) {
      if (err) {
       res.status(400).json(err)
      } else {
        res.status(200).json({message:'Conversation Message sent ',data})
      }
    });
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
  const conversationId = req.params.convoid
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
