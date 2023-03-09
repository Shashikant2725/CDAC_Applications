/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const { v4: uuidv4 } = require('uuid');

class Asset extends Contract {

    // Creating Generic Asset

    async createGenericAsset(ctx, ...args) {
        console.info('============= START : Create Generic Asset ===========');

        var Role = ctx.clientIdentity.getAttributeValue("Role"); 
        var Username = ctx.clientIdentity.getAttributeValue("Username");
        if (Role== "Asset-Owner") { 
            const getClientOrgId = ctx.clientIdentity.getMSPID();

            if(!getClientOrgId || getClientOrgId.length === 0){
                throw new Error(`failed to get verified OrgID`);
            }
            const id=uuidv4();
            // Creating Asset Blueprint and Binding Owner
            const assetsample = {
                AID:                id,
                OwnerOrg:          getClientOrgId,
                Owner :             Username,
                Public_Mandatory:    JSON.parse(args[0]),
                Private_Mandatory:   JSON.parse(args[1]),
                Public_Mutable:      JSON.parse(args[2]),
                Private_Mutable:     JSON.parse(args[3]),
                
            } 
            if(Object.keys(assetsample.Public_Mandatory).length>=1 && Object.keys(assetsample.Private_Mandatory).length>=1){
            // Writing Data in Public Collection
            await ctx.stub.putState(assetsample.AID, Buffer.from(JSON.stringify(assetsample)));
            console.info('============= END : Create Generic Asset ===========');
            return "Asset Created Successfully With AssetId:: "+assetsample.AID;
            } else{
                return `Please Provide Mandatory Fields`;
            }
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
            Public_Mandatory : asset_details.Public_Mandatory
        }
        
        console.info('============= END : Query Generic Asset Public Properties ===========');
        return asset_public;

    }

    // Querying Asset Private Properties

    async queryAssetPrivateProperties(ctx, key) {
        console.info('============= START : Query Generic Asset Private Properties ===========');

        var Role = ctx.clientIdentity.getAttributeValue("Role"); 
        // var Username = ctx.clientIdentity.getAttributeValue("Username");
        if (Role == "Asset-Owner" || Role == "OrgAdmin") { 
       
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

        if (asset_details.OwnerOrg == getClientOrgId ){
            const asset_private = {
                Private_Mutable : asset_details.Private_Mutable,
                Private_Mandatory : asset_details.Private_Mandatory
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

        var Role = ctx.clientIdentity.getAttributeValue("Role"); 

        if (Role== "Asset-Owner" || Role == "OrgAdmin") { 
       
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
            console.info('============= END : Query Generic Asset Properties ===========');
            return asset_details;
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

        var Role = ctx.clientIdentity.getAttributeValue("Role"); 

        if (Role== "Asset-Owner") { 

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


        if (assetsample.Owner == Username){
            assetsample.Public_Mutable = JSON.parse(public_mutable)
            await ctx.stub.putState(key, Buffer.from(JSON.stringify(assetsample)));
            return "Asset Public Properties Details Updated Successfully"
        }

        else {
            return "Failed to update properties because of unauthorized owner"
        }
        }
        else {
            return "Only user with role as Asset-Owner Can Update Public Mutable Property Details";
        }
    }

    // Changing Asset Private Properties Details

    async updateGenericAssetPrivateProperties(ctx, key, private_mutable) {
        console.info('============= START : Update Generic Asset Private Properties Details===========');

        var Role = ctx.clientIdentity.getAttributeValue("Role"); 
        var Username = ctx.clientIdentity.getAttributeValue("Username")
        if (Role== "Asset-Owner") { 

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


        if (assetsample.Owner == Username){
            assetsample.Private_Mutable = JSON.parse(private_mutable)
            await ctx.stub.putState(key, Buffer.from(JSON.stringify(assetsample)));
            return "Asset Private Properties Details Updated Successfully"
        }
        else {
            return "Failed to update properties because of unauthorized owner"
        }
        // Creating Asset Blueprint
        
    
        // console.info('============= END : Update Generic Asset Private Properties Details===========');
        }
        else {
            return "Only user with role as Asset-Owner Can Update Private Mutable Property Details";
        }
    }

    // Transfer Asset To New Owner

    async transferGenericAsset(ctx, key , newOwnerOrg,newOwner) {
        console.info('============= START : Transfer Generic Asset Details===========');

        var Role = ctx.clientIdentity.getAttributeValue("Role"); 
        var Username = ctx.clientIdentity.getAttributeValue('Username');
        if (Role== "Asset-Owner") { 

        // Verify Asset Exists Or Not
	    const assetAsBytes = await ctx.stub.getState(key); 
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Asset with key ${key}  does not exist`);
        }
        const assetsample = JSON.parse(assetAsBytes.toString());

        // Auth check to ensure that client's org actually owns the asset
        if (assetsample.Owner == Username ){
            assetsample.OwnerOrg = newOwnerOrg
            assetsample.Owner=newOwner;

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(assetsample)));

        console.info('============= END : Transfer Generic Asset Details===========');
        return `Asset Transfered Successfully To New Owner ${newOwner}`
        }
        else{
            throw new Error(`a peer from ${Username} cannot transfer asset owned by ${assetsample.Owner}`);

        }

        // Creating Asset New Owner Blueprint
        
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
            allResults.push({ Key: key, Record: {Public_Mutable : record.Public_Mutable, Public_Mandatory : record.Public_Mandatory }});
        }
        console.info(allResults);
        console.info('============= END : Query All Generic Asset Public Properties ===========');
        return JSON.stringify(allResults);
    }

    // Query All Assets Private Properties
    async queryAllAssetsPrivateProperties(ctx) {
        console.info('============= START : Query All Generic Asset Private Properties ===========');
        
        var Role = ctx.clientIdentity.getAttributeValue("Role"); 

        if (Role== "Asset-Owner" || Role== "OrgAdmin") { 

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
            allResults.push({ Key: key, Record: {Private_Mandatory : record.Private_Mandatory, Private_Mutable : record.Private_Mutable} });
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
                OwnerOrg : result[i].OwnerOrg,
                Owner : result[i].Owner,
                Public_Mutable : result[i].Public_Mutable,
                public_Mandatory : result[i].Public_Mandatory
            }
            public_history.push(history_data);

        }
        console.info('============= END : Get History Of An Asset Public Property ===========');
        return public_history;
    }

    // Get History Of An Asset For Ownership
    async getHistoryForAssetOwnership(ctx, key) {
        console.info('============= START : Get History Of An Asset Ownership===========');
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
        let ownership_history = [];
        for (let i = 0; i < result.length; i++){
            var ownership_data = {
                OwnerOrg : result[i].OwnerOrg,
                Owner : result[i].Owner,
            }
            ownership_history.push(ownership_data);

        }
        console.info('============= END : Get History Of An Asset Ownership ===========');
        return ownership_history;
    }


    // Get History Of An Asset For Private Property
    async getHistoryForAssetForPrivateProperty(ctx, key) {
        console.info('============= START : Get History Of An Asset Private Property ===========');

        var Role = ctx.clientIdentity.getAttributeValue("Role"); 

        if (Role== "Asset-Owner" || Role== "OrgAdmin") { 
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

        const getClientOrgId = ctx.clientIdentity.getMSPID();
        if(!getClientOrgId || getClientOrgId.length === 0){
            throw new Error(`failed to get verified OrgID`);
        }

        let private_history = [];
        for (let i = 0; i < result.length; i++){
            if (getClientOrgId == result[i].OwnerOrg){
                var history_data = {
                    OwnerOrg : result[i].OwnerOrg,
                    Owner : result[i].Owner,
                    Private_Mutable : result[i].Private_Mutable,
                    Private_Mandatory : result[i].Private_Mandatory
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
