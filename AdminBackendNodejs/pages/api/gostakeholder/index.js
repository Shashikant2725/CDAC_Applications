// Read and Insert data 

// import mongoose from "mongoose";
const mongoose = require("mongoose");
import Cors from 'cors';

import dbConnect from "../../../utils/database";

// import {Domain,GoMain,GoMain,JavaMain,GoStakeholders,GoStakeholders,JavaStakeholders} from "../../../model/Main";
// var dbConnect = require("../../../utils/database") ;
// var Domain = require('../../../model/Main')
// let Domain = mongoose.model('DomainMain')

// var GoMain = require('../../../model/Main')

// const gostakeholders =  GoStakeholders.create()
// mongoose.connect('mongodb://localhost/news');
// require('../../../model/Main');
// var GoStakeholders = require('../../../model/Main')
// let GoStakeholders = mongoose.model('GoStakeholders')
// let Domain = mongoose.model('DomainMain')
//  var Domain = require('../../../model/Main')
//  var GoStakeholders = require('../../../model/Main')
import initMiddleware from '../../../lib/init-middleware'

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )

const { GoStakeholders, GoFunctions } = require("../../../model/Main");

export default async function handler(req, res) {
    const { method } = req;

    //Db Connect
    dbConnect();
 
    await cors(req, res)

    // Get method for read data from mongodb
    if(method === "GET") {
        try {

            const users = await GoFunctions.find();
            res.status(200).json(users);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {


            // GoStakeholders Body Section Starts
            const GoFunctionBody = {
                "Domain" : req.body.Domain,
                 "StakeholderName" : [],
                "FunctionName" : req.body.FunctionName,
                "Version" : req.body.Version,
                "Description" : req.body.Description,
                "Code" : req.body.Code
            }

                console.log("Inserting Values For GoFunction Body" , GoFunctionBody)
                const creategofunction = await GoFunctions.create(GoFunctionBody);

                var gofunctionid = await GoFunctions.find().sort({_id : -1}).limit(1)
                var onlygofunctionid = gofunctionid[0]._id.toString()

                var gofunctionupdate = await GoFunctions.updateOne({_id : onlygofunctionid},{
                    $push : 
                    {
                        'Stakeholders' :{
                            'StakeholderName' : req.body.StakeholderName,
                            'StakeholderId' : req.body.StakeholderId
                        } 
                    }})
                console.log("Go Stakeholders Update Status : ",gofunctionupdate )

                // console.log("Go Functions Body Creation Status ", creategofunction)

                // push stakeholders 

                // var requeststakeholdername =  JSON.stringify(req.body.StakeholderName[0])
                console.log('Only Go Stakeholder Id Is',onlygofunctionid)
                // console.log('requestedstakeholder',requeststakeholdername)
                //Capturing Go Stakeholder Id
                // var gostakeholderid = await GoStakeholders.findOne({Domain : req.body.Domain, StakeholderName : req.body.StakeholderName[0]});
                // console.log("Stakeholder Id Is ",gostakeholderid)
                // var onlygostakeholderid = gostakeholderid._id
                // console.log('only main id',onlygostakeholderid)
            //GoStakeholders Body Section Ends
            //Go Body Document Creation Starts
            // var gomainid = await GoMain.find().sort({_id : -1}).limit(1);

                // var gofunctionid = await GoFunctions.find().sort({_id : -1}).limit(1)
                // var gofunctionid = await GoFunctions.find({Domain : req.body.Domain, FunctionName : req.body.FunctionName})
                // console.log("Go Function Id Is ",gofunctionid)
                // var onlygofunctionid = gofunctionid._id
                // console.log('Only Go Stakeholder Id Is',onlygofunctionid)

                //push Stakeholders
                const pushstakeholder = await GoStakeholders.updateOne({_id:req.body.StakeholderId},{
                    $push : {
                    'Functions' : {
                        'FunctionName' : req.body.FunctionName,
                        'FunctionId': onlygofunctionid
                    }
                }})
                console.log('Stakeholders Pushed Status', pushstakeholder)

                //Updating Go Main
                
            //Go Body Document Creation Ends   
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(pushstakeholder);
            // res.send('Everything Updated Successfully');
            res.end()
        } catch(gofunctionerror) {
            console.log("Something Went Wrong in Go Function",gofunctionerror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(gofunctionerror);
            res.end()

        } 
    }
}