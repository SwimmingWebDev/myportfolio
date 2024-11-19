const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

// Allowed Emails
const ALLOWED_EMAILS = ['swimmingwebdev@gmail.com'];

// Load keys
const keys = require('../config/keys');

// Passport setup
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value; // Get the user's email
      if (ALLOWED_EMAILS.includes(email)) {
        return done(null, profile); // Allow login
      } else {
        return done(null, false, { message: 'Unauthorized account' }); // Reject login
      }
    }
  )
);

// Login route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/unauthorized' }),
  (req, res) => {
    res.redirect('/'); //Redirect to index.html
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
