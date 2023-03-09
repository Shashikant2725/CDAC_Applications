// For User examples -> create a Table for User
import mongoose from 'mongoose'

//Schema Design for Domain Main
const DomainMainsSchema =  new mongoose.Schema(
    {
    Domain : {
        type : String,
        maxlength : 40,
    },
    Go : {
        Main_id : {
            type : String,
        },
        Stakeholders_id : {
            type : String,
        }
    },
    Node : {
        Main_id : {
            type : String,
        },
        Stakeholders_id : {
            type : String,
        }
    },
    Java : {
        Main_id : {
            type : String,
        },
        Stakeholders_id : {
            type : String,
        }
    }
    },{
    timestamps: true,
    }
)

//Schema Design for Go,Node and Java Main
const GoMainSchema = new mongoose.Schema(
    {
    // Main : [{
    //     Header :[{
    //         Version : {
    //             type :String,
    //             required : true,
    //         },
    //         Description : {
    //             type: String,
    //             required: true,
    //         },
    //         Code : {
    //             type : String,
    //             required: true,
    //         },
    //     }],
    //     Footer :[{
    //         Version : {
    //             type :String,
    //             required : true,
    //         },
    //         Description : {
    //             type: String,
    //             required: true,
    //         },
    //         Code : {
    //             type : String,
    //             required: true,
    //         },
    //     }],
    // }],
    Main : [{
        Object
    }]
    },{
        timestamps: true,
    }
    
)

const GoStakeholdersSchema,NodeStakeholdersSchema,JavaStakeholdersSchema = new mongoose.Schema(
    {
        Stakeholders : [{
            Object
        }]
    },
    {
        timestamps: true,
    
    }
    
)

// const DomainSchema = new mongoose.Schema(
//     {
//         //here we create columns in the table
//         //You add the columns you want
//         Domain: {
//             type: String,
//             required: true,
//             maxlength: 40,
//         },
//         Go: {
//             Main_id : {
//                 type : String,
//             },
//             Stakeholders_id : {
//                 type : String,
//             }
//         },
//         Node : {
//             Main_id : {
//                 type : String,
//             },
//             Stakeholders_id : {
//                 type : String,
//             }
//         },
//         Java : {
//             Main_id : {
//                 type : String,
//             },
//             Stakeholders_id : {
//                 type : String,
//             }
//         }
//     },
// );

// Creating model objects
const Domain = mongoose.model('DomainMain', DomainMainsSchema);
const GoMain = mongoose.model('GoMain', GoMainSchema);
const NodeMain = mongoose.model('NodeMain', NodeMainSchema);
const JavaMain = mongoose.model('JavaMain', JavaMainSchema);
const GoStakeholders = mongoose.model('GoStakeholders', GoStakeholdersSchema);
const NodeStakeholders = mongoose.model('NodeStakeholders', NodeStakeholdersSchema);
const JavaStakeholders = mongoose.model('JavaStakeholders', JavaStakeholdersSchema);


  
// Exporting our model objects
module.exports = {
    Domain,GoMain,NodeMain,JavaMain,GoStakeholders,NodeStakeholders,JavaStakeholders
}

// if not exists than create a table but if exists than
export default mongoose.models.Domain || mongoose.model("DomainMain", DomainSchema);