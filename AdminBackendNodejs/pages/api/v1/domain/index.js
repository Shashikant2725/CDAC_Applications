// Read and Insert data 

// import {Domain,GoFunctions,NodeFunctions,JavaFunctions,GoStakeholders,NodeStakeholders,JavaStakeholders } from "../../../model/Main";
import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Domain} = require("../../../../model/Main");


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

            // Domain Body Section Starts
            const domainbody = {
                "Domain" : req.body.Domain,
                "Stakeholders" : []
            }
            Domain.find({ "Domain": domainbody.Domain }, async function (err, domains) {
                let temp='';
                if (domains == undefined || domains=='' || domains==domainbody.Domain ) {
                    if (err) {
                        res.status(400).json({ 'Status': err }); console.log(err) 
                    } else {
                        console.log("Inserting Values For Domain Body" , domainbody)
                        const createdomain =  await Domain.create(domainbody);
                        console.log("Domain Body Creation Status ", createdomain)
                        temp=createdomain;
                        res.setHeader("Content-Type", "text/html");
                        res.status(200).json({ 'Status': 'Successful',temp})
                        res.end()
                                // res.status(200).json(0)
                            }
                    
                        }
                    else {
                        // res.setHeader("Content-Type", "text/html");
                        res.status(200).json({ 'Status': 'Error' }); console.log(err) 
                    }
            });
            
               

        } catch(domainerror) {
            console.log("Something Went Wrong ",domainerror)
            res.setHeader("Content-Type", "text/html");
            res.status(500).json(domainerror);
            res.end()

        } 
    }
}