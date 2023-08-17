// start-all.js

const { spawn } = require('child_process');

const services = [
  {
    name: 'project-service',
    path: './project-service'
  },
  {
    name: 'task-service',
    path: './task-service'
  },
  {
    name: 'auth-service',
    path: './auth-service'
  },  {
    name: 'conversation-service',
    path: './conversation-service'
  },
  {
    name: 'user-service',
    path: './user-service'
  },
  {
    name: 'message-service',
    path: './message-service'
  },
  {
    name: 'team-service',
    path: './team-service'
  },
  {
    name: 'file-service',
    path: './file-service'
  },
  {
    name: 'notification-service',
    path: './notification-service'
  },
  {
    name: 'invitation-service',
    path: './invitation-service'
  },
  // add more services as needed
];

services.forEach(service => {
  const child = spawn('npm', ['run', 'devStart'], { cwd: service.path, shell: true });

  child.stdout.on('data', data => {
    console.log(`[${service.name}] ${data}`);
  });

  child.stderr.on('data', data => {
    console.error(`[${service.name}] ${data}`);
  });

  child.on('close', code => {
    console.log(`[${service.name}] exited with code ${code}`);
  });
});