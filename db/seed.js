var DB = require('../models').models;

var locationCreate = function() {
	return DB.Location.create({
		coordinates: "43.653436,-110.715088",
		user_id: 1
	});
};


locationCreate()
.then(function() {
	process.exit();
});
