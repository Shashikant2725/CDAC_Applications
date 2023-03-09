const Usermodel = require('../models/userModel');
const {Domain,Stakeholder} = require('../models/ubfAdminModel');
// const AssetModel = require('../models/assetModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create Domain
const createDomain = asyncHandler(async(req,res) =>{
    console.log("Bodyyy::",req.body);
      
        try {
            // #swagger.autoBody=true
  /*  #swagger.parameters['i'] = {
        in: 'body',
        description: 'Add a Domain',
        example:'i'
       
} */
          const registerAsset = await Domain.create(req.body);
      
          res.json({ Result: registerAsset, success: true });
        } catch (error) {
          console.log("Error", error);
        }
      
    
})

/// Update Domain
const updateDomain = asyncHandler(async (req,res)=>{
    // const {orgName} = req.body;
    const Domainupdate = await Domain.updateOne({_id:req.params.id},{$set : {
        'Domain' : req.body.Domain,
        
    }});
     //Updating Domain Details In Stakeholder Collection
     var domainstakeholderupdate = await Stakeholder.updateOne({'Domains.DomainId' : req.params.id},{
        $set : {
            "Domains.$.DomainName" : req.body.DomainName
        }
    })
    console.log('Update Status of Stakeholder According To Domain',domainstakeholderupdate )

    res.json({Result:Domainupdate});
  
    })

    /// Get All Domain
    const getAllDomain = asyncHandler(async(req,res)=>{
        try {

            const users = await Domain.find();
            res.status(200).send(users);

        } catch(err) {
            res.status(500).json(err);
        }
    })

    /// Get Domain By ID
    const getDomain = asyncHandler(async(req,res)=>{
        try {
console.log("ID;;;",req.params.id)
            const domaindata = await Domain.findOne({_id:req.params.id});
            res.status(200).json(domaindata);
            console.log("Response:",domaindata);

        } catch(err) {
            res.status(500).json(err);
        } 
    })


    /// Delete Domain
    const deleteDomain = asyncHandler(async(req,res)=>{
        try {
            
            const domaindelete = await Domain.deleteOne({_id:req.params.id});
            res.status(200).json(domaindelete);

        } catch(err) {
            res.status(500).json(err);
        } 
    })

module.exports = { Create:createDomain,GetAllDomain:getAllDomain,DeleteDomain:deleteDomain,UpdateDomain:updateDomain,GetDomain:getDomain};
// module.exports = loginUser;