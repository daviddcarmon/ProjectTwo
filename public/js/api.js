$(document).ready(function () {
  $(function () {
    const queryURL = "http://hp-api.herokuapp.com/api/characters";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      console.log(res);

      function selectedCharacter() {
        $(this).val();
      }

      $(".charList").on("click", function (e) {
        e.preventDefault();
        let selectedChar = $(this).val();
        console.log(selectedChar);
      });

      // returns names only

      let mapArray = res.map((res) => {
        let health = 100;
        let attack = Math.floor(Math.random() * 25) + 5;
        return {
          name: res.name,
          health: health.toFixed(0),
          attack: attack.toFixed(0),
          image: res.image,
        };
      });

      let displayCharacter = (player) => {
        let nameTxt = `Name: ${player.name}`;
        let name = $("<div>").text(nameTxt);
        let attackTxt = `Attack Power: ${player.attack}`;
        let attack = $("<div>").text(attackTxt);
        let healthTxt = `Health: ${player.health}`;
        let health = $("<div>").text(healthTxt).attr({ class: "p1Health" });
        let img = $("<img>").attr("src", player.image);
        let card = $("<div>").attr({
          class: "card col-md-4",
          id: player.name,
        });

        card.append(img, name, health, attack);
        $(".img").append(card);
        return player;
      };

      $.each(mapArray, function (val, text) {
        // console.log({ val, text });
        $(".charList").append(
          $("<option></option>").text(text.name).attr({
            class: "dropdown-item btn",
            href: this.name,
            onchange: "selectedCharacter()",
          })
        );
      });

      // returns if exists all values(array of objects) for "Slytherin"
      let filterArray = res.filter((res) => {
        return res.house;
      });

      /// dummy button and display code
      let button = $("<button>")
        .attr({ class: "btn", id: "test" })
        .text("Randomize");
      $(".test").append(button);

      $(button).on("click", (event) => {
        event.preventDefault();
        // getUserChar()

        let index = Math.floor(Math.random() * 25);
        let index2 = Math.floor(Math.random() * Math.random() * 25);
        let playerOneChar = mapArray[index];
        let playerTwoChar = mapArray[index2];

        let playBtn = $("<button>")
          .attr({ class: "btn", id: "play" })
          .text("Play button");
        // clearing location where random character card is returned
        $(".img").empty();
        $(".play").empty();
        $(".play").append(playBtn);

        // needs to come from database
        function getUserChar() {
          $.get("/api/user/:id", function (data) {
            $(".userChar").val(data.name);
            $(".userHealth").val(data.health);
            $(".userAttack").val(data.attack);
          });
        }

        displayCharacter(playerOneChar);

        displayCharacter(playerTwoChar);

        // let playerTwo = () => {
        //   let nameTxt = `Name: ${playerTwoChar.name}`;
        //   let name = $("<div>").text(nameTxt);
        //   let attackTxt = `Attack Power: ${playerTwoChar.attacks}`;
        //   let attacks = $("<div>").text(attackTxt);
        //   let healthTxt = `Health: ${playerTwoChar.health}`;
        //   let health = $("<div>").text(healthTxt);
        //   let img = $("<img>").attr("src", playerTwoChar.image);
        //   let card = $("<div>").attr({
        //     class: "card col-md-4",
        //     id: playerTwoChar.name,
        //   });

        //   card.append(img, name, health, attacks);
        //   $(".img").append(card);
        //   return playerTwoChar;
        // };
        // playerTwo();

        let playBtnStart = () => {
          $("#play").on("click", () => {
            // console.log(typeof playerOneChar.health);
            let healthInt = parseInt(playerOneChar.health);
            let attackInt = playerTwoChar.attack;
            // console.log(typeof playerTwoChar.attack);
            playerOneChar.health = parseInt(healthInt - attackInt);

            if (playerOneChar.health <= 0) {
              let winnerText = $("div>").text("WINNER!");
              $(".img").append(winnerText);
            } else {
              $(".p1Health").empty();
              $(".p1Health").append(playerOneChar.health);
            }
          });
        };
        playBtnStart();
      });
    });
  });
});
