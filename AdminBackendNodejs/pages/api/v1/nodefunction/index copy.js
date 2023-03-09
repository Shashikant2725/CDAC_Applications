// Read and Insert data 

// import {Domain,GoFunctions,NodeFunctions,JavaFunctions,GoStakeholders,NodeStakeholders,JavaStakeholders } from "../../../model/Main";
import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Stakeholder,NodeFunction} = require("../../../../model/Main");


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

            const users = await NodeFunction.find();
            res.status(200).send(users);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {

            // NodeFunction Body Section Starts
            const nodefunctionbody = {
                "FunctionName" : req.body.FunctionName,
                "Version" : req.body.Version, 
                "Description" : req.body.Description,
                "Code": req.body.Code,
                "Stakeholders" : req.body.Stakeholders
            }

            
            
            console.log("Inserting Values For Node Function Body" , nodefunctionbody)
            const createnodefunction = await NodeFunction.create(nodefunctionbody)
            console.log("Node Function Body Creation Status ", createnodefunction)

            var nodefunctionid = await NodeFunction.find().sort({_id : -1}).limit(1)
            var onlynodefunctionid = nodefunctionid[0]._id.toString()
            console.log('Just NodeFunction Id : ',onlynodefunctionid)
           
            var NodeFunctionDetails = await NodeFunction.find({_id:onlynodefunctionid})
            console.log("Last Inserted NodeFunction  Details", NodeFunctionDetails[0].FunctionName)
            
            //Updating Stakeholder
             for (let i = 0; i < req.body.Stakeholders.length; i++) {
                var nodefunctionupdate = await Stakeholder.updateOne({_id:req.body.Stakeholders[i].StakeholderId},{
                    $push : 
                    {
                        'NodeFunctions' :{
                            'FunctionName' : NodeFunctionDetails[0].FunctionName,
                            'FunctionId' : NodeFunctionDetails[0]._id
                        } 
                    }
                })
                console.log("Node Function Stakeholders Update For" ,req.body.Stakeholders[i].StakeholderId )
            }
            console.log("Stakrholder Function All Update Status : ",nodefunctionupdate)
            
            //Stakeholder Body Section Ends

           
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(createnodefunction);
            res.end()

        } catch(domainerror) {
            
            console.log("Something Went Wrong ",domainerror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(domainerror);
            res.end()

        } 
    }
}