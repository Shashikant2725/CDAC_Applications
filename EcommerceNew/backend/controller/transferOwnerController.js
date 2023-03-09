const Usermodel = require('../models/userModel');
const TransferOwnerModel = require('../models/transferOwnerModel');
// const AssetModel = require('../models/assetModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create User
const transferAsset = asyncHandler(async(req,res) =>{
    console.log("Bodyyy::",req.body);
    try{
        const Asset =await TransferOwnerModel.create(req.body);
        res.json({Result:Asset,success:true});
    }catch(error){
        console.log('Error' , error)
    }
    
    
})

/// Login User
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    //check User exist
    const findUser =await Usermodel.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password)))
    {
        res.json({
            _id:findUser._id,
            firstname:findUser.firstname,
            lastname:findUser.lastname,
            email:findUser.email,
            password:findUser.password,
            token:generateToken(findUser._id)
        });
    }
    else{
        throw new Error("Invalid Credentials");
    }
    })

    /// Get All Users
    const transferAllAssets = asyncHandler(async(req,res)=>{
        try{
            const transferAllAssets = await TransferOwnerModel.find();
            res.json({transferAllAssets});
        }catch(error){
            throw new Error(error);
        }
    })

    /// Get User By ID
    const getUser = asyncHandler(async(req,res)=>{
        try{
            const id = req.params.id;
            const getUser = await Usermodel.findById(id);
            res.json({getUser});
        }catch(error){
            throw new Error(error);
        }
    })


    /// Delete User
    const deleteUser = asyncHandler(async(req,res)=>{
        try{
            const id = req.params.id;
            const getUser = await Usermodel.findByIdAndDelete(id);
            res.json(getUser);
        }catch(error){
            throw new Error(error);
        }
    })
module.exports = { Transfer:transferAsset,TransferAllAsset:transferAllAssets};
// module.exports = loginUser;