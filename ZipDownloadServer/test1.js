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
                datas.push(req.body.user.temp);
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
                

                     const downloadName = `${Domainname}.zip`;

// zipFolder(path.join(__dirname,"Chaincode",Domainname),path.join(__dirname,"zipcontents",downloadName));


 folderZipper(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"zipcontents",downloadName))
.then(result => {
    console.log('Zip Done!',result);
})
.catch(error => {
    console.log(error);
});
                  
              });
           
            });
                
        
            } 
             fileOpsc();
            res.status(200).json('Transaction Send Successful') 
        }
        
            
        catch (err) {
            console.log(`Failed to evaluate transaction: ${err}`)
            next(err)
            // res.status(400)({
            //     result : null,
            //     error : err.message
            //     })
        } 
        

          
       
})

app.get('/Downloads',async function(req,res){
  const Dfile = Domainname + '.zip'
  // console.log('File : ',Domainname)
    res.download(path.join(__dirname,'zipcontents',Dfile));
})





app.listen(5000, '10.244.1.51');
console.log('Chaincode Generation Running on http://10.244.1.51:5000');
