// Read and Insert data 

// import {Domain,GoFunctions,GoFunctions,JavaFunctions,GoStakeholders,GoStakeholders,JavaStakeholders } from "../../../model/Main";
import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Stakeholder,GoFunction} = require("../../../../model/Main");


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

            const users = await GoFunction.find();
            res.status(200).send(users);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {

            // GoFunction Body Section Starts
            const Gofunctionbody = {
                "FunctionName" : req.body.FunctionName,
                "Version" : req.body.Version, 
                "Description" : req.body.Description,
                "Code": req.body.Code,
                "Stakeholders" : req.body.Stakeholders
            }

            
            console.log("Inserting Values For Go Function Body" , Gofunctionbody)
            const createGofunction = await GoFunction.create(Gofunctionbody)
            console.log("Go Function Body Creation Status ", createGofunction)

            var Gofunctionid = await GoFunction.find().sort({_id : -1}).limit(1)
            var onlyGofunctionid = Gofunctionid[0]._id.toString()
            console.log('Just GoFunction Id : ',onlyGofunctionid)
           
            var GoFunctionDetails = await GoFunction.find({_id:onlyGofunctionid})
            console.log("Last Inserted GoFunction  Details", GoFunctionDetails[0].FunctionName)
            
            //Updating Stakeholder
             for (let i = 0; i < req.body.Stakeholders.length; i++) {
                var Gofunctionupdate = await Stakeholder.updateOne({_id:req.body.Stakeholders[i].StakeholderId},{
                    $push : 
                    {
                        'GoFunctions' :{
                            'FunctionName' : GoFunctionDetails[0].FunctionName,
                            'FunctionId' : GoFunctionDetails[0]._id
                        } 
                    }
                })
                console.log("Go Function Stakeholders Update For" ,req.body.Stakeholders[i].StakeholderId )
            }
            console.log("Stakrholder Function All Update Status : ",Gofunctionupdate)
            
            //Stakeholder Body Section Ends

           
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(createGofunction);
            res.end()

        } catch(domainerror) {
            
            console.log("Something Went Wrong ",domainerror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(domainerror);
            res.end()

        } 
    }
}