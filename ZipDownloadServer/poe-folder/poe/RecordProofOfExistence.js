
    /* Will allow to create/record a new proof of existence on the blockchain. */
    /* Access Control: Writer Only */
    async recordProofOfEx(stub,args){
                
        console.info('============= Recording new proof ===========');
        console.info(args[7])
        

        // if (args.length != 7) {
        //     throw new Error('Incorrect number of arguments. Expecting 7: SHA256, SHA1, FileName, FileType, DocumentType, IssuedTo, BackLink' );
        // }
        
        let cid = new ClientIdentity(stub);

       // if (cid.assertAttributeValue('role', 'writer')) {
        
            console.info('============= Writer is recording on ProofOfEx ===========');

            // validate arguments
            if( validator.isHash(args[0], 'sha256') &&
                validator.isHash(args[1], 'sha1') &&
                validFilename(args[2]) &&
                (args[3].length != 0) &&
                (args[4].length != 0) &&
                (args[5].length !=0)
            ) {
                let hash = args[0];
            
                let proofOfExAsBytes = await stub.getState(hash); //get the proof of existence from chaincode state
                
                if (!proofOfExAsBytes || proofOfExAsBytes.toString().length <= 0) {

                    let cert = cid.getID();

                    // let oun = cert.subject.organizationalUnitName;
                    // if(oun == undefined)
                    //     oun =  "";

                    // let ou = cert.subject.organizationName;
                    // if(ou == undefined)
                    //     ou =  "";

                   //  let cn = cert.subject.commonName;
                    // if(cn == undefined)
                    //     cn =  "";
                                  
                    let proofofex = {
                        //assetType: 'proofofex',         // for future use
                        assetVersion: '2.0',            // prefilled
                        sha256Hash: args[0],            // validate                  
                        sha1Hash: args[1],              // vaildate
                        fileName: args[2],              // validate
                        fileType: args[3],              // validate for length
                        documentType: args[4],          // validate for length
                        issuedTo: args[5],              // validate for length
                        issuedByOrg: cid.getMSPID().toString(),        // Auto fetch
                        issuedByUser: args[7],               // Auto fetch before we used admin hardcode                               
                        ca: "ca1", // Auto fetch
                        timestamp: {
                            seconds: stub.getTxTimestamp().seconds.high.toString() + stub.getTxTimestamp().seconds.low.toString(),    // Auto fetch
                            nanos: stub.getTxTimestamp().nanos.toString()       // Auto fetch
                        },
                        txId: stub.getTxID(),			// Auto fetch
                        backLink: args[6]
                    };
                    console.info('+++++++++++++++++++++++++++++++++++++++')
                    console.log(proofofex.issuedByUser)

                    await stub.putState(args[0], Buffer.from(JSON.stringify(proofofex)));

                    console.log('txid: ' + proofofex.txId); // for ease of access during testing

                    let indexName = 'txid~ver~hash1~hash2~file~filetype~doctype~issuedto~issuedorg~issuedorguser~ca~sec~nanos~bklnk';

                    // create a ket for txid based searches
                    let txidNameIndexKey = await stub.createCompositeKey(indexName, [proofofex.txId, 
                                                                                        proofofex.assetVersion,
                                                                                        proofofex.sha256Hash, 
                                                                                        proofofex.sha1Hash,
                                                                                        proofofex.fileName, 
                                                                                        proofofex.fileType,
                                                                                        proofofex.documentType,
                                                                                        proofofex.issuedTo, 
                                                                                        proofofex.issuedByOrg,
                                                                                        proofofex.issuedByUser,
                                                                                        proofofex.ca,
                                                                                        proofofex.timestamp.seconds,
                                                                                        proofofex.timestamp.nanos],
                                                                                        proofofex.backLink);                                                                            
                    if(!txidNameIndexKey.length <= 0 )
                    {                    
                        console.log(txidNameIndexKey);

                        let value = 'xx'; // dummy value
                    
                        await stub.putState(txidNameIndexKey, Buffer.from(value));
                    }
                    else
                        throw new Error(txidNameIndexKey + 'error creating compositekey');                
                }
                else	
                    throw new Error(hash + ' already exist: Try with other file.');           

            }// if validations
            else
                throw new Error('Invalid arguments passed: Try again.');               
       // }// if cid
       // else
        //    throw new Error('User doesnt have required access to execute this function');
                
        console.info('============= Recording new proof Done ===========');
    }     
