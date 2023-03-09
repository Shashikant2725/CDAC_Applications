import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Stakeholder,GoFunction} = require("../../../../model/Main");


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

    // Get method for read data from mongodb
    if(method === "GET") {
        try {

            const domaindata = await GoFunction.findOne({_id:req.query.id});
            res.status(200).json(domaindata);
            console.log("Response:;",domaindata);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Put method for read data from mongodb
    if(method === "PUT") {
        try {

            const GoFunctionupdate = await GoFunction.updateOne({_id:req.query.id},{$set : {
                'FunctionName' : req.body.FunctionName,
                'Version' : req.body.Version,
                'Description' : req.body.Description,
                "Code" : req.body.Code
            }});
            console.log('Go Function Put Update',GoFunctionupdate)

            //Updating Stakeholders Details In Domain Collection
            var GoFunctionstakeholderupdate = await Stakeholder.update({'GoFunctions.FunctionId' : req.query.id},{
                $set : {
                    "GoFunctions.$.FunctionName" : req.body.FunctionName
                }
            })
            console.log('Update Status According To Go Functions',GoFunctionstakeholderupdate )
            res.status(200).json(GoFunctionstakeholderupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

     // Put method for read data from mongodb
     if(method === "DELETE") {
        try {
            
            const GoFunctiondelete = await GoFunction.deleteOne({_id:req.query.id});
            // res.status(200).json(stakeholderdelete);
            console.log('Stakeholder Delete Status' ,GoFunctiondelete )
            //Updating Delete In Domain Collection
            var GoFunctiondeleteupdate = await Stakeholder.update({'GoFunctions.FunctionId' : req.query.id},{
                $pull : 
                    {
                        'GoFunctions' :{
                            'FunctionId' : req.query.id
                        } 
                    }
            })

            console.log('Go Function Delete Update Status :',GoFunctiondeleteupdate)

            res.status(200).json(GoFunctiondeleteupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

}