const Auth = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});

module.exports = function(app){
	app.get('/', requireAuth, function(req, res){
		res.send('Hello, Homepage!');
		//res.send({hi:'there'});
	});
	app.post('/signup', Auth.signup);
}
//console.log(req.body);