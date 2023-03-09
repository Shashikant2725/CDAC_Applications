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
const fs = require('fs')
const axios = require('axios')
const { promises: { readdir } } = require('fs')
const { error } = require('console')
const uuidv4 = require("uuid/v4")
const cors = require('cors');


const fspromises = require('fs').promises

const AdmZip = require('adm-zip');
const { Domain } = require('domain')

app.use(cors());



app.post('/test', async function (req, res) {

   
       
            try{
                // alert('bhai post sai hu')
                var datas=[];
                // datas = req.body;
                datas.push(req.body.user.requestedfunction);
                console.log("data::",datas);

                let res = await axios.get(`http://10.244.1.51:4300/api/nodefunction/${datas[0]}`);
                mongodata = res.data;
                // console.log('Value form mongodb',mongodata)
                // console.log('DOMAIN NAME',mongodata.Domain)
                Domainname = mongodata.Domain
                CCfilename = Domainname+'.js'
                const fileOpsc= async () => {
                    // console.log('DOMAIN NAME inside',data.Domain)


                // Creating Working Folder Structure

                //Main Directory
                fs.access(path.join(__dirname,'Chaincode',Domainname), (error) => {
                    if (error) {
                      fs.mkdir(path.join(__dirname,'Chaincode',Domainname), (error) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log(Domainname + "Directory created successfully !!");
                        }
                      });
                    } else {

                        if (fs.existsSync(path.join(__dirname,'Chaincode',Domainname))) {
                            const files = fs.readdirSync(path)
                        
                            if (files.length > 0) {
                              files.forEach(function(filename) {
                                if (fs.statSync(path.join(__dirname,'Chaincode',Domainname) + "/" + filename).isDirectory()) {
                                  removeDir(path.join(__dirname,'Chaincode',Domainname) + "/" + filename)
                                } else {
                                  fs.unlinkSync(path.join(__dirname,'Chaincode',Domainname) + "/" + filename)
                                }
                              })
                              fs.rmdirSync(path.join(__dirname,'Chaincode',Domainname))
                            } else {
                              fs.rmdirSync(path.join(__dirname,'Chaincode',Domainname))
                            }
                          } else {
                            console.log("Directory path not found.")
                          }

                          fs.mkdir(path.join(__dirname,'Chaincode',Domainname), (error) => {
                            if (error) {
                              console.log(error);
                            } else {
                              console.log(Domainname + "Directory created successfully !!");
                            }
                          });
                    //   console.log(Domainname + " Directory already exists !!");
                    }
                });

                //Node Directory
                fs.access(path.join(__dirname,'Chaincode',Domainname,'node'), (error) => {
                    if (error) {
                      fs.mkdir(path.join(__dirname,'Chaincode',Domainname,'node'), (error) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Node Directory Created successfully inside !!" + Domainname);
                        }
                      });
                    } else {
                        // fs.rmdir(path.join(__dirname,'Chaincode',Domainname,'node'), function(err) {
                        //     if (err) {
                        //       throw err
                        //     } else {
                        //       console.log("Successfully removed the Level Two directory!")
                        //     }
                        //   })
                      console.log( "Node Directory already exists !!");
                    }
                });

                //Lib Directory
                fs.access(path.join(__dirname,'Chaincode',Domainname,'node','lib'), (error) => {
                    if (error) {
                      fs.mkdir(path.join(__dirname,'Chaincode',Domainname,'node','lib'), (error) => {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Lib Directory Created successfully inside Node Directory" );
                        }
                      });
                    } else {
                       
                      console.log( "Lib Directory already exists !!");
                    }
                });

                //deleting previous files  
                
                fs.exists(path.join(__dirname,'Chaincode',Domainname,'node','index.js'), function(exists) {
                    if(exists) {
                        console.log('index exists. Deleting now ...');
                        fs.unlinkSync(path.join(__dirname,'Chaincode',Domainname,'node','index.js'));
                    } else {
                        console.log('index.js not found, so not deleting.');
                    }
                });


                fs.exists(path.join(__dirname,'Chaincode',Domainname,'node','package.json'), function(exists) {
                    if(exists) {
                        console.log('Package.json exists. Deleting now ...');
                        fs.unlinkSync(path.join(__dirname,'Chaincode',Domainname,'node','package.json'));
                    } else {
                        console.log('package.json not found, so not deleting.');
                    }
                });


                fs.exists(path.join(__dirname,'Chaincode',Domainname,'node','lib',CCfilename), function(exists) {
                    if(exists) {
                        console.log('Chaincode File exists. Deleting now ...');
                        fs.unlinkSync(path.join(__dirname,'Chaincode',Domainname,'node','lib',CCfilename));
                    } else {
                        console.log('Chaincode File not found, so not deleting.');
                    }
                });


                
                
                // fspromises.access(path.join(__dirname,'Chaincode',Domainname,'node','index.js'), (err) => {
                //     if (err) {
                //         console.log("index.js does not exist.");
                //     } else {
                //         fspromises.unlink(path.join(__dirname,'Chaincode',Domainname,'node','index.js'))
                //     }
                // });


                // fspromises.access(path.join(__dirname,'Chaincode',Domainname,'node','package.json'), (err) => {
                //     if (err) {
                //         console.log("package.json does not exist.");
                //     } else {
                //         fspromises.unlink(path.join(__dirname,'Chaincode',Domainname,'node','lib',CCfilename))
                //     }
                // });

                // fspromises.access(path.join(__dirname,'Chaincode',Domainname,'node','package.json'), (err) => {
                //     if (err) {
                //         console.log("Chaincode File does not exist.");
                //     } else {
                //         fspromises.unlink(path.join(__dirname,'Chaincode',Domainname,'node','lib',CCfilename))
                //     }
                // });
                // await fspromises.unlink(path.join(__dirname,'Chaincode',Domainname,'node','index.js'))
                // await fspromises.unlink(path.join(__dirname,'Chaincode',Domainname,'node','package.json'))
                // await fspromises.unlink(path.join(__dirname,'Chaincode',Domainname,'node','lib',CCfilename))
                console.log("Perviously created files deleted successfully")    


                //index creation
                const index = `
'use strict';

const ${Domainname}= require('./lib/${Domainname}');
                
module.exports.${Domainname} = ${Domainname};
module.exports.contracts = [ ${Domainname} ];`
                
                await fspromises.appendFile((path.join(__dirname,"Chaincode",Domainname,"node",'index.js')),index);
                console.log('index.js Inegrated Successfully');

            //     //package creation
            //     const packages = await fspromises.readFile(path.join(__dirname,'zipcontents','package.json'),'utf8');
            //     await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node",'package.json')),packages);
            //     console.log('package.json Inegrated Successfully');

            //     // Header Integration
            //     const header = await fspromises.readFile(path.join(__dirname,'chaincodeHeader.js'),'utf8');

            //     await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node","lib",'supplychain.js')),header);
            //     console.log('Chaincode Header Inegrated Successfully');

            //     // Body Integration
                

            //     for(var i = 0; i < datas.length; i++) {
            //         var filename = datas[i]
            //         const body = await fspromises.readFile(path.join(__dirname,filename+'.js'),'utf8');
            //         await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node","lib",'supplychain.js')),body);
            //         console.log('Chaincode Body for '+filename+' Inegrated Successfully');
                  
                    
            //     }
             
        
            //     // Footer Integration
            //     const footer = await fspromises.readFile(path.join(__dirname,'chaincodeFooter.js'),'utf8');
            //     await fspromises.appendFile((path.join(__dirname,"Chaincode",'supplychain',"node","lib",'supplychain.js')),footer);
            //     console.log('Chaincode Footer Inegrated Successfully');




            //     // const uploadDir = fs.readdirSync(path.join(__dirname,"Chaincode","supplychain")); 
            //     //Zipping Procedure Starts

            // const zip = new AdmZip();

            // zip.addLocalFolder(path.join(__dirname,"Chaincode","supplychain"))
            // // for(var i = 0; i < uploadDir.length;i++){
            // //     zip.addLocalFile(path.join(__dirname,"Chaincode","supplychain",uploadDir[i]));
            // // }
            

            // // Define zip file name
            // const downloadName = `supplychain.zip`;

            // // const data = zip.toBuffer();

            // // save file zip in root directory
            // zip.writeZip(path.join(__dirname,"/zipcontents",downloadName));
                
        
            } 
             fileOpsc();
            res.status(201).json({
                result: 'Transaction has been submitted',
                error: null
            }) 
        }
        
            
        catch (err) {
            console.log(`Failed to evaluate transaction: ${err}`)
            res.status(400)({
                result : null,
                error : err.message
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
