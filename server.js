const express = require('express');
const { engine } = require('express-handlebars');
const routes = require('./routes');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

// * Middleware: added to instruct server on typeOf data & how to interpret(read and write)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(routes);// turn on routes
app.use(express.json());// parse incoming JSON data
app.use(express.urlencoded({ extended: true }));// parse incoming string or array data 
// converts incoming POST data into key/value pairs: accessed in req.body{}






// * ====================== end of "Middleware" =================================== *// 



// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});