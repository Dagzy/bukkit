const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
//create local strategy
//usernameField: 'email'
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	User.findOne({email:email}, function(err, user){
		if(err){return done(err);};
		if(!user){return done(null, false);};
		//compare passwords - is 'password' equal to user.password?
		//compare pw from req with users saved pw
		user.comparePassword(password, function(err, isMatch){
			//if there was an error, return early
			if(err){return done(err);};
			//if it's not the same, it will return false and say they didn't match up
			if (!isMatch){return done(null, false);}
			//if same, it will call passport callback with user model
			return done(null, user);
		});
		//tricky part -> we salted the password, and we need to somehow decode encrypted pw to normal pw
	});
	//Otherwise, call done with false
});
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};
//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	//On payload we have sub property. Use the User model, look through all users and find user with given
	User.findById(payload.sub, function(err, user){
		//In the findById callback, we will get two arguments err and user. Err is going to be populated if search fails
		if (err){return done(err, false);}
		//If we can find the user, pass it to done callback. They are authenticated.
		if (user){
			done(null, user);
		}else{
			//If we can not find user with id, we are going to call done func without user object
			done(null, false);
		}
	}); 
});
passport.use(jwtLogin);
passport.use(localLogin);
