const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// telling passport we want to use a local strategy
passport.use(
  new LocalStrategy(
    // our user will sign in using a username
    {
      usernameField: "username",
    },
    function (username, email, password, done) {
      // when a user tries to sign in this code runs
      db.User.findOne({
        where: {
          username: username,
        },
      }).then(function (dbUser) {
        // if there is no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username. Please try again!",
          });
        }
        // if there is a user with a given username, but the pw the user gives is incorrect, we run this code
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password. Please try again!",
          });
        }
        // if none of the above, allow the user entrrance to app
        // FOR NOW THIS JUST RETURNS THE USER INFO
        return done(null, dbUser);
      });
    }
  )
);

// in order to help keep aithentication state across http requests, sequelize needs to serialize and deserialize the user. boilerplate to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// export passport
module.exports = passport;
