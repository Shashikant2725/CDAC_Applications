/* Allows to perform complex query based on the txid value. Returns record for specific txid */
/* Access Control: Reader and Writer */
async queryProofOfExByTxid(stub, args) {

    console.info('=========== Quering records by TXID ===========');

    if (args.length != 1) {
        throw new Error('Incorrect number of arguments. Expecting TXID');
    } else if (args[0].length != 64) // loose validation of txid
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

    while (true) {
        let res = await resultsIterator.next();
        if (res.value) {

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