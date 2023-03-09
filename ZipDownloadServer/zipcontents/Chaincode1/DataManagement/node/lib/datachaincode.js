"use strict";

const { Contract } = require("fabric-contract-api");

class DataChaincode extends Contract {

    //Put Sample data into Ledger 
    async PutState(ctx, Id, sampledata) {
        const sample = await ctx.stub.putState(Id, sampledata);
        return sampledata;
    }
    //Get  data from Ledger using id
    async GetState(ctx, Id) {
        const dataAsBytes = await ctx.stub.getState(Id); // get the data from chaincode state
        if (!dataAsBytes || dataAsBytes.length === 0) {
            throw new Error(`${Id} does not exist`);
        }
        return dataAsBytes.toString();
    }

    //Drug Sample Creation Function
    async PutPrivateData(ctx, collectionname, Id, samplepdc) {
        const DCPDCResult = await ctx.stub.putPrivateData(
            collectionname,
            Id,
            samplepdc
        );
        const sample = await ctx.stub.putState(Id, samplepdc);
        return samplepdc;
    }
   
    // Drug Approving Authority Part Starts
    async GetPrivateData(ctx, collection, Id) {
        var drugAsBytes = await ctx.stub.getPrivateData(collection, Id);

        if (!drugAsBytes) {
            return (
                "Error : ID Number does note exists in private data collection." +
                carAsBytes.Error()
            );
        }

        return JSON.parse(drugAsBytes.toString());
    }
    //Get History By Key
    async queryHistoryByKey(ctx, key) {
        console.info("getting history for key: " + key);
        let iterator = await ctx.stub.getHistoryForKey(key);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                const obj = JSON.parse(res.value.value.toString("utf8"));
                result.push(obj);
            }
            res = await iterator.next();
        }
        await iterator.close();
        console.info(result);
        return JSON.stringify(result);
    }

    //Query All Details
    async queryAllDetails(ctx) {
        const startKey = "";
        const endKey = "";
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange(
            startKey,
            endKey
        )) {
            const strValue = Buffer.from(value).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
}

module.exports = DataChaincode;

