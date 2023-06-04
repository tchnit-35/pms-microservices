const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require("mongoose");
const { isAuth } = require('../../middlewares/auth');
const CLIENT_URL = "/";

//Login Success Status Route
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

//Login Failure Status Route

router.get("/login/failed", (req, res) => {  
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

//Logout

router.get("/logout", isAuth, async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Authorization fail!' });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: 'Sign out successfully!' });
    res.redirect('/'); 
  }
});

//Google Auth

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),(req,res)=>{
    res.redirect('/')
  }
);

//Github Auth

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//FaceBook Auth

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//Registering User

router.post("/register", async (req, res) => {
  const { email, password, firstname,lastname } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
      return res.json({ message: "User already exists" });
  } else {
      const newUser = new User({
          email:email,
          firstname:firstname,
          lastname:lastname,
          acc_password:password,
      });
      newUser.save(); 
      return res.json(newUser);
      
      
  }
});

//Login User

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
      return res.json({ message: "User doesn't exist" });
  } else {
      if (password !== user.acc_password) {
          return res.json({ message: "Password Incorrect" });
      }
      const token = jwt.sign({ userId: user._id }, "secret", {
        expiresIn: '1d',
      });
    
      let oldTokens = user.tokens || [];

      if (oldTokens.length) {
        oldTokens = oldTokens.filter(t => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        }); 
        
      }
      await User.findByIdAndUpdate(user._id, {
        tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
      });

      res.json({user,token})
      res.writeHead(302, {
        Location: 'http://localhost:4000/workspace/'+user._id+'/dashboard'
    });  
    res.end();
    
  }
});

module.exports = router