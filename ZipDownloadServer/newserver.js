"use strict";

let express = require("express");
let bodyParser = require("body-parser");

const axios = require("axios").default;

let app = express();
app.use(bodyParser.json());
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const NodeCouchDb = require("node-couchdb");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { LateDeliveryAndPenalty1, Discount1, AcceptanceOfDelivery1, FragileGoods1, PerishableGoods1, LateInvoicePayment1, purchaseOrderFailure1 } = require('./supplychaindomain2')


const { error } = require("console");
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");




const fspromises = require('fs').promises

const AdmZip = require('adm-zip');

//server config
var buyer_Name = "cdac_hyd";
global.buyer_Name = buyer_Name;
var seller_Name = "dell_india";
global.seller_Name = seller_Name;

const user = "demo3";
global.user
const cfgpath =
    "/home/cdac/HLF-ubfagent/HLF-ubfagent/ubf/vars/profiles/sample_connection_for_nodesdk.json";
global.cfgpath
const nodeType = true;
global.nodeType
const mspId = "cdac-com";
global.mspId
const headers = {
    "Content-Type": "application/json",
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIyOGY0YmIzNzlmZmY0OTU1ZjdlNGYxIiwiZW1haWwiOiJwb2VAY2RhYy5pbiIsImlhdCI6MTY1MzQxMTQ0MSwiZXhwIjoxNjUzNDE4NjQxfQ.50P0VZ4yBAReXUHjLwxsjt9AZ_KGRLFRfYhtmrLzU4Y",
};
global.headers
const ccname = "supplychain";
global.ccname
const channel = "sample";
global.channel
const dbName = "sample_supplychain";
const viewUrl = "_all_docs?include_docs=true&inclusive_end=true";
const couch = new NodeCouchDb({
    auth: {
        user: "admin",
        pass: "adminpw",
    },
    host: '10.244.1.4',
    protocol: 'http',
    port: 7005
});

app.use(cors());

function request() {
    let string1 = "Request_Order_Id_";
    var requestOrderId1 = string1.concat(uuidv4());
    global.requestOrderId = requestOrderId1;
}

function accept() {
    let string2 = "Accept_Order_Id_";
    let acceptOrderId1 = string2.concat(uuidv4());
    global.acceptOrderId = acceptOrderId1;
}

//CHECKING COUCHDB INSTANCE
couch.listDatabases().then(function(dbs) {
    console.log("dbs::", dbs);
});

// GET CALL FOR CHECKING SERVER RUNNING STATUS
app.get("/", async function(req, res) {
    try {
        console.log("SupplyChain server is Running");
        res.status(200).json({ response: "SupplyChain server is Running" });
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF ACCEPT ORDER
app.get("/AcceptedOrderDetails", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {

                const length = data.data.total_rows;
                const returnarrays = [];
                const typevalueaccept = "acceptorder";
                console.log("Accept Order Details::", data.data.rows[0]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalueaccept)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF REQUEST ORDER
app.get("/RequestOrderDetails", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "requestorder";
                console.log("Request Order Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF DISCOUNT 
app.get("/DiscountDetails", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "discount";
                console.log("Discount Order Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF LATE INVOICE
app.get("/LateInvoice", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "lateinvoicepayment";
                console.log("Late Invoide Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF LATE DELIVERY AND PENALTY
app.get("/LateDeliveryandPenalty", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "latedeliveryandpenalty";
                console.log(
                    "Late Delivery and Penalty  Details::",
                    data.data.rows[0]["doc"]
                );
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF FRAGILE GOODS
app.get("/FragileGoods", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "fragilegoods";
                console.log("FragileGoods  Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF PERISHABLE GOODS
app.get("/PerishableGoods", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "perishablegoods";
                console.log("perishablegoods  Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF PURCHASE ORDER FAILURE
app.get("/PurchaceOrderFailure", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "purchaseorderfailure";
                console.log(
                    "Purchace Order Failure Details::",
                    data.data.rows[0]["doc"]
                );
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// POST CALL FOR REQUEST ORDER
app.post("/RequestOrder", async function(req, res) {

    request();
    var agreeDeliveryDate = req.body.agreedDeliveryDate.toString();

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "RequestOrder",
                args: [requestOrderId,
                    buyer_Name,
                    seller_Name,
                    req.body.typeofGoods,
                    req.body.numberofUnits,
                    req.body.unitPrice,
                    agreeDeliveryDate,
                    req.body.terminationDays,
                    req.body.lateFee
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR ACCEPT ORDER
app.post("/AcceptOrder", async function(req, res) {

    accept();
    var dateagd = req.body.agreedDeliveryDate.toString();

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "AcceptOrder",
                args: [requestOrderId,
                    acceptOrderId,
                    buyer_Name,
                    seller_Name,
                    dateagd,
                    req.body.orderAccepted
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR DISCOUNT
app.post("/Discount", async function(req, res) {

    let string1 = "Discount_";
    let DiscountId = string1.concat(uuidv4());

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "Discount",
                args: [requestOrderId,
                    DiscountId,
                    req.body.firstVolume,
                    req.body.secondVolume,
                    req.body.firstRate,
                    req.body.secondRate,
                    req.body.thirdRate
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR ACCEPTANCE OF DELIVERY
app.post("/AcceptanceOfDelivery", async function(req, res) {

    request();

    let string1 = "Acceptance_Of_Delivery_";
    let acceptanceofDeliveryId = string1.concat(uuidv4());
    var actualDeliveryDate = req.body.actualDeliveryDate.toString();

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "AcceptanceOfDelivery",
                args: [acceptanceofDeliveryId,
                    requestOrderId,
                    actualDeliveryDate
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR LATE DELIVERY AND PENALTY
app.post("/LateDeliveryandPenalty", async function(req, res) {

    let string1 = "LateDelivery_and_PenaltyId_"
    let LateDeliveryandPenaltyId = string1.concat(uuidv4());
    var actualDeliveryDate = req.body.actualDeliveryDate.toString();
    console.log(actualDeliveryDate)

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "LateDeliveryandPenalty",
                args: [
                    requestOrderId,
                    LateDeliveryandPenaltyId,
                    actualDeliveryDate
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR FRAGILE GOODS
app.post("/FragileGoods", async function(req, res) {

    let string1 = "Fragile_Goods_";
    let FragileGoodsId = string1.concat(uuidv4());

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "FragileGoods",
                args: [requestOrderId,
                    FragileGoodsId,
                    req.body.accelerationMin,
                    req.body.accelerationMax,
                    req.body.accelerometerReadings,
                    req.body.accelerationBreachPenalty
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR PERISHABLE GOODS
app.post("/PerishableGoods", async function(req, res) {

    let string1 = "Perishable_Goods_Id_";
    let PerishableGoodsId = string1.concat(uuidv4());

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "PerishableGoods",
                args: [requestOrderId,
                    PerishableGoodsId,
                    req.body.minTemperature,
                    req.body.maxTemperature,
                    req.body.minHumidity,
                    req.body.maxHumidity,
                    req.body.penaltyFactor,
                    req.body.tempSensorReading,
                    req.body.humSensorReading
                ],
                ccname: "supplychain",
                channel: "sample",
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR PURCHASE ORDER FAILURE
app.post("/PurchaseOrderFailure", async function(req, res) {

    let string1 = "Purchase_Order_Failure_";
    let PurchaseOrderFailureId = string1.concat(uuidv4());

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "PurchaseOrderFailure",
                args: [requestOrderId,
                    PurchaseOrderFailureId,
                    req.body.maxFailures,
                    req.body.previousFailures,
                    req.body.amountFailureCompensation
                ],
                ccname: "supplychain",
                channel: "sample",
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR LATE INVOICE PAYMENT
app.post("/LateInvoicePayment", async function(req, res) {

    let string1 = "Late_Invoice_Payment";
    let LateInvoicePaymentId = string1.concat(uuidv4());
    var ionvoiceRecievedDate = req.body.invoiceReceivedDate.toString();

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "LateInvoicePayment",
                args: [requestOrderId,
                    LateInvoicePaymentId,
                    ionvoiceRecievedDate,
                    req.body.maxDelay,
                    req.body.lateFee,
                    req.body.interestStartsAfter,
                    req.body.lateInterestRate
                ],
                ccname: "supplychain",
                channel: "sample",
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR QUERY ALL DETAILS
app.get("/QueryAllDetails", async function(req, res) {

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "QueryAllDetails",
                args: [],
                ccname: "supplychain",
                channel: "sample",
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});

/////////////////-------------------Zip File Creation Code Starts Here---------------------////////////////////////////////////////////

app.post('/test', async function (req, res) {

   
       
    try{
        var datas=[];
        datas = req.body;
        console.log("data[]",datas);
        // console.log('hello satish')
        
        const fileOpsc= async () => {

        //deleting previous files    
        await fspromises.unlink(path.join(__dirname,'Chaincode','supplychain','node','index.js'))
        await fspromises.unlink(path.join(__dirname,'Chaincode','supplychain','node','package.json'))
        await fspromises.unlink(path.join(__dirname,'Chaincode','supplychain','node','lib','supplychain.js'))
        console.log("Perviously created files deleted successfully")    


        //index creation
        const index = await fspromises.readFile(path.join(__dirname,'zipcontents','index.js'),'utf8');
        await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node",'index.js')),index);
        console.log('index.js Inegrated Successfully');

        //package creation
        const packages = await fspromises.readFile(path.join(__dirname,'zipcontents','package.json'),'utf8');
        await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node",'package.json')),packages);
        console.log('package.json Inegrated Successfully');

        // Header Integration
        const header = await fspromises.readFile(path.join(__dirname,'chaincodeHeader.js'),'utf8');

        await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node","lib",'supplychain.js')),header);
        console.log('Chaincode Header Inegrated Successfully');

        // Body Integration
        

        for(var i = 0; i < datas.length; i++) {
            var filename = datas[i]
            const body = await fspromises.readFile(path.join(__dirname,filename+'.js'),'utf8');
            
            await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node","lib",'supplychain.js')),body);
            console.log('Chaincode Body for '+filename+' Inegrated Successfully');
          
            
        }
     

        // Footer Integration
        const footer = await fspromises.readFile(path.join(__dirname,'chaincodeFooter.js'),'utf8');
        await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node","lib",'supplychain.js')),footer);
        console.log('Chaincode Footer Inegrated Successfully');




        // const uploadDir = fs.readdirSync(path.join(__dirname,"Chaincode","supplychain")); 
        //Zipping Procedure Starts

    const zip = new AdmZip();

    zip.addLocalFolder(path.join(__dirname,"Chaincode","supplychain"))
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
const folderPath = path.join(__dirname,"/Chaincode/supplychain/node");

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
console.log(`Failed to evaluate transaction: ${error}`)
res.status(400)({
result : null,
error : error.message
})
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

////////////////---------------------Zip File Creation Code Ends Here--------------------------/////////////////////////////////////

////////////////---------------------Swagger Code Starts Here-----------------------------//////////////////////////////////////


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SupplyChain Domain',
            // version:'1.0.0',
            description: 'Generic APIs for testing functionalities of supplychain domain',
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["newserver.js"]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


var corsOptions = {
    origin: 'http://cdac.in',
    optionSuccessStatus: 200
}

app.use(express.json());

/**
 * @swagger
 * /LateDeliveryAndPenalty1:
 *  post:
 *   summary: 'API Testing for the Late Delivery and Penality for Supplychain Domain'
 *   description: 'In case of delayed delivery except for,"Dan" (the Seller) shall pay to "Steve" (the Buyer) for every day  delay of amount Rs1000.Any fractional part of a days is to be considered a full days.If the delay is more than 10 days, the Buyer is entitled to terminate this Contract.'
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: agreeddeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Date on which Delivery is Agreed Upon'
 *      example: '2022-1-11'
 *    - in: header
 *      name: goodsvalue
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Value of Goods'
 *      example: '1000'
 *    - in: header
 *      name: penaltypercentage
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Penalty Percentage for Goods on Late Delivery'
 *      example: '5'
 *    - in: header
 *      name: maxpercentage 
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Maximum Penalty Percentage for Goods on Late Delivery'
 *      example: '15'
 *    - in: header
 *      name: terminationdays
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Termination Days on Late Delivery'
 *      example: '10'
 *   responses:
 *    200:
 *     description: 'late delivery and penalty evaluation result'
 *    500:
 *     description : error
 */
app.post("/LateDeliveryAndPenalty1", LateDeliveryAndPenalty1);

/**
 * @swagger
 * /Discount1:
 *  post:
 *   summary: 'API Testing for the Discount for Supplychain Domain'
 *   description: 'If goods value is more than first volume,seller is giving a discount % of firstrate.If googs value is in between first volume and second volume seller is giving a discount % of secondrate and if goods value is less than second volume seller is giving a discount % of thirdrate'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of Goods'
 *      example: '10000'
 *    - in: header
 *      name: firstvolume
 *      schema:
 *       type: string
 *      required: true
 *      description: 'first Volume'
 *      example: '10000'
 *    - in: header
 *      name: secondvolume
 *      schema:
 *       type: string
 *      required: true
 *      description: 'second Volume'
 *      example: '5000'
 *    - in: header
 *      name: firstrate 
 *      schema:
 *       type: string
 *      required: true
 *      description: 'first discount Rate'
 *      example: '15'
 *    - in: header
 *      name: secondrate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'second discount Rate'
 *      example: '10'
 *    - in: header
 *      name: thirdrate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'third discount Rate'
 *      example: '5'
 *   responses:
 *    200:
 *     description: 'Discount evaluation result'
 *    500:
 *     description : error
 */
app.post("/Discount1", Discount1);



/**
 * @swagger
 * /AcceptanceOfDelivery1:
 *  post:
 *   summary: 'API Testing for the Acceptance of Delivery for Supplychain Domain'
 *   description: 'The Acceptance Criteria are the specifications the Widgets must meet for Party A to comply with its requirements and obligations under this agreement, If goods received with in the termination days,buyer will accept goods otherwise contract will terminated.'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: expectdate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Date on which Delivery is Agreed Upon'
 *      example: '2022-1-11'
 *    - in: header
 *      name: businessdays
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Termination Days'
 *      example: '10'
 *   responses:
 *    200:
 *     description: 'Acceptance of Delivery evaluation result'
 *    500:
 *     description : error
 */
app.post("/AcceptanceOfDelivery1", AcceptanceOfDelivery1);

/**
 * @swagger
 * /FragileGoods1:
 *  post:
 *   summary: 'API Testing for the FragileGoods for Supplychain Domain'
 *   description: 'The Equipment to be shipped to the Buyer shall be packed and shipped in accordance with the Specifications and if not specified therein....
 *                 Additionally the Equipment should have proper devices on it to record any shock during transportation as any instance of acceleration outside the bounds of 10g and 20g.
 *                 Each shock shall reduce the Contract Price by 100 rs'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: accelerationmin
 *      schema:
 *       type: string
 *      required: true
 *      description: 'minimum acceleration'
 *      example: '20'
 *    - in: header
 *      name: accelerationmax
 *      schema:
 *       type: string
 *      required: true
 *      description: 'maximum acceleration'
 *      example: '40'
 *    - in: header
 *      name: accelerometerreadings
 *      schema:
 *       type: string
 *      required: true
 *      description: 'accelero meter readings'
 *      example: '["24 35 36 47 49"]'
 *    - in: header
 *      name: accelerationbreachpenalty
 *      schema:
 *       type: string
 *      required: true
 *      description: 'acceleration breach penalty'
 *      example: '100'
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of goods'
 *      example: '10000'
 *   responses:
 *    200:
 *     description: 'FragileGoods  evaluation result'
 *    500:
 *     description : error
 */
app.post("/FragileGoods1", FragileGoods1);

/**
 * @swagger
 * /PerishableGoods1:
 *  post:
 *   summary: 'API Testing for the PerishableGoods for Supplychain Domain'
 *   description: 'Shipping containers used must be temperature and humidity controlled, and sensor readings must be logged at least 1 per hours.
 *                 Shipments that have a temperature or humidity reading outside the agreed range have a price penalty applied'
 *  
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: mintemperature
 *      schema:
 *       type: string
 *      required: true
 *      description: 'minimum temperature'
 *      example: '10'
 *    - in: header
 *      name: maxtemperature
 *      schema:
 *       type: string
 *      required: true
 *      description: 'maximum temperature'
 *      example: '20'
 *    - in: header
 *      name: minhumidity
 *      schema:
 *       type: string
 *      required: true
 *      description: 'minimum humidity'
 *      example: '60'
 *    - in: header
 *      name: maxhumidity
 *      schema:
 *       type: string
 *      required: true
 *      description: 'maximum humidity'
 *      example: '80'
 *    - in: header
 *      name: penaltyfactor
 *      schema:
 *       type: string
 *      required: true
 *      description: 'penalty factor'
 *      example: '100'
 *    - in: header
 *      name: tempsensorreading
 *      schema:
 *       type: string
 *      required: true
 *      description: 'temperature sensor reading'
 *      example: '["10 15 18 22 23"]'
 *    - in: header
 *      name: humsensorreading
 *      schema:
 *       type: string
 *      required: true
 *      description: 'humidity sensor reading'
 *      example: '["62 64 75 85 90 96"]'      
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of goods'
 *      example: '10000'
 *   responses:
 *    200:
 *     description: 'PerishableGoods  evaluation result'
 *    500:
 *     description : error
 */
app.post("/PerishableGoods1", PerishableGoods1);



/**
 * @swagger
 * /LateInvoicePayment1:
 *  post:
 *   summary: 'API Testing for the Late Invoice Payment for Supplychain Domain'
 *   description: 'Buyer has to pay invoice amount within the Maximum Delay Days for Payment Without Penalty otherwise Late Fee per Day after Maximum Delay,
 *                 Interest Starts After 4 Days with interest rate of 1%'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: invoiceduedate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Due Date to Pay The Amount'
 *      example: '2022-1-11'
 *    - in: header
 *      name: invoiceamountdue
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Invoice Due Amount'
 *      example: '100'
 *    - in: header
 *      name: intereststartsafter
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Interest Starts After .. Days'
 *      example: '10'
 *    - in: header
 *      name: maxdelay
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Maximum Delay Days for Payment Without Penalty'
 *      example: '10'
 *    - in: header
 *      name: lateinterestrate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Interest Rate for Delay'
 *      example: '100'
 *    - in: header
 *      name: latefee
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Late Fee per Day after Maximum Delay'
 *      example: '100'
 *   responses:
 *    200:
 *     description: 'Late Invoice Payment  evaluation result'
 *    500:
 *     description : error
 */

app.post("/LateInvoicePayment1", LateInvoicePayment1);

/**
 * @swagger
 * /purchaseOrderFailure1:
 *  post:
 *   summary: 'API Testing for the Purchace Order Failure for Supplychain Domain'
 *   description: 'If previous failures of seller is grater than maximum failure then failure Penalty for seller of amount 500 rs'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: previousfailures
 *      schema:
 *       type: string
 *      required: true
 *      description: 'previous Failures of seller'
 *      example: '3'
 *    - in: header
 *      name: maxfailures
 *      schema:
 *       type: string
 *      required: true
 *      description: 'max limit of Failures'
 *      example: '5'
 *    - in: header
 *      name: amount
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of goods'
 *      example: '10000'
 *    - in: header
 *      name: failurepenalty
 *      schema:
 *       type: string
 *      required: true
 *      description: 'failure Penalty for seller'
 *      example: '500'
 *   
 *   responses:
 *    200:
 *     description: 'Late Invoice Payment  evaluation result'
 *    500:
 *     description : error
 */
app.post("/purchaseOrderFailure1", purchaseOrderFailure1);

////////////////--------------------Swagger Code Ends Here----------------------------------//////////////////////////////////////

app.listen(3000, "10.244.1.51");
console.log("SupplyChain server is  Running on http://10.244.1.51:3000");
