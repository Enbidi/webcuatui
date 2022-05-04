function login() {
  var email = document.getElementById("email");
  var pass = document.getElementById("pswd");
  for (let acc of JSON.parse(window.localStorage.getItem("accounts"))) {
    if (email.value == acc.email && pass.value == acc.pass) {
      window.localStorage.setItem("logged_in", acc.name);
      if (document.getElementById("remember").checked) {
        window.localStorage.setItem("remember", JSON.stringify({
          email: email.value,
          pass: pass.value
        }));
      }
      return true;
    }
  }
  document.getElementById("warningMess").className += " show";
  return false;
}

if (window.localStorage.getItem("remember"))
  document.addEventListener("DOMContentLoaded", function() {
    let old = JSON.parse(window.localStorage.getItem("remember"));
    document.getElementById("email").value = old.email;
    document.getElementById("pswd").value = old.pass;
  });