var passport = require('passport');
var LocalStrategy = require('passport-local');

var User = require('./model/user');

passport.serialUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	done(err, user);
})

//Sign in
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'pasword',
	passReqToCallback: true
}, function(req, email, password, done){
		User.findOne({email: email}, function(err, user){
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false);
			}
			if(!user.comparePassword(password)){
				return done(null, false);
			}
			return done(null, user);
		});
}))
