const express = require('express');
const fs = require('fs');
const path = require('path');
const { users } = require('./db/users.json');


const PORT = process.env.PORT || 3000;
const app = express();

// * Middleware: added to instruct server on typeOf data & how to interpret(read and write)
// parse incoming string or array data 
app.use(express.urlencoded({ extended: true }));
// urlen..() = express method converting incoming POST data into key/value pairs: accessed in req.body{}
// ({ extended: true }) method call 411 to server: there may be sub-array data nested -- so it looks deep into POST data to Parse * Data

// parse incoming JSON data
app.use(express.json());

// to ensure server->html call includes connection to <script.js> and <link href=./css/style.css>
app.use(express.static('public'));
// provide file path to instruct server cdto make the files within declared location all static resources avoiding specific server endpoints for all

// * ====================== end of "Middleware" =================================== *// 

// instead of handling filter inside app.get() callback, break it out to keep code maintainable and clean
function filterByQuery(query, usersArray) {
    //to combat a single vs multiple query search differing from results returning varied types 'string' or [array]:
    let dietaryNeedsArray = [];
    //saving usersArray as filteredResults
    let filteredResults = usersArray;
    if (query.dietaryNeeds) {
        //save pTraits as dedicated Array
        //if pTraits is string, place in new array & save
        if (typeof query.dietaryNeeds === 'string') {
            dietaryNeedsArray = [query.dietaryNeeds];
        } else {
            dietaryNeedsArray = query.dietaryNeeds;
        }
        //Loop thru each diet in the dietaryNeeds array:
        dietaryNeedsArray.forEach(diet => {
            //Check the diet against each user in the filteredResults array
            // * Remember, its initially a copy of the usersArray,
            // but here, we're updating it for each diet in the .forEach() loop
            // For each diet being targeted by the filter, the filteredResults array 
            //will then contain only the entries that contain the diet,
            // so at the end we'll have an array of users that habe every one 
            //of the diets when the .forEach() loop is finished
            filteredResults = filteredResults.filter(
                user => user.dietaryNeeds.indexOf(diet) !== -1
            );
        });
    }

    if (query.role) { //
        filteredResults = filteredResults.filter(user => user.role === query.role);
    }
    if (query.gender) {
        filteredResults = filteredResults.filter(user => user.gender === query.gender)
    }
    if (query.name) {
        filteredResults = filteredResults.filter(user => user.name === query.name);
    }
    return filteredResults;
    // this will take in req.query as an argument & filter thru users accordingly, returning new filtered array
}


function findById(id, usersArray) {
    const result = usersArray.filter(user => user.id === id)[0];
    return result;
};

function createNewUser(body, usersArray) {
    const user = body;
    console.log(body);
    usersArray.push(user);
    fs.writeFileSync(
        path.join(__dirname, './db/users.json'),
        JSON.stringify({ users: usersArray }, null, 2)
    );

    // return finished code to post route for response
    return user;
};

function validateUser(user) {
    if (!user.name || typeof user.name !== 'string') {
        return false;
    }
    if (!user.gender || typeof user.gender !== 'string') {
        return false;
    }
    if (!user.role || typeof user.role !== 'string') {
        return false;
    }
    if (!user.dietaryNeeds || !Array.isArray(user.dietaryNeeds)) {
        return false;
    }
    return true;
}

app.get('/api/users', (req, res) => {
    let results = users; //users refers to { users } = require(./db/users), & results is the copy to be modified of users Obj
    // * if filtering, below conditional handles the call to that function
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);// * if posting, all queries must exist, returning results to { users } 
});

app.get('/api/users/:id', (req, res) => {
    const result = findById(req.params.id, users);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// POST req to /api/users so the form in index.html can submit & create new data
app.post('/api/users', (req, res) => {
    //req.body is where our incoming content will be
    console.log(req.body);
    //set id based on what the next index of the array will be
    req.body.id = users.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateUser(req.body)) {
        //response to relay message to client that made the request: indicates server is fine, but input was incorrect - we can't allow it to work
        res.status(400).send('Validation FAILED: the user is not properly formatted');
    } else {
        // add user to json file and users array in this function
        const user = createNewUser(req.body, users);
        res.json(user);
    }

    // const user = createNewUser(req.body, users);

    // res.json(user);
});

// connects Express server to index.HTML, in this case, our declared homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, './public/users.html'));
});

// wild card route: included incase client makes req for non-existent route (/about, /contact, etc)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
}); // ? Wildcard routes must be listed last to not block functional routes


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
    console.log(__dirname);
});