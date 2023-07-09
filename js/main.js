$(document).ready(function () {
  // CHECK TOKEN
  if (!localStorage.getItem("token")) {
    console.log("run away");
    window.location = "/login.html";
  }

  // RESPONSIVE
  $(".habergure").click(function () {
    $(".right-side").toggleClass("is-active");
  });

  // USER AUTH
  $(".log-out").click(function () {
    localStorage.removeItem("token");
    window.location = "/login.html";
  });
});
