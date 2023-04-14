const { User, Trip } = require("../../../models");

const $userForm = document.querySelector('.newUserForm');

const handleUserFormSubmit = event => {
  event.preventDefault();

  // get user data and organize it
  const username = $userForm.querySelector('[name="username"]').value;
  const canRow = $userForm.querySelector('[name="can-row"]').value;
  const hasBoat = $userForm.querySelectorAll('[name="boat"]').value;
  let row;
  let boat;

  for (let i = 0; i < canRow.length; i += 1) {
    if (canRow[i].checked) {
      row = canRow[i].value;
    }
  }
  
    if (row === undefined) {
      row = '';
    }

  for (let i = 0; i < hasBoat.length; i += 1) {
    if (hasBoat[i].checked) {
      boat = hasBoat[i].value;
    }
  }
  if (boat === undefined) {
    boat = '';
  }

  
  const selectedDietNeed = $userForm.querySelector('[name="diet"]').selectedOptions;
  const dietArray = [];
  for (let i = 0; i < selectedDietNeed.length; i += 1) {
    dietArray.push(selectedDietNeed[i].value);
  }
  const userObject = { username, dietArray, hasBoat, canRow };

  fetch('/api/user', {
    // allows request to reach proper endpoint in our server (when we added new users to JSON file)
    method: 'POST', //specifies what type of request it is: in this case, it's set to POST
    headers: { 
      Accept: 'application/json',
      //tell request what typeof data we're sending.then(actually provide the data)
      'Content-Type': 'application/json'
    },// set headers to inform request to be JSON data --> 
    body: JSON.stringify(userObject)
    // so that we can add stringified JSON data for userObject to body property
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    alert('Error: ' + response.statusText);
  })
  .then(postResponse => {
    console.log(postResponse);
    alert('Thank you for adding an user!');
  })
  .catch(error => {
    console.log('Error:', error);
  });

};

$userForm.addEventListener('submit', handleUserFormSubmit);

// ! The Fetch(here) in addition to app.get(server) 
// * is what made post.push() a new user to JSON obj a success!