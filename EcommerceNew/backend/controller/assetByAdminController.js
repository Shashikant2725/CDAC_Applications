const Usermodel = require('../models/userModel');
const AssetByAdmin = require('../models/assetModelByAdmin');
// const AssetModel = require('../models/assetModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create User
const createAsset = asyncHandler(async(req,res) =>{
    console.log("Bodyyy::",req.body);
    console.log("Public Mandatory Length : ",req.body.publicMandatory.length)
    try{
        const registerAsset =await AssetByAdmin.create(req.body);
        res.json({Result:registerAsset,success:true});
    }catch(error){
        console.log('Error' , error)
    }
    
})

/// Update Asset
const updateAsset = asyncHandler(async (req,res)=>{
    // const {orgName} = req.body;
    const Assetupdate = await AssetByAdmin.updateOne({_id:req.params.id},{$set : {
        'orgName' : req.body.orgName,
        'userName' : req.body.userName
        
    }});

    res.json({Result:Assetupdate});
  
    })

    /// Get All Assets
    const getAllAssets = asyncHandler(async(req,res)=>{
        try{
            const getAllAssets = await AssetByAdmin.find();
            // const getPublicMandatoryFieldsCount =  await AssetByAdmin.find({assetName}).count(function(err, count) 
            // {
            //     if (err) throw err;
            //     console.log("Count::",count);
            //     console.log("getPublicMandatoryFieldsCount::",getPublicMandatoryFieldsCount);

            // });
            // const count = await AssetByAdmin.find.distinct({assetName}).length;
            // console.log("Count::",count);
            res.json({getAllAssets});
           
        }catch(error){
            throw new Error(error);
        }
    })

    /// Get Asset By ID
    const getAsset = asyncHandler(async(req,res)=>{
        try{
            const id = req.params.id;
            console.log("Id::",id)
            let getAssets=[] 
            getAssets = await AssetByAdmin.findOne({_id:req.params.id});
            console.log("getAssets::",getAssets)
            console.log("public mandatory field length : ",getAssets.publicMandatory.length)
            console.log("private mandatory field length : ",getAssets.privateMandatory.length)
            console.log("publicCommonData field length : ",getAssets.publicCommonData.length)
            console.log("privateCommonData field length : ",getAssets.privateCommonData.length)
            const publicMandatoryCount = getAssets.publicMandatory.length;
            const privateMandatoryCount = getAssets.privateMandatory.length;
            const publicCommonDataCount = getAssets.publicCommonData.length;
            const privateCommonDataCount = getAssets.privateCommonData.length;
            const temp=parseInt(publicMandatoryCount);
            console.log("temp type::",typeof(temp))
            // const fieldName = "publicMandatory";
            // const query = { _id: req.params.id};
            // const distinctValues = await AssetByAdmin.countDocuments(fieldName, query);
            // console.log(distinctValues);
            res.json({Result:[getAssets],publicMandatoryCount:publicMandatoryCount,privateMandatoryCount:privateMandatoryCount,publicCommonDataCount:publicCommonDataCount,privateCommonDataCount:privateCommonDataCount});

        }catch(error){
            throw new Error(error);
        }
    })


    /// Delete Asset
    const deleteAsset = asyncHandler(async(req,res)=>{
        try{
            const id = req.params.id;
            const getAsset = await AssetByAdmin.findByIdAndDelete(id);
            res.json(getAsset);
        }catch(error){
            throw new Error(error);
        }
    })

module.exports = { CreateAssetByAdmin:createAsset,GetAllAssetByAdmin:getAllAssets,DeleteAssetByAdmin:deleteAsset,UpdateAssetByAdmin:updateAsset,GetAssetsByAdmin:getAsset};
// module.exports = loginUser;