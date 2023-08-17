const Notification = require('./Notification')
const kafka = require('kafka-node')
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'project-create', partitions: 2 , replicationFactor: 1  },{ topic: 'project-deletion', partitions: 2 , replicationFactor: 1},{ topic: 'project-update', partitions: 2, replicationFactor: 1 },{ topic: 'join-project', partitions: 2 , replicationFactor: 1}],
  { autoCommit: true }
);

consumer.on('message', async function(message) {
  const { value, topic } = message;
  switch (topic) {
    case 'project-create':
      const {topic , username} = JSON.parse(value); 
      try {
        const newNotification = new Notification({
          content:`You Successfully created Project: ${topic}`,
          username
        })
       await newNotification.save()

      } catch (err) {
        console.error('Error creating conversation :', err);
      }
      break;
    case 'project-deletion':
      const { project_title, createdBy, projectId } = JSON.parse(value);
      try {
        const newNotification = new Notification({
          content:`You Successfully deleted Project: ${project_title}`,
          username:createdBy,
          target:projectId
        })
       await newNotification.save()

      } catch (err) {
        console.error('Error creating conversation :', err);
      }
      break;
    case 'project-update':
      const { oldTopic, creator , newTopic,updateTarget} = JSON.parse(value);
      try {
        if (newTopic!=oldTopic){
        const newNotification = new Notification({
          content:`Project ${oldTopic} changed to ${newTopic}`,
          username:creator,
          target:updateTarget
        })
       await newNotification.save()
      }
      } catch (err) {
        console.error('Error creating conversation :', err);
      }
      break;
    case 'join-project':
      const {joinTopic , joinUsername, joinCreatedBy, joinTarget} = JSON.parse(value)
      try {
        const newNotification = new Notification({
          content:`${joinUsername} Project: ${joinTopic}`,
          username:joinCreatedBy,
          target:joinTarget
        })
       await newNotification.save()

      } catch (err) {
        console.error('Error creating conversation :', err);
      }
      break

  }
});
consumer.on('error', function (err) {
  console.error('Error while consuming messages:', err);
});

exports.getNotifications = async(req,res)=>{
  await Notification.find({username:req.user.username})
  .then((notif)=>{
    return console.log(notif)
  })
  .catch((err)=>{
    console.error(err)
  })
}
exports.deleteNotification = async(req,res)=>{
  await Notification.findByIdAndRemove(req.params.notifId)
  .then((notif)=>{
    return res.status(200).json(notif)
  })
  .catch((err)=>{
    console.error(err)
  })
}





 