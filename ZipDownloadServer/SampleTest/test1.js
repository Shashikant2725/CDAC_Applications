// Node.js program to demonstrate the
// fs.writeFile() method

// Import the filesystem module
const fs = require('fs');
const path=require('path');
const  util = require("util");

var data1;

fs.readFile(path.join(__dirname,'hello.js'),(err, data) =>{
	if (err) {
        console.log(err);
        process.exit(1);
    }
	data1=data.toString();
	console.log("read-data:::",data1);

	// fs.writeFile(path.join(__dirname,'chaincodeHeader.js'),data1,(err) =>{
  
		fs.appendFile(path.join(__dirname,'chaincodeHeader.js'),data1,(err) =>{
			console.log("append-data:::",data1);

		})
	// })
	

});




