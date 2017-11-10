var bcrypt = require('bcrypt');

var encrypt = function(pwd) {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(pwd, salt);
	return hash;
};



var check = function(pwd,hash){
	return bcrypt.compareSync(pwd, hash);
};


exports.encrypt=encrypt;
exports.check=check;
