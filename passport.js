var passport = require('passport');
var LocalStrategy = require('passport-local');

var User = require('./model/user');

passport.serialUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	done(err, user);
})
