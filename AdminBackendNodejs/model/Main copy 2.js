// For Domain Management
import mongoose from 'mongoose'

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
//Schema Design for Domain Main
const DomainMainsSchema =  new Schema(
    {
    Domain : {
        type : String,
        maxlength : 40,
    },
    GoStakeholders : [{
        StakeholderName : {
            type : String,
            maxlength : 40,
        },
        StakeholderId : {
            type : String,
            maxlength : 20,
        }
    }],
    NodeStakeholders : [{
        StakeholderName : {
            type : String,
            maxlength : 40,
        },
        StakeholderId : {
            type : String,
            maxlength : 20,
        }
    }],
    JavaStakeholders : [{
        StakeholderName : {
            type : String,
            maxlength : 40,
        },
        StakeholderId : {
            type : String,
            maxlength : 20,
        }
    }],
    },
    {
    timestamps: true,
    }
)


//Schema Design for Go Stakeholders
const GoStakeholdersSchema = new Schema(
    {
        Domain :{
            type : String,
            maxlength : 40,
        }, 
        StakeholderName: {
            type: String,
        },
        Functions: [{
            FunctionName : {
                type: String,
                maxlength : 40,
            },
            FunctionId : {
                type: String,
                maxlength : 20,
            }
        }]
    },
    {
        timestamps: true,
    
    }  
)


//Schema Design for Node Stakeholders
const NodeStakeholdersSchema = new Schema(
    {
        Domain :{
            type : String,
            maxlength : 40,
        }, 
        StakeholderName: {
            type: String,
        },
        Functions: [{
            FunctionName : {
                type: String,
                maxlength : 40,
            },
            FunctionId : {
                type: String,
                maxlength : 20,
            }
        }]
    },
    {
        timestamps: true,
    
    }  
)


//Schema Design for Java Stakeholders
const JavaStakeholdersSchema = new Schema(
    {
        Domain :{
            type : String,
            maxlength : 40,
        }, 
        StakeholderName: {
            type: String,
        },
        Functions: [{
            FunctionName : {
                type: String,
                maxlength : 40,
            },
            FunctionId : {
                type: String,
                maxlength : 20,
            }
        }]
    },
    {
        timestamps: true,
    
    }  
)


//Schema Design for Go Functions
const GoFunctionsSchema = new Schema(
    {
        Domain :{
            type : String,
            maxlength : 40,
        }, 
        FunctionName: {
            type: String,
        },
        Version: {
            type: String
        },
        Description: {
            type : String
        },
        Code : {
            type : String
        },
        Stakeholders : [{
            StakeholderName: {
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
    
    }  
)


//Schema Design for Node Functions
const NodeFunctionsSchema = new Schema(
    {
        Domain :{
            type : String,
            maxlength : 40,
        }, 
        FunctionName: {
            type: String,
        },
        Version: {
            type: String
        },
        Description: {
            type : String
        },
        Code : {
            type : String
        },
        Stakeholders : [{
            StakeholderName: {
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
    
    }  
)

//Schema Design for Java Functions
const JavaFunctionsSchema = new Schema(
    {
        Domain :{
            type : String,
            maxlength : 40,
        }, 
        FunctionName: {
            type: String,
        },
        Version: {
            type: String
        },
        Description: {
            type : String
        },
        Code : {
            type : String
        },
        Stakeholders : [{
            StakeholderName: {
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
    
    }  
)

// Creating model objects
const Domain = mongoose.models.DomainMain || mongoose.model('DomainMain', DomainMainsSchema);
const GoStakeholders = mongoose.models.GoStakeholders || mongoose.model('GoStakeholders', GoStakeholdersSchema);
const NodeStakeholders = mongoose.models.NodeStakeholders || mongoose.model('NodeStakeholders', NodeStakeholdersSchema);
const JavaStakeholders = mongoose.models.JavaStakeholders || mongoose.model('JavaStakeholders', JavaStakeholdersSchema);
const GoFunctions = mongoose.models.GoFunctions || mongoose.model('GoFunctions', GoFunctionsSchema);
const NodeFunctions = mongoose.models.NodeFunctions || mongoose.model('NodeFunctions', NodeFunctionsSchema);
const JavaFunctions = mongoose.models.JavaFunctions || mongoose.model('JavaFunctions', JavaFunctionsSchema);


  
// module.exports =
//     mongoose.models.Customer || mongoose.model('Customer', customerSchema);
// Exporting our model objects
module.exports = {
    Domain,GoFunctions,NodeFunctions,JavaFunctions,GoStakeholders,NodeStakeholders,JavaStakeholders
};

