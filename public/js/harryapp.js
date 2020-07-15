$(document).ready(function () {
  // this file does a get request to figure out which user is logged into the app and updates the html on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    // $(".username-name").text(data.username);
  });

  // select target html elements
  // create the html elements with handlebars (????)
});
