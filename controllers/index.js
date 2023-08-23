const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require ('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// in case a request to any endpoint doesn't exist, 404 error will show
router.use((req, res) => {
	console.log("Incoming request to URL [" + req.url + "] could not be served.");
	res.status(404).end();
});

module.exports = router;
