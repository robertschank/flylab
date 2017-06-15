//Connect
var Sequelize = require('sequelize');
var env = require('../.env.js');
var sequelize = new Sequelize('postgres://' + env.user + '@localhost:5432/satellizer_sequelize');
console.log(process.env.USERNAME);
// Export models and Sequelize for seed and dbSetup
module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

var User = sequelize.import("./user_sql");
var Location = sequelize.import("./location");


Location.belongsTo(User);
User.hasMany(Location);



module.exports.models = {
	User: User,
	Location: Location
};