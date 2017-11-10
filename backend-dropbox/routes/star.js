var express=require('express');
var kafka = require('./kafka/client');

exports.updatestar=function(req,res){
	var fid=req.body.fid;
	var st=req.body.st;
	console.log("FID list: "+fid);

	kafka.make_request('server_topic',{"fid":fid,"st":st,"action":5}, function(err,results){
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
	
	exports.starred=function(req,res){
		var uid=req.body.uid;
		console.log("UID starred: "+uid);

		kafka.make_request('server_topic',{"uid":uid,"action":9}, function(err,results){
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