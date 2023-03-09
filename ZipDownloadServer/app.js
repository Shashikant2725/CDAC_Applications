'use strict'

const express = require("express");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json())
const alert=require('alert');
const { Gateway, Wallets } = require('fabric-network')
const path = require('path')
const fs = require('fs')
const { error } = require('console')
const url = require('url')
// New app using express module
const cors = require('cors');

app.use(bodyParser.urlencoded({
	extended:true
}));


app.use(cors());

app.get("/", function(req, res) {
res.sendFile(__dirname + "/login.html");
});
app.get("/shipper", function(req, res) {
    res.sendFile(__dirname + "/shipper.html");
    });

// app.get("/buyerfunctions", function (req, res) {
//     res.sendFile(__dirname + "/buyerfunctions.html");
// });

app.get("/queryalldetails", function (req, res) {
    res.sendFile(__dirname + "/shipperfunctions.html");
});
app.get("/index", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.get("/shipperfunctionwithid", function (req, res) {
    res.sendFile(__dirname + "/shipperfunctionwithid.html");
});
app.get("/listofFunctions", function (req, res) {
    res.sendFile(__dirname + "/listofFunctions.html");
});

// app.get("/latedelivery", function (req, res) {
//     res.sendFile(__dirname + "/latedelivery.html");
// });

app.get("/requestorder", function (req, res) {
    res.sendFile(__dirname + "/requestorder.html");
});

app.get("/discount", function (req, res) {
    res.sendFile(__dirname + "/discount.html");
});

app.get("/acceptanceofdelivery", function (req, res) {
    res.sendFile(__dirname + "/acceptedorder.html");
});

app.get("/acceptorder", function (req, res) {
    res.sendFile(__dirname + "/accpetorder.html");
});
  

app.get("/Shipperfunctions", function (req, res) {
    res.sendFile(__dirname + "/Shipperfunctions.html");
});
  


app.post('/querydetails', async function (req, res) {
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
       fs.writeFile('users.json', result, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
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


app.post('/queryalldetails', async function (req, res) {
    try {
        const username = req.body.username;
        // var id = req.params.id;
        console.log('The Username: ' + username);
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
    }
   catch (error) {
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
            req.body.id,
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


// app.post('/RequestOrderTest', async function (req, res) {
//     console.log('satish')
//     console.log(req.body)
//     res.status(200).send({"message":"Data Received"})
//     // try {
//     //     const username = req.body.username
//     //     // load the network configuration
//     //     const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//     //     const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf-8'))

//     //     // Create a new file system based wallet for managing identities.
//     //     const walletPath = path.join(process.cwd(), 'wallet')
//     //     const wallet = await Wallets.newFileSystemWallet(walletPath)
//     //     console.log(`Wallet path: ${walletPath}`)

//     //     // Check to see if we've already enrolled the user.
//     //     const identity = await wallet.get(username)
//     //     if (!identity) {
//     //         console.log(`An identity for the user "${username}" does not exist in the wallet`)
//     //         console.log('Run the registerUser.js application before retrying')
//     //         throw new Error(`An identity for the user ${username.toUpperCase()} does not exist in the wallet`)
//     //         return
//     //     }

//     //     // Create a new gateway for connecting to our peer node.
//     //     const gateway = new Gateway()
//     //     await gateway.connect(ccp, { 
//     //         wallet, 
//     //         identity: username, 
//     //         discovery: { 
//     //             enabled: true, 
//     //             asLocalhost: true 
//     //             } 
//     //     })

//     //     // Get the network (channel) our contract is deployed to.
//     //     const network = await gateway.getNetwork('mychannel')

//     //     // Get the contract from the network.
//     //     const contract = network.getContract('supplychain')

//     //     // Submit the specified transaction
//     //     // GenerateSeedsCert transaction - requires 10 arguments 
        
//     //     await contract.submitTransaction(
//     //         'RequestOrder', 
//     //         req.body.id,
//     //         req.body.buyer,
//     //         req.body.shipper,
//     //         req.body.typeofGoods,
//     //         req.body.numberofUnits,
//     //         req.body.unitPrice,
//     //         req.body.agreedDeliveryDate,
//     //         req.body.terminationDays,
//     //         req.body.lateFee  
//     //     )
//     //     console.log('Transaction has been submitted')
//     //     res.status(201).json({
//     //         result: 'Transaction has been submitted',
//     //         error: null
//     //     })

//     //     // Disconnect from the gateway.
//     //     await gateway.disconnect()
//     // } catch (error) {
//     //     console.log(`Failed to evaluate transaction: ${error}`)
//     //     res.status(400)({
//     //         result : null,
//     //         error : error.message
//     //         })
//     // }
// })


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
        
        await contract.submitTransaction(
            'Discount', 
            req.body.reqOrderId,
            req.body.DiscountId,
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
        
        await contract.submitTransaction(
            'AcceptanceOfDelivery', 
            req.body.acceptanceofDeliveryId,
            req.body.reqOrderId,
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
            req.body.reqOrderId,
            req.body.acceptOrderId,
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


app.listen(3000, function(){
console.log("server is running on port 3000");
})
