var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

exports.connect = function(url, callback){
    MongoClient.connect(url, {poolSize: 30},function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
      db = _db;
      connected = true;
      console.log(connected +" is connected.==="+db);
      callback(db);
    });
};

exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};

/*
MongoClient.connect(url, {  
	  poolSize: 10
	},function(err, db) {
	    assert.equal(null, err);
	    mongodb=db;
	    }
	);*/