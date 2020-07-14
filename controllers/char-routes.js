const db = require("../models/character.js");

// Character ROUTES

// api - will GET users
// login - will GET users after they login
// signup - will POST users after they create an account

module.exports = function (app) {
  //route for character dropdown list
  //   app.get("/signup", function (req, res) {
  //     res.sendFile(path.join(__dirname, "../public/signup.html"));
  //   });
  //GET route for displaying all characters
  app.get("/char/character/", function (req, res) {
    db.POST.findAll({}).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  //GET route for
};
