
 'use strict';
 
 const { Contract } = require('fabric-contract-api');
               
 class Chaincode extends Contract {
               
                 //Drug Sample Creation Function
    async createDrugSample(ctx, ...args) {
        if (args.length != 14) {
            throw new Error("Invalid no. of arguments. Expecting 13");
        }
        const SampleId = args[0];
    
        const drugsample = {
            DrugName: args[1],
            DrugType: args[2],
            Price: args[3],
            ChemicalName: args[4],
            Nature: args[5],
            Condition: args[6],
            Specialization: args[7],
            Ulabel: args[8],
            SidesEffects: args[9],
            Storage: args[10],
            GovernmentApproval: args[11],
            Validity: args[12],
            Doc_Type: "Drug_Sample",
            SentApprovalDate: args[13],
        };

        // Adding Data To The Common Collection
        const result = await ctx.stub.putState(
            SampleId,
            Buffer.from(JSON.stringify(drugsample))
        );

        return result;
    }

 }
 
 module.exports = Chaincode;
               