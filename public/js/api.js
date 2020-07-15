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
        let health = 100;
        let stat = Math.floor(Math.random() * 25) + 5;
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
        // let characters;

        // for (characters of mapArray) {
        //   console.log({ characters });
        //   let card = $("<div>").attr({ class: "card", id: characters.name });
        //   let img = $("<img>").attr("src", characters.image);
        //   let nameTxt = characters.name;
        //   let name = $("<div>").text(nameTxt);
        //   let statsTxt = characters.stats;
        //   let stats = $("div").text(statsTxt);

        //   $(".img").append(card);
        //   card.append(img, name, stats);
        // }


        let button = $("<button>")
        .attr({ class: "btn", id: "test" })
        .text("button");
      $(".test").append(button);

      $(button).on("click", (event) => {
        event.preventDefault();

        let playBtn = $("<button>")
          .attr({ class: "btn", id: "play" })
          .text("Play button");
        // clearing location where random character card is returned
        $(".img").empty();
        $(".play").empty();
        $(".play").append(playBtn);
        let playerOne = () => {
          let index = Math.floor(Math.random() * 25);
          let nameTxt = `Name: ${mapArray[index].name}`;
          let name = $("<div>").text(nameTxt);
          let attackTxt = `Attack Power: ${mapArray[index].attacks}`;
          let attacks = $("<div>").text(attackTxt);
          let healthTxt = `Health: ${mapArray[index].health}`;
          let health = $("<div>").text(healthTxt);
          let img = $("<img>").attr("src", mapArray[index].image);
          let card = $("<div>").attr({
            class: "card col-md-4",
            id: mapArray[index].name,
          });

          card.append(img, name, health, attacks);
          $(".img").append(card);
        };
        playerOne();
        let playerTwo = () => {
          let index = Math.floor(Math.random() * 25);
          let nameTxt = `Name: ${mapArray[index].name}`;
          let name = $("<div>").text(nameTxt);
          let attackTxt = `Attack Power: ${mapArray[index].attacks}`;
          let attacks = $("<div>").text(attackTxt);
          let healthTxt = `Health: ${mapArray[index].health}`;
          let health = $("<div>").text(healthTxt);
          let img = $("<img>").attr("src", mapArray[index].image);
          let card = $("<div>").attr({
            class: "card col-md-4",
            id: mapArray[index].name,
          });

          card.append(img, name, health, attacks);
          $(".img").append(card);
        };
        playerTwo();
      });

      let newHealth = (p1, p2) => {
        p1.health - p2.attack;
      };

      $("#play").on("click", () => {
        console.log("playBtn clicked!");
        let healthUpdate = newHealth(playerOne, playerTwo);
        $("").append(healthUpdate);
        console.log(newHealth);
      });

      });
    });
  });
});
