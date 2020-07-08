$(document).ready(function () {
  $(function () {
    const queryURL = "http://hp-api.herokuapp.com/api/characters/";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      console.log(queryURL);
      console.log(res);
    });
  });
});
