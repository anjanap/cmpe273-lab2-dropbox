var kafka = require('./kafka/client');

exports.signup= function(req,res) {
    	var fname=req.param("fname");
    	var lname=req.param("lname");
    	var username=req.param("email");
    	var password=req.param("password");
console.log("FROM FORM: "+fname+lname+username+password);
    	kafka.make_request('server_topic',{"firstname":fname,"lastname":lname,"username":username,"password":password,"action":3}, function(err,results){
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


