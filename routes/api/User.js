const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // GETs & queries ALL Users from user table
    User.findAll()
    .then(dbUserModel => res.json(dbUserModel))
    .catch(error => {
        console.log(`routes/user:js10`, error);
        res.status(500).json(error);
    })
});
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserModel => {
        if (!dbUserModel) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserModel);
    })
    .catch(error => {
        console.log(`routes/user:js28`, error);
    })
});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;