const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: '598790891477-dqg3duculfat4qa17slofbhm8sphavybe.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },

  async function(accessToken, refreshToken, profile, done) {
    try {
      // find a user
      const user = await User.findOne({ email: profile.emails[0].value });

      console.log(accessToken, refreshToken);
      console.log(profile);

      if (user) {
        // if found, set this user as req.user
        return done(null, user);
      } else {
        // if not found, create the user and set it as req.user
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        });
        return done(null, newUser);
      }
    } catch (err) {
      console.log('error in google strategy-passport', err);
      return done(err);
    }
  }
));


module.exports = passport;
