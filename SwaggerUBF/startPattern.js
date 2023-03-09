let n = 6;
let string = "";

for (let i = 1; i <= n; i++) {
  // printing star
  for (let j = 0; j < i; j++) {
    if(i === n) {
      
      string +="*";
    }
    else {
      if (j == 0 || j == i - 1) {
        string += "/**";
        if(j>0){
          string += " ";
          string += "\n";
          string += "*";
        }
        
      }
      else {
        string += " ";
        // string += " ";
      }
    }
  }
  string += "\n";
}
console.log(string);