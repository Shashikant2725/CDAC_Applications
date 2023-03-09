const Usermodel = require('../models/userModel');
const {Stakeholder} = require('../models/ubfAdminModel');
const {Domain} = require('../models/ubfAdminModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create Stakeholder
const createStakeholder = asyncHandler(async(req,res) =>{
    console.log("Bodyyy::",req.body);
    try{
        // const registerAsset =await Stakeholder.create(req.body);
        const stakeholderbody = {
            "StakeholderName" : req.body.StakeholderName,
            "Domain" : req.body.Domain , 
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
         for (let i = 0; i < req.body.Domain.length; i++) {
            var domainstakeholderupdate = await Domain.updateOne({_id:req.body.Domain[i].DomainId},{
                $push : 
                {
                    'Stakeholders' :{
                        'StakeholderName' : StakeholdersDetails[0].StakeholderName,
                        'StakeholderId' : StakeholdersDetails[0]._id
                    } 
                }
            })
            console.log("Domain Update For" ,req.body.Domain[i].DomainId )
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
   
  
    })

    /// Get All Stakeholder
    const getAllStakeholders = asyncHandler(async(req,res)=>{
        
    })

    /// Get Stakeholder By ID
    const getStakeholder = asyncHandler(async(req,res)=>{
       
    })


    /// Delete Stakeholder
    const deleteStakeholder = asyncHandler(async(req,res)=>{
       
    })

module.exports = { Create:createStakeholder,GetAllStakeholders:getAllStakeholders,DeleteStakeholder:deleteStakeholder,UpdateStakeholder:updateStakeholder,GetStakeholder:getStakeholder};
// module.exports = loginUser;