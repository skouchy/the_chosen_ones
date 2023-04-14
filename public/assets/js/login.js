const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/home');
      } else {
        alert(response.status(500));
      }
    }
  };
  
  // const signupFormHandler = async (event) => {
  //   event.preventDefault();
  
  //   const email = document.querySelector('#email-signup').value.trim();
  //   const password = document.querySelector('#password-signup').value.trim();
  
  //   if (email && password) {
  //     const response = await fetch('/api/user', {
  //       method: 'POST',
  //       body: JSON.stringify({ email, password }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  
  //     if (response.ok) {
  //       document.location.replace('/home');
  //     } else {
  //       alert(response.statusText);
  //     }
  //   }
  // };
  
  
  document
    .querySelector('.loginForm')
    .addEventListener('submit', loginFormHandler);

 
  
  document
    .querySelector('#new-user')
    .addEventListener('submit', signupFormHandler);
  