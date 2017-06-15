var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	auth = require('../resources/auth');

//CONTROLLERS
var usersController = require('../controllers/users');
var weatherController = require('../controllers/weatherBack');
var locationController = require('../controllers/locationControl');
var flowController = require('../controllers/flowController.js');

// SQL API Routes
router.route('/api/me')
  .get(auth.ensureAuthenticated, usersController.apiGet);

router.route('/api/me')
  .put(auth.ensureAuthenticated, usersController.apiPut);

// SQL Auth Routes
router.route('/auth/signup')
  .post(usersController.authSignup);

router.route('/auth/login')
  .post(usersController.authLogin);

//HARDCODED POST ROUTE
router.route('/api/posts')
  .get(usersController.postTest);

//WEATHER ROUTES
router.route('/api/weather/current/:id')
	.get(weatherController.getCurrentDay);

router.route('/api/weather/fourday/:id')
	.get(weatherController.getFourDay);

router.route('/api/weather/astronomy/:id')
	.get(weatherController.getAstronomy);

router.route('/api/weather/mooncast/:id')
	.get(weatherController.getFutureMoon);


//LOCATION ROUTES
//index	
router.route('/api/location')
	.get(locationController.index);
//show
router.route('/api/location/:id')
	.get(locationController.show);
//create
router.route('/api/location/')
	.post(locationController.create);	
//update
router.route('/api/location/:id')
	.put(locationController.update);
//destroy
router.route('/api/location/:id')
	.delete(locationController.destroy);


// STREAM FLOW ROUTES

// get current stream flow data
router.route('/fishspots')
	.post(flowController.getFishSpot);

// get past week stream flow data
router.route('/fishweek')
	.post(flowController.getWeeklyFlow);



//USER DATA (NOT WORKING)
router.route('/user/data')
	.get(auth.ensureAuthenticated, usersController.saveSpots);


module.exports = router;
