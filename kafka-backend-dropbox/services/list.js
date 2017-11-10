var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('file_details');

        coll.find({userID:msg.id}).toArray(function(err, files){
            if (files) {
            	res.code = "200";
                res.value=files;
                //console.log("Success---"+files[1].filename);
                callback(null, res);
                

            } else {
                res.code = "401";
                res.value = "Failed to get files";
                console.log("Failed---");
                callback(null, res);
            }
        });
    });  
}

function handle_request2(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('folder_details');

        coll.find({userID:msg.id}).toArray(function(err, files){
            if (files) {
            	res.code = "200";
                res.value=files;
                //console.log("Success---"+files[1].filename);
                callback(null, res);
                

            } else {
                res.code = "401";
                res.value = "Failed to get files";
                console.log("Failed---");
                callback(null, res);
            }
        });
    });  
}

exports.handle_request = handle_request;
exports.handle_request2 = handle_request2;