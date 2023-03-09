
        const express = require("express");
        const bodyParser = require("body-parser");
        const dbConnect = require("./config/dbConnect");
        const cors = require("cors");
        const app = express();
        const dotenv = require("dotenv").config();
        const PORT = process.env.PORT || 6000;
        const DB = require("./config/dbConnect");
        const UserRoutes = require("./routes/userRoutes");
        // const LoginRouts = require('./routes/userRoutes')
        const { notFound, errorHandler } = require("./middleware/errorHandler");
        // const { urlencoded } = require('body-parser');
        dbConnect();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        const swaggerUi = require("swagger-ui-express");
    const swaggerFile = require("./swagger_output.json");

        
        app.use(
          cors({
            origin: "*",
          })
        ); 
app.post("/createDomain", async (req, res) => {
  console.log("Bodyyy::", req.headers);

  try {
    

    // #swagger.autoHeader=true
     // #swagger.tags = ['Supplychain']
        // #swagger.description = 'createDomain...'
    const myItem1 = req.headers.item1;

    const { item2, item3 } = req.headers;

    console.log("myItem1::", myItem1);
    console.log("item2::", item2);
    console.log("item3::", item3);
    const data={
      myItem1,
      item2,
      item3
    }

    res.json({ Result: data, success: true });
  } catch (error) {
    console.log("Error", error);
  }
});
dcscscsc
async  AcceptanceOfDelivery(ctx,acceptanceofDeliveryId,reqOrderId,actualDeliveryDate1)
{
    try{
    let status="";
    const cc1Args2 = ["GetState", reqOrderId];
    const orderAsBytes = await ctx.stub.invokeChaincode(
        "supplychaindata",
        cc1Args2,
        "mychannel"
    ); 
    if (orderAsBytes.status!=200) {
    throw new Error(`${reqOrderId} does not exist`);
    }
    const temp2 = orderAsBytes.payload.toString();
    const order=JSON.parse(temp2.toString());


        function isValidDate(date) {
            var temp = date.replace(/-/g,'/');
            var temp = temp.split('/');
                var d = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
                 if(!(d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[0]) && d.getFullYear() == Number(temp[2])))
                 throw new Error("Provide correct date format");
        }
           isValidDate(actualDeliveryDate1);

        let agreedDeliveryDate1=order.agreedDeliveryDate;
        let terminationDays1=order.terminationDays;
        //lateFee1=order.lateFee;
        let shipper1=order.shipper;
        let buyer1=order.buyer;
        order.actualDeliveryDate=actualDeliveryDate1;
        const cc1Args1 = [
            "PutState",
            reqOrderId,
            Buffer.from(JSON.stringify(order)),
        ];
        const dataAsBytes1 = await ctx.stub.invokeChaincode(
            "supplychaindata",
            cc1Args1,
            "mychannel"
        );

    const date1 = new Date(actualDeliveryDate1);
    const date2 = new Date(agreedDeliveryDate1);
    if(date2>date1){
        status="PASSED_TESTING";
        console.log("PASSED_TESTING");
    }
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays>terminationDays1)
    {
        status="OUTSIDE_INSPECTION_PERIOD";
        console.log("OUTSIDE_INSPECTION_PERIOD");
    }else{
        status="PASSED_TESTING";
        console.log("PASSED_TESTING");
    }
    let type="acceptanceofdelivery";
    var dateTime=new Date().toLocaleString().replace(',','');
    const details = {
        "acceptanceofDeliveryId":acceptanceofDeliveryId,
        "shipper":shipper1,
        "buyer":buyer1,
        "actualDeliveryDate":actualDeliveryDate1,
        "agreedDeliveryDate":agreedDeliveryDate1,
        "terminationDays":terminationDays1,
        "status":status,
        "diffDays":diffDays,
        "type":type,
        "dateTime":dateTime,
    };
    const cc1Args = [
        "PutState",
        acceptanceofDeliveryId,
        Buffer.from(JSON.stringify(details)),
    ];
    const dataAsBytes = await ctx.stub.invokeChaincode(
        "supplychaindata",
        cc1Args,
        "mychannel"
    );

    return details;
    }
    catch(error) {
        console.error(`Failed to submit transaction: ${error}`);
    }  
}

GetSampleLogic2
DeleteSampleLogic
utSampleLogic
utSampleLogic

          app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

        app.listen(PORT, "10.244.3.187");
        console.log('Server listening on 10.244.3.187'); 