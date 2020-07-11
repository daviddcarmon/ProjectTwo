$(document).ready(function () {
  $(function () {
    const queryURL = "http://hp-api.herokuapp.com/api/characters";

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
      // console.log(mapArray);

      // returns if exists all values(array of objects) for "Slytherin"
      let filterArray = res.filter((res) => {
        return res.house;
      });
      console.log(filterArray);

      /// dummy button and display code
      let button = $("<button>")
        .attr({ class: "btn", id: "test" })
        .text("button");
      $(".test").append(button);

      $(button).on("click", (event) => {
        event.preventDefault();
        let characters;

        for (characters of mapArray) {
          console.log({ characters });
          let card = $("<div>").attr({ class: "card", id: characters.name });
          let img = $("<img>").attr("src", characters.image);
          let nameTxt = characters.name;
          let name = $("<div>").text(nameTxt);
          let statsTxt = characters.stats;
          let stats = $("div").text(statsTxt);

          $(".img").append(card);
          card.append(img, name, stats);
        }

        // DONT THINK THIS IS NEEDED
        // filterArray.forEach((image) => {
        //   $(".img").append(img.attr("src", filterArray.image));
        // });
      });
    });
  });
});
