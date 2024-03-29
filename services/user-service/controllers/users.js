/** @format */

const mongoose = require('mongoose');
const UserProfile = require('../UserProfile');
const stringSimilarity = require('string-similarity');

//Get User's Profile information
exports.getUserProfile = async (req, res) => {
  const userId = req.user._id;
  await UserProfile.findOne({ userId })
    .then((Profile) => {
      return res.status(200).json(Profile);
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
//Find User's Profile information
exports.findUserProfile = async (req, res) => {
  const userId = req.query.userId;
  await UserProfile.findOne({ userId })
    .then((Profile) => {
      return res.status(200).json(Profile);
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
//Update User's Profile Information
exports.updateUserProfile = async (req, res) => {
  const id = req.user._id;
  const updateObject = req.body;
  await UserProfile.updateOne({ _id: id }, { $set: updateObject })
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
        message: 'Server error. Please try again.',
      });
    });
};

exports.searchByEmail = async (req, res) => {
  const email = req.query.email;
  try {
    const users = await UserProfile.find();
    const matches = stringSimilarity.findBestMatch(
      email,
      users.map((user) => user.email)
    );
    const matchedUsers = matches.ratings
      .filter((rating) => rating.rating >= 0.5)
      .map((rating) => users.find((user) => user.email === rating.target));

    res.status(200).json(matchedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
