var express=require('express');
var kafka = require('./kafka/client');



exports.activityrep=function(req,res){
	var uid=req.body.uid;
	console.log("UID list: "+uid);

	kafka.make_request('server_topic',{"id":uid,"action":8}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
        	res.status(201).json({output:0});
        }
        else
        {
            if(results.code == 200){
            	console.log("IN PASSPORT: "+results.value);
            	res.status(201).json({output:results.value});
            }
            else {
            	res.status(201).json({output:0});
            }
        }
    });
	};