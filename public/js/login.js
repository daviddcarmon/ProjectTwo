$(document).ready(function () {
  // MODAL
  $("#myModal").on("shown.bs.modal", function () {
    $("#myInput").trigger("focus");
  });

  const loginForm = $("#login-form");
  const usernameInput = $("input#name");
  const passwordInput = $("input#pw");

  // when form is submitted we validate username and password

  loginForm.click(function (event) {
    event.preventDefault();
    console.log("getting data");
    let userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.username || !userData.password) {
      return;
    }

    // if we have an email and pw, we run the login user fx and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });
  // loginForm.on("click", (event) => {
  //   event.preventDefault();
  //   console.log("getting data");
  //   let userData = {
  //     username: usernameInput.val().trim(),
  //     password: passwordInput.val().trim(),
  //   };

  //   if (!userData.username || !userData.password) {
  //     return;
  //   }

  //   // if we have an email and pw, we run the login user fx and clear the form
  //   loginUser(userData.username, userData.password);
  //   usernameInput.val("");
  //   passwordInput.val("");
  // });

  // loginUser does a post to our api/login route, and if successful redirects us to page inside app
  function loginUser(username, password) {
    console.log("starting login request");
    console.log(password, username);
    $.post("/api/login", {
      username: username,
      password: password,
    })
      .then(function ({ id }) {
        console.log(id);
        window.location.replace("/harryapp/" + id);
        // if there's an error, handle it by throwing a bootstrap alert
        // WE ARE USING MATERIALIZE SO WHAT ERROR DO I THROW HERE?
      })
      .catch(handleLoginErr);
    //console.log(err);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
