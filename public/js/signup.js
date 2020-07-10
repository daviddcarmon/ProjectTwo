$(document).ready(function () {
  // getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const usernameInput = $("input#username-input");
  const passwordInput = $("input#password-input");

  // when signup button is clicked, we validate the email and pw are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.username || !userData.password) {
      return;
    }

    // if we have an email, pw, and username, run the sign up user function
    signUpUser(userData.email, userData.username, userData.password);
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");
  });

  // post to the signup route. if successful, we are redirected to inside the app. otherwise we log errors
  function signUpUser(email, username, password) {
    $.post("/api/signup", {
      email: email,
      username: username,
      password: password,
    })
      .then((data) => {
        window.location.replace("/index");
        // if there's an error, handle it by throwing a bootstrap alert
      })
      .catch(handleSignupErr);
  }

  function handleSignupErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // create character list api call for drop down

  // $(".modal").modal();
  $(".dropdown").dropdown();

  function createCharacters() {
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
      $(".character-list").append(JSON.parse(mapArray.name));

      // for (var i = 0; i < mapArray.length; i++) {
      //   var charList = $(".dropdown-item");
      //   charList.append(mapArray[i].name);

      //   // take character list and create new variable and parse out array

      //   $(".character-list").append(JSON.parse(charList));
      // }
    });
  }

  createCharacters();
});

// DUMMY COMMIT
