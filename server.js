var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	auth = require('./resources/auth');

//require env
require('dotenv').load();

//use bodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// static files from public folder
app.use(express.static(__dirname + '/public'));

// require SQL User
//var sqlUser = require('./models/user_sql');

// require routes
var routes = require('./config/routes');
app.use(routes);

// Catch ALL Route
app.get(['/', '/home', '/signup', '/login', '/profile', '/landing', '/hatches', '/about', '/patterns'], function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// // SQL API Routes
// app.get('/api/me', auth.ensureAuthenticated, function (req, res) {
//   sqlUser.findById(req.user).then(function (user) {
//     if (!user) {
//       return res.status(400).send({ message: 'User not found.' });
//     }
//     res.send(user);
//   });
// });

// app.put('/api/me', auth.ensureAuthenticated, function (req, res) {
//   sqlUser.findById(req.user).then(function (user) {
//     if (!user) {
//       return res.status(400).send({ message: 'User not found.' });
//     }
//     user.displayName = req.body.displayName || user.displayName;
//     user.username = req.body.username || user.username;
//     user.email = req.body.email || user.email;
//     user.save().then(function(result) {
//       if (!result) {
//         res.status(500).send({ message: "Oh noes an error!" });
//       }      
//       res.send(result);
//     });
//   });
// });


// // SQL Auth Routes
// app.post('/auth/signup', function (req, res) {
//   sqlUser.findOne({where: { email: req.body.email }}).then(function (existingUser) {
//     if (existingUser) {
//       return res.status(409).send({ message: 'Email is already taken.' });
//     }
//     var user = sqlUser.build({
//       displayName: req.body.displayName,
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password
//     });
//     user.save().then(function (result) {
//       if (!result) {
//         res.status(500).send({ message: "Oh noes an error!" });
//       }
//       res.send({ token: auth.createJWT(result) });
//     });
//   });
// });

// app.post('/auth/login', function (req, res) {
//   sqlUser.findOne({where: { email: req.body.email }}).then(function (existingUser) {
//     if (!existingUser) {
//       return res.status(401).send({ message: 'Invalid email or password.' });
//     }
//     var validPassword = existingUser.comparePassword(req.body.password);
//     if (!validPassword) {
//       return res.status(401).send({ message: 'Invalid email or password.' });
//     }
//     res.send({ token: auth.createJWT(existingUser) });
//   });
// });

// //HARDCODED POST ROUTE
// app.get('/api/posts', function (req, res) {
//   res.json([
//   {
//     title: "Hardcoded Title",
//     content: "Here is some great hardcoded content for the body of a blog post. Happy coding!"
//   },
//   {
//     title: "Another Post",
//     content: "MEAN stack is the best stack."
//   }
//   ]);
// });

//localhost 9000 
app.listen(process.env.PORT || 9000, function() {
	console.log('server started');
});