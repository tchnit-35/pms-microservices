const mongoose = require('mongoose')
const Conversation = require('../models/Conversation')
const UserConversation = require('../models/UserConversation')
const kafka = require('kafka-node')
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

async function getUsernames(convo,username){
  const allConvoUsers = (await UserConversation.find({conversationId:convo._id,username:{$ne:username}}))
  const names = ""
  allConvoUsers.forEach(user=>{
    names.concat(user.username)
  })
  return names
}
exports.getProjectConversation = async (req, res) => {
  const projectTitle = req.params.project_title;
  const projectMaster = req.user.username;

  try {
    const conversation = await Conversation.findOne({
      topic: projectTitle,
      createdBy: projectMaster,
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json({ conversation });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: err.message,
    });
  }
};
exports.getUserConversations = async (req, res) => {
  const username = req.user.username;
  const publicConversations = [];
  const privateConversations = [];

  try {
    const userConvos = await UserConversation.find({ username });
    for (const userConvo of userConvos) {
      const convo = await Conversation.findById(userConvo.conversationId);
      const topic = convo.topic || getUsernames(convo,req.user.username); 
      const conversation = [convo, topic];
      if (convo.type === "public" && convo.state === "active") {
        publicConversations.push(conversation);
      } else if ((convo.type === "private" && convo.state === "active") || (convo.type === "private" && convo.createdBy === req.user.username)) {
        privateConversations.push(conversation);
      }
    }
    res.status(200).json({ public: publicConversations, private: privateConversations });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: err.message,
    });
  }
};

exports.createConversation = async (req, res) => {
  const username = req.user.username;
  const {topic} = req.body;
  const newConvo = new Conversation({ topic, createdBy: username });
  try {
    const convo = await newConvo.save();
    const newUserConvo = new UserConversation({
      username: username,
      conversationId: convo._id,
    });
    await newUserConvo.save();
    return res.status(201).json({ message: "Conversation created successfully.", conversation: convo });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};  

exports.joinConversation = async (req,res)=>{
  const userToAdd = req.user.username
  const convoId = req.params.convoId

  const newUserConvo = new UserConversation({
          username:userToAdd,
          conversationId:convoId
        })
  await newUserConvo.save()
        .then(async ()=>{
            await Conversation.findById(convoId)
            .then((conversation)=>{
              conversation.updateOne({$set:{state:'active'}})
            })
          return res.status(200).json({message:`${userToAdd} Joined the conversation `})
        }).catch((err)=>{
          return res.status(500).json({message:err.message})
        })
  }

exports.leaveConversation = async (req,res)=>{
      const userLeaving = req.user.username || []
      const convoId = req.params.convoId
      const time = new Date(Date.now)
      
      await UserConversation.findOneAndRemove({username:userLeaving,conversationId:convoId})
      .then(()=>{
        return res.status(200).json({message:`${userLeaving} Left the conversation at ${time.getTime()}`})
      }).catch((err)=>{
        return res.status(500).json({message:err.message})
      })
      }

exports.inviteConversation = async (req,res)=>{
  const payload = {
    topic: 'conversation-invite',
    messages: JSON.stringify(
      { 
        projectId:req.params.convoId, 
        usernames:req.body.usernames,
        senderUsername:req.user.username,
        link:`http://localhost:3002/projects/${req.params.convoId}/join`
      }
      ),
  };
  producer.send([payload], function(err, data) {
    if (err) {
      console.error('Error sending message:', err);
    } else {
      console.log('Invitation sent:', data);
    }
  });
}