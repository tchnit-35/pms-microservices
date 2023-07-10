const router = require('express').Router()
const { isAuth } = require('../../isAuthenticated')
const { findUserProfile, updateUserProfile, getUserProfile, searchByEmail } = require('../controllers/users')
const { uploadProfilePicture } = require('../controllers/pfp')

router.get("/",isAuth,getUserProfile)
router.patch("/",isAuth,updateUserProfile)
router.get("/search",isAuth,findUserProfile)
router.get("/find",searchByEmail)
router.post("/profile-picture",isAuth,uploadProfilePicture)


module.exports = router 