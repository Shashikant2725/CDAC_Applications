const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const DomainMainSchema = new mongoose.Schema({
    Domain : {
        type : String,
        // maxlength : 40,
    },
    Stakeholders : [{
        StakeholderName : {
            type : String,
            maxlength : 40,
        },
        StakeholderId : {
            type : String,
            maxlength : 20,
        }
    }]
    },
    {
    timestamps: true,
    });
  

//Export the model
module.exports = mongoose.model('Domain', DomainMainSchema);