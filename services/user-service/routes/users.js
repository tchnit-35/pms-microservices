const router = require('express').Router()
const { isAuth } = require('../../isAuthenticated')
const { findUserProfile, updateUserProfile, getUserProfile, searchByEmail } = require('../controllers/users')
const { uploadProfilePicture } = require('../controllers/pfp')

router.get("/",isAuth,getUserProfile)
router.get("/search",isAuth,findUserProfile)
router.patch("/",isAuth,updateUserProfile)
router.post('/search',isAuth,searchByEmail)
router.post("/profile-picture",isAuth,uploadProfilePicture)


module.exports = router 