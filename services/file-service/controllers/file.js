const File = require("../File");
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs')
const mongoose = require('mongoose');


exports.downloadFile = async (req, res) => {
  const fileId = req.params.id;
  File.findById(fileId, (err, file) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to find file' });
    } else {
      const filePath = file.filePath;
      const fileName = file.name;
      res.download(filePath, fileName, err => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to download file' });
        }
      });
    }
  });
}

exports.uploadFile = async(req, res) => {
  upload(req, res, err => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: err });
    } else {
      const file = new File({
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        Author: req.user.username,
        description: req.body.description,
        filePath: req.file.path,
        access:req.body.access,
        projectId:req.params.projectId,
        userId:req.user._id
      });
      file.save((err, savedFile) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to save file' });
        } else {
          res.status(200).json({ file: savedFile });
        }
      });
    }
  });
}

exports.deleteFile = async(req, res) => {
  const fileId = req.params.id;
  File.findByIdAndDelete(fileId, (err, file) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete file' });
    } else {
      fs.unlink(file.filePath, err => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to delete file' });
        } else {
          res.status(200).json({ success: true });
        }
      });
    }
  });
}

exports.getFiles = async(req,res)=>{

}

exports.getFileMetadata = async(req,res)=>{
  const fileId = req.params.fileId
  await File.findById(fileId)
  .then((File)=>{
    return res.status(200)
    .json({
      success:true,
      Metadata:{
        fileName:File.fileName+"."+File.fileType,
        fileSize:File.fileSize,
        fileDescription:File.description,
        uploadDate:File.uploadDate,
        Author:File.Author
      }
    })
  })
}


