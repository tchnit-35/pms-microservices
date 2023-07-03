const UserProject = require('./project-service/models/UserProject')
const Task = require('./task-service/models/Task')
const Team = require('./team-service/models/Team')
const kafka = require('kafka-node')

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);
producer.on('ready', () => {
  console.log('Kafka producer is ready');
});

producer.on('error', (err) => {
  console.error('Kafka producer error:', err);
});
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'isAdmin', partition: 0 }],
  { autoCommit: true }
);

function getProjectIdFromTaskId(taskId){
  Task.findById(taskId)
  .then((Task)=>{
    return Task.project.projectId
  })
}
function getProjectIdFromTeamId(teamId){
  Team.findById(teamId)
  .then((Team)=>{
    return Team.projectId
  })
}

async function retrieveUserProject(projectId){
        const message = {
          type: 'getUserProject',
          projectId,
          userId: req.user._id,
        };
        const payloads = [
          {
            topic: 'getUserProject',
            messages: JSON.stringify(message),
            partition: 0,
          },
        ];
        await producer.send(payloads, (err, data) => {
          if (err) {
            console.error('Kafka producer send error:', err);
          } else {
            console.log('Kafka producer send data:', data);
          }
        });

        // Listen for messages from the project service
        consumer.on('message', async (message) => {
          const data = JSON.parse(message.value);
          if (data.type === 'getUserProjectResponse' && data.userProject.projectId === projectId && data.userProject.user === req.user._id) {
            // Update the UserProject object in the local cache
            // ...

            // Respond to the client
            if (data.userProject.permission === 'admin') {
              next();
            } else {
              res.status(403).json({ message: 'Forbidden' });
            }
          }
        });
      }

exports.isAdmin = async (req,res,next)=>{
  const projectId = req.params.projectId || getProjectIdFromTaskId(req.params.taskId) || getProjectIdFromTeamId(req.params.teamId)
  retrieveUserProject(projectId)
}

exports.isLevel3 = async (req,res,next)=>{
  const projectId = req.params.projectId || getProjectIdFromTaskId(req.params.taskId) || getProjectIdFromTeamId(req.params.teamId)
  retrieveUserProject(projectId)
}

exports.isLevel2 = async (req,res,next)=>{
  const projectId = req.params.projectId || getProjectIdFromTaskId(req.params.taskId) || getProjectIdFromTeamId(req.params.teamId)
  retrieveUserProject(projectId)
}