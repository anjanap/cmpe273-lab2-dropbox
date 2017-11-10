var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('activity');

        coll.find({userID:msg.id}).toArray(function(err, files){
            if (files) {
            	res.code = "200";
                res.value=files;
                console.log("Success activity log");
                callback(null, res);
                

            } else {
                res.code = "401";
                res.value = "Failed";
                console.log("Failed activity log");
                callback(null, res);
            }
        });
    });  
}

exports.handle_request = handle_request;
