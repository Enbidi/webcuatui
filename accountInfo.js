function loadAccount() {
  var username = window.localStorage.getItem("logged_in");
  if (username) {
    let login = document.getElementById("login");
    //login.className += "badge bg-success";
    login.innerHTML = `Xin chào ${username}`;

    let regis = document.getElementById("regis");
    let logoutButton = document.createElement("button");
    logoutButton.className = "btn-info rounded";
    logoutButton.innerHTML = "Đăng xuất";
    logoutButton.onclick = () => {
      window.localStorage.setItem("logged_in", "");
      location.reload();
    }
    regis.replaceChild(logoutButton, regis.querySelector("a"));
  }
}

document.addEventListener("DOMContentLoaded", loadAccount);