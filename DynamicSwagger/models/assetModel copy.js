const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var assetSchema = new mongoose.Schema({

    publicData : [{
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
    privateData : [{
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
    
});

//Export the model
module.exports = mongoose.model('Asset', assetSchema);