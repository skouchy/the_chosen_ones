const router = require('express').Router();
const sequelize = require('./')
const { Trip, User } = require('../../models');
const { log } = require('handlebars');

// GET /api/trip
router.get('/', async (req, res) => {
    try {
        const tripData = await Trip.findAll({
            include: [{ model: User }]
        });
        res.status(200).json(tripData)

    } catch (error) {
        console.log(`routes/trip:js10`, error);
        res.status(500).json(error);
    }
});


// GETs & queries ALL Trips from Trip table



router.get('/:id', async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [{ model: User }]
        });

        if (!tripData) {
            res.status(404).json({ message: 'No trip found with that id!' });
            return;
        }

        res.status(200).json(tripData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
    console.log(`did we make it to the post??`);
    Trip.create({
        trip_name: req.body.trip_name,
        launch_date: req.body.launch_date,
        end_date: req.body.end_date,
        section: req.body.section,
        river: req.body.river
    })
        .then(tripData => {
            console.log(req.body)
            res.json(tripData)
        })
        .catch(err => {
            console.log(req.body)
            console.log(err);
            res.status(500).json(err);
        });
});

// router.post('/:id', (req, res) => {
//     // GETs & queries One Trip from Trip table
//     // Trip.findOne()
//     //     .then(tripData => res.json(tripData))
//     //     .catch(error => {
//     //         console.log(`routes/trip:js38`, error);
//     //         res.status(500).json(error);
//     //     })
// });

router.put('/:id', (req, res) => { });

router.delete('/:id', (req, res) => { });

module.exports = router;