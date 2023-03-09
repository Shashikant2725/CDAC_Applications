var fs = require('fs')
fs.readFile('./example.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
 
    var result = data.replace('hello', 'async');
  console.log(result)
    fs.writeFile('./example.txt', result, 'utf8', function (err) {
       if (err) return console.log(err);
    });

   
});