var express=require('express');
var kafka = require('./kafka/client');

exports.list=function(req,res){
	var uid=req.body.uid;
	console.log("UID list: "+uid);
	kafka.make_request('server_topic',{"id":uid,"action":2}, function(err,results){
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
	
	exports.listfolder=function(req,res){
		var uid=req.body.uid;
		console.log("UID list: "+uid);
		kafka.make_request('server_topic',{"id":uid,"action":4}, function(err,results){
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
		
	exports.deletefile=function(req,res){
		var fid=req.body.fid;
		var fname=req.body.fname;
		var uid=req.body.uid;
		console.log("FID delete: "+fid);
		kafka.make_request('server_topic',{"uid":uid,"fid":fid,"fname":fname,"action":11}, function(err,results){
	        console.log('in result');
	        console.log(results);
	        if(err){
	        	res.status(201).json({output:0});
	        }
	        else
	        {
	            if(results.code == 200){
	            	console.log("IN RESPONSE: "+results.value);
	            	res.status(201).json({output:results.value});
	            }
	            else {
	            	res.status(201).json({output:0});
	            }
	        }
	    });
		};