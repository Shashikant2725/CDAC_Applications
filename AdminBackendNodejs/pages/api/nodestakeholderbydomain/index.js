// Read and Insert data 

import mongoose from "mongoose";
import dbConnect from "../../../utils/database";
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware'
import {Domain,GoMain,NodeMain,JavaMain,GoStakeholders,NodeStakeholders,JavaStakeholders} from "../../../model/Main";
// var dbConnect = require("../../../utils/database") ;
// var Domain = require('../../../model/Main')
// let Domain = mongoose.model('DomainMain')

// var NodeMain = require('../../../model/Main')

// const nodestakeholders =  NodeStakeholders.create()
// mongoose.connect('mongodb://localhost/news');
// require('../../../model/Main');
// var NodeStakeholders = require('../../../model/Main')
// let NodeMain = mongoose.model('NodeMain')

// let NodeStakeholders = mongoose.model('NodeStakeholders')

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  )

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

            //Node Body Document Creation Starts
            try{
    
                //Capturing Domain Id

                // var nodemainid = await NodeMain.find({'Domain' : req.body.Domain});
                // console.log("Domain Id For Provided Domain Is ",nodemainid)
                // var onlydomainid = nodemainid[0]._id.toString()

                // var nodestakeholdersid = await NodeStakeholders.find({'Domain':  req.body.Domain});
                // console.log("Node Stakeholders Last Inserted Id Was ",nodestakeholdersid)
                // var onlynodestakeholderid = nodestakeholdersid[0]._id.toString()

                var Description = "Stakeholders.0."+req.body.Stakeholdername+'.0.'+req.body.Functionname+".0.Description"
                console.log(Description)
                // var description1 = JSON.stringify(Description)
                var Code = "Stakeholders.0."+req.body.Stakeholdername+'.0.'+req.body.Functionname+".0.Code"
                console.log(Code)

                //Updating Node Main
                var nodestakeholderupdate = await NodeStakeholders.updateOne({Domain:req.body.Domain},{$set : 
                    {
                    'Stakeholders.0.Stakeholdername.0.Functionname.0.Description' : req.body.Functiondescription,
                    "Stakeholders.0.Stakeholdername.0.Functionname.0.Code" : req.body.Functioncode
                    //  'Main.1.Footer.0.Description' : req.body.FooterDescription,
                    //  'Main.1.Footer.0.Code' : req.body.FooterCode  
                    }})
                console.log("Node Stakeholders Update Status : ",nodestakeholderupdate )

            }catch(nodemainerror){
                console.log("Something Went Wrong in Node Main",nodemainerror)
            }
            //Node Body Document Creation Ends   
            res.status(201).json(user);

        } catch(err) {
            res.status(500).json(err);
        } 
    }
}