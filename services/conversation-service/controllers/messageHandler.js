const kafka = require('kafka-node')
const Conversation = require("../models/Conversation")
const UserConversation = require("../models/UserConversation")
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'project-create', partitions: 2 , replicationFactor: 1  },{ topic: 'project-deletion', partitions: 2 , replicationFactor: 1},{ topic: 'project-update', partitions: 2, replicationFactor: 1 },{ topic: 'join-project', partitions: 2 , replicationFactor: 1},{ topic: 'message-sent', partitions: 2 , replicationFactor: 1}],
  { autoCommit: true }
);

consumer.on('message', async function(message) {
  const { value, topic } = message;
  switch (topic) {
    case 'project-create':
      const { topic , username} = JSON.parse(value); 
      try {
        const newConversation = new Conversation({
          createdBy:username,
          topic,
          type:'public',
          state:'active'
        })
        await newConversation.save()
        const newUserConversation = new UserConversation({
          username,
          conversationId:newConversation._id
        })
        await newUserConversation.save()
        console.log('Conversation created:', newConversation);
      } catch (err) {
        console.error('Error creating conversation :', err);
      }
      break;
    case 'project-deletion':
      const { project_title, createdBy } = JSON.parse(value);
      const conversation = await Conversation.findOne({ topic: project_title, createdBy });
      if (conversation) {
        const conversationId = conversation._id;
        await Conversation.findOneAndRemove({ topic: project_title, createdBy })
          .then(async () => {
            await UserConversation.deleteMany({ conversationId: conversationId })
              .then(() => {
                console.log({ message: `Conversation deleted` });
              })
              .catch((err) => {
                console.log({ message: err.message });
              });
          });
      } else {
        console.log('No conversation found');
      }
      break;
    case 'project-update':
      const { oldTopic, creator , newTopic} = JSON.parse(value);
      console.log({ oldTopic, creator , newTopic})
      const conversation2 = Conversation.findOne({ topic:oldTopic,createdBy:creator })
      if(conversation2){
        await Conversation.updateOne({ topic:oldTopic,createdBy:creator }, { $set:{
            topic:newTopic,
            createdBy:creator
          } }).exec()
          .then(() => {
                console.log({ message: `Conversation updated` });
              })
          .catch((err) => {
                console.log({ message: err.message });
              });
      }else{
        console.log({ message: `no conversation found` });
      }
      break;
    case 'join-project':
      const {joinTopic , joinUsername, joinCreatedBy} = JSON.parse(value)
      const joinConversation  = await Conversation.findOne({topic:joinTopic,createdBy:joinCreatedBy})
      const newJoinUserConversation = new UserConversation({
        username:joinUsername,
        conversationId:joinConversation._id
      })
      await newJoinUserConversation.save()          
        .then(() => {
          console.log({ message: `Conversation updated` });
        })
        .catch((err) => {
          console.log({ message: err.message });
        });
      break
      case 'message-sent':
        const {messageUsername,message,time,convoId} = JSON.parse(value)
        console.log({messageUsername,message,time,convoId})
        await Conversation.findOneAndUpdate(
          {_id:convoId},
          {$set:{lastMessage:{
            username:messageUsername,
            message,time
          }}},
          {new: true}
        ).exec()
        .then((conversation) => {
          console.log('Conversation updated:', conversation);
        })
        .catch((err) => {
          console.log({ message: err.message });
        });
        break;
  }
});
consumer.on('error', function (err) {
  console.error('Error while consuming messages:', err);
});
// //Updating Last message sent in the conversation
// messageConsumer.on('message', async function(message) {
 
// });



 