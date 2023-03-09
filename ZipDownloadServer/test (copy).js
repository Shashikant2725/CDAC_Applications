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


const fspromises = require('fs').promises

const AdmZip = require('adm-zip');

app.use(cors());



app.post('/test', async function (req, res) {

   
       
            try{
                var datas=[];
                datas = req.body.ngMultiselect;
                console.log("data[]",datas);
                // console.log('hello satish')
                
                const fileOpsc= async () => {
                // Header Integration
                const header = await fspromises.readFile(path.join(__dirname,'chaincodeHeader.js'),'utf8');

                await fspromises.appendFile((path.join(__dirname,"zipcontents",'supplychain.js')),header);
                console.log('Chaincode Header Inegrated Successfully');

                // Body Integration
                const uploadDir = fs.readdirSync(path.join(__dirname,"zipcontents")); 

                for(var i = 0; i < datas.length; i++) {
                    var filename = datas[i]
                    const body = await fspromises.readFile(path.join(__dirname,filename+'.js'),'utf8');
                    
                    await fspromises.appendFile((path.join(__dirname,"zipcontents",'supplychain.js')),body);
                    console.log('Chaincode Body for '+filename+' Inegrated Successfully');
                  
                    
                }
             
        
                // Footer Integration
                const footer = await fspromises.readFile(path.join(__dirname,'chaincodeFooter.js'),'utf8');
                await fspromises.appendFile((path.join(__dirname,"zipcontents",'supplychain.js')),footer);
                console.log('Chaincode Footer Inegrated Successfully');


                //Zipping Procedure Starts

            const zip = new AdmZip();

            for(var i = 0; i < uploadDir.length;i++){
                zip.addLocalFile(path.join(__dirname,"zipcontents",uploadDir[i]));
            }
 
            // Define zip file name
            const downloadName = `supplychain.zip`;

            const data = zip.toBuffer();

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
        
        
    
})

app.get('/Downloads',async function(req,res){
    res.download(path.join(__dirname,'zipcontents','supplychain.zip'));
})

app.listen(5000, '10.244.1.51');
console.log('SupplyChain server is  Running on http://10.244.1.51:3000');
