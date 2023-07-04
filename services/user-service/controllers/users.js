const mongoose = require('mongoose')
const UserProfile = require('../UserProfile')
const stringSimilarity = require('string-similarity')

//Get User's Profile information
exports.getUserProfile = async(req,res)=>{
  const userId = req.user._Id
  await UserProfile.findById({userId})
  .then((Profile)=>{
    return res.status(200)
    .json({
      success:true,
      Profile:Profile
    })
  })
  .catch((err)=>{
    return res.status(500)
    .json({
      success:false,
      message:err.message
    })
  }) 
}
//Update User's Profile Information
exports.updateUserProfile = async(req,res)=>{
  const id = req.user._id;
  const updateObject = req.body;
  await UserProfile.updateOne({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Profile is updated',
        updatedProfile: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

exports.searchByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const users = await UserProfile.find();
    console.log(users)
    const matches = stringSimilarity.findBestMatch(email, users.map(user => user.email));
    console.log(matches)
    const matchedUsers = matches.ratings
      .filter(rating => rating.rating >= 0.5)
      .map(rating => users.find(user => user.email === rating.target));
    res.json(matchedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}