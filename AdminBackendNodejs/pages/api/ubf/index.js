// Read and Insert data 

import {Domain,GoMain,NodeMain,JavaMain,GoStakeholders,NodeStakeholders,JavaStakeholders } from "../../../model/Main";
import dbConnect from "../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'




// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )

export default async function handler(req, res) {

//     var express = require('express')
// var cors = require('cors')
// var app = express()
 
// app.use(cors())
    const { method } = req;

    //Db Connect
    dbConnect();
    await cors(req, res)
    
    // Get method for read data from mongodb
    if(method === "GET") {
        try {

            const users = await Domain.find();
            res.status(200).json(users);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {

            // var JustId = Domain.find().sort({ _id: -1 }).limit(10)

            // console.log('Last inserted Id :',JustId) 
            // getLastID()

            // Domain Body Section Starts
            const domainbody = {
                "Domain" : req.body.Domain,
                "Go" : {
                    "Main_id" : "",
                    "Stakeholders_id" : ""
                },
                "Node": {
                    "Main_id" : "",
                    "Stakeholders_id" : ""
                },
                "Java" : {
                    "Main_id" : "",
                    "Stakeholders_id" : ""
                }
            }

            try{
                console.log("Inserting Values For Domain Body" , domainbody)
                const createdomain = await Domain.create(domainbody);
                console.log("Domain Body Creation Status ", createdomain)

                //Capturing Domain Id
                var domainmainid = await Domain.find().sort({_id : -1}).limit(1);
                console.log("Domain Main Last Inserted Id Was ",domainmainid)
                var onlydomainid = domainmainid[0]._id.toString()
            }catch(domainerror){
                console.log("Something Went Wrong ",domainerror)
                res.status(500).json(domainerror);
            }
            
            //Domain Body Section Ends

            //Node Main Body Section Starts
            const nodemainbody = 
                {
                    "Domain" : req.body.Domain,
                    "Main" : [
                        {
                        "Header" : [
                            {
                                "Version" : "1.0.0",
                                "Description" : "The Description For Header Goes Here",
                                "Code" :  "The Code For The Header Goes Here"
                            }
                        ]
                        },
                        {
                         "Footer" : [
                            {
                                "Version" : "1.0.0",
                                "Description" : "The Description For Footer Goes Here",
                                "Code" :  "The Code For The Footer Goes Here"
                            }
                        ]
                        }
                    ]
                }

            try{
                
                console.log("Inserting Values For Node Main Body" , nodemainbody)
                const createnodemain = await NodeMain.create([nodemainbody]);
                console.log("Node Main Body Creation Status ", createnodemain)
         

                //Upadting Domain Collection With Recently Inserted Records
                var nodemainid = await NodeMain.find().sort({_id : -1}).limit(1);
                console.log("Node Main Last Inserted Id Was ",nodemainid)
                var onlynodemainid = nodemainid[0]._id.toString()
                // console.log("Bro Last Inserted ID Was",nodemainid[0]._id)
                console.log("Bro Just Object Id Will Be ",onlynodemainid)

                var nodemainupdate = await Domain.updateOne({_id:onlydomainid},{$set : {"Node.Main_id" : onlynodemainid}})
                console.log("Updation Status In Domain" , nodemainupdate)


            // const rename1 = await Domain.findById(justid);
            // console.log("Docs From Find By Id",rename1)
            }catch(nodemainerror){
                console.log("Something Went Wrong ",nodemainerror)
                res.status(500).json(nodemainerror);

            }
            //Node Main Body Section Ends Here
            
            
            //Node Stakeholders Body Section Starts Here
            //Node Main Body Section Starts
            const nodestakeholderbody = 
                {
                    "Domain" : req.body.Domain,
                    "Stakeholders" : [
                        {
                        "Stakeholdername" : [
                            {   
                                "Functionname" : [{
                                    "Version" : "1.0.0",
                                    "Description" : "The Description For Header Goes Here",
                                    "Code" :  "The Code For The Header Goes Here"
                                }]   
                            }
                        ]
                        }
                    ]
                }

            try{
                
                console.log("Inserting Values For Node Stakeholders Body" , nodestakeholderbody)
                const createnodestakeholder = await NodeStakeholders.create([nodestakeholderbody]);
                console.log("Node Stakeholders Body Creation Status ", createnodestakeholder)
         

                //Upadting Domain Collection With Recently Inserted Records
                var nodestakeholdersid = await NodeMain.find().sort({_id : -1}).limit(1);
                console.log("Node Stakeholders Last Inserted Id Was ",nodestakeholdersid)
                var onlynodestakeholdersid = nodestakeholdersid[0]._id.toString()
                // console.log("Bro Last Inserted ID Was",nodemainid[0]._id)
                console.log("Bro Just Object Id Will Be ",onlynodestakeholdersid)

                var nodestakeholdersupdate = await Domain.updateOne({_id:onlydomainid},{$set : {"Node.Stakeholders_id" : onlynodestakeholdersid}})
                console.log("Updation Status In Domain" , nodestakeholdersupdate)


            // const rename1 = await Domain.findById(justid);
            // console.log("Docs From Find By Id",rename1)
            }catch(nodestakeholderserror){
                console.log("Something Went Wrong ",nodestakeholderserror)
                res.status(500).json(nodestakeholderserror);

            }
            //Node Stakeholders Body Section Ends here
            // getLastID()
            // finddetails()
            // const main = await Domain.create()
            // const gomain = await GoMain.create()
            // const nodemain = await NodeMain.create()
            // const javamain = await JavaMain.create()
            // const gostakeholders = await GoStakeholders.create()
            // const nodestakeholders = await NodeStakeholders.create()
            // const javastakeholders = await JavaStakeholders.create()



           
            res.status(201).json(main,gomain,nodemain,javamain,gostakeholders,nodestakeholders,javastakeholders);
            res.send('Query Resolved Successfully')
        } catch(err) {
            res.status(500).json(err);
        } 
    }
}