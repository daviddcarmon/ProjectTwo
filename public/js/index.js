$(document).ready(function () {
  // this file does a get request to figure out which user is logged into the app and updates the html on the page
  $.get("/api/user_data").then(function (data) {
    $(".username-name").text(data.username);
  });
});
