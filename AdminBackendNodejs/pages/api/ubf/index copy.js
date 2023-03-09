// Read and Insert data 

import {Domain,GoMain,NodeMain,JavaMain,GoStakeholders,NodeStakeholders,JavaStakeholders } from "../../../model/Main";
import dbConnect from "../../../utils/database";

export default async function handler(req, res) {
    const { method } = req;

    //Db Connect
    dbConnect();
    
    async function createDomainSkeleton (){

    }
 
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

            // Root Element Change
            // const rename2 =  await Domain.updateOne( {_id:justid},{ $rename: { Stakeholders: "Stakeholders01" } } ) 
            // console.log("rename",rename2);   

        var rename2 =  await Domain.updateOne( {_id:justid},{ $rename: { "Stakeholders": "Stakeholders01" } } ) 
            // rename2 =  await Domain.updateOne( {_id:justid},{ $rename: { "Stakeholders01.stakeholder1": "Stakeholders01.stakeholdernew" } } ) 
            console.log("rename",rename2);
            const updateddetails = await Domain.findById(justid);
            console.log ("Recently Updateded Docs",updateddetails)  
            console.log ("Recently Updateded Docs1",updateddetails._id)   
            console.log ("Recently Updateded Docs2",updateddetails.Stakeholders)   
            console.log ("Recently Updateded Docs3",updateddetails)   

 
            // console.log ("Recently Updateded Inner Docs",updateddetails[0]._id)   
            // console.log ("Recently Updateded Inner Docs1",updateddetails.Stakeholders01)
            // console.log ("Recently Updateded Inner Docs2",updateddetails[0].Stakeholders01)   
            // console.log ("Recently Updateded Inner Docs3",updateddetails.Stakeholders01[0])   

   


            // const rename3 =  await Domain.updateOne( {_id:justid},{ $rename: { Stakeholders01[0].stakeholder1: "stakeholder02" } } ) 
            // console.log("rename stakeholder1",rename3);   


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

            // Domain Body Section Starts
            const domainbody = {
                "Domain" : req.body.Domain,
                "Go" : {
                    "Main_id" : "",
                    "Stakeholders_id" : ""
                },
                "Node": {
                    "Main_id" : "",
                    "Stakeholders_id" : ""
                },
                "Java" : {
                    "Main_id" : "",
                    "Stakeholders_id" : ""
                }
            }

            try{
                console.log("Inserting Values For Domain Body" , domainbody)
                const createdomain = await Domain.create(domainbody);
                console.log("Domain Body Creation Status ", createdomain)
            }catch(domainerror){
                console.log("Something Went Wrong ",domainerror)
                res.status(500).json(domainerror);
            }
            
            //Domain Body Section Ends

            //Node Main Body Section Starts
            const nodemainbody = 
                {
                    "Domain" : req.body.Domain,
                    "Main" : [
                        {
                        "Header" : [
                            {
                                "Version" : "1.0.0",
                                "Description" : "The Description For Header Goes Here",
                                "Code" :  "The Code For The Header Goes Here"
                            }
                        ]
                        },
                        {
                         "Footer" : [
                            {
                                "Version" : "1.0.0",
                                "Description" : "The Description For Footer Goes Here",
                                "Code" :  "The Code For The Footer Goes Here"
                            }
                        ]
                        }
                    ]
                }

            try{
                
                console.log("Inserting Values For Node Main Body" , nodemainbody)
                const createnodemain = await NodeMain.create([
                    {
                        "Domain" : req.body.Domain,
                        "Main" : [
                            {
                            "Header" : [
                                {
                                    "Version" : "1.0.0",
                                    "Description" : "The Description For Header Goes Here",
                                    "Code" :  "The Code For The Header Goes Here"
                                },{

                                }
                            ]
                            },
                            {
                             "Footer" : [
                                {
                                    "Version" : "1.0.0",
                                    "Description" : "The Description For Footer Goes Here",
                                    "Code" :  "The Code For The Footer Goes Here"
                                },{
                                    
                                }
                            ]
                            }
                        ]
                    }
                ]);
                console.log("Node Main Body Creation Status ", createnodemain)

                //Upadting Domain Collection With Recently Inserted Records
                var nodemainid = await NodeMain.find().sort({_id : -1}).limit(1);
                console.log("Node Main Last Inserted Id Was ",nodemainid)
                var onlynodemainid = nodemainid[0]._id.toString()
                console.log("Bro Last Inserted ID Was",nodemainid[0]._id)
                console.log("Bro Just Object Id Will Be ",onlynodemainid)


            // const rename1 = await Domain.findById(justid);
            // console.log("Docs From Find By Id",rename1)
            }catch(nodemainerror){
                console.log("Something Went Wrong ",nodemainerror)
                res.status(500).json(nodemainerror);

            }
    
            // getLastID()
            // finddetails()
            // const main = await Domain.create()
            // const gomain = await GoMain.create()
            // const nodemain = await NodeMain.create()
            // const javamain = await JavaMain.create()
            // const gostakeholders = await GoStakeholders.create()
            // const nodestakeholders = await NodeStakeholders.create()
            // const javastakeholders = await JavaStakeholders.create()



           
            res.status(201).json(main,gomain,nodemain,javamain,gostakeholders,nodestakeholders,javastakeholders);

        } catch(err) {
            res.status(500).json(err);
        } 
    }
}