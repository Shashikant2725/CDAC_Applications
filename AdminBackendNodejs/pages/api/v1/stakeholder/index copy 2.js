// Read and Insert data 

// import {Domain,GoFunctions,NodeFunctions,JavaFunctions,GoStakeholders,NodeStakeholders,JavaStakeholders } from "../../../model/Main";
import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Domain,Stakeholder} = require("../../../../model/Main");


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

            const Allusers=await Stakeholder.find()
            console.log("Response::",Allusers)

            res.status(200).send(Allusers);

        } catch(err) {
            res.status(500).json(err);
        } 
    }
   

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {

            // Stakeholder Body Section Starts
            const stakeholderbody = {
                "StakeholderName" : req.body.StakeholderName,
                "Domain" : req.body.Domain , 
                "NodeFunctions" : [],
                "GoFunctions": [],
                "JavaFunctions" : []
            }

            Stakeholder.find({"StakeholderName":stakeholderbody.StakeholderName}, function (err, stakeholders) {
                if(stakeholders==undefined || stakeholders=='' || stakeholders==stakeholderbody.StakeholderName)
                {
                    if (err) {
                        res.status(400).json({ 'Status': err }); console.log(err) 
                    } 
                    else{
                        console.log("Inserting Values For Stakeholder Body" , stakeholderbody)
                        const createstakeholder =  Stakeholder.create(stakeholderbody)
                        console.log("Stakeholder Body Creation Status ", createstakeholder);
                        var stakeholdeid =  Stakeholder.find().sort({_id : -1}).limit(1)
                        var onlystakeholdeid = stakeholdeid[0].toString(_id)
                        console.log('Just Stakeholder Id : ',onlystakeholdeid)
                       
                        var StakeholdersDetails =  Stakeholder.find({_id:onlystakeholdeid})
                        console.log("Last Inserted StaakeHolder Details", StakeholdersDetails[0].StakeholderName)
                        
                        //Updating Domain
                         for (let i = 0; i < req.body.Domain.length; i++) {
                            var domainstakeholderupdate =  Domain.updateOne({_id:req.body.Domain[i].DomainId},{
                                $push : 
                                {
                                    'Stakeholders' :{
                                        'StakeholderName' : StakeholdersDetails[0].StakeholderName,
                                        'StakeholderId' : StakeholdersDetails[0]._id
                                    } 
                                }
                            })
                            console.log("Domain Update For" ,req.body.Domain[i].DomainId )
                        }
                        console.log("Domain ALl Update Status : ",domainstakeholderupdate)
                        res.status(200).json({ 'Status': 'Suuccessfull' }); console.log(createstakeholder) 

                    } 
                }
                else{

                }

            }
            
            )
           

           
            
            //Stakeholder Body Section Ends

           
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(createstakeholder);
            res.end()

        } catch(domainerror) {
            
            console.log("Something Went Wrong ",domainerror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(domainerror);
            res.end()

        } 
    }
}