const router = require('express').Router();
const tripRoutes= require('./trip');
const userRoutes = require('./user');

router.use('/user', userRoutes);
router.use('/trip', tripRoutes);

module.exports = router;