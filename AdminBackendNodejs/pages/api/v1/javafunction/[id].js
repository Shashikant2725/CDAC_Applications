import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Stakeholder,JavaFunction} = require("../../../../model/Main");


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

            const domaindata = await JavaFunction.findOne({_id:req.query.id});
            res.status(200).json(domaindata);
            console.log("Response:;",domaindata);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Put method for read data from mongodb
    if(method === "PUT") {
        try {

            const Javafunctionupdate = await JavaFunction.updateOne({_id:req.query.id},{$set : {
                'FunctionName' : req.body.FunctionName,
                'Version' : req.body.Version,
                'Description' : req.body.Description,
                "Code" : req.body.Code
            }});
            console.log('Java Function Put Update',Javafunctionupdate)

            //Updating Stakeholders Details In Domain Collection
            var Javafunctionstakeholderupdate = await Stakeholder.update({'JavaFunctions.FunctionId' : req.query.id},{
                $set : {
                    "JavaFunctions.$.FunctionName" : req.body.FunctionName
                }
            })
            console.log('Update Status According To Java Functions',Javafunctionstakeholderupdate )
            res.status(200).json(Javafunctionstakeholderupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

     // Put method for read data from mongodb
     if(method === "DELETE") {
        try {
            
            const Javafunctiondelete = await JavaFunction.deleteOne({_id:req.query.id});
            // res.status(200).json(stakeholderdelete);
            console.log('Stakeholder Delete Status' ,Javafunctiondelete )
            //Updating Delete In Domain Collection
            var Javafunctiondeleteupdate = await Stakeholder.update({'JavaFunctions.FunctionId' : req.query.id},{
                $pull : 
                    {
                        'JavaFunctions' :{
                            'FunctionId' : req.query.id
                        } 
                    }
            })

            console.log('Java Function Delete Update Status :',Javafunctiondeleteupdate)

            res.status(200).json(Javafunctiondeleteupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

}