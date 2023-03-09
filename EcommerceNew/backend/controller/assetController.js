const Usermodel = require('../models/userModel');
const AssetModel = require('../models/assetModel');
// const AssetModel = require('../models/assetModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create User
const createAsset = asyncHandler(async(req,res) =>{
    console.log("Bodyyy::",req.body);
    try{
        const registerAsset =await AssetModel.create(req.body);
       
        res.json({Result:registerAsset,success:true});
    }catch(error){
        console.log('Error' , error)
    }
    
})

/// Update Asset
const updateAsset = asyncHandler(async (req,res)=>{
    // const {orgName} = req.body;
    const Assetupdate = await AssetModel.updateOne({_id:req.params.id},{$set : {
        'orgName' : req.body.orgName,
        'userName' : req.body.userName
        
    }});

    res.json({Result:Assetupdate});
  
    })

    /// Get All Assets
    const getAllAssets = asyncHandler(async(req,res)=>{
        try{
            const getAllAssets = await AssetModel.find();
          
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
            getAssets = await AssetModel.findOne({_id:req.params.id});
            console.log("getAssets::",getAllAssets)

            res.json([getAssets]);

        }catch(error){
            throw new Error(error);
        }
    })


    /// Delete Asset
    const deleteAsset = asyncHandler(async(req,res)=>{
        try{
            const id = req.params.id;
            const getAsset = await AssetModel.findByIdAndDelete(id);
            res.json(getAsset);
        }catch(error){
            throw new Error(error);
        }
    })

module.exports = { Create:createAsset,GetAllAsset:getAllAssets,DeleteAsset:deleteAsset,UpdateAsset:updateAsset,GetAssets:getAsset};
// module.exports = loginUser;