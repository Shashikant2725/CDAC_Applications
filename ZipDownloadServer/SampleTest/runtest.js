const fspromises = require('fs').promises
const path = require('path')

const fileOpsc= async () => {
    try{
        // Header Integration
        const header = await fspromises.readFile(path.join(__dirname,'chaincodeHeader.js'),'utf8');
        await fspromises.appendFile((path.join(__dirname),'supplychain.js'),header);
        console.log('Chaincode Header Inegrated Successfully');

        // Body Integration
        var filename='Acceptance'
        const body = await fspromises.readFile(path.join(__dirname,filename+'.js'),'utf8');
        await fspromises.appendFile((path.join(__dirname),'supplychain.js'),body);
        console.log('Chaincode Body Inegrated Successfully');

        // Footer Integration
        const footer = await fspromises.readFile(path.join(__dirname,'chaincodeFooter.js'),'utf8');
        await fspromises.appendFile((path.join(__dirname),'supplychain.js'),footer);
        console.log('Chaincode Footer Inegrated Successfully');

    } catch (err) {
        console.log(err);
    }
}
fileOpsc();