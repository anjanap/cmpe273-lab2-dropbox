var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var ObjectID = require('mongodb').ObjectID;

function handle_request(msg, callback){
    var res = {};
    console.log("In STAR handle request:"+ JSON.stringify(msg));
    
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('file_details');
        var newst;
        if(msg.st==0)
        	newst=1;
        else
        	newst=0;

        console.log('*** NEW ST ' + newst+" FID: "+msg.fid);
        coll.update({_id: ObjectID(msg.fid)}, {"$set" : {starred:newst}},function(err, resl) {
		    if (err){
                res.code = "401";
                res.value = "0";
                console.log("Failed star---");
                callback(null, res);
		    	//throw err;
		    }
		    else{
            	res.code = "200";
                res.value="1";
                console.log("Success---");
                callback(null, res);
        }
        });      
    });  
}

function handle_request2(msg, callback){
    var res = {};
    console.log("In STAR handle request:"+ JSON.stringify(msg));
    
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('file_details');

        coll.find({userID:msg.uid,starred:1}).toArray(function(err, files){
            if (files) {
            	res.code = "200";
                res.value=files;
                console.log("Success starred files");
                callback(null, res);          

            } else {
                res.code = "401";
                res.value = "Failed to get starred files";
                console.log("Failed---");
                callback(null, res);
            }
        });   
    });  
}

exports.handle_request = handle_request;
exports.handle_request2 = handle_request2;
