# the_chosen_ones

## User Story
AS a Trip Leader(TL) for a river trip,
I WANT an app that consolidates trip logistics
SO THAT myself and all other's that I want to invite on the trip can input logistical and personal details necessary for all to view and revisit.

## Acceptance Criteria
GIVEN a river trip planning application
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes a returning user login, or 2 options for a new user: "planning a trip" or "joining a trip"
WHEN I am a new Trip Leader,
THEN I choose "Planning a Trip" by clicking "Register Trip" Button
WHEN I am taken to the "Register Trip" page
THEN I am prompted with required form inputs: Trip Name, Launch date, Take Out date, name of River Section "on" name of River, and button to generate the Trip ID
WHEN I click the button to generate Trip ID
THEN a number will render in that empty box, an alert text to copy that ID number, a 'Next' button will show, AND the Trip data is saved
WHEN the trip data saves
THEN a new "Trip" table is created
WHEN I click the 'Next' button
THEN I am to fill out 'new user' credential Inputs:[unique User name, Password, first & last name, phone #, email], Select:[ dietary restrictions(vegetarian, vegan, pescetarian, nut-free, gluten-free), Bringing boat? (none, raft, kayak) ], and a Checkbox: "can you row a boat?" (y/n)
WHEN all my user details are input
THEN I will paste or enter the Trip ID that I am associated to
WHEN I click "Join the Crew" button
THEN my credentials are saved and I am logged in to the specified Trip Dashboard
WHEN I enter the Trip Dashboard
THEN I am presented with a header populated with the Trip Name
WHEN I explore the trip Dashboard
THEN I see a lower section that shows the Trip Details, and another section that shows each crew member that has "joined the trip" and their input details
WHEN I want to view specific user details, such as specific dietary restrictions, specific boats, and who can row a boat
THEN I select the particular details I would like filtered
WHEN I click the "filter crew" button,
THEN the user Cards will show only the users that meet the filtered criteria
WHEN I click on the log out option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN my browser returns to the home page