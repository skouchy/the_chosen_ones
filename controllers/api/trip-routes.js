const router = require('express').Router();
const sequelize = require('./')
const { Trip } = require('../../models');

// GET /api/tripTrips
router.get('/', (req, res) => {
    // GETs & queries ALL Trips from Trip table
    Trip.findAll()
        .then(dbTripModel => res.json(dbTripModel))
        .catch(error => {
            console.log(`routes/trip:js10`, error);
            res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    Trip.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbTripModel => {
            if (!dbTripModel) {
                res.status(404).json({ message: 'No Trip found with this id' });
                return;
            }
            res.json(dbTripModel);
        })
        .catch(error => {
            console.log(`routes/Trip:js28`, error);
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    console.log('req');
    console.log('req');
    console.log('req');
    console.log('req');
    // console.log(res);
    // console.log(res.body);
    Trip.create({
            trip_name: req.body.trip_name,
            launch_date: req.body.launch_date,
            end_date: req.body.end_date,
            section: req.body.section,
            river: req.body.river
        })
        .then(dbTripModel => {
            console.log(req.body)
            res.json(dbTripModel)
            console.log('rezzzzzzzzzzzzzzzzzzzzzzzzzzz')
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
//     //     .then(dbTripModel => res.json(dbTripModel))
//     //     .catch(error => {
//     //         console.log(`routes/trip:js38`, error);
//     //         res.status(500).json(error);
//     //     })
// });

router.put('/:id', (req, res) => { });

router.delete('/:id', (req, res) => { });

module.exports = router;