const Invitation = require('../models/Invitation')


exports.refuseInvitation = async (req,res)=>{
  await Invitation.findOneAndRemove({username:req.user.username})
  .then(()=>{
    return res.status(200).json({message:'Invitation Refused'})
  })
  .catch((err)=>{
    return res.status(500).json(err)
  })

}

exports.getInvitations = async (req,res)=>{
  await Invitation.find({username:req.user.username})
  .then((invite)=>{
    return res.status(200).json(invite)
  })
  .catch((err)=>{
    return res.status(500).json(err)
  })
}