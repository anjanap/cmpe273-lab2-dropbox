var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
	 mongo.connect(mongoURL, function(){
	        console.log('Connected to mongo at: ' + mongoURL);
	        var newfolder={userID:msg.uid,foldername:msg.foldername};
	        var activity={userID:msg.uid,status:msg.foldername+": Folder created"};
	        var coll = mongo.collection('folder_details');
	        var c = mongo.collection('activity');
	        coll.insertOne(newfolder, function(err, restl) {
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
	                c.insertOne(activity,function(err,result){
	                	if(err)
	                		console.log("Failed activity");
	                	else
	                		console.log("Success activity");
	                		
	                })
	                callback(null, res);
	        }
			  });

	    });   
}

exports.handle_request = handle_request;