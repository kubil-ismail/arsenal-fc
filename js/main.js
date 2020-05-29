if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function (registration) {
        console.log('Service worker registered successfully', registration);
      })
      .catch(function (err) {
        console.log('Service worker registration failed: ', err);
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener('DOMContentLoaded', function () {
  const sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);

  const carousel = document.querySelectorAll('.carousel');
  M.Carousel.init(carousel,{
    fullWidth: true
  });
});