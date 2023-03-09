const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var assetSchema = new mongoose.Schema({

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
    publicMandatory : [{
        publicMandatoryField : {
            type : String,
            maxlength : 40,
            required:true,
        },
        publicMandatoryData : {
            type : String,
            maxlength : 20,
            required:true,

        }
    }],
    privateMandatory : [{
        privateMandatoryField : {
            type : String,
            maxlength : 40,
            required:true,
        },
        privateMandatoryData : {
            type : String,
            maxlength : 20,
            required:true,
        }
    }],
    publicCommonData : [{
        publicDataField : {
            type : String,
            maxlength : 40,
            required:true,
        },
        publicData : {
            type : String,
            maxlength : 20,
            required:true,

        }
    }],
    
    privateCommonData : [{
        privateDataField : {
            type : String,
            maxlength : 40,
            required:true,
        },
        privateData : {
            type : String,
            maxlength : 20,
            required:true,
        }
    }]
});

//Export the model
module.exports = mongoose.model('Asset', assetSchema);