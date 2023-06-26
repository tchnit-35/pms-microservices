require('mongoose')
const User = require('../models/User')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
// require('dotenv').config( {path: '../config/config.env'} )

const GOOGLE_CLIENT_ID ="1002194065885-3dnilvd57vs7epeopeeurj9rdonjgm8t.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "69ca4789fd3a6143a589";
GITHUB_CLIENT_SECRET = "bb89310f45112c5b1e22051d84556a68c87fadab";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      
    },
    async (accessToken, refreshToken, profile, done)=> {
        const newUser = new User({
          _id:profile.id,
          firstname:profile.name.givenName,
          lastname:profile.name.familyName,
          image: profile.photos[0].value,
          email:profile.emails,
        })
        try{
          let user = await User.findOne({_id:profile.id})
          if(user){
            done(null,user)
          }else{
            user = await User.create(newUser)
            done(null,user)
          }
        }
        catch(err){
            console.log(err)
        }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});