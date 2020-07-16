$(document).ready(function () {
  $(function () {
    const queryURL = "http://hp-api.herokuapp.com/api/characters";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      console.log(res);
      // let res = res;

      function selectedCharacter() {
        $(this).val();
        $(this).attr("id");
      }
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
        let health = $("<div>").text(healthTxt).attr({ class: "randomHealth" });
        let img = $("<img>").attr("src", player.image);
        let card = $("<div>").attr({
          class: "card col-md-4",
          id: player.name,
        });

        card.append(img, name, health, attack);
        $(".randChar").append(card);
      };

      let index = Math.floor(Math.random() * 25);
      let index2 = Math.floor(Math.random() * Math.random() * 25);
      let randomChar = mapArray[index];
      let playerTwoChar = mapArray[index2];

      let playBtnStart = () => {
        $("#play").on("click", () => {
          // console.log(typeof randomChar.health);
          let healthInt = parseInt(randomChar.health);
          let attackInt = playerTwoChar.attack;
          // console.log(typeof playerTwoChar.attack);
          randomChar.health = parseInt(healthInt - attackInt);

          if (randomChar.health <= 0) {
            let winnerText = $("div>").text("WINNER!");
            $(".winner").append(winnerText);
          } else {
            $(".randomHealth").empty();
            $(".randomHealth").append(randomChar.health);
          }
        });
      };

      let playBtn = $("<button>")
        .attr({ class: "btn", id: "play" })
        .text("Play button");

      // selected character to play
      $(".charList").on("click", function (e) {
        e.preventDefault();
        $(".randChar").empty();
        $(".play").empty();
        $(".play").append(playBtn);
        let selectedChar = $(this).val();
        let selectImg = $(this).attr("class");
        console.log(selectImg);
        let objChar = {
          name: selectedChar,
          health: 100,
          attack: Math.floor(Math.random() * 25) + 5,
          image: res.image,
        };
        if (objChar.name === "") {
          return;
        } else {
          console.log(objChar);

          displayCharacter(objChar);
          playBtnStart();
        }
      });

      $.each(mapArray, function (val, text) {
        console.log(typeof text.image);
        $(".charList").append(
          $("<option></option>").text(text.name).attr({
            class: "listItem btn",
            id: this.image,
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
      $(".ranBtn").append(button);

      $(button).on("click", (event) => {
        event.preventDefault();
        // getUserChar()

        // clearing location where random character card is returned
        $(".randChar").empty();
        $(".play").empty();
        $(".play").append(playBtn);

        // needs to come from database $(".userChar")
        //SELECT * FROM Characters JOIN Users ON Characters.Userid = Users.Id WHERE Users.Id = ?
        function getUserChar() {
          $.get("/api/character/:id", function (data) {
            $(".userChar").val(data.name);
            $(".userHealth").val(data.health);
            $(".userAttack").val(data.attack);
          });
        }

        displayCharacter(randomChar);

        displayCharacter(playerTwoChar);

        playBtnStart();
      });
    });
  });
});
