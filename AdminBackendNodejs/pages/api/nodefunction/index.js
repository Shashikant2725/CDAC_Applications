// Read and Insert data 

// import mongoose from "mongoose";
const mongoose = require("mongoose");
import Cors from 'cors';

import dbConnect from "../../../utils/database";

// import {Domain,GoMain,NodeMain,JavaMain,GoStakeholders,NodeStakeholders,JavaStakeholders} from "../../../model/Main";
// var dbConnect = require("../../../utils/database") ;
// var Domain = require('../../../model/Main')
// let Domain = mongoose.model('DomainMain')

// var NodeMain = require('../../../model/Main')

// const nodestakeholders =  NodeStakeholders.create()
// mongoose.connect('mongodb://localhost/news');
// require('../../../model/Main');
// var NodeStakeholders = require('../../../model/Main')
// let NodeStakeholders = mongoose.model('NodeStakeholders')
// let Domain = mongoose.model('DomainMain')
//  var Domain = require('../../../model/Main')
//  var NodeStakeholders = require('../../../model/Main')
import initMiddleware from '../../../lib/init-middleware'

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )

const { NodeStakeholders, NodeFunctions } = require("../../../model/Main");

export default async function handler(req, res) {
    const { method } = req;

    //Db Connect
    dbConnect();
 
    await cors(req, res)

    // Get method for read data from mongodb
    if(method === "GET") {
        try {

            const users = await NodeFunctions.find();
            res.status(200).json(users);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {


            // NodeStakeholders Body Section Starts
            const NodeFunctionBody = {
                "Domain" : req.body.Domain,
                 "StakeholderName" : [],
                "FunctionName" : req.body.FunctionName,
                "Version" : req.body.Version,
                "Description" : req.body.Description,
                "Code" : req.body.Code
            }

                console.log("Inserting Values For NodeFunction Body" , NodeFunctionBody)
                const createnodefunction = await NodeFunctions.create(NodeFunctionBody);

                var nodefunctionid = await NodeFunctions.find().sort({_id : -1}).limit(1)
                var onlynodefunctionid = nodefunctionid[0]._id.toString()

                var nodefunctionupdate = await NodeFunctions.updateOne({_id : onlynodefunctionid},{
                    $push : 
                    {
                        'Stakeholders' :{
                            'StakeholderName' : req.body.StakeholderName,
                            'StakeholderId' : req.body.StakeholderId
                        } 
                    }})
                console.log("Node Stakeholders Update Status : ",nodefunctionupdate )

                // console.log("Node Functions Body Creation Status ", createnodefunction)

                // push stakeholders 

                // var requeststakeholdername =  JSON.stringify(req.body.StakeholderName[0])
                console.log('Only Node Stakeholder Id Is',onlynodefunctionid)
                // console.log('requestedstakeholder',requeststakeholdername)
                //Capturing Node Stakeholder Id
                // var nodestakeholderid = await NodeStakeholders.findOne({Domain : req.body.Domain, StakeholderName : req.body.StakeholderName[0]});
                // console.log("Stakeholder Id Is ",nodestakeholderid)
                // var onlynodestakeholderid = nodestakeholderid._id
                // console.log('only main id',onlynodestakeholderid)
            //NodeStakeholders Body Section Ends
            //Node Body Document Creation Starts
            // var nodemainid = await NodeMain.find().sort({_id : -1}).limit(1);

                // var nodefunctionid = await NodeFunctions.find().sort({_id : -1}).limit(1)
                // var nodefunctionid = await NodeFunctions.find({Domain : req.body.Domain, FunctionName : req.body.FunctionName})
                // console.log("Node Function Id Is ",nodefunctionid)
                // var onlynodefunctionid = nodefunctionid._id
                // console.log('Only Node Stakeholder Id Is',onlynodefunctionid)

                //push Stakeholders
                const pushstakeholder = await NodeStakeholders.updateOne({_id:req.body.StakeholderId},{
                    $push : {
                    'Functions' : {
                        'FunctionName' : req.body.FunctionName,
                        'FunctionId': onlynodefunctionid
                    }
                }})
                console.log('Stakeholders Pushed Status', pushstakeholder)

                //Updating Node Main
                
            //Node Body Document Creation Ends   
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(pushstakeholder);
            // res.send('Everything Updated Successfully');
            res.end()
        } catch(nodefunctionerror) {
            console.log("Something Went Wrong in Node Function",nodefunctionerror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(nodefunctionerror);
            res.end()

        } 
    }
}