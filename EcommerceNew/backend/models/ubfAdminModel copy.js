const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DomainMainSchema = new Schema({
  Domain : {
      type : String,
      maxlength : 40,
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
  },
  { typeKey: '$type' });

const StakeholderSchema = new Schema(
    {
        
      StakeholderName: {
            type: String,
        },
        Domain : [{
            DomainId : {
                type : String,
                maxlength : 40,
            },
            DomainName : {
                type : String,
                maxlength : 40,
            }
        }],
        NodeFunctions: [{
            FunctionName : {
                type: String,
                maxlength : 40,
            },
            FunctionId : {
                type: String,
                maxlength : 40,
            }
        }],
        GoFunctions: [{
            FunctionName : {
                type: String,
                maxlength : 40,
            },
            FunctionId : {
                type: String,
                maxlength : 40,
            }
        }],
        JavaFunctions: [{
            FunctionName : {
                type: String,
                maxlength : 40,
            },
            FunctionId : {
                type: String,
                maxlength : 40,
            }
        }]
    },
    {
        timestamps: true,
    
    },
    { typeKey: '$type' }
)


const Domain = mongoose.model("Domain", DomainMainSchema);
const Stakeholder = mongoose.model("Stakeholder", StakeholderSchema);

module.exports = Domain,Stakeholder
