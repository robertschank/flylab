module.exports = function(sequelize, Sequelize){
	var model = sequelize.define("location", {
		coordinates: Sequelize.STRING,
		user_id: Sequelize.INTEGER
	});
	return model;
};