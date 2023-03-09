import dbConnect from "../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'


const { Domain,NodeStakeholders} = require("../../../model/Main");


// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      // Only allow requests with GET, POST and OPTIONS
      methods: ['GET', 'DELETE','PUT', 'OPTIONS'],
    })
  )

export default async function handler(req, res) {

    const { method } = req;

    //Db Connect
    dbConnect();
    await cors(req, res)

    // Get method for read data from monNodedb
    if(method === "GET") {
        try {

            const domaindata = await Domain.findOne({_id:req.query.id});
            res.status(200).json(domaindata);
            console.log("Respnse:;",domaindata);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Put method for read data from monNodedb
    if(method === "PUT") {
        try {

            const domainupdate = await Domain.updateOne({_id:req.query.id},{$set : {
                'Domain' : req.body.Domain,
                
            }});
            res.status(200).json(domainupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

     // Put method for read data from monNodedb
     if(method === "DELETE") {
        try {
            
            const domaindelete = await NodeStakeholders.deleteOne({_id:req.query.id});
            res.status(200).json(domaindelete);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

}