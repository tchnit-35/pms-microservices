const mongoose = require('mongoose')
const Conversation = require('../models/Conversation')
const UserConversation = require('../models/UserConversation')

exports.getUserConversations = async(req,res)=>{
  const user = req.user.username
  const conversations = []
  await UserConversation.find({username})
  .then((userConvos)=>{
    userConvos.forEach(async userConvo=>{
      await Conversation.findById({conversationId:userConvo.conversationId})
      .then((convo)=>{
        conversations.push(convo)
      })
    }
    )
   return res.status(200).json({message:conversations})
  })
}

exports.createConversation = async (req,res)=>{
const username = req.user.username
const newConvo = new Conversation({})
.save()
.then(async (convo)=>{
  const newUserConvo = new UserConversation({
    username:user,
    conversationId:convo._id
  })
  await newUserConvo.save()
  .then(()=>{
    return res.status(201).json({ message: 'Conversation created successfully.' });
  }).catch((err)=>{
    return res.status(400).json({message:err.message})
  })
})
}

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