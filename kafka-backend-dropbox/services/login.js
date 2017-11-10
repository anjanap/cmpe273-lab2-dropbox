var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var enc = require('./encrypt');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('user_details');

        /*coll.findOne({email: msg.username, password:msg.password}, function(err, user){
            if (user) {
            	res.code = "200";
                res.value=user;
                console.log("Success---"+res.value.firstname);
                callback(null, res);

            } else {
                res.code = "401";
                res.value = "Failed Login";
                console.log("Failed---");
                callback(null, res);
            }
        });*/

        coll.findOne({email: msg.username}, function(err, user){
            if (user) {
              var p=enc.check(msg.password,user.password);
              if(p){
              res.code = "200";
                res.value=user;
                console.log("Success---"+res.value.firstname);
                callback(null, res);
              }
              else {
                res.code = "401";
                res.value = "Failed Login";
                console.log("Failed---");
                callback(null, res);
              }

            } else {
                res.code = "401";
                res.value = "Failed Login";
                console.log("Failed---");
                callback(null, res);
            }
        });


    });
}

exports.handle_request = handle_request;
