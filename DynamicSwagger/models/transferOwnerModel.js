const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var transferOwnerSchema = new mongoose.Schema({

    orgName:{
        type : String,
        maxlength : 40,
        required:true,
    },
    userName:{
        type : String,
            maxlength : 40,
            required:true,
    },
    newOrgName:{
        type : String,
            maxlength : 40,
            required:true,
    },
    newOwnerName:{
        type : String,
            maxlength : 40,
            required:true,
    },
    Asset_Id:{
        type : String,
            maxlength : 40,
            required:true,
    },
    
    
});




//Export the model
module.exports = mongoose.model('TransferOwner', transferOwnerSchema);