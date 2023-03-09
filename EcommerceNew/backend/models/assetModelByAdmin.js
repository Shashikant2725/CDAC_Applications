const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var assetByAdminSchema = new mongoose.Schema({

    assetName:{
        type : String,
        maxlength : 40,
        required:true,
    },
    publicMandatory : [{ type: String }],
    privateMandatory : [{ type: String }],
    publicCommonData : [{ type: String }],
    privateCommonData : [{ type: String }]
});

//Export the model
module.exports = mongoose.model('AssetByAdmin', assetByAdminSchema);