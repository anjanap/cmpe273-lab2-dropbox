var express=require('express');
var multer=require('multer');
var router=express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../backend-dropbox/file_uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
});

var upload = multer({storage:storage});

router.post('/addfile', upload.single('myfile'), function (req, res, next) {
	var uid=req.body.uid;
	var fname=req.file.filename;
	
	console.log("CHECK upload file name: "+fname);
	
	kafka.make_request('server_topic',{"foldername":fname,"uid":uid,"action":6}, function(err,results){
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
    console.log(req.file);
});

module.exports=router;