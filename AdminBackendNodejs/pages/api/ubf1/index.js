// Read and Insert data 

import {Domain,GoMain,NodeMain,JavaMain,GoStakeholders,NodeStakeholders,JavaStakeholders} from "../../../model/Main";
import dbConnect from "../../../utils/database";

export default async function handler(req, res) {
    const { method } = req;

    //Db Connect
    dbConnect();
    var onlydomainid = ""
    async function getLastID(){
        try{
            // Domain.find().sort({ _id: -1 }).limit(10)
            
            const lastid = await Domain.find().sort({_id : -1}).limit(1);

            console.log("Bro Last Inserted ID Was",lastid)
            const justid = lastid[0]._id.toString()
            console.log("Bro Last Inserted ID Was",lastid[0]._id)
            console.log("Bro Just Object Id Will Be ",justid)


            const rename1 = await Domain.findById(justid);
            console.log("Docs From Find By Id",rename1)

            const rename2 =  await Domain.updateOne( {_id:justid},{ $rename: { Name: "name" } } ) 
            console.log("rename",rename2);           
           
            // const rename2 =  await Domain.updateOne({ _id: justid },{ $rename: { 'Name': 'alias' }}
            // )
            // console.log("ename222",rename2)
                   
                

           

        }catch(error){
            console.log(error.message);
        }
    }


    async function finddetails(){
        try{
            const id = getLastID()
            const details = await Domain.findById(id)
            const detailsnew = details.JSON.stringify()
            console.log("Details of Last Inserted Documents Are",details) 
            console.log("Details of 01",detailsnew) 

        }catch(error){
            console.log(error.message);
        }
    }
    // Get method for read data from mongodb
    if(method === "GET") {
        try {

            const users = await Domain.find();
            res.status(200).json(users);

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

            //Domain Document Creation Starts

            try{
                const domanibody = {
                    "Domain" : req.body.Domain,
                    "Go" : {
                        "Main_id" : "",
                        "Stakeholders_id" : ""
                    },
                    "Node" : {
                        "Main_id" : "",
                        "Stakeholders_id" : ""
                    },
                    "Java" : {
                        "Main_id" : "",
                        "Stakeholders_id" : ""
                    }
                }
                console.log("Inserting Values For Domain" , domanibody)
                const createdomain = await Domain.create(domanibody);
                console.log("Domain Document Creation Status", createdomain)
    
                //Capturing Last Inserted ID
                const domainid = await Domain.find().sort({_id : -1}).limit(1);
                onlydomainid = domainid[0]._id.toString()
                console.log("Domain Last Inserted Id Was ",onlydomainid)
    
            }catch(domainerror){
                console.log("Something Went Wrong in Domain",domainerror)
            }
            
            //Domain Document Creation Ends

            //NodeMain Document Creation Starts

            try{
                const nodemainbody = {
                    "Domain" : req.body.Domain,
                    "Main" : [{
                        "Header" : [{
                            "Version" : "1.0.0",
                            "Description" : "The Description For Header Goes Here",
                            "Code" :  "The Code For The Header Goes Here"
                        }]},{
                        "Footer" : [{
                            "Version" : "1.0.0",
                            "Description" : "The Description For Footer Goes Here",
                            "Code" :  "The Code For The Footer Goes Here"
                            }]
                        }]
                    }
                console.log("Inserting Values For Node Main" , nodemainbody)
                const createnodemain = await NodeMain.create(nodemainbody);
                console.log("Node Main Document Creation Status", createnodemain)
    
                //Capturing Last Inserted ID
                const nodemainid = await NodeMain.find().sort({_id : -1}).limit(1);
                const onlynodemainid = nodemainid[0]._id.toString()
                console.log("Node Main Last Inserted Id Was ",onlynodemainid)
    
                //Updating Domain Document
                var nodemainupdate = await Domain.updateOne({_id:onlydomainid},{$set : {'Node.Main_id':onlynodemainid }})
                console.log("Node Main Id Updated In Domain Document Status",nodemainupdate)
            }catch(nodemainerror){
                console.log("Something Went Wrong in Node Main",nodemainerror)
            }
            
            //NodeMain Document Creation Ends
  
            //NodeStakeholders Document Creation Starts

            try{
                const nodestakeholdersbody = {
                    "Domain" : req.body.Domain,
                    "Stakeholders" : [{
                        "Stakeholdername" : [{
                            "Functionname" : [{
                                "Version" : "1.0.0",
                                "Description" : "The Description For Header Goes Here",
                                "Code" :  "The Code For The Header Goes Here"
                            }]  
                        }]
                    }]
                    }
                console.log("Inserting Values For Node Stakeholders" , nodestakeholdersbody)
                const createstakeholders = await NodeStakeholders.create(nodestakeholdersbody);
                console.log("Node Stakeholders Document Creation Status", createstakeholders)
    
                //Capturing Last Inserted ID
                const nodestakeholderid = await NodeStakeholders.find().sort({_id : -1}).limit(1);
                const onlynodestakeholderid = nodestakeholderid[0]._id.toString()
                console.log("Node Stakeholders Last Inserted Id Was ",onlynodestakeholderid)
    
                //Updating Domain Document
                var nodestakeholderupdate = await Domain.updateOne({_id:onlydomainid},{$set : {'Node.Stakeholders_id':onlynodestakeholderid }})
                console.log("Node Stakeholders Id Updated In Domain Document Status",nodestakeholderupdate)
            }catch(nodemainerror){
                console.log("Something Went Wrong in Node Main",nodemainerror)
            }
            
            //NodeStakeholders Document Creation Ends

            // const user = await Domain.create(req.body);
            // getLastID()
            // finddetails()
           
            res.status(201).json(user);

        } catch(err) {
            res.status(500).json(err);
        } 
    }
}