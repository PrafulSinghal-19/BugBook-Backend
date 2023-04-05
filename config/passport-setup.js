const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LocalStratergy = require("passport-local");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user._id);
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
          done(null, val[0]);
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
          done(null, val[0]);
        }
      });
    }
  )
);

passport.use(
  "logIn",
  new LocalStratergy(async (username, password, done) => {
    User.find({ email: username }).then(async (val, err) => {
      if (val.length == 0) done(err, val);
      else {
        bcrypt.compare(password, val[0].password, (err, hash) => {
          if (hash) done(null, val[0]);
        });
      }
    });
  })
);

passport.use(
  "signIn",
  new LocalStratergy(async (username, password, done) => {
    console.log(username);
    User.find({ email: username }).then((val) => {
      console.log(val);
      done(null, val[0])
    });
  })
);
