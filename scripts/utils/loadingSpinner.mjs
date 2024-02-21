/**
 * Shows a loading spinner by modifying the main cursor to "wait" by using body.style.
 */

export function showLoadingSpinner() {
    document.body.style.cursor = 'wait'; 
  }
  
/**
 * Hides the loading spinner by setting the cursor body.style to "auto".
 */
  export function hideLoadingSpinner() {
    document.body.style.cursor = 'auto'; 
  }
  


  