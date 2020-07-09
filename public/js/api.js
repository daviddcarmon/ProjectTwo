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
        let health = Math.random() * 51 + 50;
        let stat = Math.random() * 8 + 5;
        return {
          name: res.name,
          health: health.toFixed(0),
          stats: stat.toFixed(0),
        };
      });
      console.log(mapArray);

      // returns if exists all values(array of objects) for "Slytherin"
      let filterArray = res.filter((res) => {
        return (res.house = "Slytherin");
      });
      console.log(filterArray);
    });
  });
});
