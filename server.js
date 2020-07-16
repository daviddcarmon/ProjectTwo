const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// set up port and require models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// create express app and config middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// need to use sessions to keep track of user login status
// WHAT IS SECRET HERE??
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require routes
require("./controllers/api-routes.js")(app);
require("./controllers/char-routes.js")(app);

// sync our db and log messge to user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("Listening on port: ", PORT);
  });
});
