const router = require('express').Router();
const sequelize = require('../config/connection');
const { Trip, User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', (req, res) => {

//     // DB call, API call
//     const dbData = [{ name: 'george' }, { name: 'solo' }];
//     // const dbData2 = { Model: User };

//     res.render('home',
//         {
//             dbData,
//             // dbData2,
//             layout: 'main'
//         });
// });

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/new-trip', (req, res) => {
    res.render('new-trip')
});
router.get('/new-user', (req, res) => {
    res.render('new-user')
});

router.get('/home', async (req, res) => {
    const userData = await User.findAll({
        attributes: [
            'id',
            'username',
            'diet',
            'has_boat',
            'can_row',
            'trip_id'
        ]
    });
    const tripData = await Trip.findAll({
        attributes: [
            'id',
            'trip_name',
            'launch_date',
            'end_date',
            'section',
            'river'
        ]
    });
    // console.log(userData);
    //({plain: true}) befause sequelize returns more than data object
    const users = userData.map(user => user.get({ plain: true }));
    const trips = tripData.map(trip => trip.get({ plain: true }));
    console.log(`trippiesssssss:  `, { trips });
    console.log(`trippiesssssss:  `, { users });
    //map tranforms array into array of plain objects by calling .get({plain:true})
    res.render('home', { users, trips });
    //{ users } makes users array available as variable in Handlebars template to display
});


module.exports = router;
