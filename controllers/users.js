var db = require('../models');
var sqlUser = db.models.User;
//var sqlUser = require('../models/user_sql'),
	auth = require('../resources/auth');


function apiGet (req, res) {
	sqlUser.findById(req.user).then(function (user) {
	    if (!user) {
	      return res.status(400).send({ message: 'User not found.' });
	    }
	    console.log(user);
	    res.send(user);
  	});
}

function apiPut (req, res) {
	sqlUser.findById(req.user).then(function (user) {
	    if (!user) {
	      return res.status(400).send({ message: 'User not found.' });
	    }
	    user.displayName = req.body.displayName || user.displayName;
	    user.username = req.body.username || user.username;
	    user.email = req.body.email || user.email;
	    user.save().then(function(result) {
	      if (!result) {
	        res.status(500).send({ message: "Oh noes an error!" });
	      }      
	      res.send(result);
    	});
  	});
}

function authSignup (req, res) {
	sqlUser.findOne({where: { email: req.body.email }}).then(function (existingUser) {
	    if (existingUser) {
	      return res.status(409).send({ message: 'Email is already taken.' });
	    }
	    var user = sqlUser.build({
	      displayName: req.body.displayName,
	      username: req.body.username,
	      email: req.body.email,
	      password: req.body.password
	    });
	    user.save().then(function (result) {
	      if (!result) {
	        res.status(500).send({ message: "Oh noes an error!" });
	      }
	      res.send({ token: auth.createJWT(result) });
	    });
  	});
}

function authLogin (req, res) {
	sqlUser.findOne({where: { email: req.body.email }}).then(function (existingUser) {
	    if (!existingUser) {
	      return res.status(401).send({ message: 'Invalid email or password.' });
	    }
	    var validPassword = existingUser.comparePassword(req.body.password);
	    if (!validPassword) {
	      return res.status(401).send({ message: 'Invalid email or password.' });
	    }
	    res.send({ token: auth.createJWT(existingUser) });
  	});
}

function postTest (req, res) {
	res.json([
		{
		  title: "Hardcoded Title",
		  content: "Here is some great hardcoded content for the body of a blog post. Happy coding!"
		},
		{
		  title: "Another Post",
		  content: "MEAN stack is the best stack."
		}
	]);
}

let testCoord = "43.653436,-110.715088";
function saveSpots (req, res) {
	sqlUser.findById(req.user)
		.then(function (user) {
	    if (!user) {
	      return res.status(400).send({ message: 'User not found.' });
	    }
	    //res.send(user);
	    console.log(user);
	 //    user.coordinates.updateAttributes(testCoord);
		// })
		// .then(function(user) {
		// 	console.log(user);
	});
}


module.exports = {
	apiGet: apiGet,
	apiPut: apiPut,
	authSignup: authSignup,
	authLogin: authLogin,
	postTest: postTest,
	saveSpots: saveSpots
};

