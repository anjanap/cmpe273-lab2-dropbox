var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var list = require('./services/list');
var signup = require('./services/signup');
var star = require('./services/star');
var upload = require('./services/upload');
var createfolder = require('./services/createfolder');
var activityrep = require('./services/activityrep');

var server_topic = 'server_topic';
var consumer = connection.getConsumer(server_topic);
var producer = connection.getProducer();

console.log('server is running');

consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    var action=data.data.action;
    console.log("ACTION-----"+data.data.action);
    
    if(action==1){
    login.handle_request(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }];
        producer.send(payloads, function(err, data){
            console.log("Producer:-- ");
        });
        return;
    });
    }//if 1
      
    else if(action==2){
    	list.handle_request(data.data, function(err,res){
            console.log('after handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];     
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }//if 2
    
    else if(action==3){
        signup.handle_request(data.data, function(err,res){
            console.log('after handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }//if 3  
    
    else if(action==4){
    	list.handle_request2(data.data, function(err,res){
            console.log('after handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];     
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }//if 4
    
    else if(action==5){
    	star.handle_request(data.data, function(err,res){
            console.log('after handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];     
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }//if 5
    
    else if(action==6){
    	upload.handle_request(data.data, function(err,res){
            console.log('after upload handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];     
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });    	
        }//if 6 upload file
    
    else if(action==7){
    	createfolder.handle_request(data.data, function(err,res){
            console.log('after upload handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];     
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }//if 7 create folder
    
    else if(action==8){
    	activityrep.handle_request(data.data, function(err,res){
            console.log('after activity handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];     
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }//if 8 activity
    
    else if(action==9){
    	star.handle_request2(data.data, function(err,res){
            console.log('after starred handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];     
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });
        }//if 9 starred
    
    else if(action==10){
    	upload.handle_request2(data.data, function(err,res){
            console.log('after upload handle'+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }];     
            producer.send(payloads, function(err, data){
                console.log("Producer:-- ");
            });
            return;
        });    	
        }//if 10 upload file
});
