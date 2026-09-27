document.addEventListener('DOMContentLoaded', function () {
  var navBtn = document.querySelector('.mob-nav-btn');
  var menu = document.getElementById('menu');
  if (navBtn && menu) {
    navBtn.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }

  var slides = document.querySelectorAll('#slider-container img');
  if (slides.length > 1) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 4500);
  }
});
