document.addEventListener('DOMContentLoaded', function () {
  const sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);

  const carousel = document.querySelectorAll('.carousel');
  M.Carousel.init(carousel,{
    fullWidth: true
  });
});