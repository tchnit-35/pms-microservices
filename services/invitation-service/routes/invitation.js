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
  const { projectId, usernames,senderUsername,link } = JSON.parse(message.value);
  try { 
    usernames.forEach(async username=>{
      const newInvitation = new Invitation({
        username,
        senderUsername,
        link,
        projectId
      })
      console.log('Invitation sent to:', username);
      await newInvitation.save()
    })

    console.log('Invitation created:', projectId);
  } catch (err) {
    console.error('Error creating invitation :', err);
  }
});

module.exports = router