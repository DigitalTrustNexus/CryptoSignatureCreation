var fs = require('fs');
var crypto = require('crypto');

// the file you want to get the hash    
var file = 'designFiles/Turbine_Blade_Good.stl';
var fd = fs.createReadStream(file);
var hash = crypto.createHash('sha256');
hash.setEncoding('hex');

fd.on('end', function() {
    hash.end();
    hashHexString = hash.read();	
    console.log("hashHexString in fd.on: " + hashHexString);
});

fd.pipe(hash);
