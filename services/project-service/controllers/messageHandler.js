// const kafka = require('kafka-node');
// const UserProject = require('../models/UserProject')

// // Set up Kafka producer and consumer


// const producer = new kafka.Producer(client);
// const consumer = new kafka.Consumer(
//   client,
//   [{ topic: 'getUserProject', partition: 0 }],
//   { autoCommit: true }
// );

// producer.on('ready', () => { 
//   console.log('Kafka producer is ready');
// });

// producer.on('error', (err) => {
//   console.error('Kafka producer error:', err);
// });

// exports.updateUserProject = async (projectId, userId, permission) => {

//   // Retrieve the updated UserProject object
//   const userProject = await UserProject.findOne({ projectId, user: userId });

//   // Send the updated UserProject object to the 'isAdmin' topic
//   const payload = [
//     {
//       topic: 'isAdmin',
//       messages: JSON.stringify({ type: 'updateUserProject', userProject }),
//     },
//   ];
//   await producer.send(payload, (err, data) => {
//     if (err) {
//       console.error('Kafka producer send error:', err);
//     } else {
//       console.log('Kafka producer send data:', data);
//     }
//   });
// };

// exports.getUserProject = async (projectId, userId) => {
//   // Send a message to the 'isAdmin' topic requesting the UserProject object
//   const payload = [
//     {
//       topic: 'isAdmin',
//       messages: JSON.stringify({ type: 'getUserProject', projectId, userId }),
//     },
//   ];
//   await producer.send(payload, (err, data) => {
//     if (err) {
//       console.error('Kafka producer send error:', err);
//     } else {
//       console.log('Kafka producer send data:', data);
//     }
//   });

//   // Listen for the UserProject object from the 'isAdmin' topic
//   return new Promise((resolve, reject) => {
//     consumer.on('message', (message) => {
//       const data = JSON.parse(message.value);
//       if (data.type === 'getUserProject' && data.userProject.projectId === projectId && data.userProject.user === userId) {
//         resolve(data.userProject);
//       }
//     });
//   });
// };