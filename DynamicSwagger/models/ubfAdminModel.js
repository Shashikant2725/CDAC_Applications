// For Domain Management
// import mongoose from 'mongoose';
// import mongoose from 'mongoose'
const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
//Schema Design for Domain Main
const DomainMainSchema = new Schema(
  {
    Domain: {
      type: String,
      maxlength: 40,
    },
    Stakeholders: [
      {
        StakeholderName: {
          type: String,
          maxlength: 40,
        },
        StakeholderId: {
          type: String,
          maxlength: 20,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Schema Design for Stakeholders
const StakeholderSchema = new Schema(
  {
    StakeholderName: {
      type: String,
    },
    Domains: [
      {
        DomainId: {
          type: String,
          maxlength: 40,
        },
        DomainName: {
          type: String,
          maxlength: 40,
        },
      },
    ],
    NodeFunctions: [
      {
        FunctionName: {
          type: String,
          maxlength: 40,
        },
        FunctionId: {
          type: String,
          maxlength: 40,
        },
      },
    ],
    GoFunctions: [
      {
        FunctionName: {
          type: String,
          maxlength: 40,
        },
        FunctionId: {
          type: String,
          maxlength: 40,
        },
      },
    ],
    JavaFunctions: [
      {
        FunctionName: {
          type: String,
          maxlength: 40,
        },
        FunctionId: {
          type: String,
          maxlength: 40,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Schema Design for Node Functions
const NodeFunctionSchema = new Schema(
  {
    FunctionName: {
      type: String,
      maxlength: 40,
    },
    Description: {
      type: String,
    },
    Code: {
      type: String,
    },
    Version: {
      type: String,
    },
    Stakeholders: [
      {
        StakeholderId: {
          type: String,
        },
        StakeholderName: {
          type: String,
        },
      },
    ],
    RestApis: [
      {
        RestApiName: {
          type: String,
          maxlength: 40,
        },
        RestApiId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Schema Design for Go Functions
const GoFunctionSchema = new Schema(
  {
    // Domain :{
    //     type : String,
    //     maxlength : 40,
    // },
    FunctionName: {
      type: String,
    },
    Version: {
      type: String,
    },
    Description: {
      type: String,
    },
    Code: {
      type: String,
    },
    Stakeholders: [
      {
        StakeholderName: {
          type: String,
          maxlength: 40,
        },
        StakeholderId: {
          type: String,
          maxlength: 20,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Schema Design for Java Functions
const JavaFunctionSchema = new Schema(
  {
    // Domain :{
    //     type : String,
    //     maxlength : 40,
    // },
    FunctionName: {
      type: String,
    },
    Version: {
      type: String,
    },
    Description: {
      type: String,
    },
    Code: {
      type: String,
    },
    Stakeholders: [
      {
        StakeholderName: {
          type: String,
          maxlength: 40,
        },
        StakeholderId: {
          type: String,
          maxlength: 20,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// REST API Schema

//Schema Design for Node Functions
const RestAPISchema = new Schema(
  {
    RestApiName: {
      type: String,
      maxlength: 40,
    },
    PostCode: [
      {
        URL: { type: String },
        LogicBody: { type: String },
      },
    ],
    GetCode: [
      {
        URL: { type: String },
        LogicBody: { type: String },
      },
    ],
    DeleteCode: [
      {
        URL: { type: String },
        LogicBody: { type: String },
      },
    ],
    PutCode: [
      {
        URL: { type: String },
        LogicBody: { type: String },
      },
    ],
    PatchCode: [
      {
        URL: { type: String },
        LogicBody: { type: String },
      },
    ],
    NodeFunctions: [
      {
        FunctionId: {
          type: String,
        },
        FunctionName: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Creating model objects
const Domain =
  mongoose.models.DomainMain || mongoose.model("DomainMain", DomainMainSchema);
const Stakeholder =
  mongoose.models.Stakeholders ||
  mongoose.model("Stakeholders", StakeholderSchema);
const NodeFunction =
  mongoose.models.NodeFunctions ||
  mongoose.model("NodeFunctions", NodeFunctionSchema);
const JavaFunction =
  mongoose.models.JavaFunctions ||
  mongoose.model("JavaFunctions", JavaFunctionSchema);
const GoFunction =
  mongoose.models.GoFunctions ||
  mongoose.model("GoFunctions", GoFunctionSchema);
const RestAPI =
  mongoose.models.RestAPIS || mongoose.model("RestAPIS", RestAPISchema);

// Exporting our model objects
module.exports = {
  Domain,
  Stakeholder,
  NodeFunction,
  JavaFunction,
  GoFunction,
  RestAPI,
};
