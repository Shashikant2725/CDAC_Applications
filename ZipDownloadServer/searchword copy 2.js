const fs = require('fs')
global.Temp=''
// Read file into a string
fs.readFile('example.txt', 'utf-8', (err, contents) => {
  if (err) {
    return console.error(err)
  }

  // Replace string occurrences
  let updated=[] 
  // updated = contents.includes('hello')
  // Write back to file
  var count = (contents.match(/hello/g) || []).length;
console.log(count);
for(var i=0;i<count;i++)
  {
    fs.appendFile('example.txt', 'data to append','utf-8', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
  
  // fs.writeFile('example.txt', updated, 'utf-8', err2 => {
  //   if (err2) {
  //     console.log(err2)
  //   }
  // })
  // Temp=contents;
  // console.log(Temp.length);

})



// const fs = require('fs');
// var file_path = 'example.txt';
// fs.readFile(file_path, "UTF-8", (error, data) => {
//     if (error) throw error;
//     else {
        
//         for (let pos = data.indexOf('hello'); pos > -1; pos = data.indexOf('hello', pos + 1)) {
//             console.log(pos);
//         }
//         fs.close(file_path, (err) => {
//             if (err)
//                 console.error('Failed to close file', err);
//             else {
//                 console.log("\n> File Closed successfully");
//             }
//         });
//     }
// });