export function displayErrorMessage(message) {
    const errorElement = document.createElement('div');
    errorElement.textContent = message;
    errorElement.className = 'error-message'; 
    const notificationArea = document.querySelector('body') 
    notificationArea.appendChild(errorElement);
    setTimeout(() => {
      errorElement.remove();
    }, 5000); 
  }
  