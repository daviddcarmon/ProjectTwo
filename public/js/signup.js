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
});
