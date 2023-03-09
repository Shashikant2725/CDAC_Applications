
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
       

    