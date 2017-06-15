// var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

// var sequelize = new Sequelize('postgres://'+process.env.USERNAME+'@localhost:5432/satellizer_sequelize');

// Export models and Sequelize for seed and dbSetup
// module.exports.Sequelize = Sequelize;
// module.exports.sequelize = sequelize;

// var Location = sequelize.import('./location');
module.exports = function(sequelize, Sequelize){
var model = sequelize.define('user', {
  displayName: Sequelize.STRING,
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  instanceMethods: {
    comparePassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }  
});

//THIS drops the table after every server restart
//User.sync({force: true});

model.beforeCreate(function(user, options) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
});

  return model;
};

// module.exports = User;

// module.exports.models = {
//   Location: Location,
//   User: User
// };