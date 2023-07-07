const mongoose = require('mongoose')
const Message = require('../models/Message')
const kafka = require('kafka-node')
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

// exports.getUserMessages = async (req,res)=>{
//   const userId = req.user.username;
//   try {
//     const receivedMessages = await Message.find({  senderUsername: { $ne: userId } } );
//     await Message.find({ senderUsername: { $ne: userId } },{$set:{seen:true}} )
//     res.status(200).json(receivedMessages );
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//   }
// }

exports.sendMessage = async (req, res) => {
  const conversationId = req.params.convoId;
  const senderUsername = req.user.username;
  const { message } = req.body;
  const newMessage = new Message({
    conversationId,
    senderUsername,
    message,
  });

  try {
    await newMessage.save();

    const payload = {
      topic: "message-sent",
      messages: JSON.stringify({
        messageUsername: req.user.username,
        message: newMessage.message,
        time: newMessage.sentAt,
        convoId: conversationId,
      }),
    };
    console.log({Payload:payload})

    producer.send([payload], function (err, data) {
      if (err) {
        res.status(400).json(err);
      } else {
        Message.updateOne({ _id: newMessage._id }, { $set: { sent: true } }).exec();
        res.status(200).json({ message: "Conversation message sent", data });
      }
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  const conversationId = req.params.convoId;
  const userId = req.user.username;
  try {
    const userMessages = await Message.find({ conversationId,  senderUsername: userId } );
    console.log(userMessages)
    const receivedMessages = await Message.find({ conversationId,   senderUsername: { $ne: userId } } );
    await Message.updateMany({ conversationId,   senderUsername: { $ne: userId } },{$set:{beenSeen:true}} )
    res.status(200).json({ Usermessages:userMessages,receivedMessages:receivedMessages });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
