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
  .then((newTeam)=>{
      return res.status(200).json(newTeam)  
  }).catch((err)=>{
      return res.status(500).json({message:err.message})
  })
}

  exports.addMembers = async(req,res)=>{
    const usersToAdd = req.body.users || []
    const teamId = req.params.teamId
    await Team.findById(teamId, (err, team) => {
      if (err) {
        console.error(err);
        // handle error
      } else {
        usersToAdd.forEach(userToAdd => {
          const newUser = {
            userId: userToAdd.userId,
            role: userToAdd.role._id
          };
          team.users.push(newUser);
        });
        team.save((err, savedTeam) => {
          if (err) {
            res.status(500).json({message:err.message});
            
          } else {
            res.status(200).json(savedTeam)
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
