'use strict'

let express = require('express')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())

const { Gateway, Wallets } = require('fabric-network')
const path = require('path')
const fs = require('fs')
const { error } = require('console')

app.get('/', async function (req, res) {
    try {
        res.sendFile(__dirname + "fabric-samples/fabcar/javascript/index.html");
        console.log("index.html is running...");
        console.log("SupplyChain server is Running")
        res.status(200).json({ response: "SupplyChain server is Running"})
    } catch (error) {
        console.log("SupplyChain server Failed to Start")
        process.exit(1)
    }
})

app.get('/querydetails', async function (req, res) {
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



app.post('/acceptance', async function (req, res) {
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
            'AcceptanceofDelivery', 
            req.body.id,
            req.body.shipper,
            req.body.buyer,
            req.body.terminationDays,
            req.body.agreedDeliveryDate
            
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



app.post('/VolumeDiscount/', async function (req, res) {
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
            'VolumeDiscount', 
            req.body.id,
            req.body.costofGoods,
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



app.post('/LateDeliveryAndPenalty/', async function (req, res) {
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
            'LateDeliveryAndPenalty', 
            req.body.id,
            req.body.penaltyPercentage,
            req.body.goodsValue,
            req.body.maxPercentage,
            req.body.terminationDays,
            req.body.agreedDeliveryDate
            
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


app.post('/FragileGoods/', async function (req, res) {
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
            'FragileGoods', 
            req.body.id,
            req.body.accelerationMin,
            req.body.accelerationMax,
            req.body.accelerometerReadings,
            req.body.accelerationBreachPenalty,
            req.body.costofGoods
            
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




app.post('/PurchaseOrderFailure/', async function (req, res) {
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
            'PurchaseOrderFailure', 
            req.body.id,
            req.body.agreedDeliveryDate,
            req.body.actualDeliveryDate,
            req.body.costofGoods,
            req.body.maxFailures,
            req.body.previousFailures,
            req.body.lateFee,
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

app.post('/PaymentUponDelivery/', async function (req, res) {
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
            'PaymentUponDelivery',
            req.body.id,
            req.body.agreedDeliveryDate,
            req.body.actualDeliveryDate,
            req.body.costofGoods,
            req.body.deliveryFee,
            req.body.terminationDays,
            req.body.lateFree 
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



app.post('/LateInvoicePayment/', async function (req, res) {
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
            'LateInvoicePayment', 
            req.body.id,
            req.body.invoiceAmountDue,
            req.body.invoiceDueDate,
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


app.get('/QueryAllDetails/', async function (req, res) {
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
app.listen(8090, 'localhost');
console.log('SupplyChain server is  Running on http://localhost:8090');
