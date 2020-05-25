$(document).ready(function () {
  $('.modal').modal();
  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
  $(document).ready(function () {
    $('.sidenav').sidenav();
  });

  // Load page content
  const page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const content = document.querySelector("#main");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "./src/pages/" + page + ".html", true);
    xhttp.send();
  }
});