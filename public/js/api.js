//const character = require("../../models/character");

$(document).ready(function () {
  // console.log('api.js')
  // needs to come from database $(".userChar")
  //SELECT * FROM Characters JOIN Users ON Characters.Userid = Users.Id WHERE Users.Id = ?
  // NEED TO CAPTURE IMG URL TO DATABASE

  function getUserChar() {
    $.get("/api/character/:id", function (data) {
      if (data) {
        // console.log(data);
        let card = $("<section>").attr({
          class: "card col-md-4",
          id: data.name,
        });
        let name = $("<div>").attr({ class: "userName" }).val(data.name);
        let health = $(".userHealth")
          .attr({ class: "userHealth" })
          .val(data.health);
        let attack = $(".userAttack")
          .attr({ class: "userAttack" })
          .val(data.attack);

        card.append(name, health, attack);
        $(".userChar").append(card);
      }
    });
  }
  // getUserChar();

  $(function () {
    const queryURL = "http://hp-api.herokuapp.com/api/characters";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      // console.log(res);

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
        img.attr("class","img-fluid player-icon")
        let card = $("<section>").attr({
          class: "card col-md-4 player-card",
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
          let userAttackInt = playerTwoChar.attack;
          // console.log(typeof playerTwoChar.attack);
          randomChar.health = parseInt(healthInt - userAttackInt);


          // BROKEN CODE DO NOT UN-COMMENT!!!! NEEDS USER INFO FROM DATABASE(ATTACK, HEALTH)
          // let userHealth = parseInt(character.health);
          // let randCharAttack = randomChar.attack;
          // character.health = parseInt(userHealth - randCharAttack);

          if (randomChar.health <= 0) {
            let winnerText = $("div>").text("WINNER!");
            $(".winner").append(winnerText);
          }
          // if (character.health <= 0) {
          //   let lostText = $("div>").text("You lost!");
          //   $(".winner").append(lostText);
        // } 
          else {
            $("").empty();
            $(".randomHealth").empty();
            $("").append(character.health);
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
        let selectImg = $(this).find(":selected").attr("id");
        // console.log($(this).find(":selected").attr("id"));
        let objChar = {
          name: selectedChar,
          health: 100,
          attack: Math.floor(Math.random() * 25) + 5,
          image: selectImg,
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
        $(".charList").append(
          $("<option></option>").text(text.name).attr({
            class: "listItem btn",
            id: this.image,
            onchange: "selectedCharacter()",
          })
        );
        // console.log(typeof this.image);
      });

      // returns if exists all values(array of objects) for "Slytherin"
      let filterArray = res.filter((res) => {
        return res.house;
      });

      /// dummy button and display code
      let button = $("<button>")
        .attr({ class: "btn", id: "test" })
        .attr("class","gameBtn")
        .text("Randomize");
      $(".ranBtn").append(button);

      $(button).on("click", (event) => {
        event.preventDefault();
        // getUserChar()

        // clearing location where random character card is returned
        $(".randChar").empty();
        $(".play").empty();
        $(".play").append(playBtn);

        displayCharacter(randomChar);

        // displayCharacter(playerTwoChar);

        playBtnStart();
      });
    });
  });
});

// make sure database function is connected to retrieve user's character to display the info
// on selected character, need to select the id to display the image
