$(document).ready(function () {
  // getting references to our form and input
  const signUpForm = $("#signup-form");
  const emailInput = $("input#email-input");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");

  // when signup button is clicked, we validate the email and pw are not blank
  $("#signup-btn").click(function (event) {
    event.preventDefault();

    let userData = {
      email: emailInput.val(),
      username: usernameInput.val(),
      password: passwordInput.val(),
    };
    console.log(userData);
    if (!userData.email || !userData.username || !userData.password) {
      return;
    }

    // if we have an email, pw, and username, run the sign up user function
    signUpUser(userData.email, userData.username, userData.password);
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");
    window.location.replace("/harryapp");
  });

  // post to the signup route. if successful, we are redirected to inside the app. otherwise we log errors
  function signUpUser(email, username, password) {
    $.post("/api/signup", {
      email: email,
      username: username,
      password: password,
    }).then((data) => {
      window.location.replace("/harryapp");
      // if there's an error, handle it by throwing a bootstrap alert
    });
    //.catch(handleSignupErr);
  }

  function handleSignupErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // create character list api call for drop down

  let dropdown = $(".dropdown-menu").on("click", () => {
    // var value = $(this).val();
    // $(".dropdown-item btn").filter("selected", function (index) {
    //   var nameTest = $(this).toggle($(this).text().indexOf(value) > -1);
    //   console.log(nameTest);
    // });
  });

  $("dropdown-item").on("click", () => {
    var value = $(this).val();
    $(".dropdown-item btn").filter("selected", function (index) {
      var nameTest = $(this).toggle($(this).text().indexOf(value) > -1);

      console.log(nameTest);
    });
  });

  function createCharacters() {
    const queryURL = "http://hp-api.herokuapp.com/api/characters/";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      // console.log(res);
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

      $.each(mapArray, function (val, text) {
        // console.log({ val, text });
        //dropdown.append(
        $(".character-list").append(
          $("<option></option")
            .text(text.name)
            .attr("health", text.health)
            .attr("stats", text.stats)
          // .attr({ class: "dropdown-item", value: this.name })
        );
      });
      // console.log(mapArray);
      $(".character-list").append(JSON.parse(mapArray.name));

      for (var i = 0; i < mapArray.length; i++) {
        var charList = $(".dropdown-item");
        charList.append(mapArray[i].name);

        // take character list and create new variable and parse out array

        $(".character-list").append(JSON.parse(charList));
      }
    });
  }

  createCharacters();

  // submit signup form & redirect user to harryapp page on submission
  // $("#signup-btn").on("click", function () {
  //   $("#signup-form").submit();
  //   window.location.href = "./public/harryapp.html";
  // });
});
