const mongoose = require('mongoose')
const Message = require('../models/Message')
const kafka = require('kafka-node')
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
      topic: 'message-sent',
      messages: JSON.stringify(
        {
          message:newMessage.message,
          sentAt:newMessage.sentAt,
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
exports.getMessages = async (req, res) => {
  const conversationId = req.params.convoid;
  const userId = req.user.username;
  try {
    const userMessages = await Message.find({ conversationId,  senderUsername: userId } );
    const receivedMessages = await Message.find({ conversationId,   senderUsername: { $ne: userId } } );
    res.status(200).json({ Usermessages:userMessages,receivedMessages:receivedMessages });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
