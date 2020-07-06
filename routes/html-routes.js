// redirecting path so we can use relative routes to our html files
const path = require("path");

// require our custom middleware for checking if user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // if user already has account, send them to harryapp page
    if (req.user) {
      res.redirect("/harryapp");
    }
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  app.get("/login", (req, res) => {
    // if user already has account send them to harryapp page
    if (req.user) {
      res.redirect("/harryapp");
    }
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  // add middleware to route. if user tries to access this route without a login they will be directed to the signup page
  app.get("/index", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/harryapp.html"));
  });
};
