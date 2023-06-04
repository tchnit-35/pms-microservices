const express = require("express")
const { isAuth } = require('../../middlewares/auth');
const User= require("../models/User");
const router = express.Router()
//Display User Info
router.get("/settings/profile",isAuth,async (req,res)=>{
  await User.findById(req.user._id, function(err,user){
    if (!user) {
      return  req.flash('error', 'No account found');
    }
    return res.json(req.user)
  })
})

//Update User Info

router.post('/settings/editProfile', isAuth, async (req, res)=>{

  await User.findById(req.user._id, function (err, user) {
      if (!user) {
          req.flash('error', 'No account found');
          return res.redirect('/edit');
      }
      const {email,firstname,lastname} = req.body.trim()

      // validate 
      if (!email || !firstname || !lastname) { // simplified: '' is a falsey
          req.flash('error', 'One or more fields are empty');
          return res.redirect('/edit'); // modified
      }

      // no need for else since you are returning early ^
      user.email = email;
      user.first_name = firstname;
      user.last_name = lastname;
 
      // don't forget to save!
      user.save(function (err) {

          // todo: don't forget to handle err

          res.redirect('settings/profile');
      });
  });
});


module.exports = router