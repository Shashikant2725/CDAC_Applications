// const fs = require('fs')
// global.Temp=[];
// // Read file into a string
// fs.readFile('example.txt', 'utf-8', (err, contents) => {
//   if (err) {
//     return console.error(err)
//   }
//   // Replace string occurrences
//   let updated=[] 
//   updated = contents.includes('hello')
//   // Write back to file
//   Temp=contents;
//   console.log("Temp:;",Temp);
//   var count = (contents.match(/hello/g) || []).length;
// console.log(count);
//   for(var i=0;i<count;i++)
//   {  
//           if(contents.includes('hello'))
//           {
//             fs.appendFile('example.txt', 'data to append \n', function (err) {
//               if (err) throw err;
//               console.log('Saved!');
//             }); 
//           }
        
//   }

// })








const fs = require('fs')
var i=0;
var data = fs.readFileSync('example.txt','utf8').toString().split("\n")
 data.forEach((line, idx)=> {
    idx=idx+i;
        if(data[idx].includes("hello")){
        data.splice([idx+1],0,"if(something)");
        var text = data.join("\n");
        fs.writeFile('example.txt', text, function (err) {
         if (err) return console.log(err);
       });
       i=1;
}

});




