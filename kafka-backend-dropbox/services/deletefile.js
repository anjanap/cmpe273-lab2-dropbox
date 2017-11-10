var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');

function handle_request(msg, callback){
    var res = {};
    console.log("In Delete handle request:"+ JSON.stringify(msg));
    var activity={userID:msg.uid,status:msg.fname+": File deleted"};
    var c = mongo.collection('activity');
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('file_details');
        
        coll.remove({_id: ObjectID(msg.fid)}, function(err, obj) {

		    if (err){
                res.code = "401";
                res.value = "0";
                console.log("Failed delete");
                callback(null, res);

		    }
		    else{
            	res.code = "200";
                res.value="1";
                console.log("Success delete");
               /* fs.unlink('./file_uploads'+msg.fname, function(error) {
                    if (error) {
                        throw error;
                    }
                    console.log('Deleted dog.jpg!!');
                });*/
                
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