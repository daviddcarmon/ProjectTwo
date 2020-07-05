const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // if the user has valid login credentials, send them to index page, otherwise send them the err message
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.join(req.user);
  });

  // route for signing up a user. user's password is auto hashed and stored securely bc of how we configured our sequelize user model. if user created successfully, proceed to log the user in, otherwise send error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
  // route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  // route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // user is not logged in, send back empty obj
      res.json({});
    } else {
      // otherwise send back the user's email and id and username, dont send back a pw
      res.json({
        email: req.user.email,
        username: req.user.username,
        id: req.user.id,
      });
    }
  });
};
