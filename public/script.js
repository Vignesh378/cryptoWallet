document.addEventListener("DOMContentLoaded", () => {
    const listItems = document.querySelectorAll(".about-mid ul li");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate"); // Add the animate class when in view
          } 
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
  
    listItems.forEach((item) => observer.observe(item));
  });

  document.querySelector('form .subscribe button').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the email input value
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
  
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the email is valid
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      emailInput.focus(); // Focus on the email input field
      return; // Stop further execution
    }
  
    
  });

