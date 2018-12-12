var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var morgan = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-Parser');
var MongoStore = require('connect-mongo')(session);


var app = new express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');

mongoose.connect('mongodb://root:root123@ds251240.mlab.com:51240/nodehome',
{ useNewUrlParser: true }, 
	function(err){
		if(err){
			console.log(err);
		}else{
			console.log('Connected to the DB')
		}
	});


var UserSchema = new mongoose.Schema({
	name: String,
	age: Number
});

UserSchema.methods.addLastName = function(lastName){
	this.name = this.name + " " + lastName;
	return this.name;
};

var User = mongoose.model('User', UserSchema);
app.use(morgan('dev'));
app.use(cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resave: true;
	saveUnitialized: true;
	secret: "hello";
	store: new MongoStore({ url: 'mongodb://root:root123@ds251240.mlab.com:51240/nodehome', autoReconnect: true})
}))

app.get('/', function(req, res, next){
	res.render('home', {name: 'Mubarak'});
});

app.get('/about', function(req, res, next){
	res.render('about');
})

app.get('/all_user', function(req, res, next){
	User.find({}, function(err, foundUser){
			if(foundUser){
				res.json(foundUser);
			}else{
				res.json("Not Users Found");
			}
	});
});


app.get('/:id', function(req, res, next){
	User.findById({ _id: req.params.id }, function(err, foundUser){
			foundUser.addLastName("Aminu");
			foundUser.save(function(err){
				res.json(foundUser);
			})
	});
});


app.post('/create_user', function(req, res, next) {
		var user = new User();
			user.name = req.body.name;
			user.age = req.body.age;
			user.save(function(err){
				if(err){
					console.log(err);
				}else{
					res.json(user);
				}
			})
})
/*app.get('/create_user', function(req, res, next){
	var user = new User();
		user.name = "mubarak";
		user.age = 123456;
		user.save(function(err){
			if(err) next(err);
			res.json(user);
		});
		
});*/

app.get('/category', function(req, res, next){
	res.json('All Categories are Displayed Here');
});

/*app.get('/:name', function(req, res, next){
		res.json(req.params.name);
});
*/
 function enterkenya(req, res, next){
 	if(req.params.name == "ok"){
 		next();
 	}else{
 		res.json("You are not allow to enter the airport");
 	}
 }

app.get('/kenya/:name', enterkenya, function(req, res, next){
		res.json('We have Arrived');
});



app.listen(4000, function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Running on port 4000');
	}
});
