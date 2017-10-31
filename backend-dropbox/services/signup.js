var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
	 mongo.connect(mongoURL, function(){
	        console.log('Connected to mongo at: ' + mongoURL);
	        var newuser={firstname:msg.firstname,lastname:msg.lastname,email: msg.username, password:msg.password};
	        var coll = mongo.collection('user_details');
	        coll.insertOne(newuser, function(err, restl) {
			    if (err){
	                res.code = "401";
	                res.value = "Failed Signup";
	                console.log("Failed signup---");
	                callback(null, res);
			    	//throw err;
			    }
			    else{
	            	res.code = "200";
	                res.value="Success Signup";
	                console.log("Success---"+res.value.firstname);
	                callback(null, res);
	        }
			  });

	    });   
}

exports.handle_request = handle_request;