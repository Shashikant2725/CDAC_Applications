// Read and Insert data 

// import {Domain,GoFunctions,JavaFunctions,JavaFunctions,GoStakeholders,JavaStakeholders,JavaStakeholders } from "../../../model/Main";
import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Stakeholder,JavaFunction} = require("../../../../model/Main");


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

            const users = await JavaFunction.find();
            res.status(200).send(users);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {

            // JavaFunction Body Section Starts
            const Javafunctionbody = {
                "FunctionName" : req.body.FunctionName,
                "Version" : req.body.Version, 
                "Description" : req.body.Description,
                "Code": req.body.Code,
                "Stakeholders" : req.body.Stakeholders
            }

            
            console.log("Inserting Values For Java Function Body" , Javafunctionbody)
            const createJavafunction = await JavaFunction.create(Javafunctionbody)
            console.log("Java Function Body Creation Status ", createJavafunction)

            var Javafunctionid = await JavaFunction.find().sort({_id : -1}).limit(1)
            var onlyJavafunctionid = Javafunctionid[0]._id.toString()
            console.log('Just JavaFunction Id : ',onlyJavafunctionid)
           
            var JavaFunctionDetails = await JavaFunction.find({_id:onlyJavafunctionid})
            console.log("Last Inserted JavaFunction  Details", JavaFunctionDetails[0].FunctionName)
            
            //Updating Stakeholder
             for (let i = 0; i < req.body.Stakeholders.length; i++) {
                var Javafunctionupdate = await Stakeholder.updateOne({_id:req.body.Stakeholders[i].StakeholderId},{
                    $push : 
                    {
                        'JavaFunctions' :{
                            'FunctionName' : JavaFunctionDetails[0].FunctionName,
                            'FunctionId' : JavaFunctionDetails[0]._id
                        } 
                    }
                })
                console.log("Java Function Stakeholders Update For" ,req.body.Stakeholders[i].StakeholderId )
            }
            console.log("Stakrholder Function All Update Status : ",Javafunctionupdate)
            
            //Stakeholder Body Section Ends

           
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(createJavafunction);
            res.end()

        } catch(domainerror) {
            
            console.log("Something Went Wrong ",domainerror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(domainerror);
            res.end()

        } 
    }
}