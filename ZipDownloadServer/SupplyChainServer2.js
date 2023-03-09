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

const fs = require('fs')
const { error } = require('console')
const uuidv4 = require("uuid/v4")
const cors = require('cors');

app.use(cors());

function request(){
    let string1="Request_Order_Id_";
    var requestOrderId1=string1.concat(uuidv4());
    global.requestOrderId=requestOrderId1;
}
function accept(){
    let string2="Accept_Order_Id_";
    let acceptOrderId1=string2.concat(uuidv4());
    global.acceptOrderId=acceptOrderId1;
}


const couch = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: 'adminpw'
    },
});

couch.listDatabases().then(function(dbs) {
    console.log("dbs::",dbs);
    // request error occured
});

const dbName = "mychannel_supplychain";

// const viewUrl = "_all_docs?include_docs=true&inclusive_end=true";
const viewUrl = "_all_docs?include_docs=true&inclusive_end=true";
const data1='';
app.get('/',async function(req,res){
    res.send('Successfull');
})
app.get('/AcceptedOrderDetails', async function (req, res) {
    try {
         couch.get(dbName, viewUrl).then(function(data, headers, status){
            // console.log("data::",JSON.stringify(data.data.rows));
            // var tok = mychannel_supplychain:data.data.rows

            // console.log("data::",data.data.total_rows);
            const length = data.data.total_rows;
            // console.log('total length = ',length)
            const returnarrays = [];
            const typevalueaccept = 'acceptorder'
            console.log("Accept Order Details::",data.data.rows[0])
            // returnarrays.push(data.data.rows[0]['doc']);
            for (let i = 0; i <=length-1; i++) {
                if (data.data.rows[i]['doc']['type'] == typevalueaccept)
                returnarrays.push(data.data.rows[i]['doc']);
              }
            //   console.log(returnarrays)
             res.send(returnarrays)

            ///////------------------/////////////////////
            // const returnarrays = [];
            // for (let i = 1; i < length-1; i++) {
            //     returnarrays.push(data.data.rows[2]['doc']);
            //   }
            //   console.log(returnarrays)
            //   res.send(returnarrays)
           
         
         },function(err){
            res.send(err);
         })

    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

const viewUrlReq = "_all_docs?include_docs=true&inclusive_end=true";
// const data1='';
app.get('/RequestOrderDetails', async function (req, res) {
    try {
         couch.get(dbName, viewUrlReq).then(function(data, headers, status){
            // console.log("data::",JSON.stringify(data.data.rows));
            const length = data.data.total_rows;
            console.log("Length::",length)
            const returnarrays = [];
            const typevalue = 'requestorder'
            console.log("Request Order Details::",data.data.rows[0]['doc'])
            // returnarrays.push(data.data.rows[1]['doc']);
         
            for (let i = 0 ; i <=length-1; i++) {
                if (data.data.rows[i]['doc']['type'] == typevalue)
                returnarrays.push(data.data.rows[i]['doc']);
              }
            //   console.log(returnarrays)
             res.send(returnarrays)
           
            // res.render('index',{
               
            //     mychannel_supplychain:data.data.rows,
            // })

         },function(err){
            res.send(err);
         })

    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

const viewUrlDisc = "_all_docs?include_docs=true&inclusive_end=true";
// const data1='';
app.get('/DiscountDetails', async function (req, res) {
    try {
         couch.get(dbName, viewUrlDisc).then(function(data, headers, status){
            // console.log("data::",JSON.stringify(data.data.rows));
            const length = data.data.total_rows;
            console.log("Length::",length)
            const returnarrays = [];
            const typevalue = 'discount'
            console.log("Discount Order Details::",data.data.rows[0]['doc'])
            // returnarrays.push(data.data.rows[1]['doc']);
         
            for (let i = 0 ; i <=length-1; i++) {
                if (data.data.rows[i]['doc']['type'] == typevalue)
                returnarrays.push(data.data.rows[i]['doc']);
              }
            //   console.log(returnarrays)
             res.send(returnarrays)
           
            // res.render('index',{
               
            //     mychannel_supplychain:data.data.rows,
            // })

         },function(err){
            res.send(err);
         })

    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

const viewUrlLateInvoice = "_all_docs?include_docs=true&inclusive_end=true";
// const data1='';
app.get('/LateInvoice', async function (req, res) {
    try {
         couch.get(dbName, viewUrlLateInvoice).then(function(data, headers, status){
            // console.log("data::",JSON.stringify(data.data.rows));
            const length = data.data.total_rows;
            console.log("Length::",length)
            const returnarrays = [];
            const typevalue = 'lateinvoicepayment'
            console.log("Late Invoide Details::",data.data.rows[0]['doc'])
            // returnarrays.push(data.data.rows[1]['doc']);
         
            for (let i = 0 ; i <=length-1; i++) {
                if (data.data.rows[i]['doc']['type'] == typevalue)
                returnarrays.push(data.data.rows[i]['doc']);
              }
            //   console.log(returnarrays)
             res.send(returnarrays)
           
            // res.render('index',{
               
            //     mychannel_supplychain:data.data.rows,
            // })

         },function(err){
            res.send(err);
         })

    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

const viewUrlLateDeliveryandPenalty = "_all_docs?include_docs=true&inclusive_end=true";
// const data1='';
app.get('/LateDeliveryandPenalty', async function (req, res) {
    try {
         couch.get(dbName, viewUrlLateDeliveryandPenalty).then(function(data, headers, status){
            // console.log("data::",JSON.stringify(data.data.rows));
            const length = data.data.total_rows;
            console.log("Length::",length)
            const returnarrays = [];
            const typevalue = 'latedeliveryandpenalty'
            console.log("Late Delivery and Penalty  Details::",data.data.rows[0]['doc'])
            // returnarrays.push(data.data.rows[1]['doc']);
         
            for (let i = 0 ; i <=length-1; i++) {
                if (data.data.rows[i]['doc']['type'] == typevalue)
                returnarrays.push(data.data.rows[i]['doc']);
              }
            //   console.log(returnarrays)
             res.send(returnarrays)
           
            // res.render('index',{
               
            //     mychannel_supplychain:data.data.rows,
            // })

         },function(err){
            res.send(err);
         })

    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

const viewUrlFragileGoods = "_all_docs?include_docs=true&inclusive_end=true";
// const data1='';
app.get('/FragileGoods', async function (req, res) {
    try {
         couch.get(dbName, viewUrlFragileGoods).then(function(data, headers, status){
            // console.log("data::",JSON.stringify(data.data.rows));
            const length = data.data.total_rows;
            console.log("Length::",length)
            const returnarrays = [];
            const typevalue = 'fragilegoods'
            console.log("FragileGoods  Details::",data.data.rows[0]['doc'])
            // returnarrays.push(data.data.rows[1]['doc']);
         
            for (let i = 0 ; i <=length-1; i++) {
                if (data.data.rows[i]['doc']['type'] == typevalue)
                returnarrays.push(data.data.rows[i]['doc']);
              }
            //   console.log(returnarrays)
             res.send(returnarrays)
           
            // res.render('index',{
               
            //     mychannel_supplychain:data.data.rows,
            // })

         },function(err){
            res.send(err);
         })

    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

const viewUrlPerishableGoods = "_all_docs?include_docs=true&inclusive_end=true";
// const data1='';
app.get('/PerishableGoods', async function (req, res) {
    try {
         couch.get(dbName, viewUrlPerishableGoods).then(function(data, headers, status){
            // console.log("data::",JSON.stringify(data.data.rows));
            const length = data.data.total_rows;
            console.log("Length::",length)
            const returnarrays = [];
            const typevalue = 'perishablegoods'
            console.log("perishablegoods  Details::",data.data.rows[0]['doc'])
            // returnarrays.push(data.data.rows[1]['doc']);
         
            for (let i = 0 ; i <=length-1; i++) {
                if (data.data.rows[i]['doc']['type'] == typevalue)
                returnarrays.push(data.data.rows[i]['doc']);
              }
            //   console.log(returnarrays)
             res.send(returnarrays)
           
            // res.render('index',{
               
            //     mychannel_supplychain:data.data.rows,
            // })

         },function(err){
            res.send(err);
         })

    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

const viewUrlPurchaceOrderFailure = "_all_docs?include_docs=true&inclusive_end=true";
// const data1='';
app.get('/PurchaceOrderFailure', async function (req, res) {
    try {
         couch.get(dbName, viewUrlPurchaceOrderFailure).then(function(data, headers, status){
            // console.log("data::",JSON.stringify(data.data.rows));
            const length = data.data.total_rows;
            console.log("Length::",length)
            const returnarrays = [];
            const typevalue = 'purchaseorderfailure'
            console.log("Purchace Order Failure Details::",data.data.rows[0]['doc'])
            // returnarrays.push(data.data.rows[1]['doc']);
         
            for (let i = 0 ; i <=length-1; i++) {
                if (data.data.rows[i]['doc']['type'] == typevalue)
                returnarrays.push(data.data.rows[i]['doc']);
              }
            //   console.log(returnarrays)
             res.send(returnarrays)
           
            // res.render('index',{
               
            //     mychannel_supplychain:data.data.rows,
            // })

         },function(err){
            res.send(err);
         })

    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

app.get('/', async function (req, res) {
    try {
        console.log("SupplyChain server is Running")
        res.status(200).json({ response: "SupplyChain server is Running"})
    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})
app.get('/QueryDetails/', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        // Evaluate the specified transaction
        // QueryDetails has 1 argument : id
       const result = await contract.evaluateTransaction('QueryDetails',req.body.id)
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`)
        res.status(200).json({ 
            result: JSON.parse(result.toString()),
            error: null,
            })

        //Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        res.status(501).json({ 
            result: null,
            error: error.message
            })
    }
})


app.post('/RequestOrder', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')
        
        request();
        var agreeDeliveryDate= req.body.agreedDeliveryDate.toString();
        console.log(agreeDeliveryDate);
        // const adate;
        // adate = req.body.agreedDeliveryDate.toString()
        // console.log(adate)
        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        await contract.submitTransaction(
            'RequestOrder', 
            requestOrderId,
            req.body.buyer,
            req.body.shipper,
            req.body.typeofGoods,
            req.body.numberofUnits,
            req.body.unitPrice,
            agreeDeliveryDate,
            req.body.terminationDays,
            req.body.lateFee  
        )
        console.log('Transaction has been submitted')
        res.status(201).json({
            result: 'Transaction has been submitted',
            error: null
        })

        // Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`)
        res.status(400)({
            result : null,
            error : error.message
            })
    }
})


app.post('/AcceptOrder', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        accept();
        var dateagd= req.body.agreedDeliveryDate.toString();
        console.log(dateagd);

        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        await contract.submitTransaction(
            'AcceptOrder', 
            requestOrderId,
            acceptOrderId,
            req.body.buyer,
            req.body.shipper,
            dateagd,
            req.body.orderAccepted
        )
        console.log('Transaction has been submitted')
        res.status(201).json({
            result: 'Transaction has been submitted',
            error: null
        })

        // Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`)
        res.status(400)({
            result : null,
            error : error.message
            })
    }
})


app.post('/Discount', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        const uuidv4 = require("uuid/v4")
        let string1="Discount_"
        let DiscountId=string1.concat(uuidv4());
        await contract.submitTransaction(
            'Discount', 
            requestOrderId,
            DiscountId,
            req.body.firstVolume,
            req.body.secondVolume,
            req.body.firstRate,
            req.body.secondRate,
            req.body.thirdRate
        )
        console.log('Transaction has been submitted')
        res.status(201).json({
            result: 'Transaction has been submitted',
            error: null
        })

        // Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`)
        res.status(400)({
            result : null,
            error : error.message
            })
    }
})

// app.post('/AcceptanceOfDelivery', async function (req, res) {
//     try {
//         const username = req.body.username
//         // load the network configuration
//         const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet')
//         const wallet = await Wallets.newFileSystemWallet(walletPath)
//         console.log(`Wallet path: ${walletPath}`)

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get(username)
//         if (!identity) {
//             console.log(`An identity for the user "${username}" does not exist in the wallet`)
//             console.log('Run the registerUser.js application before retrying')
//             throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
//             return
//         }

//         // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway()
//         await gateway.connect(ccp, { 
//             wallet, 
//             identity: username, 
//             discovery: { 
//                 enabled: true, 
//                 asLocalhost: true 
//                 } 
//         })

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel')

//         // Get the contract from the network.
//         const contract = network.getContract('supplychain')

//         // Submit the specified transaction
//         // GenerateSeedsCert transaction - requires 10 arguments 
//         const uuidv4 = require("uuid/v4")
//         let string1="Acceptance_Of_Delivery_"
//         let acceptanceofDeliveryId=string1.concat(uuidv4());

//         var actualDeliveryDate= req.body.actualDeliveryDate.toString();
//         console.log(actualDeliveryDate);

//         await contract.submitTransaction(
//             'AcceptanceOfDelivery',
//             acceptanceofDeliveryId,
//             requestOrderId,
//             actualDeliveryDate
//         )
//         console.log('Transaction has been submitted')
//         res.status(201).json({
//             result: 'Transaction has been submitted',
//             error: null
//         })

//         // Disconnect from the gateway.
//         await gateway.disconnect()
//     } catch (error) {
//         console.log(`Failed to evaluate transaction: ${error}`)
//         res.status(400)({
//             result : null,
//             error : error.message
//             })
//     }
// })

app.post('/LateDeliveryandPenalty', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        const uuidv4 = require("uuid/v4")
        let string1="LateDelivery_and_PenaltyId_"
        let LateDeliveryandPenaltyId=string1.concat(uuidv4());
        var actualDeliveryDate= req.body.actualDeliveryDate.toString();
         console.log(actualDeliveryDate);
        await contract.submitTransaction(
            'LateDeliveryandPenalty', 
            requestOrderId,
            LateDeliveryandPenaltyId,
            actualDeliveryDate
            // req.body.penaltyPercentage,
            // req.body.maxPercentage
        )
        console.log('Transaction has been submitted')
        res.status(201).json({
            result: 'Transaction has been submitted',
            error: null
        })

        // Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`)
        res.status(400)({
            result : null,
            error : error.message
            })
    }
})


app.post('/FragileGoods', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        const uuidv4 = require("uuid/v4")
        let string1="Fragile_Goods_"
        let FragileGoodsId=string1.concat(uuidv4());
        await contract.submitTransaction(
            'FragileGoods',
            requestOrderId, 
            FragileGoodsId,
            req.body.accelerationMin,
            req.body.accelerationMax,
            req.body.accelerometerReadings,
            req.body.accelerationBreachPenalty
        )
        console.log('Transaction has been submitted')
        res.status(201).json({
            result: 'Transaction has been submitted',
            error: null
        })

        // Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`)
        res.status(400)({
            result : null,
            error : error.message
            })
    }
})


app.post('/PerishableGoods', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        const uuidv4 = require("uuid/v4")
        let string1="Perishable_Goods_Id_"
        let PerishableGoodsId=string1.concat(uuidv4());


        await contract.submitTransaction(
            'PerishableGoods',
            requestOrderId,
            PerishableGoodsId,
            req.body.minTemperature,
            req.body.maxTemperature,
            req.body.minHumidity,
            req.body.maxHumidity,
            req.body.penaltyFactor,
            req.body.tempSensorReading,
            req.body.humSensorReading
        )
        console.log('Transaction has been submitted')
        res.status(201).json({
            result: 'Transaction has been submitted',
            error: null
        })

        // Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`)
        res.status(400)({
            result : null,
            error : error.message
            })
    }
})



app.post('/PurchaseOrderFailure', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        
        const uuidv4 = require("uuid/v4")
        let string1="Purchase_Order_Failure_"
        let PurchaseOrderFailureId=string1.concat(uuidv4());


        await contract.submitTransaction(
            'PurchaseOrderFailure',
            requestOrderId, 
            PurchaseOrderFailureId,
            req.body.maxFailures,
            req.body.previousFailures,
            req.body.amountFailureCompensation
            
        )
        console.log('Transaction has been submitted')
        res.status(201).json({
            result: 'Transaction has been submitted',
            error: null
        })

        // Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`)
        res.status(400)({
            result : null,
            error : error.message
            })
    }
})



app.post('/LateInvoicePayment', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        
        const uuidv4 = require("uuid/v4")
        let string1="Late_Invoice_Payment"
        let LateInvoicePaymentId=string1.concat(uuidv4());
        var ionvoiceRecievedDate= req.body.invoiceReceivedDate.toString();
        console.log(ionvoiceRecievedDate);

        await contract.submitTransaction(
            'LateInvoicePayment',
            requestOrderId,
            LateInvoicePaymentId,
            ionvoiceRecievedDate,
            req.body.maxDelay,
            req.body.lateFee,
            req.body.interestStartsAfter,
            req.body.lateInterestRate
            
        )
        console.log('Transaction has been submitted')
        res.status(201).json({
            result: 'Transaction has been submitted',
            error: null
        })

        // Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.log(`Failed to evaluate transaction: ${error}`)
        res.status(400)({
            result : null,
            error : error.message
            })
    }
})


app.get('/QueryAllDetails', async function (req, res) {
    try {
        const username = req.body.username
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath)
        console.log(`Wallet path: ${walletPath}`)

       // Check to see if we've already enrolled the user.
        const identity = await wallet.get(username)
        if (!identity) {
            console.log(`An identity for the user "${username}" does not exist in the wallet`)
            console.log('Run the registerUser.js application before retrying')
            throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
            return
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, { 
            wallet, 
            identity: username, 
            discovery: { 
                enabled: true, 
                asLocalhost: true 
                } 
        })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')

        // Get the contract from the network.
        const contract = network.getContract('supplychain')

        // Evaluate the specified transaction
        // QueryGeneratedSeedsCert has 1 argument : seedsBatchNumber string
        // ex: {'QueryGeneratedSeedsCert', 'seeds1'}
        const result = await contract.evaluateTransaction('QueryAllDetails')
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`)
        res.status(200).json({ 
            result: JSON.parse(result.toString()),
            error: null,
            })

        //Disconnect from the gateway.
        await gateway.disconnect()
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`)
        res.status(501).json({ 
            result: null,
            error: error.message
            })
    }
})
app.listen(3000, '10.244.1.51');
console.log('SupplyChain server is  Running on http://10.244.1.51:3000');
