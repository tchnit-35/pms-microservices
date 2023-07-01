const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const User = require('../User');
const mongoose = require("mongoose");
const { isAuth,isGuest } = require('../../isAuthenticated');
const CLIENT_URL = "/";
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

//Registering User

router.post("/register",isGuest,async (req, res) => {
  const { email, password, firstname,lastname } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return res.status(400).json({message:'Incorrect email format'})
  const username = `@${firstname.slice(0,4)}${lastname.slice(0,4)}${Math.floor(Math.random()*10000)}`
  const userExists = await User.findOne({ email });
  if (userExists) {
      return res.json({ message: "User already exists" });
  } else {
      const newUser = new User({
          email:email,
          firstname:firstname,
          lastname:lastname,
          acc_password:password,
          username:username  
      });
      await newUser.save(); 
const userRegisteredEvent = {
   userId:newUser._id, 
   username,
   email,
   firstname,
   lastname,
};

const payloads = [
  { topic: 'user-creation', messages: JSON.stringify(userRegisteredEvent) }
];

producer.send(payloads, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User registered event published');
  }
});
 
      return res.json(newUser);
      
  }
});

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



//Login User

router.post("/login",isGuest, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
      return res.json({ message: "User doesn't exist" });
  } else {
      if (password !== user.acc_password) {
          return res.json({ message: "Password Incorrect" });
      }
      const payload = { 
        _id: user._id,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname,
        username:user.username ,
        tokens:user.tokens,
      };
    const token=jwt.sign(payload, "secret",{expiresIn: '1d'});    
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
      res.end();
    
  }
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
  }
});

module.exports = router