"use strict";

let express = require("express");
let bodyParser = require("body-parser");
const util = require("util");
let app = express();
app.use(bodyParser.json());
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const NodeCouchDb = require("node-couchdb");

const { Gateway, Wallets } = require("fabric-network");
global.mongodata = [];
global.Domainname = "";
global.CCfilename = "";
global.Description = "";
// global.chaincodeheader=''
global.chaincodebody = "";
global.getHistoryCode = "";
global.getEncryptionCode = "";
global.getEncryptionPackageCode = "";
global.getPDCFile = 0;
global.getEncryptionPack = 0;
global.getHistoryFlag = 0;
global.getEncryptFlag = 0;
global.assetrequire = false;
global.count = [];
const fs = require("fs");

const fs1 = require("fs-extra");

const axios = require("axios");
const {
  promises: { readdir },
} = require("fs");
const { error } = require("console");
const uuidv4 = require("uuid/v4");
const cors = require("cors");
const del = require("del");
const fsmove = require("fs-extra");
const fsmove1 = require("fs-extra");
const fspromises = require("fs").promises;

const AdmZip = require("adm-zip");
const { Domain } = require("domain");
const { message } = require("statuses");

app.use(cors());

var oldPath = "collection_config.json";
var newPath = "/Chaincode/Chaincode/collection_config.json";

app.post("/test", async function (req, res, next) {
  try {
    console.log("hello from test");
    var datas = req.body;
    assetrequire = datas.includes(true);
    console.log("datas::", datas);
    console.log("data require ", assetrequire);
    console.log("data require in String()::", assetrequire.toString());

    if (assetrequire == true) {
      console.log("Asset logic include Kar Bhai");
    } else {
      console.log("Asset logic Mat Include Krar Bhai");
    }

    Domainname = "Chaincode";
    CCfilename = Domainname + ".js";
    let res = await axios.get(
      `http://10.244.3.187:4300/api/v1/nodefunction/${datas[0]}`
    );
    mongodata = res.data;
    console.log("mongoData::", res.data);

    Description = mongodata.Description;
    chaincodebody = mongodata.Code;
    const fileOpsc = async () => {
      console.log("Filename", CCfilename);
      if (fs.existsSync(path.join(__dirname, "Chaincode", Domainname))) {
        console.log("Directory exists!");
        await del(path.join(__dirname, "Chaincode", Domainname));
        console.log("Previously Working Folder Deleted Successfully");
        await del(path.join(__dirname, "zipcontents", Domainname + ".zip"));
        console.log("Dpmain Folder Deleted from zip contents Successfully");
      } else {
        console.log("Directory not found.");
      }

      await fs.mkdir(
        path.join(__dirname, "Chaincode", Domainname),
        { recursive: true },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(Domainname, " Directory created successfully !!");

            //Creating Sub Folder Node
            fs.mkdir(
              path.join(__dirname, "Chaincode", Domainname, "node"),
              { recursive: true },
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Node Sub-Directory created successfully !!");

                  //Creating Sub Folder Lib
                  fs.mkdir(
                    path.join(
                      __dirname,
                      "Chaincode",
                      Domainname,
                      "node",
                      "lib"
                    ),
                    { recursive: true },
                    (error) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(
                          "Lib Sub-Directory created successfully !!"
                        );
                      }
                    }
                  );
                }
              }
            );
          }

          // Integrating index.js

          const index = `
'use strict';
                
const ${Domainname}= require('./lib/${Domainname}');
                                
module.exports.${Domainname} = ${Domainname};
module.exports.contracts = [ ${Domainname} ];`;

          fspromises.appendFile(
            path.join(__dirname, "Chaincode", Domainname, "node", "index.js"),
            index
          );
          console.log("index.js Inegrated Successfully");

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
            
              `;
          fspromises.appendFile(
            path.join(
              __dirname,
              "Chaincode",
              Domainname,
              "node",
              "package.json"
            ),
            packagejson
          );
          console.log("package.json Inegrated Successfully");

          const chaincodeheader = `
 'use strict';
 
 const { Contract } = require('fabric-contract-api');
               
 class ${Domainname} extends Contract {
               
               `;

          const chaincodefooter = `
 }
 
 module.exports = ${Domainname};
               `;
          fspromises.appendFile(
            path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
            chaincodeheader
          );
          console.log("Chaincode Header Inegrated Successfully");
          // for (var i = 0; i < datas.length; i++) {
          //   if (datas[i]!= 'true') {
          //     console.log("iii::",i);
          //     foo(i);
          //   }
            
          //   break;
          
          // }
          // for (var i = 0; i < datas.length; i++) {
            
          //     foo(i);
          
          // }
         
            for (let i = 0; i < datas.length; i++) {
              let current_value = datas[i];
              if (assetrequire != current_value) {
                foo(i);
                // return value + " is present at index: " + i;
              }
            }
           
          async function foo(i) {
            let ccbodyrequest = await axios.get(
              `http://10.244.3.187:4300/api/v1/nodefunction/${datas[i]}`
            );

            console.log("Axios Call Response from Mongodb", ccbodyrequest.data);
            chaincodebody = ccbodyrequest.data.Code;
            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              chaincodebody
            );
            console.log("Chaincode Body Inegrated Successfully");
            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              "\n"
            );

            // const body = await fspromises.readFile(path.join(__dirname,'poe',filename+'.js'),'utf8');

            console.log("Body That is To Be Integrated", chaincodebody);
            // }
            console.log(
              "Chaincode Body for " + datas[i] + " Inegrated Successfully"
            );

            if (i < 1) {
              await fspromises.appendFile(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                chaincodefooter
              );
              console.log("Chaincode Footer Inegrated Successfully");
              fsmove.move(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  "lib",
                  CCfilename
                ),
                (err) => {
                  console.log(`File successfully moved!!`);
                  // PDCA File //

                  if (err) return console.log(err);
                  foo1();
                  //  newZip(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"zipcontents",Domainname));
                }
              );
              async function foo1() {
                const zip = new AdmZip();
                console.log("jjjjrjrj");
                if (assetrequire == true) {
                  console.log("i am in true part");
                  // await zip.addLocalFolder(path.join(__dirname,"Chaincode",));
                  // try {
                  fs1.copySync(
                    path.join(__dirname, "Chaincode", "Chaincode"),
                    path.join(__dirname, "Chaincode1", "Chaincode")
                  );

                  await zip.addLocalFolder(path.join(__dirname, "Chaincode1"));
                  console.log("success!");
                  // } catch (err) {
                  //   console.error(err);
                  // }
                } else {
                  // try{
                  console.log("i am in false part");
                  console.log("Entered to else part of aSSET LOGIC");

                  await zip.addLocalFolder(path.join(__dirname, "Chaincode"));
                  // } catch(err) {
                  //   console.error(err);
                  // }
                  // await zip.addLocalFolder(path.join(__dirname,"AssetManagement"))
                }
                const downloadName = `${Domainname}.zip`;
                await zip.writeZip(
                  path.join(__dirname, "/zipcontents", downloadName)
                );
              }
            }
          }

          // console.log('Chaincode Body Inegrated Successfully');
        }
      );
    };
    fileOpsc();
    res.status(200).json("Transaction Send Successful");
  } catch (err) {}
});
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;
app.use(function (req, res, next) {
  requests.push(Date.now());

  // now keep requests array from growing forever
  if (requests.length > requestTrimThreshold) {
    requests = requests.slice(0, requests.length - requestTrimSize);
  }
  next();
});

app.get("/Downloads1", async function (req, res) {
  res.download(path.join(__dirname, "zipcontents", "Chaincode2.zip"));
});

////////////////-------------Go language ZIP creation ends here------------------------///////////////////////////////

////////////////////////////-------------------POE Integration foe Zipping File---------------------//////////////////

app.post("/test-poe", async function (req, res) {
  try {
    console.log("hello from test");
    // alert('bhai post sai hu')
    var datas = [];
    datas.push(req.body);
    assetrequire = datas.includes(true);
    console.log("data require ", assetrequire);

    if (assetrequire == true) {
      console.log("Asset logic include Kar Bhai");
    } else {
      console.log("Asset logic Mat Include Krar Bhai");
    }

    Domainname = "Chaincode";
    CCfilename = Domainname + ".js";

    let res = await axios.get(
      `http://10.244.3.187:4300/api/v1/nodefunction/${datas[0]}`
    );
    mongodata = res.data;
    console.log("mongoData::", res.data);

    Description = mongodata.Description;
    chaincodebody = mongodata.Code;
    const fileOpsc = async () => {
      console.log("Filename", CCfilename);

      // Deleting Previously Created Folder
      if (fs.existsSync(path.join(__dirname, "Chaincode", Domainname))) {
        console.log("Directory exists!");
        await del(path.join(__dirname, "Chaincode", Domainname));
        console.log("Previously Working Folder Deleted Successfully");
        await del(path.join(__dirname, "zipcontents", Domainname + ".zip"));
        console.log("Dpmain Folder Deleted from zip contents Successfully");
      } else {
        console.log("Directory not found.");
      }

      //Creating Folder Structure

      // Creating Main Directory
      await fs.mkdir(
        path.join(__dirname, "Chaincode", Domainname),
        { recursive: true },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(Domainname, " Directory created successfully !!");

            //Creating Sub Folder Node
            fs.mkdir(
              path.join(__dirname, "Chaincode", Domainname, "node"),
              { recursive: true },
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Node Sub-Directory created successfully !!");

                  //Creating Sub Folder Lib
                  fs.mkdir(
                    path.join(
                      __dirname,
                      "Chaincode",
                      Domainname,
                      "node",
                      "lib"
                    ),
                    { recursive: true },
                    (error) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(
                          "Lib Sub-Directory created successfully !!"
                        );
                      }
                    }
                  );
                }
              }
            );
          }

          // Integrating index.js

          const index = `
'use strict';
      
const ${Domainname}= require('./lib/${Domainname}');
                      
module.exports.${Domainname} = ${Domainname};
module.exports.contracts = [ ${Domainname} ];`;

          fspromises.appendFile(
            path.join(__dirname, "Chaincode", Domainname, "node", "index.js"),
            index
          );
          console.log("index.js Inegrated Successfully");

          //Package.json Integration

          const packagejson = `
{
{
  "name": "CDAC-Hyderabad",
  "version": "1.0.0",
  "description": "proof of existence chaincode",
  "main": "poe.js",
  "engines": {
    "node": ">=8.4.0",
    "npm": ">=5.3.0"
  },
  "scripts": {
    "test": "npm test",
    "start": "node poe-chaincode.js"
  },
  "keywords": [
    "poe",
    "chaincode"
  ],
  "author": "CDAC (cdac.in)",
  "license": "ISC",
  "dependencies": {
    "fabric-shim": "~2.2",
    "valid-filename": "^2.0.1",
    "validator": "^10.4.0"
  }
}

    `;
          fspromises.appendFile(
            path.join(
              __dirname,
              "Chaincode",
              Domainname,
              "node",
              "package.json"
            ),
            packagejson
          );
          console.log("package.json Inegrated Successfully");

          //PDCA Json File Intigration//////////
          // fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",'collection_config.json')),packagejson);
          // console.log('collection_config.json Inegrated Successfully');
          //Chaincode Integration

          const chaincodeheader = `

const shim = require('fabric-shim');
const util = require('util');
const ClientIdentity = require('fabric-shim').ClientIdentity; // access control module
var validator = require('validator');
const validFilename = require('valid-filename');

let Chaincode = class {

    // initialize the chaincode
    async Init(stub){
        console.info('=========== Instantiated proof of existence chaincode ===========');
        return shim.success();
    }

    /* Will invoke a specific function requested by the user. All the supported functions can be invoked from here.*/
    /*Access Control: None*/
    async Invoke(stub){

        console.info('=========== Invoking the requested functionality ===========');
        
        let ret = stub.getFunctionAndParameters();
        
        console.info(ret);

        let method = this[ret.fcn];
    
        if (!method) {
            console.error('no function of name:' + ret.fcn + ' found');
            throw new Error('Received unknown function ' + ret.fcn + ' invocation');
        }
        try {
            let payload = await method(stub, ret.params);
            return shim.success(payload);
        } catch (err) {
            console.log(err);
            return shim.error(err);
        }
    }

    /* Dummy init function for use with REST as it requires some function to be passed during instantiation */
    /* Access Control: None */
    async initPoeLedger(stub, args){

        if( args.length != 1 ){
            throw new Error('Invalid args. Expects no args');
        }
                
        console.info('============= initLedger Ledger Done ===========');  
    }  `;

          const chaincodefooter = `
    shim.start(new Chaincode()); `;

          fspromises.appendFile(
            path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
            chaincodeheader
          );

          for (var i = 0; i < datas.length; i++) {
            if (datas.includes(true)!= true) {
              console.log("iii::",i);
              foo(i);
            }
            
            break;
          }
          async function foo(i) {
            let ccbodyrequest = await axios.get(
              `http://10.244.3.187:4300/api/v1/nodefunction/${datas[i]}`
            );

            console.log("Axios Call Response from Mongodb", ccbodyrequest.data);
            chaincodebody = ccbodyrequest.data.Code;
            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              chaincodebody
            );
            console.log("Chaincode Body Inegrated Successfully");
            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              "\n"
            );
            console.log("Body That is To Be Integrated", chaincodebody);
            // }
            console.log(
              "Chaincode Body for " + datas[i] + " Inegrated Successfully"
            );

            if (i < 1) {
              await fspromises.appendFile(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                chaincodefooter
              );
              console.log("Chaincode Footer Inegrated Successfully");
              fsmove.move(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  "lib",
                  CCfilename
                ),
                (err) => {
                  console.log(`File successfully moved!!`);
                  // PDCA File //
                  if (err) return console.log(err);

                  foo1();
                  //  newZip(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"zipcontents",Domainname));
                }
              );
              async function foo1() {
                const zip = new AdmZip();
                if (assetrequire == true) {
                  await zip.addLocalFolder(
                    path.join(__dirname, "Chaincode-poe")
                  );
                } else {
                  try {
                    fs1.copySync(
                      path.join(__dirname, "Chaincode", Domainname),
                      path.join(__dirname, "ChaincodePOE", "Chaincode"),
                      { overwrite: true | false }
                    );
                    console.log("success!");
                  } catch (err) {
                    console.error(err);
                  }
                  await zip.addLocalFolder(
                    path.join(__dirname, "ChaincodePOE")
                  );
                }
                const downloadName = `${Domainname}.zip`;
                await zip.writeZip(
                  path.join(__dirname, "/zipcontents", downloadName)
                );
              }
            }
          }
        }
      );
    };
    fileOpsc();
    res.status(200).json("Transaction Send Successful");
  } catch (err) {}
});
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;
app.use(function (req, res, next) {
  requests.push(Date.now());

  if (requests.length > requestTrimThreshold) {
    requests = requests.slice(0, requests.length - requestTrimSize);
  }
  next();
});

////////////////-------------Go language ZIP creation ends here------------------------///////////////////////////////

///////////////////-------------POE Integration Ends here-----------------///////////////////

////////////////// -------------Insuarance Integration Starts Here----------//////////////
app.post("/test-insurance", async function (req, res) {
  try {
    console.log("hello from test");
    // alert('bhai post sai hu')
    var datas = [];
    var domain = "";

    //  datas.push(req.body.user.functionname);

    datas = req.body;

    assetrequire = datas.includes(true);
    console.log("data require ", assetrequire);

    if (assetrequire == true) {
      console.log("Asset logic include Kar Bhai");
    } else {
      console.log("Asset logic Mat Include Krar Bhai");
    }

    Domainname = "Chaincode";
    CCfilename = Domainname + ".js";
    // domain=req.body.NameDomain;
    //  console.log("domain::",domain);
    // for(var i=0;i<datas.length;i++)
    // {
    //   console.log("data::",datas[i]);
    //   let res = await axios.get(`http://10.244.1.51:4300/api/v1/nodefunction/${datas[i]}`);
    //   mongodata = res.data;
    //   console.log("mongoData::", res.data)
    // }

    let res = await axios.get(
      `http://10.244.3.187:4300/api/v1/nodefunction/${datas[0]}`
    );
    mongodata = res.data;
    console.log("mongoData::", res.data);

    Description = mongodata.Description;
    chaincodebody = mongodata.Code;
    const fileOpsc = async () => {
      // console.log('DOMAIN NAME inside',data.Domain)
      console.log("Filename", CCfilename);

      // Deleting Previously Created Folder
      if (fs.existsSync(path.join(__dirname, "Chaincode", Domainname))) {
        console.log("Directory exists!");
        await del(path.join(__dirname, "Chaincode", Domainname));
        console.log("Previously Working Folder Deleted Successfully");
        await del(path.join(__dirname, "zipcontents", Domainname + ".zip"));
        console.log("Dpmain Folder Deleted from zip contents Successfully");
      } else {
        console.log("Directory not found.");
      }

      //Creating Folder Structure

      // Creating Main Directory
      await fs.mkdir(
        path.join(__dirname, "Chaincode", Domainname),
        { recursive: true },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(Domainname, " Directory created successfully !!");

            //Creating Sub Folder Node
            fs.mkdir(
              path.join(__dirname, "Chaincode", Domainname, "node"),
              { recursive: true },
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Node Sub-Directory created successfully !!");

                  //Creating Sub Folder Lib
                  fs.mkdir(
                    path.join(
                      __dirname,
                      "Chaincode",
                      Domainname,
                      "node",
                      "lib"
                    ),
                    { recursive: true },
                    (error) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(
                          "Lib Sub-Directory created successfully !!"
                        );
                      }
                    }
                  );
                }
              }
            );
          }

          // Integrating index.js

          const processor = `
      'use strict'
      //works in strict mode
      const { TransactionProcessor } = require('sawtooth-sdk/processor')
      //requires the module specified in ().
      const InsuranceHandler = require('./InsuranceHandler')
      // handler for cookie store
      
      const address = 'tcp://validator:4004';
      
      const transactionProcessor = new TransactionProcessor(address)
      
      transactionProcessor.addHandler(new InsuranceHandler())
      /*addHandler adds the given handler to the transaction processor so
        it can receive transaction processing requests. All handlers must
        be added prior to starting the processor.
      */
      
      transactionProcessor.start()
      /* start connects the transaction processor to a validator and
         starts listening for requests and routing them to an appropriate
         handler.
      */
      `;

          fspromises.appendFile(
            path.join(
              __dirname,
              "Chaincode",
              Domainname,
              "node",
              "processor.js"
            ),
            processor
          );
          console.log("index.js Inegrated Successfully");

          //Package.json Integration

          const packagejson = `
    {
      "name": "insuranceprocessor",
      "version": "1.0.0",
      "main": "router.js",
      "scripts": {
        "start": "node Processor.js",
        "start:dev": "nodemon router.js"
      },
      "author": "",
      "license": "Apache-2.0",
      "dependencies": {
        "cookie-parser": "^1.4.3",
        "cors": "^2.8.5",
        "crypto": "^1.0.1",
        "debug": "~2.6.9",
        "encoding": "^0.1.12",
        "express": "~4.16.0",
        "express-handlebars": "^6.0.5",
        "express-validator": "^6.14.2",
        "express-xml-bodyparser": "^0.3.0",
        "fs": "0.0.1-security",
        "http-errors": "~1.6.2",
        "jade": "^0.29.0",
        "md5": "^2.3.0",
        "morgan": "~1.9.0",
        "node-fetch": "^2.6.7",
        "node-gyp-build": "^4.3.0",
        "protobufjs": "^6.7.3",
        "sawtooth-sdk": "^1.0.2",
        "secp256k1": "^3.2.5",
        "text-encoding": "^0.6.4",
        "uuid": "^3.0.1",
        "xml2js": "^0.4.23",
        "zeromq": "^4.6.0"
      },
      "devDependencies": {},
      "description": ""
    }
    
    `;
          fspromises.appendFile(
            path.join(
              __dirname,
              "Chaincode",
              Domainname,
              "node",
              "package.json"
            ),
            packagejson
          );
          console.log("package.json Inegrated Successfully");

          //PDCA Json File Intigration//////////
          // fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",'collection_config.json')),packagejson);
          // console.log('collection_config.json Inegrated Successfully');
          //Chaincode Integration

          const chaincodeheader = `
'use strict'

//require the handler module.
const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')
const { createHash } = require('crypto');
const { TextEncoder, TextDecoder } = require('text-encoding/lib/encoding');
const { count } = require('console');
var alldata=[];

function hash(v) {
  return createHash('sha512').update(v).digest('hex');
}

var encoder = new TextEncoder('utf8');
var decoder = new TextDecoder('utf8');

const CJ_FAMILY = 'insurance';
const CJ_NAMESPACE = hash(CJ_FAMILY).substring(0, 6);

//function to display the errors
var _toInternalError = function (err) {
  console.log(" in error message block");
  var message = err.message ? err.message : err;
  throw new InternalError(message);
};

//function to set the entries in the block using the "SetState" function
const _setEntry = function (context, address, stateValue) {
  let dataBytes = encoder.encode(stateValue)
  let entries = {};
  entries[address] = dataBytes;
console.log("---------------------------------------handler end ------------------------------------------------");	
  return context.setState(entries)
}

 `;

          const chaincodefooter = `
}
     module.exports = InsuranceHandler
     `;

          if (getEncryptionPack != 1) {
            fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              chaincodeheader
            );
            console.log("Chaincode Header Inegrated Successfully");
          }
          if (getEncryptionPack == 1) {
            const chaincodeheader1 = `
      'use strict';
      
      const { Contract } = require('fabric-contract-api');
                    ${getEncryptionPackageCode.toString()};
      class ${Domainname} extends Contract {
     `;
            fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              chaincodeheader1
            );
            console.log("Encryption Package Header Inegrated Successfully");
            getEncryptionPack = 0;
          }
          for (var i = 0; i < datas.length; i++) {
            // console.log(`http://10.244.1.102:4300/api/nodefunction/${datas[i]}`)

            // var sendPostRequest = async (callingid) => {
            foo(i);
          }
          //  fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",CCfilename)),chaincodebody);
          async function foo(i) {
            let ccbodyrequest = await axios.get(
              `http://10.244.3.187:4300/api/v1/nodefunction/${datas[i]}`
            );

            console.log("Axios Call Response from Mongodb", ccbodyrequest.data);
            chaincodebody = ccbodyrequest.data.Code;
            // await fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",CCfilename)),'');

            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              chaincodebody
            );
            console.log("Chaincode Body Inegrated Successfully");
            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              "\n"
            );

            // const body = await fspromises.readFile(path.join(__dirname,'poe',filename+'.js'),'utf8');

            console.log("Body That is To Be Integrated", chaincodebody);
            // }
            console.log(
              "Chaincode Body for " + datas[i] + " Inegrated Successfully"
            );

            if (i < 1) {
              if (getHistoryFlag == 1) {
                fspromises.appendFile(
                  path.join(
                    __dirname,
                    "Chaincode",
                    Domainname,
                    "node",
                    CCfilename
                  ),
                  getHistoryCode.toString()
                );
                await fspromises.appendFile(
                  path.join(
                    __dirname,
                    "Chaincode",
                    Domainname,
                    "node",
                    CCfilename
                  ),
                  "\n"
                );
                getHistoryFlag = 0;
              }
              if (getEncryptFlag == 1) {
                fspromises.appendFile(
                  path.join(
                    __dirname,
                    "Chaincode",
                    Domainname,
                    "node",
                    CCfilename
                  ),
                  getEncryptionCode.toString()
                );
                await fspromises.appendFile(
                  path.join(
                    __dirname,
                    "Chaincode",
                    Domainname,
                    "node",
                    CCfilename
                  ),
                  "\n"
                );
                getEncryptFlag = 0;
              }
              // fsmove1.move(path.join(__dirname,collection_config.json), path.join(__dirname,"Chaincode",Domainname,"node"))
              if (getPDCFile == 1) {
                console.log("i am inside the json file");

                fsmove1.move(
                  path.join(__dirname, oldPath),
                  path.join(__dirname, newPath),
                  function (err) {
                    if (err) throw err;
                    console.log("Successfully renamed - AKA moved!");
                  }
                );

                getPDCFile = 0;
              }
              await fspromises.appendFile(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                chaincodefooter
              );
              console.log("Chaincode Footer Inegrated Successfully");
              fsmove.move(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  "lib",
                  CCfilename
                ),
                (err) => {
                  console.log(`File successfully moved!!`);
                  // PDCA File //
                  if (err) return console.log(err);

                  foo1();
                  //  newZip(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"zipcontents",Domainname));
                }
              );
              async function foo1() {
                const zip = new AdmZip();
                if (assetrequire == true) {
                  await zip.addLocalFolder(
                    path.join(__dirname, "ChaincodeInsuranceAsset")
                  );
                  // await zip.addLocalFolder(path.join(__dirname,"Chaincode",));
                } else {
                  // await zip.addLocalFolder(path.join(__dirname,"AssetManagement"))

                  try {
                    await fs1.copySync(
                      path.join(__dirname, "Chaincode", Domainname),
                      path.join(__dirname, "ChaincodeInsurance", "Chaincode"),
                      { overwrite: true | false }
                    );
                    console.log("success!");
                  } catch (err) {
                    console.error(err);
                  }
                  await zip.addLocalFolder(
                    path.join(__dirname, "ChaincodeInsurance")
                  );
                }
                const downloadName = `${Domainname}.zip`;
                await zip.writeZip(
                  path.join(__dirname, "/zipcontents", downloadName)
                );
              }
            }
          }

          // console.log('Chaincode Body Inegrated Successfully');
        }
      );
    };
    fileOpsc();
    res.status(200).json("Transaction Send Successful");
  } catch (err) {}
});
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;
app.use(function (req, res, next) {
  requests.push(Date.now());

  // now keep requests array from growing forever
  if (requests.length > requestTrimThreshold) {
    requests = requests.slice(0, requests.length - requestTrimSize);
  }
  next();
});

////////////////-------------Go language ZIP creation ends here------------------------///////////////////////////////

//////////////////------------Supplychain with asset----------------///////////////////////
app.post("/test-supplychain", async function (req, res, next) {
  try {
    console.log("hello from test");
    var datas = req.body;
    assetrequire = datas.includes(true);
    console.log("datas::", datas);
    console.log("data require ", assetrequire);

    if (assetrequire == true) {
      console.log("Asset logic include Kar Bhai");
    } else {
      console.log("Asset logic Mat Include Krar Bhai");
    }

    Domainname = "Chaincode";
    CCfilename = Domainname + ".js";

    let res = await axios.get(
      `http://10.244.3.187:4300/api/v1/nodefunction/${datas[0]}`
    );
    mongodata = res.data;
    console.log("mongoData::", res.data);

    Description = mongodata.Description;
    chaincodebody = mongodata.Code;
    const fileOpsc = async () => {
      // console.log('DOMAIN NAME inside',data.Domain)
      console.log("Filename", CCfilename);

      // Deleting Previously Created Folder
      if (fs.existsSync(path.join(__dirname, "Chaincode", Domainname))) {
        console.log("Directory exists!");
        await del(path.join(__dirname, "Chaincode", Domainname));
        console.log("Previously Working Folder Deleted Successfully");
        await del(path.join(__dirname, "zipcontents", Domainname + ".zip"));
        console.log("Directory Folder Deleted from zip contents Successfully");
      } else {
        console.log("Directory not found.");
      }

      //Creating Folder Structure

      // Creating Main Directory
      await fs.mkdir(
        path.join(__dirname, "Chaincode", Domainname),
        { recursive: true },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(Domainname, " Directory created successfully !!");

            //Creating Sub Folder Node
            fs.mkdir(
              path.join(__dirname, "Chaincode", Domainname, "node"),
              { recursive: true },
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Node Sub-Directory created successfully !!");

                  //Creating Sub Folder Lib
                  fs.mkdir(
                    path.join(
                      __dirname,
                      "Chaincode",
                      Domainname,
                      "node",
                      "lib"
                    ),
                    { recursive: true },
                    (error) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(
                          "Lib Sub-Directory created successfully !!"
                        );
                      }
                    }
                  );
                }
              }
            );
          }

          // Integrating index.js

          const index = `
'use strict';
                
const ${Domainname}= require('./lib/${Domainname}');
                                
module.exports.${Domainname} = ${Domainname};
module.exports.contracts = [ ${Domainname} ];`;

          fspromises.appendFile(
            path.join(__dirname, "Chaincode", Domainname, "node", "index.js"),
            index
          );
          console.log("index.js Inegrated Successfully");

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
            
              `;
          fspromises.appendFile(
            path.join(
              __dirname,
              "Chaincode",
              Domainname,
              "node",
              "package.json"
            ),
            packagejson
          );
          console.log("package.json Inegrated Successfully");

          //PDCA Json File Intigration//////////
          // fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",'collection_config.json')),packagejson);
          // console.log('collection_config.json Inegrated Successfully');
          //Chaincode Integration

          const chaincodeheader = `
 'use strict';
 
 const { Contract } = require('fabric-contract-api');
               
 class ${Domainname} extends Contract {
               
               `;

          const chaincodefooter = `
 }
 
 module.exports = ${Domainname};
               `;

          for (var i = 0; i < datas.length; i++) {
            foo(i);
          }
          async function foo(i) {
            let ccbodyrequest = await axios.get(
              `http://10.244.3.187:4300/api/v1/nodefunction/${datas[i]}`
            );

            console.log("Axios Call Response from Mongodb", ccbodyrequest.data);
            chaincodebody = ccbodyrequest.data.Code;

            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              chaincodebody
            );
            console.log("Chaincode Body Inegrated Successfully");
            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              "\n"
            );

            console.log("Body That is To Be Integrated", chaincodebody);
            // }
            console.log(
              "Chaincode Body for " + datas[i] + " Inegrated Successfully"
            );

            if (i < 1) {
              await fspromises.appendFile(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                chaincodefooter
              );
              console.log("Chaincode Footer Inegrated Successfully");
              fsmove.move(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  "lib",
                  CCfilename
                ),
                (err) => {
                  console.log(`File successfully moved!!`);
                  // PDCA File //
                  if (err) return console.log(err);

                  foo1();
                  //  newZip(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"zipcontents",Domainname));
                }
              );
              async function foo1() {
                const zip = new AdmZip();
                fs1.copySync(
                  path.join(__dirname, "Chaincode", Domainname),
                  path.join(__dirname, "Chaincode2", "Chaincode"),
                  { overwrite: true | false }
                );
                await zip.addLocalFolder(
                  path.join(__dirname, "Chaincode2", Domainname)
                );

                const downloadName = `${Domainname}.zip`;
                await zip.writeZip(
                  path.join(__dirname, "/zipcontents", downloadName)
                );
              }
            }
          }

          // console.log('Chaincode Body Inegrated Successfully');
        }
      );
    };
    fileOpsc();
    res.status(200).json("Transaction Send Successful");
  } catch (err) {}
});
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;
app.use(function (req, res, next) {
  requests.push(Date.now());

  // now keep requests array from growing forever
  if (requests.length > requestTrimThreshold) {
    requests = requests.slice(0, requests.length - requestTrimSize);
  }
  next();
});

////////////////-------------Go language ZIP creation ends here------------------------///////////////////////////////

/////////////////-------------Supplychain with asset ends here---------------//////////////

////////////////--------------Admin Asset Zip Download Starts here---------///////////////
app.post("/test-assetAdmin", async function (req, res, next) {
  try {
    console.log("hello from test");

    var datas = req.body;
    assetrequire = datas.includes(true);

    console.log("datas::", datas);

    console.log("data require ", assetrequire);

    if (assetrequire == true) {
      console.log("Asset logic include Kar Bhai");
    } else {
      console.log("Asset logic Mat Include Krar Bhai");
    }

    Domainname = "AssetChaincode";
    CCfilename = Domainname + ".js";
    let res = await axios.get(
      `http://10.244.3.187:4300/api/v1/nodefunction/${datas[0]}`
    );
    mongodata = res.data;
    console.log("mongoData::", res.data);

    Description = mongodata.Description;
    chaincodebody = mongodata.Code;
    const fileOpsc = async () => {
      console.log("Filename", CCfilename);
      if (fs.existsSync(path.join(__dirname, "Chaincode", Domainname))) {
        console.log("Directory exists!");
        await del(path.join(__dirname, "Chaincode", Domainname));
        console.log("Previously Working Folder Deleted Successfully");
        await del(path.join(__dirname, "zipcontents", Domainname + ".zip"));
        console.log("Dpmain Folder Deleted from zip contents Successfully");
      } else {
        console.log("Directory not found.");
      }

      await fs.mkdir(
        path.join(__dirname, "Chaincode", Domainname),
        { recursive: true },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(Domainname, " Directory created successfully !!");

            //Creating Sub Folder Node
            fs.mkdir(
              path.join(__dirname, "Chaincode", Domainname, "node"),
              { recursive: true },
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Node Sub-Directory created successfully !!");

                  //Creating Sub Folder Lib
                  fs.mkdir(
                    path.join(
                      __dirname,
                      "AssetManagement",
                      Domainname,
                      "node",
                      "lib"
                    ),
                    { recursive: true },
                    (error) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(
                          "Lib Sub-Directory created successfully !!"
                        );
                      }
                    }
                  );
                }
              }
            );
          }

          // Integrating index.js

          const index = `
          'use strict';

          const Asset = require('./lib/genericasset');
          
          module.exports.Asset = Asset;
          module.exports.contracts = [ Asset ];`;

          fspromises.appendFile(
            path.join(__dirname, "Chaincode", Domainname, "node", "index.js"),
            index
          );
          console.log("index.js Inegrated Successfully");

          //Package.json Integration

          const packagejson = `
          {
            "name": "generic-asset",
            "version": "1.0.0",
            "description": "Generic-Asset-Management contract implemented in JavaScript",
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
                "fabric-shim": "^2.0.0",
                "uuid": "^9.0.0"
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
        
            
              `;
          fspromises.appendFile(
            path.join(
              __dirname,
              "Chaincode",
              Domainname,
              "node",
              "package.json"
            ),
            packagejson
          );
          console.log("package.json Inegrated Successfully");
          const chaincodeheader = `
          'use strict';

          const { Contract } = require('fabric-contract-api');
          const { v4: uuidv4 } = require('uuid'); `;

          const chaincodefooter = `
          module.exports = Asset;
               `;

          for (var i = 0; i < datas.length; i++) {
            foo(i);
          }
          async function foo(i) {
            let ccbodyrequest = await axios.get(
              `http://10.244.3.187:4300/api/v1/nodefunction/${datas[i]}`
            );

            console.log("Axios Call Response from Mongodb", ccbodyrequest.data);
            chaincodebody = ccbodyrequest.data.Code;
            // await fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",CCfilename)),'');

            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              chaincodebody
            );
            console.log("Chaincode Body Inegrated Successfully");
            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              "\n"
            );

            // const body = await fspromises.readFile(path.join(__dirname,'poe',filename+'.js'),'utf8');

            console.log("Body That is To Be Integrated", chaincodebody);
            // }
            console.log(
              "Chaincode Body for " + datas[i] + " Inegrated Successfully"
            );

            if (i < 1) {
              await fspromises.appendFile(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                chaincodefooter
              );
              console.log("Chaincode Footer Inegrated Successfully");
              fsmove.move(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  "lib",
                  CCfilename
                ),
                (err) => {
                  console.log(`File successfully moved!!`);
                  // PDCA File //
                  if (err) return console.log(err);

                  foo1();
                  //  newZip(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"zipcontents",Domainname));
                }
              );
              async function foo1() {
                const zip = new AdmZip();

                await zip.addLocalFolder(
                  path.join(__dirname, "AssetManagement", Domainname)
                );

                const downloadName = `${Domainname}.zip`;
                await zip.writeZip(
                  path.join(__dirname, "/zipcontents", downloadName)
                );
              }
            }
          }
        }
      );
    };
    fileOpsc();
    res.status(200).json("Transaction Send Successful");
  } catch (err) {}
});
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;
app.use(function (req, res, next) {
  requests.push(Date.now());

  // now keep requests array from growing forever
  if (requests.length > requestTrimThreshold) {
    requests = requests.slice(0, requests.length - requestTrimSize);
  }
  next();
});

////////////////-------------Go language ZIP creation ends here------------------------///////////////////////////////

app.get("/AdminAssetDownloads", async function (req, res) {
  let domainFile = Domainname + ".zip";
  console.log("domainFile::", domainFile);

  res.download(path.join(__dirname, "zipcontents", "AssetManagement.zip"));
  // await res.json(Result);
});

//////////////---------------Admin Asset Zip Download ends here-----------///////////////

/////////////---------------Asset Owner Zip Download Starts Here----------////////////////

app.post("/test-assetOwner", async function (req, res, next) {
  try {
    console.log("hello from test");

    var datas = req.body;
    assetrequire = datas.includes(true);

    console.log("datas::", datas);

    console.log("data require ", assetrequire);

    if (assetrequire == true) {
      console.log("Asset logic include Kar Bhai");
    } else {
      console.log("Asset logic Mat Include Krar Bhai");
    }

    Domainname = "AssetOwnerChaincode";
    CCfilename = Domainname + ".js";
    let res = await axios.get(
      `http://10.244.3.187:4300/api/v1/nodefunction/${datas[0]}`
    );
    mongodata = res.data;
    console.log("mongoData::", res.data);

    Description = mongodata.Description;
    chaincodebody = mongodata.Code;
    const fileOpsc = async () => {
      console.log("Filename", CCfilename);
      if (fs.existsSync(path.join(__dirname, "Chaincode", Domainname))) {
        console.log("Directory exists!");
        await del(path.join(__dirname, "Chaincode", Domainname));
        console.log("Previously Working Folder Deleted Successfully");
        await del(path.join(__dirname, "zipcontents", Domainname + ".zip"));
        console.log("Dpmain Folder Deleted from zip contents Successfully");
      } else {
        console.log("Directory not found.");
      }

      await fs.mkdir(
        path.join(__dirname, "Chaincode", Domainname),
        { recursive: true },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(Domainname, " Directory created successfully !!");

            //Creating Sub Folder Node
            fs.mkdir(
              path.join(__dirname, "Chaincode", Domainname, "node"),
              { recursive: true },
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Node Sub-Directory created successfully !!");

                  //Creating Sub Folder Lib
                  fs.mkdir(
                    path.join(
                      __dirname,
                      "AssetOwnerChaincode",
                      Domainname,
                      "node",
                      "lib"
                    ),
                    { recursive: true },
                    (error) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(
                          "Lib Sub-Directory created successfully !!"
                        );
                      }
                    }
                  );
                }
              }
            );
          }

          // Integrating index.js

          const index = `
          'use strict';

          const Asset = require('./lib/genericasset');
          
          module.exports.Asset = Asset;
          module.exports.contracts = [ Asset ];`;

          fspromises.appendFile(
            path.join(__dirname, "Chaincode", Domainname, "node", "index.js"),
            index
          );
          console.log("index.js Inegrated Successfully");

          //Package.json Integration

          const packagejson = `
          {
            "name": "generic-asset",
            "version": "1.0.0",
            "description": "Generic-Asset-Management contract implemented in JavaScript",
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
                "fabric-shim": "^2.0.0",
                "uuid": "^9.0.0"
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
        
            
              `;
          fspromises.appendFile(
            path.join(
              __dirname,
              "Chaincode",
              Domainname,
              "node",
              "package.json"
            ),
            packagejson
          );
          console.log("package.json Inegrated Successfully");

          const chaincodeheader = `
          'use strict';

          const { Contract } = require('fabric-contract-api');
          const { v4: uuidv4 } = require('uuid'); `;

          const chaincodefooter = `
          module.exports = Asset;
               `;

          for (var i = 0; i < datas.length; i++) {
            foo(i);
          }
          async function foo(i) {
            let ccbodyrequest = await axios.get(
              `http://10.244.3.187:4300/api/v1/nodefunction/${datas[i]}`
            );

            console.log("Axios Call Response from Mongodb", ccbodyrequest.data);
            chaincodebody = ccbodyrequest.data.Code;

            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              chaincodebody
            );
            console.log("Chaincode Body Inegrated Successfully");
            await fspromises.appendFile(
              path.join(__dirname, "Chaincode", Domainname, "node", CCfilename),
              "\n"
            );

            console.log("Body That is To Be Integrated", chaincodebody);
            // }
            console.log(
              "Chaincode Body for " + datas[i] + " Inegrated Successfully"
            );

            if (i < 1) {
              await fspromises.appendFile(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                chaincodefooter
              );
              console.log("Chaincode Footer Inegrated Successfully");
              fsmove.move(
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  CCfilename
                ),
                path.join(
                  __dirname,
                  "Chaincode",
                  Domainname,
                  "node",
                  "lib",
                  CCfilename
                ),
                (err) => {
                  console.log(`File successfully moved!!`);
                  // PDCA File //
                  if (err) return console.log(err);

                  foo1();
                  //  newZip(path.join(__dirname,"Chaincode",Domainname), path.join(__dirname,"zipcontents",Domainname));
                }
              );
              async function foo1() {
                const zip = new AdmZip();

                await zip.addLocalFolder(
                  path.join(__dirname, "AssetOwnerChaincode", Domainname)
                );

                const downloadName = `${Domainname}.zip`;
                await zip.writeZip(
                  path.join(__dirname, "/zipcontents", downloadName)
                );
              }
            }
          }

          // console.log('Chaincode Body Inegrated Successfully');
        }
      );
    };
    fileOpsc();
    res.status(200).json("Transaction Send Successful");
  } catch (err) {}
});
var requests = [];
var requestTrimThreshold = 5000;
var requestTrimSize = 4000;

app.use(function (req, res, next) {
  requests.push(Date.now());

  // now keep requests array from growing forever
  if (requests.length > requestTrimThreshold) {
    requests = requests.slice(0, requests.length - requestTrimSize);
  }
  next();
});
app.get("/AssetOwnerDownloads", async function (req, res) {
  let domainFile = Domainname + ".zip";
  console.log("domainFile::", domainFile);

  res.download(path.join(__dirname, "zipcontents", "AssetOwnerChaincode.zip"));
  // await res.json(Result);
});

////////////---------------Asset Owner Zip Download Ends Here--------------////////////////
app.get("/Downloads", async function (req, res) {
  let domainFile = Domainname + ".zip";
  console.log("domainFile::", domainFile);
  await res.download(path.join(__dirname, "zipcontents", domainFile));
});

app.listen(5000, "10.244.3.187");
console.log("Chaincode Generation Running on http://10.244.3.187:5000");
