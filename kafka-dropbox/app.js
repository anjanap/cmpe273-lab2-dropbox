var express = require('express')
  , routes = require('./routes')
  , signup = require('./routes/signup')
  , list = require('./routes/list')
  , star = require('./routes/star')
  , upload = require('./routes/upload')
  , createfolder = require('./routes/createfolder')
  , activityrep = require('./routes/activityrep')
  , http = require('http')
  , path = require('path');
var crypto = require('crypto');
var cors = require('cors');
var download=require('download');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./routes/passport')(passport);

var mongoSessionURL = "mongodb://localhost:27017/sessions";
var mongoStore = require("connect-mongo/es5")(session);
var kafka = require('./routes/kafka/client');


var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "dropbox",
    resave: true,
    saveUninitialized: true, 
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    cookie: { secure: false,
        httpOnly: false},
    store: new mongoStore({
        url: mongoSessionURL
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/signup', signup.signup);
app.use('/list', list.list);
app.use('/listfolder', list.listfolder);
app.use('/updatestar', star.updatestar);
app.use('/starred', star.starred);

var multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../backend-dropbox/file_uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
});

var upload = multer({storage:storage});
app.use('/addfile', upload.single('myfile'), function (req, res, next) {
	var uid=req.body.uid;
	var fname=req.file.filename;
	
	console.log("CHECK upload file name: "+fname);
	
	kafka.make_request('server_topic',{"foldername":fname,"uid":uid,"action":6}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
        	res.status(201).json({output:0});
        }
        else
        {
            if(results.code == 200){
            	console.log("IN PASSPORT: "+results.value);
            	res.status(201).json({output:1});
            }
            else {
            	res.status(201).json({output:0});
            }
        }
    });
    console.log(req.file);
});

app.use('/folderfile', upload.single('myfile'), function (req, res, next) {
	var uid=req.body.uid;
	var fname=req.file.filename;
	var foldID=req.body.foldID;
	console.log("CHECK upload file name: "+fname);
	
	kafka.make_request('server_topic',{"foldername":fname,"uid":uid,"foldID":foldID,"action":10}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
        	res.status(201).json({output:0});
        }
        else
        {
            if(results.code == 200){
            	console.log("IN PASSPORT: "+results.value);
            	res.status(201).json({output:1});
            }
            else {
            	res.status(201).json({output:0});
            }
        }
    });
    console.log(req.file);
});


app.use('/createfolder', createfolder.create);
app.use('/activityrep', activityrep.activityrep);

app.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user) {
        if(!user) {
        	console.log("CHECK: "+ user);
        	res.status(201).json({output:0});
        }
        else{
        req.session.user = user.username;
        console.log("Session initialised: "+req.session.user);
        //req.session.save();
        res.status(201).send({output:user.r});}
              
    })(req, res);
});

app.get('/download/*',function(req,res){
	var f=req.params[0];
	console.log("filename: "+f)
	var path='../backend-dropbox/file_uploads/'+f;
	console.log("filename path: "+path)
	return res.download(path);
	});


app.post('/logout', function(req,res) {
	   console.log("Check session: "+req.session.user);
	    req.session.destroy();
	    console.log('Session Destroyed');
	    res.status(200).send();
	});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;
