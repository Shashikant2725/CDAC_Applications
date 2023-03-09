const Usermodel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/jwtToken');


/// Create User
const createUser = asyncHandler(async(req,res) =>{
    const email = req.body.email;
    const findUser = await Usermodel.findOne({email:email});
    if(!findUser)
    {
        const registerUser =await Usermodel.create(req.body);
        res.json({Result:registerUser,success:true});
    }
    else{
        throw new Error('User Already Exist');
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
    const getAllUsers = asyncHandler(async(req,res)=>{
        try{
            const getAllUsers = await Usermodel.find();
            res.json({getAllUsers});
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
module.exports = { Create:createUser,Login:loginUser,GetAllusers:getAllUsers,GetUser:getUser,DeleteUser:deleteUser };
// module.exports = loginUser;