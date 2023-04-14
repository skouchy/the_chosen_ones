const newUserHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();
    const diet = document.querySelector('#diet').value.trim();
    const has_boat = document.querySelector('#has_boat').value.trim();
    const can_row = document.querySelector('#can_row').value.trim();
    const trip_id = document.querySelector('#trip_id').value.trim();

  
    if (username && password && email && diet && has_boat && can_row && trip_id) {
        console.log('we should see this console log before req');
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, diet, has_boat, can_row, trip_id }),
      });
  
      if (response.ok) {
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .getElementById('join-trip')
  .addEventListener('submit', newUserHandler);