var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username   , password, done) {
 
    	kafka.make_request('server_topic',{"username":username,"password":password,"action":1}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
            	console.log("Error in passport");
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                	console.log("IN PASSPORT: "+results.value);
                    done(null,{r:results.value});
                }
                else {
                    done(null,false);
                }
            }
        });
    }));
};


