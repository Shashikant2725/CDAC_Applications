var fs = require('fs');

var search = "hello";


function append (line) { 
  line = line || 0;

  var body = fs.readFileSync('example.txt').toString();

  if (body.indexOf(search) < 0 ) {

    body = body.split('\n');
    body.splice(line + 1,0,search);
    body = body.filter(function(str){ return str; }); // remove empty lines
    var output = body.join('\n');
    fs.writeFileSync('example.txt', output);
  }
}


function remove () {

  var body = fs.readFileSync('example.txt').toString();
  var idx = body.indexOf(search);

  if (idx >= 0 ) {
    var output = body.substr(0, idx) + body.substr(idx + search.length);
    fs.writeFileSync('example.txt', output);
  }

}