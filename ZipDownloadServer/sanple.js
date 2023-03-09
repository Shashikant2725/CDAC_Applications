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
const { promises: { readdir } } = require('fs')
const { error } = require('console')
const uuidv4 = require("uuid/v4")
const cors = require('cors');


const fspromises = require('fs').promises

const AdmZip = require('adm-zip');

app.use(cors());



app.post('/test', async function (req, res) {

   
       
            try{
                var datas=[];
                datas = req.body.ngMultiselect;
                console.log("data[]",datas);
                // console.log('hello satish')
                
              
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

app.listen(5000, '10.244.1.51');
console.log('SupplyChain server is  Running on http://10.244.1.51:3000');
