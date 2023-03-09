/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class DataChaincode extends Contract {

    
    // putstate function
    async createDrugSample(ctx,...args) {
        console.info('============= START : Put Data ===========');

        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 
//  return getAttr
        if (getAttr== "Drug-Manufacturer"){
            const drugname =  args[0] // public mandatory
            const drugtype = args[1] //public data
            const drugcomposition = args[2] // private mandatory 
            const drugmanufacturer = args[3] // private data
            const sendingdate = args[4] //public data
            const validity = args[5] // public data
            const sendingdata = {
                asset_type : "drugsample",
                public_mandatory : {'drugname' : drugname },
                private_mandatory : {'drugcomposition' : drugcomposition},
                public_data : {'drugtype' : drugtype, 'sendingdate' : sendingdate, 'validity' : validity},
                private_data : {'drugmanufacturer' : drugmanufacturer},

            }
            // return sendingdata
            const publicdatas = {'drugtype' : drugtype, 'sendingdate' : sendingdate, 'validity' : validity}
            const gh = `{\"drugtype\": \"${drugtype}\", \"sendingdate\": \"${sendingdate}\", \"validity\" : \"${validity}\"}`
            const ff = JSON.parse(publicdatas)
            // const args1 = [ 'createGenericAsset', sendingdata.asset_type,sendingdata.public_mandatory,sendingdata.private_mandatory, sendingdata.public_data, sendingdata.private_data,sendingdata.data_chaincode ] 
            const args1 = [ 'createGenericAsset', sendingdata.asset_type] 

            const response = await ctx.stub.invokeChaincode('genericasset',args1,'mychannel')
        //     // // const datam = await ctx.stub.invokechaincode('drugtracingdata',value,'mychannel')
        //     // console.info('============= END : Put Data ===========');
            return response
        }
        else {
            return "User with role Drug-Manufacturer can create Drug sample"
        }
        
    }

    // getstate function
    async getData(ctx, key) {
        const valueAsBytes = await ctx.stub.getState(key); // get the car from chaincode state
        if (!valueAsBytes || valueAsBytes.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        console.log(valueAsBytes.toString());
        return valueAsBytes.toString();
    }

    // putprivatedata function for private data
    async putPrivateDetails(ctx,...args) {
        console.info('============= START : Put Private Data ===========');
        const key = args[0]
        const collectionname = args[1]
        const value = args[2]
        await ctx.stub.putPrivateData(collectionname, key, value);
        console.info('============= END : Put Private Data ===========');
    }

    // getprivatedata function for private data
    async getprivateDetails(ctx, ...args) {
        const key = args[0]
        const collectionname = args[1]
        const valueAsBytes = await ctx.stub.getPrivateData(collectionname,key); 
        if (!valueAsBytes || valueAsBytes.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        console.log(valueAsBytes.toString());
        return valueAsBytes.toString();
    }

    // get data between 2 keys
    async getDataByRange(ctx,...args) {
        const startKey = args[0];
        const endKey = args[1];
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
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

    // get private data between range
    async getPrivateDataByRange(ctx,...args) {
        const startKey = args[0];
        const endKey = args[1];

        const allResults = [];
        for await (const {key, value} of ctx.stub.getPrivateDataByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
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

    // get History
    async getHistory(ctx, key) {
        console.info('============= START : Get History ===========');

        let iterator = await ctx.stub.getHistoryForKey(key);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
                const obj = JSON.parse(res.value.value.toString('utf8'));
                result.push(obj);
            }
            res = await iterator.next();
        }
        await iterator.close();
        console.info('============= END : Get History ===========');
        return result;
    }

}

module.exports = DataChaincodeDataChaincode;
