const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var assetByAdminSchema = new mongoose.Schema({

    assetName:{
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
        }
    }]
});

//Export the model
module.exports = mongoose.model('AssetByAdmin', assetByAdminSchema);