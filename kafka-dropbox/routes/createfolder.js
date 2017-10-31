var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

exports.create= function(req,res) {
	var uid=req.body.uid;
	var newf=req.body.newf;
	console.log("Folder: "+newf);
	console.log("Folder uid: "+uid);

    	kafka.make_request('server_topic',{"foldername":newf,"uid":uid,"action":7}, function(err,results){
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
};


