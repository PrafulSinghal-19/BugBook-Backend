const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require("passport");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user[0]._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      User.find({ email: email }).then(async (val, err) => {
        if (val.length < 1) {
          const newUser = new User({ email: email, name: name });
          newUser.save().then((user) => done(null, user));
        } else {
          done(null, val);
        }
      });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_KEY,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      User.find({ email: email }).then(async (val, err) => {
        if (val.length < 1) {
          const newUser = new User({ email: email, name: name });
          newUser.save().then((user) => done(null, user));
        } else {
          done(null, val);
        }
      });
    }
  )
);
