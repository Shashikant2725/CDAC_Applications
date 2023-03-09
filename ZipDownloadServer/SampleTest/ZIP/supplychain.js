'use strict';

const { Contract } = require('fabric-contract-api');

class SupplyChain extends Contract {
async ToyotaqueryAllCars(ctx) {
    const startKey = '';
    const endKey = '';
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
}

module.exports = Supplychain;