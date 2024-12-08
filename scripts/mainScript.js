 // Smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.getBoundingClientRect().top + window.scrollY; // Calculate the position of the target
        const offsetPosition = targetPosition - 100; // Adjust for the offset (95px down)

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth', // Smooth scrolling
        });
    });
});

// Basic form validation
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Form submitted successfully!');
});

