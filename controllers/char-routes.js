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
    db.Character.findAll({}).then(function (dbCharacter) {
      res.json(dbCharacter);
    });
  });

  // add a new character
  app.post("/char/character/", function (req, res) {
    console.log(req.name);
    db.Character.create({
      name: req.body.name,
    }).then(function (dbCharacter) {
      res.json(dbCharacter);
    });
  });

  //Delete Character
  app.delete("/char/character/:id", function (req, res) {
    db.Character.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbCharacter) {
      res.json(dbCharacter);
    });
  });
};
