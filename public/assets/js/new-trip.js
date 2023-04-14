const $displayId = document.querySelector('#display-id');

const newTripHandler = async (event) => {
    event.preventDefault();
  
    const trip_name = document.querySelector('#tripName-signup').value.trim();
    const launch_date = document.querySelector('#launch').value.trim();
    const end_date = document.querySelector('#end').value.trim();
    const section = document.querySelector('#section').value.trim();
    const river = document.querySelector('#river').value.trim();
  
    if (trip_name && launch_date && end_date && section && river) {
        console.log('we should see this console log before req');
      const response = await fetch('/api/trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trip_name, launch_date, end_date, section, river }),
      });
  
      if (response.ok) {
        return `<span>${this.id}</span>`
      } else {
        alert(response.statusText);
      }
    }
    $displayId.innerHTML = userHTML.join('');
  };
  
  document.querySelector('.newTripForm')
  .addEventListener('submit', newTripHandler);

  document.querySelector('#new-trip').addEventListener('click', () => {
    document.location.replace('/new-user')});