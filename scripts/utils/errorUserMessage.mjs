export function displayErrorMessage(message) {
    const errorElement = document.createElement('div');
    errorElement.textContent = message;
    errorElement.className = 'error-message'; // Use a class for styling
    
    // Append this error message to a specific part of your DOM
    const notificationArea = document.querySelector('body') 
    notificationArea.appendChild(errorElement);
    
    // Optionally, remove the message after some time
    setTimeout(() => {
      errorElement.remove();
    }, 5000); // Adjust timeout as needed
  }
  