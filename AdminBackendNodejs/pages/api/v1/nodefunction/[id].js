import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Stakeholder,NodeFunction} = require("../../../../model/Main");


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

            const domaindata = await NodeFunction.findOne({_id:req.query.id});
            res.status(200).json(domaindata);
            console.log("Response:;",domaindata);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Put method for read data from mongodb
    if(method === "PUT") {
        try {

            const nodefunctionupdate = await NodeFunction.updateOne({_id:req.query.id},{$set : {
                'FunctionName' : req.body.FunctionName,
                'Version' : req.body.Version,
                'Description' : req.body.Description,
                "Code" : req.body.Code
            }});
            console.log('Node Function Put Update',nodefunctionupdate)

            //Updating Stakeholders Details In Domain Collection
            var nodefunctionstakeholderupdate = await Stakeholder.update({'NodeFunctions.FunctionId' : req.query.id},{
                $set : {
                    "NodeFunctions.$.FunctionName" : req.body.FunctionName
                }
            })
            console.log('Update Status According To Node Functions',nodefunctionstakeholderupdate )
            res.status(200).json(nodefunctionstakeholderupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

     // Put method for read data from mongodb
     if(method === "DELETE") {
        try {
            
            const nodefunctiondelete = await NodeFunction.deleteOne({_id:req.query.id});
            // res.status(200).json(stakeholderdelete);
            console.log('Stakeholder Delete Status' ,nodefunctiondelete )
            //Updating Delete In Domain Collection
            var nodefunctiondeleteupdate = await Stakeholder.update({'NodeFunctions.FunctionId' : req.query.id},{
                $pull : 
                    {
                        'NodeFunctions' :{
                            'FunctionId' : req.query.id
                        } 
                    }
            })

            console.log('Node Function Delete Update Status :',nodefunctiondeleteupdate)

            res.status(200).json(nodefunctiondeleteupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

}