const router = require('express').Router()
const kafka = require('kafka-node');
const { getInvitations } = require('../controllers/invitation')
const { isAuth } = require('../../isAuthenticated')
const Invitation = require('../models/Invitation')

router.get('/',isAuth,getInvitations)

// Create Invitation (consumer)
const consumer = new kafka.ConsumerGroup({
  kafkaHost: 'localhost:9092',
  groupId: 'invitation-creation-group',
}, ['project-invite','conversation-invite']);

consumer.on('message', async function(message) {
  const { value, topic } = message;
  switch (topic) {
    case 'project-invite':
  const { projectId, usernames,senderUsername,link,projectTitle } = JSON.parse(value);
  try { 
    usernames.forEach(async username=>{
      const newInvitation = new Invitation({
        content:`${username} has invited you to ${projectTitle}`,
        username,
        senderUsername,
        link,
        projectId
      })
      console.log('Invitation sent to:', username);
      await newInvitation.save()
    })

    console.log('Project Invitation created:', projectId);
  } catch (err) {
    console.error('Error creating invitation :', err);
  }
  break
  case 'conversation-invite':
    const { convoId, targetUsernames,originUsername,convoLink} = JSON.parse(value);
    try { 
      targetUsernames.forEach(async username=>{
        const newInvitation = new Invitation({
          content:`${originUsername} has invited you to a Conversation Stream`,
          username,
          originUsername,
          link,
          convoId
        })
        console.log(' Conversation Invitation sent to:', username);
        await newInvitation.save()
      })
  
      console.log('Invitation created:', projectId);
    } catch (err) {
      console.error('Error creating invitation :', err);
    }
    break
  }
});

module.exports = router