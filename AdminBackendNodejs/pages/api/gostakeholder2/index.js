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

// const Gostakeholders =  GoStakeholders.create()
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
const { Domain, GOStakeholders } = require("../../../model/Main");

export default async function handler(req, res) {
    const { method } = req;

    //Db Connect
    dbConnect();
 
    await cors(req, res)

    // Get method for read data from mongodb
    if(method === "GET") {
        try {

            const users1 = await GOStakeholders.find();
            res.status(200).json(users1);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {
            console.log("Post called")

            // GoStakeholders Body Section Starts
            const GoStakeholdersBody = {
                "Domain" : req.body.Domain,
                "StakeholderName" : req.body.StakeholderName
            }

            
                console.log("Inserting Values For GoStakeholders Body" , GoStakeholdersBody)
                const createGostakeholder = await GoStakeholders.create(GoStakeholdersBody);
                console.log("Go Stakeholders Body Creation Status ", createGostakeholder)

                //Capturing Domain Id
                var domainmainid = await Domain.findOne({Domain : req.body.Domain});
                console.log("Domain Main Last Inserted Id Was ",domainmainid)
                var onlydomainid = domainmainid._id
                console.log('only main id',onlydomainid)
            //GoStakeholders Body Section Ends
            //Go Body Document Creation Starts
            // var Gomainid = await GoMain.find().sort({_id : -1}).limit(1);

                // var Gostakeholdersid = await GoStakeholders.find().sort({_id : -1}).limit(1)
                var Gostakeholdersid = await GoStakeholders.find().sort({_id : -1}).limit(1)

                console.log("Go Stakeholders Last Inserted Id Was ",Gostakeholdersid)
                var onlyGostakeholderid = Gostakeholdersid[0].StakeholderName
                console.log('haah',onlyGostakeholderid)
                //Updating Go Main
                var domainGostakeholderupdate = await Domain.updateOne({_id : onlydomainid},{$push : 
                    {
                    'GoStakeholders' : onlyGostakeholderid,
                    }})
                console.log("Domain Update Status : ",domainGostakeholderupdate )
            //Go Body Document Creation Ends   
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(domainGostakeholderupdate);
            // res.send('Everything Updated Successfully');
            res.end()
        } catch(Gostakeholdererror) {
            console.log("Something Went Wrong in Go Stakeholder",Gostakeholdererror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(Gostakeholdererror);
            res.end()

        } 
    }
}