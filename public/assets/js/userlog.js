const $userForm = document.querySelector('#users-form');
const $displayArea = document.querySelector('#display-area');

const printResults = resultArr => {
  console.log(resultArr);

  // generates card for each user data printed
  const userHTML = resultArr.map(({ id, name, nickname, role, dietaryNeeds }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Nickname: ${nickname.substring(0, 1).toUpperCase() + nickname.substring(1)}<br/>
      Job Role: ${role.substring(0, 1).toUpperCase() + role.substring(1)}<br/>
      Dietary Needs: ${dietaryNeeds
        .map(diet => `${diet.substring(0, 1).toUpperCase() + diet.substring(1)}`)
        .join(', ')}</p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = userHTML.join('');
};

// Opposed to post.req to /api/users to get data from index.html form,
// * Here we fetch() to GET data from /api/users
const getUsers = (formData = {}) => {
  // function will depend on how queryURL ends up looking
  let queryUrl = '/api/users?';
  // if empty form data: simple req to GET /api/users

  //
  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  console.log(queryUrl);

  fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        return alert('Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(userData => {
      console.log(userData);
      // when fetch() is complete, array of user data to printResults() at top ^
      printResults(userData);
    });
};

const handleGetUsersSubmit = event => {
  event.preventDefault();
  const dietRadioHTML = $userForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const dietaryNeedsArray = [];
  const selectedDietNeed = $userForm.querySelector('[name="diet"]').selectedOptions;

  for (let i = 0; i < selectedDietNeed.length; i += 1) {
    dietaryNeedsArray.push(selectedDietNeed[i].value);
  }

  const dietaryNeeds = dietaryNeedsArray.join(',');

  const userObject = { role, dietaryNeeds };

  getUsers(userObject);
};

$userForm.addEventListener('submit', handleGetUsersSubmit);

getUsers();