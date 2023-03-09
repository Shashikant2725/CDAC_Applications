// Read and Insert data 

// import {Domain,GoFunctions,NodeFunctions,JavaFunctions,GoStakeholders,NodeStakeholders,JavaStakeholders } from "../../../model/Main";
import dbConnect from "../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'


const { Domain} = require("../../../model/Main");


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

            const users = await Domain.find();
            res.status(200).send(users);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Post method for insert data into mongodb
    if(method === "POST") {
        try {

            // var JustId = Domain.find().sort({ _id: -1 }).limit(10)

            // console.log('Last inserted Id :',JustId) 
            // getLastID()

            // Domain Body Section Starts
            const domainbody = {
                "Domain" : req.body.Domain,
                "GoStakeholders" : [],
                "NodeStakeholders": [],
                "JavaStakeholders" : []
            }

            
                console.log("Inserting Values For Domain Body" , domainbody)
                const createdomain = await Domain.create(domainbody);
                console.log("Domain Body Creation Status ", createdomain)

                //Capturing Domain Id
                var domainmainid = await Domain.find().sort({_id : -1}).limit(1);
                console.log("Domain Main Last Inserted Id Was ",domainmainid)
                var onlydomainid = domainmainid[0]._id.toString()
            
            //Domain Body Section Ends

            // getLastID()
            // finddetails()
            // const main = await Domain.create()
            // const gofunction = await GoFunctions.create()
            // const nodefunction = await NodeFunctions.create()
            // const javafunction = await JavaFunctions.create()
            // const gostakeholders = await GoStakeholders.create()
            // const nodestakeholders = await NodeStakeholders.create()
            // const javastakeholders = await JavaStakeholders.create()
            res.setHeader("Content-Type", "text/html");
            res.status(201).json(createdomain);
            // res.status(201).json(main,gofunction,nodefunction,javafunction,gostakeholders,nodestakeholders,javastakeholders);
            // res.send('Query Resolved Successfully')
            res.end()

        } catch(domainerror) {
            console.log("Something Went Wrong ",domainerror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(domainerror);
            res.end()

            // res.status(500).json(err);
        } 
    }
}