const mongoose = require('mongoose')
const Team = require('../models/Team')

exports.createTeam = async(req,res)=>{
  const projectId = req.params.projectId
  const users = req.body.users || []
  const name = req.body.name
  const newTeam = new Team({
    name,
    projectId,
    users
  })
  await newTeam.save()
  return res.status(200).send(newTeam)
  }

  exports.addMembers = async(req,res)=>{
    const userToAdd = req.body.users || []
    const teamId = req.params.teamId
    await Team.findById(teamId, (err, team) => {
      if (err) {
        console.error(err);
        // handle error
      } else {
        usersToAdd.forEach(userToAdd => {
          const newUser = {
            userId: userToAdd.userId,
            role: userToAdd.roleId
          };
          team.users.push(newUser);
        });
        team.save((err, savedTeam) => {
          if (err) {
            console.error(err);
            // handle error
          } else {
            // users added to team successfully
          }
        });
      }
    });
  }

  exports.removeMembers = async(req,res)=>{
    const userId = req.body
    const teamId = req.params.teamId
    await Team.findById(teamId, (err, team) => {
      if (err) {
        console.error(err);
        // handle error
      } else {
        const index = team.users.findIndex(user => user.userId.toString() === userId);
        if (index !== -1) {
          team.users.splice(index, 1);
          team.save((err, savedTeam) => {
            if (err) {
              console.error(err);
              // handle error
            } else {
              res.status(200).json({message:'User Removed'})
            }
          });
        } else {
          res.status(401).json({message:'User not Found'})
        }
      }
    });
  }
