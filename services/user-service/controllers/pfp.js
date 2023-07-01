const mongoose = require('mongoose')
const UserProfile = require('../UserProfile')
const path = require('path')
const multer = require('multer')

exports.uploadProfilePicture= async(req,res)=>{
  upload(req, res, err => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: err });
    } else {
      const userId = req.params.userId;
      const profilePicture = {
        fileName: req.file.filename,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        filePath: `/uploads/${req.file.filename}`,
        uploadDate: Date.now()
      };
      UserProfile.findByIdAndUpdate(userId, { profilePicture }, { new: true }, (err, user) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to update user' });
        } else {
          res.status(200).json({ user });
        }
      });
    }
  });
}