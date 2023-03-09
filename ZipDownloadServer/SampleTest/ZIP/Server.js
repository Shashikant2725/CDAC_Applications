const express = require('express')
// require fs package to read files
const fspromises = require('fs').promises
const path = require('path')
var fs = require('fs'); 
const app = express()
const port = 9000
const AdmZip = require('adm-zip');
const uploadDir = fs.readdirSync(path.join(__dirname,"zipcontents")); 

app.get('/', (req, res) => {
 
    const fileOpsc= async () => {
        try{
            // Header Integration
            const header = await fspromises.readFile(path.join(__dirname,'chaincodeHeader.js'),'utf8');
            await fspromises.appendFile((path.join(__dirname),'zipcontents','supplychain.js'),header);
            console.log('Chaincode Header Inegrated Successfully');
    
            // Body Integration
            var filename='Acceptance'
            const body = await fspromises.readFile(path.join(__dirname,filename+'.js'),'utf8');
            await fspromises.appendFile((path.join(__dirname),'zipcontents','supplychain.js'),body);
            console.log('Chaincode Body Inegrated Successfully');
    
            // Footer Integration
            const footer = await fspromises.readFile(path.join(__dirname,'chaincodeFooter.js'),'utf8');
            await fspromises.appendFile((path.join(__dirname),'zipcontents','supplychain.js'),footer);
            console.log('Chaincode Footer Inegrated Successfully');
    
        } catch (err) {
            console.log(err);
        }
    }
    fileOpsc();
    const zip = new AdmZip();

    for(var i = 0; i < uploadDir.length;i++){
        zip.addLocalFile(path.join(__dirname,"zipcontents",uploadDir[i]));
    }
 
    // Define zip file name
    const downloadName = `supplychain.zip`;

    const data = zip.toBuffer();

    // save file zip in root directory
    zip.writeZip(path.join(__dirname,"/zipcontents",downloadName));
    
    // code to download zip file

    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${downloadName}`);
    res.set('Content-Length',data.length);
    res.send(data);
 
})
 
app.listen(port, () => console.log(`Server started on port ${port}`))







