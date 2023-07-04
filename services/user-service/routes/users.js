const router = require('express').Router()
const { isAuth } = require('../../isAuthenticated')
const { updateUserProfile, getUserProfile, searchByEmail } = require('../controllers/users')
const { uploadProfilePicture } = require('../controllers/pfp')

router.get("/",isAuth,getUserProfile)
router.patch("/",isAuth,updateUserProfile)
router.post('/search',isAuth,searchByEmail)
router.post("/profile-picture",isAuth,uploadProfilePicture)


module.exports = router 