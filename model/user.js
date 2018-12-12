var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
	email: { type: String, unique: true, lowercase: true},
	password: String,
});
module.export = mongoose.model('Authuser', UserSchema);
