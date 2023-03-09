import dbConnect from "../../../../utils/database";
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'


const { Domain,Stakeholder} = require("../../../../model/Main");


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

            const domaindata = await Stakeholder.findOne({_id:req.query.id});
            res.status(200).json(domaindata);
            console.log("Response:;",domaindata);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

    // Put method for read data from mongodb
    if(method === "PUT") {
        try {

            const stakeholderupdate = await Stakeholder.updateOne({_id:req.query.id},{$set : {
                'StakeholderName' : req.body.StakeholderName
            }});
            console.log('Stakeholder Put Update',stakeholderupdate)

            //Updating Stakeholders Details In Domain Collection
            var domainstakeholderupdate = await Domain.update({'Stakeholders.StakeholderId' : req.query.id},{
                $set : {
                    "Stakeholders.$.StakeholderName" : req.body.StakeholderName
                }
            })
            console.log('Update Status According To Domain',domainstakeholderupdate )
            res.status(200).json(domainstakeholderupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

     // Put method for read data from mongodb
     if(method === "DELETE") {
        try {
            
            const stakeholderdelete = await Stakeholder.deleteOne({_id:req.query.id});
            // res.status(200).json(stakeholderdelete);
            console.log('Stakeholder Delete Status' ,stakeholderdelete )
            //Updating Delete In Domain Collection
            var domaindeleteupdate = await Domain.update({'Stakeholders.StakeholderId' : req.query.id},{
                $pull : 
                    {
                        'Stakeholders' :{
                            'StakeholderId' : req.query.id
                        } 
                    }
            })

            console.log('Domain Delete Update Status :',domaindeleteupdate)

            res.status(200).json(domaindeleteupdate);

        } catch(err) {
            res.status(500).json(err);
        } 
    }

}