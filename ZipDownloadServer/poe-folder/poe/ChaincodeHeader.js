const shim = require('fabric-shim');
const util = require('util');
const ClientIdentity = require('fabric-shim').ClientIdentity; // access control module
var validator = require('validator');
const validFilename = require('valid-filename');

let Chaincode = class {

    // initialize the chaincode
    async Init(stub) {
        console.info('=========== Instantiated proof of existence chaincode ===========');
        return shim.success();
    }

    /* Will invoke a specific function requested by the user. All the supported functions can be invoked from here.*/
    /*Access Control: None*/
    async Invoke(stub) {

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
    async initPoeLedger(stub, args) {

        if (args.length != 1) {
            throw new Error('Invalid args. Expects no args');
        }

        console.info('============= initLedger Ledger Done ===========');
    }
}