document.addEventListener("DOMContentLoaded", function () {
  // Slider collection init
  const newsSpilde = document.getElementById("newsSpilde");
  const elms = document.getElementsByClassName("splide-auto");
  for (var i = 0, len = elms.length; i < len; i++) {
    new Splide(elms[i], {
      type: "loop",
      perPage: 1,
      height: "20rem",
      autoplay: true,
      breakpoints: {
        1199: {
          height: "16rem",
        },
        991: {
          height: "20rem",
        },
      },
    }).mount();
  }
  // Single slider init
  if (newsSpilde) {
    new Splide("#newsSpilde", {
      type: "loop",
      perPage: 1,
      height: "20rem",
      autoplay: true,
      breakpoints: {
        1199: {
          height: "16rem",
        },
        991: {
          height: "36rem",
        },
      },
    }).mount();
  }
});
