var kafka = require('./kafka/client');

exports.creategroup= function(req,res) {
	var uid=req.body.uid;
	var grp=req.body.newg;
    	kafka.make_request('server_topic',{"groupname":grp,"uid":uid,"action":12}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
            	res.status(201).json({output:0});
            }
            else
            {
                if(results.code == 200){
                	console.log("IN SUCCESS: "+results.value);
                	res.status(201).json({output:1});
                }
                else {
                	res.status(201).json({output:0});
                }
            }
        });
};


exports.listgroups=function(req,res){
	var uid=req.body.uid;
	console.log("UID list: "+uid);
	kafka.make_request('server_topic',{"id":uid,"action":13}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
        	res.status(201).json({output:0});
        }
        else
        {
            if(results.code == 200){
            	console.log("IN LIST GRPS: "+results.value);
            	res.status(201).json({output:results.value});
            }
            else {
            	res.status(201).json({output:0});
            }
        }
    });
	};