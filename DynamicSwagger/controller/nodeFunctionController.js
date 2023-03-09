const Usermodel = require('../models/userModel');
const {Domain,Stakeholder,NodeFunction} = require('../models/ubfAdminModel');
// const AssetModel = require('../models/assetModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create NodeFunction
const createNodeFunction = asyncHandler(async(req,res) =>{
    console.log("Bodyyy::",req.body);
    try {

        // NodeFunction Body Section Starts
        const nodefunctionbody = {
            "FunctionName" : req.body.FunctionName,
            "Version" : req.body.Version, 
            "Description" : req.body.Description,
            "Code": req.body.Code,
            "Stakeholders" : req.body.Stakeholders
        }

        NodeFunction.find({"FunctionName":nodefunctionbody.FunctionName},async function(err,nodefunctions){
            if(nodefunctions==undefined || nodefunctions=='' || nodefunctions==nodefunctionbody.FunctionName)
            {
                if (err) {
                    res.status(400).json({ 'Status': err }); console.log(err) 
                } else { 
                    console.log("Inserting Values For Node Function Body" , nodefunctionbody)
                    const createnodefunction = await NodeFunction.create(nodefunctionbody)
                    console.log("Node Function Body Creation Status ", createnodefunction)
        
                    var nodefunctionid = await NodeFunction.find().sort({_id : -1}).limit(1)
                    var onlynodefunctionid = nodefunctionid[0]._id.toString()
                    console.log('Just NodeFunction Id : ',onlynodefunctionid)
                   
                    var NodeFunctionDetails = await NodeFunction.find({_id:onlynodefunctionid})
                    console.log("Last Inserted NodeFunction  Details", NodeFunctionDetails[0].FunctionName)
                    
                    //Updating Stakeholder
                     for (let i = 0; i < req.body.Stakeholders.length; i++) {
                        var nodefunctionupdate = await Stakeholder.updateOne({_id:req.body.Stakeholders[i].StakeholderId},{
                            $push : 
                            {
                                'NodeFunctions' :{
                                    'FunctionName' : NodeFunctionDetails[0].FunctionName,
                                    'FunctionId' : NodeFunctionDetails[0]._id
                                } 
                            }
                        })
                        console.log("Node Function Stakeholders Update For" ,req.body.Stakeholders[i].StakeholderId )
                    }
                    console.log("Stakrholder Function All Update Status : ",nodefunctionupdate)
                    
                    //Stakeholder Body Section Ends
        
                   
                    res.setHeader("Content-Type", "text/html");
                    // res.status(201).json(createnodefunction);
                    console.log("Success");
                    res.status(200).json({ 'Status': "Function Added Successfully",createnodefunction });  
                    res.end()
                    

                }
            }
            else{
                res.status(200).json({ 'Status': 'Error' }); console.log(err) 

            }
        })
       

    } catch(domainerror) {
        
        console.log("Something Went Wrong ",domainerror)
        res.setHeader("Content-Type", "text/html");
        res.status(500).json(domainerror);
        res.end()

    } 
    


     
})

/// Update NodeFunction
const updateNodeFunction = asyncHandler(async (req,res)=>{
    // const {orgName} = req.body;
    try {

        const nodefunctionupdate = await NodeFunction.updateOne({_id:req.params.id},{$set : {
            'FunctionName' : req.body.FunctionName,
            'Version' : req.body.Version,
            'Description' : req.body.Description,
            "Code" : req.body.Code
        }});
        console.log('Node Function Put Update',nodefunctionupdate)

        //Updating Stakeholders Details In Domain Collection
        var nodefunctionstakeholderupdate = await Stakeholder.update({'NodeFunctions.FunctionId' : req.params.id},{
            $set : {
                "NodeFunctions.$.FunctionName" : req.body.FunctionName
            }
        })
        console.log('Update Status According To Node Functions',nodefunctionstakeholderupdate )
        res.status(200).json(nodefunctionstakeholderupdate);

    } catch(err) {
        res.status(500).json(err);
    } 
    })

    /// Get All NodeFunction
    const getAllNodeFunction = asyncHandler(async(req,res)=>{
        try {

            const users = await NodeFunction.find();
            res.status(200).send(users);

        } catch(err) {
            res.status(500).json(err);
        }
    })

    /// Get NodeFunction By ID
    const getNodeFunction = asyncHandler(async(req,res)=>{
        try {
            console.log("ID;;;",req.params.id)
                        const domaindata = await NodeFunction.findOne({_id:req.params.id});
                        res.status(200).json(domaindata);
                        console.log("Response:",domaindata);
            
                    } catch(err) {
                        res.status(500).json(err);
                    } 
    })


    /// Delete Stakeholder
    const deleteNodeFunction = asyncHandler(async(req,res)=>{
        try {
            
            const domaindelete = await NodeFunction.deleteOne({_id:req.params.id});
            res.status(200).json(domaindelete);

        } catch(err) {
            res.status(500).json(err);
        } 
    })

module.exports = { Create:createNodeFunction,GetAllNodeFunction:getAllNodeFunction,DeleteNodeFunction:deleteNodeFunction,UpdateNodeFunction:updateNodeFunction,GetNodeFunction:getNodeFunction};
// module.exports = loginUser;