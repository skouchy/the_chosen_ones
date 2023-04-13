const router = require ('express').Router();
const sequelize = require('../config/connection');
const { Trip, User } = require('../models');

router.get('/', (req,res) => {

    // DB call, API call
    const dbData = [{name: 'george'}, {name: 'solo'}];
    // const dbData2 = { Model: User };

    res.render('home', 
    {
        dbData,
        // dbData2,
        layout: 'main'
    });
});

router.get('/login', (req,res) => {
    res.render('login')
});

router.get('/home', (req,res) => {
    User.findAll({
        attributes: [
            'id',
            'username',
            'diet',
            'has_boat',
            'can_row',
            'trip_id'
        ]
    })
    .then(userData => {
        console.log(userData);
        res.render('home', userData)

    })
})
router.post('/home', (req,res) => {
    User.findAll({
        attributes: [
            'id',
            'username',
            'diet',
            'has_boat',
            'can_row',
            'trip_id'
        ]
    })
    .then(userData => {
        console.log(userData);
        res.render('home', userData)

    })
})

router.get('/new-user',(req,res)=>{
    res.render('new-user')
})
router.get('/new-trip',(req,res)=>{
    res.render('new-trip')
})

module.exports = router;