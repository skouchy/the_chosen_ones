const router = require('express').Router();
const tripRoutes = require('./trip-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/trip', tripRoutes);
router.use('/user', userRoutes);

module.exports = router;