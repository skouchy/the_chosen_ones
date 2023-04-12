const router = require('express').Router();
const { User, Trip } = require('../../models');
// const withAuth = require('../../util/auth');

// GET /api/users
router.get('/', (req, res) => {
    // GETs & queries ALL Users from user table
    User.findAll({
        attributes: [['id', 'username', 'password', 'email', 'diet', 'has_boat', 'can_row', 'trip_id']],
        include: [
            {
                model: Trip,
                attributes: ['id']
            }
        ]
    })
        .then(dbUserModel => res.json(dbUserModel))
        .catch(error => {
            console.log(`routes/user:js10`, error);
            res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'username', 'password', 'email', 'diet', 'has_boat', 'can_row', 'trip_id'],
        include: [
            {
                model: Trip,
                attributes: ['id']
            }
        ]
    })
        .then(dbUserModel => {
            if (!dbUserModel) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserModel);
        })
        .catch(error => {
            console.log(`routes/user:js28`, error);
            res.status(500).json(error);
        });
});

router.get('/:diet', (req, res) => {
    User.findAll({
        where: {
            diet: req.params.diet
        }
    })
        .then(dbUserModel => {
            if (!dbUserModel) {
                res.status(404).json({ message: 'No user found with this dietary restriction' });
                return;
            }
            res.json(dbUserModel);
        })
        .catch(error => {
            console.log(`routes/user:js28`, error);
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    User.create({ // pass in key/value pairs where keys are defined in User model
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        diet: req.body.diet,
        has_boat: req.body.has_boat,
        can_row: req.body.can_row,
        trip_id: req.body.trip_id
    })
        .then(dbUserModel => {
            console.log(dbUserModel);
            res.json(dbUserModel)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbUserModel => {
            if (!dbUserModel) {
                res.status(400).json({ message: 'No user with that email address!' });
                return;
            }

            //verify user by email, here checks password & talks to Class User Model in User.js....
            // becuz dbUserData is query result of .findOne() it carries user data (including req.body.password which holds the plaintext from user input)
            const validPassword = dbUserData.checkPassword(req.body.password); // req.body.password passed thru checkPassword
            // validPassword is the result & stored as Boolean value: true or false 
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect Password!' });
                return;
            }

            res.json({ user: dbUserData, message: 'YoU aRe NoW lOgGeD iN!' });

        })
})

router.put('/:id', (req, res) => { });

router.delete('/:id', (req, res) => { });

module.exports = router;