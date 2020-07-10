$(document).ready(function () {
  $(function () {
    const queryURL = "http://hp-api.herokuapp.com/api/characters/";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      console.log(res);
      // returns names only
      let mapArray = res.map((res) => {
        return res.name;
      });
      console.log(mapArray);

// this is my comment 
      // returns if exists all values(array of objects) for "Slytherin"
      let filterArray = res.filter((res) => {
        return (res.house = "Slytherin");
      });
      console.log(filterArray);
    });
  });
});
