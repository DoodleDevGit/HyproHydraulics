// Smooth scrolling for navigation links
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    var target = document.querySelector(this.getAttribute("href"));
    var targetPosition = target.getBoundingClientRect().top + window.scrollY; // Calculate the position of the target
    var offsetPosition = targetPosition - 170; // Adjust for the offset (95px down)

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth", // Smooth scrolling
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(function () {
    window.scrollTo(0, 0); // Scroll to top-left corner
  });

  (function () {
    emailjs.init({
      publicKey: "j40Q4apzRCqxeJtXQ",
    });
  })();

  function resetContactInput() {
    var form = document.getElementById("contact-form");
    form.reset();
  }

  resetContactInput();

  // Check if the EmailJS SDK loaded correctly
  if (typeof emailjs !== "undefined") {
    // Handle form submission
    document
      .getElementById("contact-form")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting normally

        const submitButton = event.target.querySelector(
          'button[type="submit"]'
        );
        submitButton.textContent = "Sending..."; // Temporary feedback to user

        // Collect form data
        const formData = {
          name: event.target.name.value,
          email: event.target.email.value,
          number: event.target.number.value,
          message: event.target.message.value,
        };

        // Send email using EmailJS
        emailjs.send("Tgmailservice", "template_yi8aegh", formData).then(
          function (response) {
            resetContactInput();
            console.log("SUCCESS!", response.status, response.text);
            submitButton.textContent = "Sent Successfully!";
            submitButton.disabled = true; // Disable button after submission
          },
          function (error) {
            resetContactInput();
            console.error("FAILED...", error);
            submitButton.textContent = "Failed to Send. Try Again.";
            submitButton.disabled = false; // Re-enable button after failure
          }
        );
      });
  } else {
    console.error("EmailJS SDK failed to load.");
  }

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

  const steps = document.querySelectorAll(".process-list-container li");
  let userInteractedStep = false; // Flag to track user interaction (click or hover)

  // Function to calculate and update the focused step based on scrolling
  const updateFocusedStep = () => {
    if (userInteractedStep) return; // Skip updating if the user clicked or hovered over a step

    const viewportMiddle = window.innerHeight / 2;
    let closestStep = null;
    let closestDistance = Infinity;

    steps.forEach((step) => {
      const stepRect = step.getBoundingClientRect();
      const stepMiddle = stepRect.top + stepRect.height / 2;
      const distanceToMiddle = Math.abs(stepMiddle - viewportMiddle);

      if (distanceToMiddle < closestDistance) {
        closestDistance = distanceToMiddle;
        closestStep = step;
      }
    });

    // Remove the 'focused' class from all <li> elements
    steps.forEach((step) => step.classList.remove("focused"));

    // Add the 'focused' class to the closest step
    if (closestStep) {
      closestStep.classList.add("focused");
    }
  };

  // Function to handle hovering over a step
  const handleHover = (event) => {
    userInteractedStep = true; // Set the flag to prevent scroll updates
    const hoveredStep = event.currentTarget;

    // Remove the 'focused' class from all <li> elements
    steps.forEach((step) => step.classList.remove("focused"));

    // Add the 'focused' class to the hovered step
    hoveredStep.classList.add("focused");
  };

  // Function to handle clicking on a step
  const handleClick = (event) => {
    userInteractedStep = true; // Set the flag to prevent scroll updates
    const clickedStep = event.currentTarget;

    // Remove the 'focused' class from all <li> elements
    steps.forEach((step) => step.classList.remove("focused"));

    // Add the 'focused' class to the clicked step
    clickedStep.classList.add("focused");

    // Scroll event will resume focus effect after 1 second
    setTimeout(() => {
      userInteractedStep = false; // Allow scroll updates again
    }, 1000);
  };

  // Function to handle mouse leaving a step
  const handleMouseLeave = () => {
    // Allow scrolling focus effect again after leaving a step
    setTimeout(() => {
      userInteractedStep = false;
    }, 100);
  };

  // Add hover and click event listeners to each step
  steps.forEach((step) => {
    step.addEventListener("mouseover", handleHover);
    step.addEventListener("mouseleave", handleMouseLeave);
    step.addEventListener("click", handleClick);
  });

  // Add a scroll event listener
  window.addEventListener("scroll", updateFocusedStep);

  // Call the function initially to set the focus on load
  updateFocusedStep();

  const burgerCheckbox = document.getElementById("checkbox");
  const navLinks = document.querySelector(".nav-links");

  if (!burgerCheckbox || !navLinks) {
    console.error("Element not found in DOM.");
    return;
  }

  // Close menu on scroll
  window.addEventListener("scroll", () => {
    burgerCheckbox.checked = false;
    navLinks.classList.remove("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navLinks.contains(e.target) &&
      !burgerCheckbox.parentElement.contains(e.target)
    ) {
      burgerCheckbox.checked = false;
      navLinks.classList.remove("active");
    }
  });

  // Toggle nav links active class based on checkbox state
  burgerCheckbox.addEventListener("change", () => {
    if (burgerCheckbox.checked) {
      navLinks.classList.add("active");
    } else {
      navLinks.classList.remove("active");
    }
  });

  var elems = document.querySelectorAll(".carousel");
  M.Carousel.init(elems, {
    indicators: true,
    numVisible: 3,
    fullWidth: false,
  });

  var startX = 0;
  var startY = 0;
  var threshold = 30; // Lower threshold for more responsive swiping

  elems.forEach(function (carousel) {
    const instance = M.Carousel.getInstance(carousel);

    // Prevent any tap or click interactions with the carousel
    carousel.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    carousel.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    carousel.addEventListener("touchmove", function (e) {
      const moveX = e.touches[0].clientX - startX;
      const moveY = e.touches[0].clientY - startY;

      // Allow vertical scrolling if the movement is mostly vertical
      if (Math.abs(moveY) > Math.abs(moveX)) {
        e.stopPropagation();
        return;
      }

      // Prevent default behavior for horizontal swipes
      e.preventDefault();
    });

    carousel.addEventListener("touchend", function (e) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const diffX = endX - startX;
      const diffY = endY - startY;

      e.preventDefault();
      e.stopPropagation();

      // Only trigger swipe if horizontal movement exceeds the threshold and is larger than vertical movement
      if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          // Swipe left, move to the next slide
          instance.next(1);
        } else {
          // Swipe right, move to the previous slide
          instance.prev(1);
        }
      }
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

  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    const label = item.querySelector(".service-label");

    label.addEventListener("click", () => {
      // Close all other dropdowns
      serviceItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("open");
        }
      });

      // Toggle the clicked dropdown
      item.classList.toggle("open");
    });
  });
});
