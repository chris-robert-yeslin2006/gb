
    // Get references to the elements
    const overlay = document.getElementById('alertOverlay');
    const closeAlertBtn = document.getElementById('closeAlert');
    const okAlertBtn = document.getElementById('okAlert');

    // Function to show the alert
    const showAlert = () => {
      overlay.style.display = 'flex'; // Show the overlay
      document.body.classList.add('no-scroll'); // Disable scrolling
    };

    // Function to hide the alert
    const hideAlert = () => {
      overlay.style.display = 'none'; // Hide the overlay
      document.body.classList.remove('no-scroll'); // Enable scrolling
    };

    // Show the alert automatically when the page loads
    window.addEventListener('load', showAlert);

    // Event listeners for the close and OK buttons
    closeAlertBtn.addEventListener('click', hideAlert);
    okAlertBtn.addEventListener('click', hideAlert);
