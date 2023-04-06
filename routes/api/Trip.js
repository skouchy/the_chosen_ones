const router = require('express').Router();
const { Trip } = require('../../models');

// GET /api/tripTrips
router.get('/', (req, res) => {
    // GETs & queries ALL Trips from tripTrip table
    Trip.findAll()
    .then(dbTripModel => res.json(dbTripModel))
    .catch(error => {
        console.log(`routes/tripTrip:js10`, error);
        res.status(500).json(error);
    })
});
router.get('/:id', (req, res) => {
    Trip.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbTripModel => {
        if (!dbTripModel) {
            res.status(404).json({ message: 'No tripTrip found with this id'});
            return;
        }
        res.json(dbTripModel);
    })
    .catch(error => {
        console.log(`routes/Trip:js28`, error);
    })
});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;