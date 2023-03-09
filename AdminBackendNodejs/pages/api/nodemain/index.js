// Read and Insert data 




import {Domain,GoMain,NodeMain,JavaMain,GoStakeholders,NodeStakeholders,JavaStakeholders } from "../../../model/Main";
import mongoose from "mongoose";
import dbConnect from "../../../utils/database";
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware'


// import {Domain,GoMain,NodeMain,JavaMain,GoStakeholders,NodeStakeholders,JavaStakeholders} from "../../../model/Main";
// var dbConnect = require("../../../utils/database") ;
// var Domain = require('../../../model/Main')
// let Domain = mongoose.model('DomainMain')

// var NodeMain = require('../../../model/Main')
let NodeMain = mongoose.model('NodeMain')

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
 
    
    // Get method for read data from mongodb
    if(method === "GET") {
        try {

            const users = await NodeMain.find();
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
                var nodemainid = await NodeMain.find().sort({_id : -1}).limit(1);
                console.log("Domain Main Last Inserted Id Was ",nodemainid)
                var onlydomainid = nodemainid[0]._id.toString()

                //Updating Node Main
                var nodemainupdate = await NodeMain.updateOne({_id:onlydomainid},{$set : 
                    {'Main.0.Header.0.Description' : req.body.HeaderDescription,
                     'Main.0.Header.0.Code' : req.body.HeaderCode,
                     'Main.1.Footer.0.Description' : req.body.FooterDescription,
                     'Main.1.Footer.0.Code' : req.body.FooterCode  
                    }})
                console.log("Node Main Update Status : ",nodemainupdate )

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