const Role = require('../models/Role')

exports.createRole = async(req,res)=>{
const {name,team_id}=req.body
  const newRole = new Role({
    name,
    team_id
  })
  await newRole.save()
  return res.status(200).json(newRole)
  }