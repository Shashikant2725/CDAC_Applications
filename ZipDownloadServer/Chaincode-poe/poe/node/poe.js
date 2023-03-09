const shim = require('fabric-shim');
const util = require('util');
const ClientIdentity = require('fabric-shim').ClientIdentity; // access control module
var validator = require('validator');
const validFilename = require('valid-filename');

let Chaincode = class {

    // initialize the chaincode
    async Init(stub){
        console.info('=========== Instantiated proof of existence chaincode ===========');
        return shim.success();
    }

    /* Will invoke a specific function requested by the user. All the supported functions can be invoked from here.*/
    /*Access Control: None*/
    async Invoke(stub){

        console.info('=========== Invoking the requested functionality ===========');
        
        let ret = stub.getFunctionAndParameters();
        
        console.info(ret);

        let method = this[ret.fcn];
    
        if (!method) {
            console.error('no function of name:' + ret.fcn + ' found');
            throw new Error('Received unknown function ' + ret.fcn + ' invocation');
        }
        try {
            let payload = await method(stub, ret.params);
            return shim.success(payload);
        } catch (err) {
            console.log(err);
            return shim.error(err);
        }
    }

    /* Dummy init function for use with REST as it requires some function to be passed during instantiation */
    /* Access Control: None */
    async initPoeLedger(stub, args){

        if( args.length != 1 ){
            throw new Error('Invalid args. Expects no args');
        }
                
        console.info('============= initLedger Ledger Done ===========');  
    }

    /* Allows to query a specific proofofex based on the hash value. Returns the full record against specific hash. */
    /* Access Control: Reader and Writer */
    async queryProofOfEx(stub, args){

        console.info('=========== Quering specific hash ===========');

        if (args.length != 1) {
            throw new Error('Incorrect number of arguments. Expecting SHA256 Eg: afff2151ac1f4fa1d853d38df7940a967ef172c82c820305748d704cee802739');
        }else if(!validator.isHash(args[0], 'sha256')) // validating the sha256
        {
            throw new Error('Incorrect argument passed. Try Again.');
        }

        let cid = new ClientIdentity(stub);

     //   if (cid.assertAttributeValue('role', 'admin') || cid.assertAttributeValue('role', 'client')) {
        
            console.info('============= Reader or Writer is querying ProofOfEx ===========');

            let hash = args[0];

            let jsonRes = {}; // empty object
        
            let proofOfExAsBytes = await stub.getState(hash); //get the hash from chaincode state
            
            if (!proofOfExAsBytes || proofOfExAsBytes.toString().length <= 0) {
                
                console.log(hash + ' does not exist: Try with other sha256.');

                let time = {};
                time.seconds = 0;
                time.nanos = 0;

                jsonRes.txId = 0;
                jsonRes.assetVersion = 0;
                jsonRes.sha256Hash = 0;
                jsonRes.sha1Hash = 0;
                jsonRes.fileName = 0;
                jsonRes.fileType = 0;
                jsonRes.documentType = 0;
                jsonRes.issuedTo = 0; 
                jsonRes.issuedByOrg = 0;
                jsonRes.issuedByUser = 0;
                jsonRes.ca = 0;
                jsonRes.timestamp = time;      
                jsonRes.backLink = 0;                    
                jsonRes.found = false; 
                
            }else {
            
                // found the record.                                           
                jsonRes = JSON.parse(proofOfExAsBytes.toString());                
                jsonRes.found = true; 
            }        

            console.log(JSON.stringify(jsonRes));

            console.info('=========== Quering Specific hash Done ===========');
            
            return Buffer.from(JSON.stringify(jsonRes));            
        // if cid
    }
       

    
    /* Allows to perform complex query based on the txid value. Returns record for specific txid */
    /* Access Control: Reader and Writer */
    async queryProofOfExByTxid(stub, args){

        console.info('=========== Quering records by TXID ===========');

        if (args.length != 1) {
            throw new Error('Incorrect number of arguments. Expecting TXID');
        }else if(args[0].length != 64 ) // loose validation of txid
        {
            throw new Error('Invaid txid passed. Try again.');
        }

        let cid = new ClientIdentity(stub);

       // if (cid.assertAttributeValue('role', 'admin') || cid.assertAttributeValue('role', 'client')) {
        
            console.info('============= Reader or Writer is querying ===========');

            let txid = args[0];            

            let resultsIterator = await stub.getStateByPartialCompositeKey("txid~ver~hash1~hash2~file~filetype~doctype~issuedto~issuedorg~issuedorguser~ca~sec~nanos~bklnk", [txid]); 
            
            let allResults = [];
            let jsonRes = {}; // empty object
            let time = {};
            time.seconds = 0;
            time.nanos = 0;

            // default value indicating not found
            jsonRes.txId = 0;
            jsonRes.assetVersion = 0;
            jsonRes.sha256Hash = 0;
            jsonRes.sha1Hash = 0;
            jsonRes.fileName = 0;
            jsonRes.fileType = 0;
            jsonRes.documentType = 0;
            jsonRes.issuedTo = 0; 
            jsonRes.issuedByOrg = 0;
            jsonRes.issuedByUser = 0;
            jsonRes.ca = 0;
            jsonRes.timestamp = time;
            jsonRes.backLink = 0;
            jsonRes.found = false;

            allResults.push(jsonRes); // push default JSON object to list

            while(true)
            {
                let res = await resultsIterator.next();
                if (res.value ) { 
                                
                    console.log(' ========== Quering Object ============ ');

                    // pop the default object indicating not found case
                    allResults.pop(jsonRes); // pop JSON object to list
                           
                    let keyParts = await stub.splitCompositeKey(res.value.key)
                               
                    jsonRes.txId = keyParts.attributes[0];
                    jsonRes.assetVersion = keyParts.attributes[1];
                    jsonRes.sha256Hash = keyParts.attributes[2];
                    jsonRes.sha1Hash = keyParts.attributes[3];
                    jsonRes.fileName = keyParts.attributes[4];
                    jsonRes.fileType = keyParts.attributes[5];
                    jsonRes.documentType = keyParts.attributes[6];
                    jsonRes.issuedTo = keyParts.attributes[7];
                    jsonRes.issuedByOrg = keyParts.attributes[8];
                    jsonRes.issuedByUser = keyParts.attributes[9];
                    jsonRes.ca = keyParts.attributes[10];
                    jsonRes.timestamp.seconds = keyParts.attributes[11]; 
                    jsonRes.timestamp.nanos = keyParts.attributes[12];
                    jsonRes.backLink = keyParts.attributes[13]; 
                    jsonRes.found = true;
                       
                    allResults.push(jsonRes); // push JSON object to list
                }
                               
                if (res.done) { // when iterator res is past end of iterated sequence
    
                    console.log(' ========== end of data ============ ');
                    
                    await resultsIterator.close();
                    console.info(allResults);
                    break;
                }              
            }

            console.info('=========== Quering records by TXID Done ===========');
    
            return Buffer.from(JSON.stringify(allResults));
            
        // if cid
    }

};

shim.start(new Chaincode());

