const logoutEl = document.getElementById("logout");

logoutEl.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("id");
  localStorage.removeItem("type");
  window.location = "/frontend";
});
