const Usermodel = require('../models/userModel');
const {NodeFunction,RestAPI} = require('../models/ubfAdminModel');
// const AssetModel = require('../models/assetModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create RESTAPI
const createRestApi = asyncHandler(async(req,res) =>{
    console.log("Bodyyy::",req.body);
    try {

        // NodeFunction Body Section Starts
        const nodefunctionbody = {
            "RestApiName" : req.body.RestApiName,
            "PostCode" : req.body.PostCode, 
            "GetCode" : req.body.GetCode,
            "DeleteCode": req.body.DeleteCode,
            "PutCode" : req.body.PutCode,
            "PatchCode" : req.body.PutCode,
            "NodeFunctions" : req.body.NodeFunctions
        }

        RestAPI.find({"RestApiName":nodefunctionbody.RestApiName},async function(err,nodefunctions){
            if(nodefunctions==undefined || nodefunctions=='' || nodefunctions==nodefunctionbody.RestApiName)
            {
                if (err) {
                    res.status(400).json({ 'Status': err }); console.log(err) 
                } else { 
                    console.log("Inserting Values For Node Function Body" , nodefunctionbody)
                    const createnodefunction = await RestAPI.create(nodefunctionbody)
                    console.log("Node Function Body Creation Status ", createnodefunction)
        
                    var nodefunctionid = await RestAPI.find().sort({_id : -1}).limit(1)
                    var onlynodefunctionid = nodefunctionid[0]._id.toString()
                    console.log('Just NodeFunction Id : ',onlynodefunctionid)
                   
                    var NodeFunctionDetails = await RestAPI.find({_id:onlynodefunctionid})
                    console.log("Last Inserted NodeFunction  Details", NodeFunctionDetails[0].RestApiName)
                    
                    //Updating NodeFunction
                     for (let i = 0; i < req.body.NodeFunctions.length; i++) {
                        var nodefunctionupdate = await NodeFunction.updateOne({_id:req.body.NodeFunctions[i].FunctionId},{
                            $push : 
                            {
                                'RestApis' :{
                                    'RestApiName' : NodeFunctionDetails[0].RestApiName,
                                    'RestApiId' : NodeFunctionDetails[0]._id
                                } 
                            }
                        })
                        console.log("Node Function Stakeholders Update For" ,req.body.NodeFunctions[i].FunctionId )
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

/// Update RESTAPI
const updateRestApi = asyncHandler(async (req,res)=>{
    // const {orgName} = req.body;
    try {

        const nodefunctionupdate = await RestAPI.updateOne({_id:req.params.id},{$set : {
            "RestApiName" : req.body.RestApiName,
            "PostCode" : req.body.PostCode, 
            "GetCode" : req.body.GetCode,
            "DeleteCode": req.body.DeleteCode,
            "PutCode" : req.body.PutCode
        }});
        console.log('Node Function Put Update',nodefunctionupdate)

        //Updating Stakeholders Details In Domain Collection
        var nodefunctionstakeholderupdate = await NodeFunction.update({'RestApis.RestApiId' : req.params.id},{
            $set : {
                "RestApis.$.RestApiName" : req.body.RestApiName
            }
        })
        console.log('Update Status According To Node Functions',nodefunctionstakeholderupdate )
        res.status(200).json(nodefunctionstakeholderupdate);

    } catch(err) {
        res.status(500).json(err);
    } 
    })

    /// Get All RESTAPIs
    const getAllRestApis = asyncHandler(async(req,res)=>{
        try {

            const users = await RestAPI.find();
            res.status(200).send(users);

        } catch(err) {
            res.status(500).json(err);
        }
    })

    /// Get RestAPI By ID
    const getRestApi = asyncHandler(async(req,res)=>{
        try {
            console.log("ID;;;",req.params.id)
                        const domaindata = await RestAPI.findOne({_id:req.params.id});
                        console.log("domaindata::",domaindata)
                        console.log("Response:",domaindata);
                        res.status(200).json(domaindata);


                    } catch(err) {
                        res.status(500).json(err);
                    } 
    })


    /// Delete RestAPI
    const deleteRestApi = asyncHandler(async(req,res)=>{
        try {
            console.log("delete id::",req.params.id);
            const domaindelete = await RestAPI.deleteOne({_id:req.params.id});
            res.status(200).json(domaindelete);

        } catch(err) {
            res.status(500).json(err);
        } 
    })

    
module.exports = { Create:createRestApi,GetAllRestApis:getAllRestApis,DeleteRestApi:deleteRestApi,UpdateRestApi:updateRestApi,GetRestAPI:getRestApi};
// module.exports = loginUser;