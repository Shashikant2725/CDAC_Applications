'use strict'

let express = require('express')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())

const { Gateway, Wallets } = require('fabric-network')
const path = require('path')
const fs = require('fs')
const { error } = require('console')
const uuidv4 = require("uuid/v4")
let string1="Request_Order_Id_";
let string2="Accept_Order_Id_";
let requestOrderId=string1.concat(uuidv4());
let acceptOrderId=string2.concat(uuidv4());

const cors = require('cors');

app.use(cors());


app.get('/', async function (req, res) {
    try {
        console.log("SupplyChain server is Running")
        res.status(200).json({ response: "SupplyChain server is Running"})
         
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            console.log("Usersss",data)
        })
    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})
// app.get('/Users', async function (req, res) {
//     try {
        
//         fs.readFile('users.json', 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err)
//                 return
//             }
//             console.log("Usersss",data)
//         })
//     } catch (error) {
//         console.log("SupplyChain server Failed to Start")
//         process.exit(1)
//     }
// })

app.get('/QueryDetails', async function (req, res) {
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
            req.body.agreedDeliveryDate,
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

        // Submit the specified transaction
        // GenerateSeedsCert transaction - requires 10 arguments 
        await contract.submitTransaction(
            'AcceptOrder', 
            requestOrderId,
            acceptOrderId,
            req.body.buyer,
            req.body.shipper,
            req.body.agreedDeliveryDate,
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

app.post('/AcceptanceOfDelivery', async function (req, res) {
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
        let string1="Acceptance_Of_Delivery_"
        let acceptanceofDeliveryId=string1.concat(uuidv4());

        await contract.submitTransaction(
            'AcceptanceOfDelivery',
            acceptanceofDeliveryId,
            requestOrderId,
            req.body.actualDeliveryDate
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

        await contract.submitTransaction(
            'LateDeliveryandPenalty', 
            requestOrderId,
            LateDeliveryandPenaltyId,
            req.body.penaltyPercentage,
            req.body.maxPercentage
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

        await contract.submitTransaction(
            'LateInvoicePayment',
            requestOrderId,
            LateInvoicePaymentId,
            req.body.invoiceReceivedDate,
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


// app.get('/QueryAllDetails', async function (req, res) {
//     try {
//         const username = req.body.username='appUser';
//         // load the network configuration
//         const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet')
//         const wallet = await Wallets.newFileSystemWallet(walletPath)
//         console.log(`Wallet path: ${walletPath}`)

//        // Check to see if we've already enrolled the user.
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

//         // Evaluate the specified transaction
//         // QueryGeneratedSeedsCert has 1 argument : seedsBatchNumber string
//         // ex: {'QueryGeneratedSeedsCert', 'seeds1'}
//         const result = await contract.evaluateTransaction('QueryAllDetails')
//         fs.writeFile("users.json", result, (err) => {
//             if (err)
//               console.log(err);
//             else {
//               console.log("File written successfully\n");
//               console.log("The written has the following contents:");
//               console.log(fs.readFileSync("users.json", "utf8"));
//             }
//           });
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`)
        
//         res.status(200).json({ 
//             result: JSON.parse(result),
//             error: null,
//             })

//         //Disconnect from the gateway.
//         await gateway.disconnect()
//     } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`)
//         res.status(501).json({ 
//             result: null,
//             error: error.message
//             })
//     }
// })
app.listen(3000, 'localhost');
console.log('SupplyChain server is  Running on http://localhost:3000');
