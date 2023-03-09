// Read and Insert data 

// import mongoose from "mongoose";
const mongoose = require("mongoose");
import Cors from 'cors';

import dbConnect from "../../../utils/database";

import initMiddleware from '../../../lib/init-middleware'

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )
const { Domain, NodeStakeholders } = require("../../../model/Main");

export default async function handler(req, res) {
    const { method } = req;

    //Db Connect
    dbConnect();
 
    await cors(req, res)

    // Get method for read data from mongodb
    if(method === "GET") {
        try {

            const users = await NodeStakeholders.find();
            res.status(200).json(users);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {
            console.log("Node Stakeholder Post Method called")

            // NodeStakeholders Body Section Starts
            const NodeStakeholdersBody = {
                "Domain" : req.body.Domain,
                "StakeholderName" : req.body.StakeholderName,
                "Functions" : []
            }

            
                console.log("Inserting Values For NodeStakeholders Body" , NodeStakeholdersBody)
                const createnodestakeholder = await NodeStakeholders.create(NodeStakeholdersBody);
                console.log("Node Stakeholders Body Creation Status ", createnodestakeholder)

                //Capturing Domain Id
                var domainmainid = await Domain.findOne({Domain : req.body.Domain});
                console.log("Domain Main Last Inserted Id Was ",domainmainid)
                var onlydomainid = domainmainid._id
                console.log('only main id',onlydomainid)
            //NodeStakeholders Body Section Ends
            //Node Body Document Creation Starts
            // var nodemainid = await NodeMain.find().sort({_id : -1}).limit(1);

                // var nodestakeholdersid = await NodeStakeholders.find().sort({_id : -1}).limit(1)
                var nodestakeholdersid = await NodeStakeholders.find().sort({_id : -1}).limit(1)

                console.log("Node Stakeholders Last Inserted Id Was ",nodestakeholdersid)
                var onlynodestakeholderid = nodestakeholdersid[0]._id
                var onlynodestakeholdername = nodestakeholdersid[0].StakeholderName

                console.log('haah',onlynodestakeholderid)
                //Updating Node Main
                var domainnodestakeholderupdate = await Domain.updateOne({_id : onlydomainid},
                    {
                        $push : {
                        'NodeStakeholders' : {
                        'StakeholderName': onlynodestakeholdername,
                        'StakeholderId' : onlynodestakeholderid
                    }  
                }
                    })
                console.log("Domain Update Status : ",domainnodestakeholderupdate )
            //Node Body Document Creation Ends   
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(domainnodestakeholderupdate);
            // res.send('Everything Updated Successfully');
            res.end()
        } catch(nodestakeholdererror) {
            console.log("Something Went Wrong in Node Stakeholder",nodestakeholdererror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(nodestakeholdererror);
            res.end()

        } 
    }
}