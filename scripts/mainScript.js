// Smooth scrolling for navigation links
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    var target = document.querySelector(this.getAttribute("href"));
    var targetPosition = target.getBoundingClientRect().top + window.scrollY; // Calculate the position of the target
    var offsetPosition = targetPosition - 100; // Adjust for the offset (95px down)

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth", // Smooth scrolling
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  var sections = document.querySelectorAll(".section");

  var observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
  var burgerMenu = document.querySelector(".burger-menu");
  var navLinks = document.querySelector(".nav-links");

  // Toggle menu on burger menu click
  burgerMenu.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click from propagating to the document
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });

  // Close menu on scroll
  window.addEventListener("scroll", () => {
    navLinks.classList.remove("active");
  });

  var elems = document.querySelectorAll(".carousel");
  M.Carousel.init(elems, {
    indicators: true,
    numVisible: 3,
    fullWidth: false,
  });

  elems.forEach(function (carousel) {
    // Prevent interaction that changes the slide
    carousel.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    carousel.addEventListener("touchstart", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    carousel.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  var carouselItems = document.querySelectorAll(".carousel-item");

  carouselItems.forEach(function (slide) {
    // Prevent interaction that changes the slide
    slide.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    slide.addEventListener("touchstart", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    slide.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  //carousel Next function
  document.getElementById("next").addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent interference with drag
    var el = document.querySelector(".carousel");
    var l = M.Carousel.getInstance(el);
    l.next(1);
  });

  //carousel previous function
  document.getElementById("prev").addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent interference with drag
    var el = document.querySelector(".carousel");
    var l = M.Carousel.getInstance(el);
    l.prev(1);
  });
});
