const Usermodel = require('../models/userModel');
const {Domain,Stakeholder} = require('../models/ubfAdminModel');
// const AssetModel = require('../models/assetModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create Stakeholder
const createStakeholder = asyncHandler(async(req,res) =>{
    console.log("Bodyyy::",req.body);
    try{
        // const registerAsset =await Stakeholder.create(req.body);
        const stakeholderbody = {
            "StakeholderName" : req.body.StakeholderName,
            "Domains" : req.body.Domains , 
            "NodeFunctions" : [],
            "GoFunctions": [],
            "JavaFunctions" : []
        }
        const createstakeholder = await Stakeholder.create(stakeholderbody);
        console.log("Stakeholder Body Creation Status ", createstakeholder);
        var stakeholdeid = await Stakeholder.find().sort({_id : -1}).limit(1)
        var onlystakeholdeid = stakeholdeid[0]._id.toString()
        console.log('Just Stakeholder Id : ',onlystakeholdeid)
       
        var StakeholdersDetails = await Stakeholder.find({_id:onlystakeholdeid})
        console.log("Last Inserted StaakeHolder Details", StakeholdersDetails[0].StakeholderName)
        
        //Updating Domain
         for (let i = 0; i < req.body.Domains.length; i++) {
            var domainstakeholderupdate = await Domain.updateOne({_id:req.body.Domains[i].DomainId},{
                $push : 
                {
                    'Stakeholders' :{
                        'StakeholderName' : StakeholdersDetails[0].StakeholderName,
                        'StakeholderId' : StakeholdersDetails[0]._id
                    } 
                }
            })
            console.log("Domain Update For" ,req.body.Domains[i].DomainId )
        }
        console.log("Domain ALl Update Status : ",domainstakeholderupdate)

        //Stakeholder Body Section Ends

       
        res.setHeader("Content-Type", "text/html");
        console.log("Success");
        res.status(200).json({ 'Status': "Stakeholder Added Successfully",createstakeholder });  

        // res.json({Result:registerAsset,success:true});
    }catch(error){
        console.log('Error' , error)
    }
})

/// Update Stakeholder
const updateStakeholder = asyncHandler(async (req,res)=>{
    // const {orgName} = req.body;
    try {

        const stakeholderupdate = await Stakeholder.updateOne({_id:req.params.id},{$set : {
            'StakeholderName' : req.body.StakeholderName
        }});
        console.log('Stakeholder Put Update',stakeholderupdate)

        //Updating Stakeholders Details In Domain Collection
        var domainstakeholderupdate = await Domain.update({'Stakeholders.StakeholderId' : req.params.id},{
            $set : {
                "Stakeholders.$.StakeholderName" : req.body.StakeholderName
            }
        })
        console.log('Update Status  According To Domain',domainstakeholderupdate )
        res.status(200).json(domainstakeholderupdate);

    } catch(err) {
        res.status(500).json(err);
    } 
    })

    /// Get All Stakeholder
    const getAllStakeholder = asyncHandler(async(req,res)=>{
        try {

            const users = await Stakeholder.find();
            res.status(200).send(users);

        } catch(err) {
            res.status(500).json(err);
        }
    })

    /// Get Stakeholder By ID
    const getStakeholder = asyncHandler(async(req,res)=>{
        try {
            console.log("ID;;;",req.params.id)
                        const domaindata = await Stakeholder.findOne({_id:req.params.id});
                        res.status(200).json(domaindata);
                        console.log("Response:",domaindata);
            
                    } catch(err) {
                        res.status(500).json(err);
                    } 
    })


    /// Delete Stakeholder
    const deleteStakeholder = asyncHandler(async(req,res)=>{
        try {
            
            const domaindelete = await Stakeholder.deleteOne({_id:req.params.id});
            res.status(200).json(domaindelete);

        } catch(err) {
            res.status(500).json(err);
        }
    })

module.exports = { Create:createStakeholder,GetAllStakeholder:getAllStakeholder,DeleteStakeholder:deleteStakeholder,UpdateStakeholder:updateStakeholder,GetStakeholder:getStakeholder};
// module.exports = loginUser;