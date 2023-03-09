const fs = require('fs')
global.Temp=[];
// Read file into a string
fs.readFile('example.txt', 'utf-8', (err, contents) => {
  if (err) {
    return console.error(err)
  }

let file = fs.readFileSync("example.txt", "utf8");
let arr = file.split(/\r?\n/);
arr.forEach((line, idx)=> {
    if(line.includes("hello")){
    console.log((idx+1)+':'+ line);
    }
});
// 

})


  // Write back to file
//   Temp=contents;
//   console.log("Temp:;",Temp);
//   var count = (contents.match(/ctx,/g) || []).length;
// console.log(count);
//   for(var i=0;i<count;i++)
//   {
//     replace({
//     regex: "ctx,",
//     replacement: "IF WALA LOGIC",
//     paths: ['example.txt'],
//     recursive: true,
//     silent: true,
// });

//   }