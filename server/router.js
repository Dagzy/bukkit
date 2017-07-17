const Auth = require('./controllers/auth');
const BucketList = require('./controllers/bucketlistcontroller')

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
	app.post('/signup', Auth.signup);
	app.post('/signin', requireSignin, Auth.signin);
	app.post('/new-item', requireAuth, BucketList.addBucketList);
}
//console.log(req.body);