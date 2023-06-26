const express = require('express')
const { isAuth } = require('../../auth-service/middlewares/auth')
const { updateUserProfile, getUserProfile } = require('../controllers/users')
const { uploadProfilePicture } = require('../controllers/pfp')
const router = express.Router()

router.get("/",isAuth,getUserProfile)
router.patch("/",isAuth,updateUserProfile)
router.post("/profile-picture",isAuth,uploadProfilePicture)