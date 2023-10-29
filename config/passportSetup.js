const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const env = require("dotenv").config();
env();

passport.use(
   new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect'
   }, (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      new User({
         googleId: profile.id,
         username: profile.displayName
      }).save().then((newUser) => {
         console.log('new user created: ', newUser);
      });
   })
);