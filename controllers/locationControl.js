let db = require('../models');
let Location = db.models.Location;

function index(req, res) {
	Location.findAll()
	.then(function(locations) {
		res.json(locations);
	});
}

function show(req, res) {
	Location.findById(req.params.id)
	.then(function(location) {
		if(!location) return error(res, "not found");
		res.json(location);
	});
}

function create(req, res) {
	console.log(req.body);
	Location.create(req.body)
	.then(function(location) {
		if(!location) return error(res, "not saved");
		res.json(location);
	});
}

function update(req, res) {
	Location.findById(req.params.id)
	.then(function(location) {
		if(!location) return error(res, "not found");
		return location.updateAttributes(req.body);
	})
	.then(function(location) {
		res.json(location);
	});
}

function destroy(req, res) {
	Location.findById(req.params.id)
	.then(function(location) {
		if(!location) return error(res, "not found");
		return location.destroy();
	})
	.then(function() {
		res.redirect('/location');
	});

}



module.exports = {
	index: index,
	show: show,
	create: create,
	update: update,
	destroy: destroy
};
