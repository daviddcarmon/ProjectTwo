// const db = require("../../models");

$(document).ready(function () {
  // console.log('api.js')
  // needs to come from database $(".userChar")
  //SELECT * FROM Characters JOIN Users ON Characters.Userid = Users.Id WHERE Users.Id = ?
  // NEED TO CAPTURE IMG URL TO DATABASE
  let userCharacter = {
    name: $(".userName").text().trim(),
    health: $(".userHealth").text().trim().split(" ")[1],
    attack: $(".userAttack").text().trim().split(" ")[1],
  };
  console.log(userCharacter);
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
        let card = $("<section>").attr({
          class: "card col-md-4",
          id: player.name,
        });

        card.append(img, name, health, attack);
        $(".randChar").append(card);
      };

      let index = Math.floor(Math.random() * 25);
      let index2 = Math.floor(Math.random() * Math.random() * 25);
      let randomChar = mapArray[index];
    
      let playBtnStart = () => {
        $("#play").on("click", () => {
          // userAttack
          // console.log(typeof randomChar.health);
          let healthInt = parseInt(randomChar.health);
          let userAttackInt = userCharacter.attack;
          // console.log(typeof userCharacter.attack);
          randomChar.health = parseInt(healthInt - userAttackInt);

          // randCharAttack
          let userHealth = parseInt(userCharacter.health);
          let randCharAttack = randomChar.attack;
          userCharacter.health = parseInt(userHealth - randCharAttack);
          console.log(userCharacter);

          console.log(parseInt(userCharacter.health));

          // db.Character.update({
          //   health: userCharacter.health
          // }, {
          //   where:{UserId: req.params.id}
          // })

          if (randomChar.health <= 0) {
            let winnerText = $("div>").text("WINNER!");
            $(".winner").append(winnerText);
          }
          if (userCharacter.health <= 0) {
            let lostText = $("div>").text("You lost!");
            $(".winner").append(lostText);
          } else {
            $("userHealth").empty();
            $(".randomHealth").empty();
            $("userHealth").append(userCharacter.health);
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
        $("#play").empty();
        $("#play").append(playBtn);
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
