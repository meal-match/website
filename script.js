(function() {
    // Initialize EmailJS with your public key
    emailjs.init({
      publicKey: "0PuAP4Yw9gwGQ-JFO", 
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