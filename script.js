// Function to toggle the mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }
  
  // Function to handle smooth scrolling with an offset
  function smoothScroll(target) {
    const headerHeight = document.querySelector('header').offsetHeight; // Get header height
    const targetElement = document.querySelector(target); // Get the target section
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - headerHeight; // Calculate offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // Smooth scroll
      });
    }
  }
  
  // Add event listeners to navigation links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      const target = link.getAttribute('href'); // Get the target section ID
      smoothScroll(target); // Call the smooth scroll function
    });
  });
  
  // Initialize EmailJS
  (function() {
    emailjs.init({
      publicKey: "0PuAP4Yw9gwGQ-JFO", // Replace with your actual public key
    });
  })();
  
  // Function to send an email
  function sendEmail(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    emailjs.send("service_2co2gpe", "template_lipq3f1", {
      name: name,
      email: email,
      message: message,
    }).then(
      () => {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
      },
      (error) => {
        alert("Failed to send message: " + error.text);
      }
    );
  }