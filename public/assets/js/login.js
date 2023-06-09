const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email').value.trim();
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
  
  document
    .querySelector('.loginForm')
    .addEventListener('submit', loginFormHandler);

 

  document
    .getElementById('new-trip')
    .addEventListener('click', () => {
      document.location.replace('/new-trip')
    });

  document
    .querySelector('.register')
    .addEventListener('submit', () => {
      document.location.replace('/new-user')
    });
  