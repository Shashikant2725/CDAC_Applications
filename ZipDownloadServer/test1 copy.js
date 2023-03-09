'use strict'

let express = require('express')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())
const path = require('path')
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const NodeCouchDb = require('node-couchdb');


const { Gateway, Wallets } = require('fabric-network')
global.mongodata = []
global.Domainname=''
global.CCfilename=''
global.Description=''
// global.chaincodeheader=''
global.chaincodebody=''


// global.chaincodefooter=''

const fs = require('fs')
const axios = require('axios')
const { promises: { readdir } } = require('fs')
const { error } = require('console')
const uuidv4 = require("uuid/v4")
const cors = require('cors');
const del = require('del');
const fsmove = require ('fs-extra');
// const zipFolder = require('zip-a-folder')
// const zipFolder = require('zip-folder');
const folderZipper = require('folder-zipper');



const fspromises = require('fs').promises

const AdmZip = require('adm-zip');
const { Domain } = require('domain')

app.use(cors());



app.post('/test', async function (req, res, next) {

   
       
            try{
                // alert('bhai post sai hu')
                var datas=[];
                // datas = req.body;
                datas.push(req.body.user.requestedfunction);
                console.log("data::",datas);

                let res = await axios.get(`http://10.244.1.51:4300/api/nodefunction/${datas}`);
                mongodata = res.data;
                console.log("mongoData::",mongodata)
                // console.log('Value form mongodb',mongodata)
                // console.log('DOMAIN NAME',mongodata.Domain)
                Domainname = mongodata.Domain
                CCfilename = Domainname+'.js'
                
                Description = mongodata.Description
                chaincodebody = mongodata.Code
                // check = 0;
                const fileOpsc= async () => {
                    // console.log('DOMAIN NAME inside',data.Domain)
console.log('Filename',CCfilename)

               // Deleting Previously Created Folder
               if (fs.existsSync(path.join(__dirname,'Chaincode',Domainname))) {
                console.log('Directory exists!');
                await del(path.join(__dirname,'Chaincode',Domainname))
                console.log('Previously Working Folder Deleted Successfully')

                await del(path.join(__dirname,"CS",Domainname))
                console.log('Replica Folder Deleted Successfully')
               
               } else {
                console.log('Directory not found.');
               }

               //Creating Folder Structure

               // Creating Main Directory
              
               
             await fs.mkdir(path.join(__dirname,'Chaincode',Domainname), { recursive: true }, (error) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(Domainname," Directory created successfully !!");
                  
                  //Creating Sub Folder Node
                   fs.mkdir(path.join(__dirname,'Chaincode',Domainname,'node'), { recursive: true }, (error) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Node Sub-Directory created successfully !!");

                      //Creating Sub Folder Lib
                       fs.mkdir(path.join(__dirname,'Chaincode',Domainname,'node','lib'), { recursive: true }, (error) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Lib Sub-Directory created successfully !!");
                        }
                      });

                    }
                  });

                }

              


                // Integrating index.js

                const index = `
'use strict';
                
const ${Domainname}= require('./lib/${Domainname}');
                                
module.exports.${Domainname} = ${Domainname};
module.exports.contracts = [ ${Domainname} ];`
                                
fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",'index.js')),index);
                console.log('index.js Inegrated Successfully');


              //Package.json Integration

              const packagejson = `
{
    "name":"${Domainname.toLowerCase()}",
    "version": "1.0.0",
    "description": "${Description}",
    "main": "index.js",
    "engines": {
        "node": ">=12",
        "npm": ">=6.9"
    },
    "scripts": {
        "lint": "eslint .",
        "pretest": "npm run lint",
        "test": "nyc mocha --recursive",
        "start": "fabric-chaincode-node start"
    },
    "engineStrict": true,
    "author": "Hyperledger",
    "license": "Apache-2.0",
    "dependencies": {
        "fabric-contract-api": "^2.0.0",
        "fabric-shim": "^2.0.0"
    },
    "devDependencies": {
        "chai": "^4.1.2",
        "eslint": "^4.19.1",
        "mocha": "^5.2.0",
        "nyc": "^14.1.1",
        "sinon": "^6.0.0",
        "sinon-chai": "^3.2.0"
    },
    "nyc": {
        "exclude": [
            "coverage/**",
            "test/**"
        ],
        "reporter": [
            "text-summary",
            "html"
        ],
        "all": true,
        "check-coverage": true,
        "statements": 100,
        "branches": 100,
        "functions": 100,
        "lines": 100
    }
}
            
              `
              fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",'package.json')),packagejson);
              console.log('package.json Inegrated Successfully');

            //Chaincode Integration

 const chaincodeheader = `
 'use strict';
 
 const { Contract } = require('fabric-contract-api');
               
 class ${Domainname} extends Contract {
               
               `
 
               const chaincodefooter = `
 }
 
 module.exports = ${Domainname};
               `


              fspromises.appendFile(path.join(__dirname,"Chaincode",Domainname,"node",CCfilename), chaincodeheader);
              console.log('Chaincode Header Inegrated Successfully');
             
              fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",CCfilename)),chaincodebody);
              console.log('Chaincode Body Inegrated Successfully');

              fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",CCfilename)),chaincodefooter);
              console.log('Chaincode Footer Inegrated Successfully');

            
             fsmove.move(path.join(__dirname,"Chaincode",Domainname,"node",CCfilename), path.join(__dirname,"Chaincode",Domainname,"node",'lib',CCfilename), (err) => {
                if (err) return console.log(err);
                console.log(`File successfully moved!!`);
                fsmove.copy(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"CS",Domainname), function (err) {
                  console.log("ooo")
                   if (err) {                 
                     console.error(err);      
                   } else {
                     console.log("copy success!");

                     const downloadName = `${Domainname}.zip`;

// zipFolder(path.join(__dirname,"Chaincode",Domainname),path.join(__dirname,"zipcontents",downloadName));


 folderZipper(path.join(__dirname,"CS",Domainname), path.join(__dirname,"zipcontents",downloadName))
.then(result => {
    console.log('Zip Done!',result);
})
.catch(error => {
    console.log(error);
});
                   }
                 });
              });
           
// console.log('hjgashgsjagsjdgajsdjagsdgasgdhgasjgdjasggdhj')
              
              // fileZip();

            //Zipping Procedure Starts
            
            //  const uploadDir = fs.readdirSync(path.join(__dirname,"Chaincode",Domainname)); 

            // const zip = new AdmZip();

            // zip.addLocalFolder(path.join(__dirname,"Chaincode",Domainname,))


            
           
            // const zip = new AdmZip();
            // zip.addLocalFolder(path.join(__dirname,"Chaincode",Domainname));

            // for(var i = 0; i < uploadDir.length;i++){
            //     zip.addLocalFile(path.join(__dirname,"zipcontents",uploadDir[i]));
            // }
 
            // Define zip file name
            // const downloadName1 = `${Domainname}.zip`;

            // const data = zip.toBuffer();

            // save file zip in root directory
            // zip.writeZip(path.join(__dirname,"/zipcontents",downloadName1));
            // zip.addLocalFolder(path.join(__dirname,"Chaincode",Domainname,'node'))
            // zip.addLocalFolder(path.join(__dirname,"Chaincode",Domainname,'node','lib'))


            // Define zip file name

            // const data = zip.toBuffer();

            // save file zip in root directory
            // zip.writeZip(path.join(__dirname,"/zipcontents",downloadName));

            });
                
        
            } 

            const fileZip= async () => {
//Zipping Procedure Starts

            }
             fileOpsc();
            //  fileZip();
            res.status(200).json('Transaction Send Successful') 
        }
        
            
        catch (err) {
            console.log(`Failed to evaluate transaction: ${err}`)
            res.status(400)({
                result : null,
                error : err.message
                })
        } 
        

          
       
})

app.get('/Downloads',async function(req,res){
    res.download(path.join(__dirname,'zipcontents','supplychain.zip'));
})


app.post('/test-poe', async function (req, res) {

   
       
    try{
        var datas=[];
        datas = req.body;
        console.log("data[]",datas);
        // console.log('hello satish')
        
        const fileOpsc= async () => {

        

         //deleting previous files

        fs.exists(path.join(__dirname,'Chaincode-poe','poe','node','poe.js'), function(exists) {

            if(exists) {
                console.log('poe.js exists. Deleting now ...');
                 fspromises.unlink(path.join(__dirname,'Chaincode-poe','poe','node','poe.js'));
            } else {
                console.log('poe.js not found, so not deleting.');
            }
        })

        fs.exists(path.join(__dirname,'Chaincode-poe','poe','node','package.json'), function(exists) {

            if(exists) {
                console.log('package.json exists. Deleting now ...');
                 fspromises.unlink(path.join(__dirname,'Chaincode-poe','poe','node','package.json'));
            } else {
                console.log('package.json not found, so not deleting.');
            }
        })
        
        //package creation
        const packages = await fspromises.readFile(path.join(__dirname,'poe','package.json'),'utf8');
        await fspromises.appendFile((path.join(__dirname,"Chaincode-poe",'poe',"node",'package.json')),packages);
        console.log('package.json Inegrated Successfully');

        // Header Integration
        const header = await fspromises.readFile(path.join(__dirname,'poe','ChaincodeHeader.js'),'utf8');

        await fspromises.appendFile((path.join(__dirname,"Chaincode-poe",'poe',"node",'poe.js')),header);
        console.log('Chaincode Header Inegrated Successfully');

        // Body Integration
        

        for(var i = 0; i < datas.length; i++) {
            var filename = datas[i]
            const body = await fspromises.readFile(path.join(__dirname,'poe',filename+'.js'),'utf8');
            
            await fspromises.appendFile((path.join(__dirname,"Chaincode-poe",'poe',"node",'poe.js')),body);
            console.log('Chaincode Body for '+filename+' Inegrated Successfully');
          
            
        }
     

        // Footer Integration
        const footer = await fspromises.readFile(path.join(__dirname,'poe','ChaincodeFooter.js'),'utf8');
        await fspromises.appendFile((path.join(__dirname,"Chaincode-poe",'poe',"node",'poe.js')),footer);
        console.log('Chaincode Footer Inegrated Successfully');

        //Zipping Procedure Starts

    const zip = new AdmZip();

    zip.addLocalFolder(path.join(__dirname,"Chaincode-poe","poe"))
    // for(var i = 0; i < uploadDir.length;i++){
    //     zip.addLocalFile(path.join(__dirname,"Chaincode","supplychain",uploadDir[i]));
    // }
    

    // Define zip file name
    const downloadName = `poe.zip`;

    // const data = zip.toBuffer();

    // save file zip in root directory
    zip.writeZip(path.join(__dirname,"/zipcontents",downloadName));
        

    } 
     fileOpsc();
    res.status(201).json({
        result: 'Transaction has been submitted',
        error: null
    }) 
}

    
catch (err) {
  next(err);
    // console.log(`Failed to evaluate transaction: ${err}`)
    // res.status(400)({
    //     result : null,
    //     error : error.message
    //     })
} 
// 
const folderPath = path.join(__dirname,"/Chaincode-poe/poe/node");

// fs.readdirSync(folderPath)
// console.log('folderPath::',folderPath);

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
  }
  
  fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  })
  .filter(isFile)
  console.log('folderPath::',folderPath);
  

})
app.get('/Downloads-poe',async function(req,res){
    res.download(path.join(__dirname,'zipcontents','poe.zip'));
})

////////////////////---------------------Go language ZIP creation starts here----------------////////////////////////////

app.post('/test-go', async function (req, res) {

   
       
    try{
        var datas=[];
        datas = req.body;
        console.log("data[]",datas);
        // console.log('hello satish')
        
        const fileOpsc= async () => {

        //deleting previous files    
        // await fspromises.unlink(path.join(__dirname,'Chaincode','supplychain','node','index.js'))
        // await fspromises.unlink(path.join(__dirname,'Chaincode','supplychain','node','package.json'))
        await fspromises.unlink(path.join(__dirname,'Chaincode-go','supplychain','go','supplychain.go'))
        console.log("Perviously created files deleted successfully")    


        //index creation
        // const index = await fspromises.readFile(path.join(__dirname,'zipcontents','index.js'),'utf8');
        // await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node",'index.js')),index);
        // console.log('index.js Inegrated Successfully');

        //package creation
        // const packages = await fspromises.readFile(path.join(__dirname,'zipcontents','package.json'),'utf8');
        // await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node",'package.json')),packages);
        // console.log('package.json Inegrated Successfully');

        // Header Integration
        const header = await fspromises.readFile(path.join(__dirname,'goChaincodeHeader.go'),'utf8');

        await fspromises.appendFile((path.join(__dirname,"Chaincode-go",'supplychain',"go",'supplychain.go')),header);
        console.log('Chaincode Header Inegrated Successfully');

        // Body Integration
        

        for(var i = 0; i < datas.length; i++) {
            var filename = datas[i]
            const body = await fspromises.readFile(path.join(__dirname,filename+'.go'),'utf8');
            
            await fspromises.appendFile((path.join(__dirname,"Chaincode-go",'supplychain',"go",'supplychain.go')),body);
            console.log('Chaincode Body for '+filename+' Inegrated Successfully');
          
            
        }
     

        // Footer Integration
        const footer = await fspromises.readFile(path.join(__dirname,'goChaincodeFooter.go'),'utf8');
        await fspromises.appendFile((path.join(__dirname,"Chaincode-go",'supplychain',"go",'supplychain.go')),footer);
        console.log('Chaincode Footer Inegrated Successfully');




        // const uploadDir = fs.readdirSync(path.join(__dirname,"Chaincode","supplychain")); 
        //Zipping Procedure Starts

    const zip = new AdmZip();

    zip.addLocalFolder(path.join(__dirname,"Chaincode-go","supplychain"))
    // for(var i = 0; i < uploadDir.length;i++){
    //     zip.addLocalFile(path.join(__dirname,"Chaincode","supplychain",uploadDir[i]));
    // }
    

    // Define zip file name
    const downloadName = `supplychain.zip`;

    // const data = zip.toBuffer();

    // save file zip in root directory
    zip.writeZip(path.join(__dirname,"/zipcontents",downloadName));
        

    } 
     fileOpsc();
    res.status(201).json({
        result: 'Transaction has been submitted',
        error: null
    }) 
}

    
catch (err) {
    console.log(`Failed to evaluate transaction: ${error}`)
    res.status(400)({
        result : null,
        error : error.message
        })
} 
// 
const folderPath = path.join(__dirname,"/Chaincode-go/supplychain/go");

// fs.readdirSync(folderPath)
// console.log('folderPath::',folderPath);

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
  }
  
  fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  })
  .filter(isFile)
  console.log('folderPath::',folderPath);
  

})

app.get('/Downloadsgo',async function(req,res){
res.download(path.join(__dirname,'zipcontents','supplychain.zip'));
})








////////////////-------------Go language ZIP creation ends here------------------------///////////////////////////////
app.listen(5000, '10.244.1.51');
console.log('Chaincode Generation Running on http://10.244.1.51:5000');
