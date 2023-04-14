const express = require('express');
const exphbs = require('express-handlebars'); 
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const anime = require('animejs');

const app = express();
const PORT = process.env.PORT || 3001;

// * Middleware: added to instruct server on typeOf data & how to interpret(read and write)
const hbs = exphbs.create({}) //add helpers into  curly braces utils
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());// parse incoming JSON data
app.use(express.urlencoded({ extended: true }));// parse incoming string or array data 
app.use(express.static(path.join(__dirname, 'public')));
// converts incoming POST data into key/value pairs: accessed in req.body{}

app.use(routes);// turn on routes


// * ====================== end of "Middleware" =================================== *// 






// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at ${PORT}`));
});