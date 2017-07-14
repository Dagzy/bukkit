const Auth = require('./controllers/auth');
const passport = require('passport');
const passportService = require('./services/passport');
const requireSignin = passport.authenticate('local', {session: false});

const requireAuth = passport.authenticate('jwt', {session:false});

module.exports = function(app){
	app.get('/', requireAuth, function(req, res){
		res.send({message:'hey'});
		//res.send({hi:'there'});
	});
	app.post('/signup', Auth.signup);
	app.post('/signin', requireSignin, Auth.signin);
}
//console.log(req.body);