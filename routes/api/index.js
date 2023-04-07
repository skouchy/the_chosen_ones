const router = require('express').Router();
const tripRoutes= require('./trip-routes');
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
router.use('/trip', tripRoutes);

module.exports = router;