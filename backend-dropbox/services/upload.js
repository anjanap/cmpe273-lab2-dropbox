var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
	 mongo.connect(mongoURL, function(){
	        console.log('Connected to mongo at: ' + mongoURL);
	        var newfolder={userID:msg.uid,filename:msg.foldername,starred:0,folderid:0};
	        var activity={userID:msg.uid,status:msg.foldername+": File uploaded"};
	        var coll = mongo.collection('file_details');
	        var c = mongo.collection('activity');
	        coll.insertOne(newfolder, function(err, restl) {
			    if (err){
	                res.code = "401";
	                res.value = "0";
	                console.log("Failed upload");
	                callback(null, res);
			    	//throw err;
			    }
			    else{
	            	res.code = "200";
	                res.value="1";
	                console.log("Success upload");
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


function handle_request2(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log("FOLDER ID UPLOAD: "+msg.foldID);
	 mongo.connect(mongoURL, function(){
	        console.log('Connected to mongo at: ' + mongoURL);
	        var newfolder={userID:msg.uid,filename:msg.foldername,starred:0,folderid:msg.foldID};
	        var activity={userID:msg.uid,status:msg.foldername+": File uploaded"};
	        var coll = mongo.collection('file_details');
	        var c = mongo.collection('activity');
	        coll.insertOne(newfolder, function(err, restl) {
			    if (err){
	                res.code = "401";
	                res.value = "0";
	                console.log("Failed upload");
	                callback(null, res);
			    	//throw err;
			    }
			    else{
	            	res.code = "200";
	                res.value="1";
	                console.log("Success upload");
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
exports.handle_request2 = handle_request2;