/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Asset extends Contract {

    // Creating Generic Asset

    async createGenericAsset(ctx, ...args) {
        console.info('============= START : Create Generic Asset ===========');

        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 

        if (getAttr== "Asset-Owner") { 
            const getClientOrgId = ctx.clientIdentity.getMSPID();

            if(!getClientOrgId || getClientOrgId.length === 0){
                throw new Error(`failed to get verified OrgID`);
            }

            // Creating Asset Blueprint and Binding Owner
            const assetsample = {
                ObjectType:        "asset",
                ID:                args[0],
                OwnerOrg:          getClientOrgId,
                Public_Mutable:      JSON.parse(args[1]),
                Private_Mutable:     JSON.parse(args[2]),
                Public_Immutable:    JSON.parse(args[3]),
                Private_Immutable:   JSON.parse(args[4])
            }

            // Writing Data in Public Collection
            await ctx.stub.putState(args[0], Buffer.from(JSON.stringify(assetsample)));
            console.info('============= END : Create Generic Asset ===========');
            return "Asset Created Successfully"
        } else {
            return "Only user with role as Asset-Owner Can Create Assets!";
        }
    
    }

    // Querying Asset Public Properties

    async queryAssetPublicProperties(ctx, key) {
        console.info('============= START : Query Generic Asset Public Properties ===========');

        const assetAsBytes = await ctx.stub.getState(key); // get the asset from chaincode state
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`asset with id ${key} does not exist`);
        }

        console.log(assetAsBytes.toString());

        const asset_details = JSON.parse(assetAsBytes.toString());
        const asset_public = {
            Public_Mutable : asset_details.Public_Mutable,
            Public_Immutable : asset_details.Public_Immutable
        }
        
        console.info('============= END : Query Generic Asset Public Properties ===========');
        return asset_public;

    }

    // Querying Asset Private Properties

    async queryAssetPrivateProperties(ctx, key) {
        console.info('============= START : Query Generic Asset Private Properties ===========');

        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 

        if (getAttr == "Asset-Owner" || getAttr == "OrgAdmin") { 
       
        const getClientOrgId = ctx.clientIdentity.getMSPID();
        if(!getClientOrgId || getClientOrgId.length === 0){
            throw new Error(`failed to get verified OrgID`);
        }

        const assetAsBytes = await ctx.stub.getState(key); // get the asset from chaincode state
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`asset with id ${key} does not exist`);
        }

        console.log(assetAsBytes.toString());

        const asset_details = JSON.parse(assetAsBytes.toString());

        if (asset_details.OwnerOrg == getClientOrgId){
            const asset_private = {
                Private_Mutable : asset_details.Private_Mutable,
                Private_Immutable : asset_details.Private_Immutable
            }
            console.info('============= END : Query Generic Asset Private Properties ===========');
            return asset_private;
        }
        else {
            return "Only Authorized OrgAdmin and Asset-Owner Can View Private Data"
        }        
    }
    else{
        return `Only user with role as Asset-Owner or OrgAdmin Can View Private Property Details Your Role Is ${getAttr}` ;
    }
    }

    // Querying Asset Private Properties

    async queryAssetProperties(ctx, key) {
        console.info('============= START : Query Generic Asset Properties ===========');

        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 

        if (getAttr== "Asset-Owner" || getAttr == "OrgAdmin") { 
       
        const getClientOrgId = ctx.clientIdentity.getMSPID();
        if(!getClientOrgId || getClientOrgId.length === 0){
            throw new Error(`failed to get verified OrgID`);
        }

        const assetAsBytes = await ctx.stub.getState(key); // get the asset from chaincode state
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`asset with id ${key} does not exist`);
        }

        console.log(assetAsBytes.toString());

        const asset_details = JSON.parse(assetAsBytes.toString());

        if (asset_details.OwnerOrg == getClientOrgId){
            const asset_property = {
                Private_Mutable : asset_details.Private_Mutable,
                Private_Immutable : asset_details.Private_Immutable,
                Public_Mutable : asset_details.Public_Mutable,
                Public_Immutable : asset_details.Public_Immutable
            }
            console.info('============= END : Query Generic Asset Properties ===========');
            return asset_property;
        }
        else {
            return "Only Authorized OrgAdmin and Asset-Owner Can View Private Data"
        }        
    }
    else{
        return "Only user with role as Asset-Owner or OrgAdmin Can View Private Property Details";
    }
    }

    // Changing Asset Public Properties Details

    async updateGenericAssetPublicProperties(ctx, key, public_mutable) {
        console.info('============= START : Update Generic Asset Public Properties Details===========');

        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 

        if (getAttr== "Asset-Owner") { 

        // Verify Asset Exists Or Not
	    const assetAsBytes = await ctx.stub.getState(key); 
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Asset with key ${key}  does not exist`);
        }
        const assetsample = JSON.parse(assetAsBytes.toString());

        const getClientOrgId = ctx.clientIdentity.getMSPID();
        if(!getClientOrgId || getClientOrgId.length === 0){
            throw new Error(`failed to get verified OrgID`);
        }

        // Auth check to ensure that client's org actually owns the asset
        if (getClientOrgId != assetsample.OwnerOrg ){
            throw new Error(`a client from ${getClientOrgId} cannot update the public details of an asset owned by ${assetsample.OwnerOrg}`);
        }

        // Creating Asset Blueprint
        assetsample.Public_Mutable = public_mutable

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(assetsample)));
         
        console.info('============= END : Update Generic Asset Public Properties Details===========');
        return "Asset Public Properties Details Updated Successfully"
        }
        else {
            return "Only user with role as Asset-Owner Can Update Public Mutable Property Details";
        }
    }

    // Changing Asset Private Properties Details

    async updateGenericAssetPrivateProperties(ctx, key, private_mutable) {
        console.info('============= START : Update Generic Asset Private Properties Details===========');

        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 

        if (getAttr== "Asset-Owner") { 

        // Verify Asset Exists Or Not
	    const assetAsBytes = await ctx.stub.getState(key); 
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Asset with key ${key}  does not exist`);
        }
        const assetsample = JSON.parse(assetAsBytes.toString());

        const getClientOrgId = ctx.clientIdentity.getMSPID();
        if(!getClientOrgId || getClientOrgId.length === 0){
            throw new Error(`failed to get verified OrgID`);
        }

        // Auth check to ensure that client's org actually owns the asset
        if (getClientOrgId != assetsample.OwnerOrg ){
            throw new Error(`a client from ${getClientOrgId} cannot update the public details of an asset owned by ${assetsample.OwnerOrg}`);
        }

        // Creating Asset Blueprint
        assetsample.Private_Mutable = private_mutable

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(assetsample)));
    
        console.info('============= END : Update Generic Asset Private Properties Details===========');
            return "Asset Private Properties Details Updated Successfully"
        }
        else {
            return "Only user with role as Asset-Owner Can Update Private Mutable Property Details";
        }
    }

    // Transfer Asset To New Owner

    async transferGenericAsset(ctx, key , newOwnerOrg) {
        console.info('============= START : Transfer Generic Asset Details===========');

        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 

        if (getAttr== "Asset-Owner") { 

        // Verify Asset Exists Or Not
	    const assetAsBytes = await ctx.stub.getState(key); 
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Asset with key ${key}  does not exist`);
        }
        const assetsample = JSON.parse(assetAsBytes.toString());

        const getClientOrgId = ctx.clientIdentity.getMSPID();
        if(!getClientOrgId || getClientOrgId.length === 0){
            throw new Error(`failed to get verified OrgID`);
        }

        // Auth check to ensure that client's org actually owns the asset
        if (getClientOrgId != assetsample.OwnerOrg ){
            throw new Error(`a peer from ${getClientOrgId} cannot transfer asset owned by ${assetsample.OwnerOrg}`);
        }

        // Creating Asset New Owner Blueprint
        assetsample.OwnerOrg = newOwnerOrg

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(assetsample)));

        console.info('============= END : Transfer Generic Asset Details===========');
        return `Asset Transfered Successfully To New Owner ${newOwnerOrg}`
        }
        else {
            return "Only user with role as Asset-Owner Can transfer  Asset Ownership";
        }
    }

    // Query All Assets Public Properties
    async queryAllAssetsPublicProperties(ctx) {
        console.info('============= START : Query All Generic Asset Public Properties ===========');
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
            allResults.push({ Key: key, Record: {Public_Mutable : record.Public_Mutable, Public_Immutable : record.Public_Immutable }});
        }
        console.info(allResults);
        console.info('============= END : Query All Generic Asset Public Properties ===========');
        return JSON.stringify(allResults);
    }

    // Query All Assets Private Properties
    async queryAllAssetsPrivateProperties(ctx) {
        console.info('============= START : Query All Generic Asset Private Properties ===========');
        
        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 

        if (getAttr== "Asset-Owner" || getAttr== "OrgAdmin") { 

        const getClientOrgId = ctx.clientIdentity.getMSPID();
        if(!getClientOrgId || getClientOrgId.length === 0){
            throw new Error(`failed to get verified OrgID`);
        }

 
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
            allResults.push({ Key: key, Record: {Private_Immutable : record.Private_Immutable, Private_Mutable : record.Private_Mutable} });
        }
        console.info(allResults);
        console.info('============= END : Query All Generic Asset Private Properties ===========');
        return JSON.stringify(allResults);
        }
        else {
            return "Only user with role as Asset-Owner or OrgAdmin Can Query Private Property Details";
        }
    }

    // Get History Of An Asset For Public Property
    async getHistoryForAssetForPublicProperty(ctx, key) {
        console.info('============= START : Get History Of An Asset Public Property===========');
        let iterator = await ctx.stub.getHistoryForKey(key);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                const obj = JSON.parse(res.value.value.toString('utf8'));
                result.push(obj);
            }
            res = await iterator.next();
        }
        await iterator.close();
        let public_history = [];
        for (let i = 0; i < result.length; i++){
            var history_data = {
                Owner : result[i].OwnerOrg,
                Public_Mutable : result[i].Public_Mutable,
                public_Immutable : result[i].Public_Immutable
            }
            public_history.push(history_data);

        }
        console.info('============= END : Get History Of An Asset Public Property ===========');
        return public_history;
    }


    // Get History Of An Asset For Private Property
    async getHistoryForAssetForPrivateProperty(ctx, key) {
        console.info('============= START : Get History Of An Asset Private Property ===========');

        var getAttr = ctx.clientIdentity.getAttributeValue("role"); 

        if (getAttr== "Asset-Owner" || getAttr== "OrgAdmin") { 
        let iterator = await ctx.stub.getHistoryForKey(key);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                const obj = JSON.parse(res.value.value.toString('utf8'));
                result.push(obj);
            }
            res = await iterator.next();
        }
        await iterator.close();

        let private_history = [];
        for (let i = 0; i < result.length; i++){
            if (getAttr == result[i].OwnerOrg){
                var history_data = {
                    Owner : result[i].OwnerOrg,
                    Private_Mutable : result[i].Private_Mutable,
                    private_Immutable : result[i].Private_Immutable
                }
                private_history.push(history_data);
            }
            
        }

        if (private_history.length == 0){
            return `No History Found For Asset With Key ${key}`
        }else {
            console.info('============= END : Get History Of An Asset Private Property ===========');
            return private_history;
        }

    } else {
        return "Only user with role as Asset-Owner or OrgAdmin Can Get History For Private Property Details"
    }
    }

}

module.exports = Asset;
