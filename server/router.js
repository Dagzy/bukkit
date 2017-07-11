const Auth = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');
const requireSignin = passport.authenticate('local', {session: false});

const requireAuth = passport.authenticate('jwt', {session:false});

module.exports = function(app){
	app.get('/', requireAuth, function(req, res){
		res.send('Hello, Homepage!');
		//res.send({hi:'there'});
	});
	app.post('/signup', Auth.signup);
	app.post('/signin', requireSignin, Auth.signin);
}
//console.log(req.body);