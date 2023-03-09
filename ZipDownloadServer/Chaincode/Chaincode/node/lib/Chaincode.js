
 'use strict';
 
 const { Contract } = require('fabric-contract-api');
               
 class Chaincode extends Contract {
               
               
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


async LateDeliveryandPenalty(ctx, requestOrderId,LateDeliveryandPenaltyId,actualDeliveryDate) 
{
    try{
    const cc1Args2 = ["GetState", requestOrderId];
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
       isValidDate(actualDeliveryDate);

    let agreedDeliveryDate1=order.agreedDeliveryDate;
    let terminationDays1=order.terminationDays;
    let lateFee1=order.lateFee;
    let costofgoods=order.totalAmountPayable;

    let contractTerminated=false;
    let penalty_for_seller=0;
    let amount_to_be_paid=0;
     const date1 = new Date(actualDeliveryDate);
     const date2 = new Date(agreedDeliveryDate1);

    
    if(date2>date1){
        throw new Error("Cannot exercise late delivery before delivery date");
    }
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log("Delivered after "+diffDays+" days");
    let penalty = diffDays*lateFee1;

            
    if(diffDays>terminationDays1)
    {
        contractTerminated=true;
    }

    else{	

        penalty_for_seller=penalty;
        amount_to_be_paid=costofgoods-penalty;
    }
    order.ContractTerminated=contractTerminated;
    order.totalAmountPayable=amount_to_be_paid;
    order.delayedDays=diffDays;
    order.penalty_for_delay=penalty_for_seller;
    order.amount_after_lateDeliveryandPenalty=amount_to_be_paid;
    let type="latedeliveryandpenalty";
    var dateTime=new Date().toLocaleString().replace(',','');

    const cc1Args = [
        "PutState",
        requestOrderId,
        Buffer.from(JSON.stringify(order)),
    ];
    const dataAsBytes = await ctx.stub.invokeChaincode(
        "supplychaindata",
        cc1Args,
        "mychannel"
    );
    const details = {
        "LateDeliveryandPenaltyId":LateDeliveryandPenaltyId,
        "costofGoods":costofgoods,
        "terminationDays":terminationDays1,
        "agreedDeliveryDate":agreedDeliveryDate1,
        "actualDeliveryDate":actualDeliveryDate,
        "contractTerminated": contractTerminated,
        "penalty_for_seller": penalty_for_seller,
        "amount_to_be_paid": amount_to_be_paid,
        "diffDays":diffDays,
        "type":type,
        "dateTime":dateTime,
    };
    const cc1Args1 = [
        "PutState",
        LateDeliveryandPenaltyId,
        Buffer.from(JSON.stringify(details)),
    ];
    const dataAsBytes1 = await ctx.stub.invokeChaincode(
        "supplychaindata",
        cc1Args1,
        "mychannel"
    );

    return details;
    }
    catch(error) {
        console.error(`Failed to submit transaction: ${error}`);
        }  
}


async PurchaseOrderFailure(ctx,requestOrderId,PurchaseOrderFailureId,maxFailures,previousFailures,amountFailureCompensation) 
{
    try{
        const cc1Args2 = ["GetState", requestOrderId];
        const orderAsBytes = await ctx.stub.invokeChaincode(
        "supplychaindata",
        cc1Args2,
        "mychannel"
        ); 
        if (orderAsBytes.status!=200) {
        throw new Error(`${requestOrderId} does not exist`);
        }
        const temp2 = orderAsBytes.payload.toString();
        const order=JSON.parse(temp2.toString()); 

       
            
            function checkNumbers(...args) {
                var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
                if (!all_numbers) 
                  throw new Error("Provide integer input");
              } 
              checkNumbers(amountFailureCompensation);

              function checkWholeNumbers(...args) {
                var all_numbers = args.every(a =>typeof a == 'number' && a % 1 == 0);
                if (all_numbers) {
              } else{
                throw new Error("Input provided for maxFailures/previousFailures is not an whole number");
              }
            }
              checkWholeNumbers(maxFailures,previousFailures);

            if(previousFailures<0 || amountFailureCompensation<0 )
                    res.status(500).json(" Provide a valid input for previousFailures/amountFailureCompensation");
      
            if(maxFailures<=0)
                    res.status(500).json(" Provide a valid input for maxFailures");

       let costofGoods=order.totalAmountPayable;
            let payableAmount=0;
            if(previousFailures >maxFailures){
                payableAmount=costofGoods-amountFailureCompensation;
            }else {
                payableAmount=costofGoods;
                }
        order.totalAmountPayable=payableAmount;
        order.FailureCompensation=amountFailureCompensation;
        order.amount_after_purchaseOrderFailure=payableAmount;
        const cc1Args1 = [
            "PutState",
            requestOrderId,
            Buffer.from(JSON.stringify(order)),
        ];
        const dataAsBytes1 = await ctx.stub.invokeChaincode(
            "supplychaindata",
            cc1Args1,
            "mychannel"
        );
        let type="purchaseorderfailure"
        var dateTime=new Date().toLocaleString().replace(',','');
        const details = {
        "PurchaseOrderFailureId":PurchaseOrderFailureId,
        "costofGoods":costofGoods,
        "maxFailures":maxFailures,
        "previousFailures": previousFailures,
        "amountFailureCompensation": amountFailureCompensation,
        "payableAmount":payableAmount,
        "type":type,
        "dateTime":dateTime,
    };
    const cc1Args = [
        "PutState",
        PurchaseOrderFailureId,
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
}async  RequestOrder(ctx,reqOrderId,buyer,shipper,typeofGoods,numberofUnits,unitPrice,agreedDeliveryDate,terminationDays,lateFee)
{
    try{
        let orderAccepted="no";
        function checkNumbers(...args) {
            var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a) && a>0);
            if (!all_numbers) 
              throw new Error("Input provided for unitPrice or lateFee is not an integer");
          } 
          checkNumbers(unitPrice,lateFee);
         
        function checkWholeNumbers(...args) {
            var all_numbers = args.every(a =>typeof a == 'number' && a % 1 == 0);
            if (all_numbers) {
          } else{
            throw new Error("Input provided for numberofUnits or terminationDays is not an whole number");
          }
        }
          checkWholeNumbers(numberofUnits,terminationDays);

        function isValidDate(date) {
            var temp = date.replace(/-/g,'/');
            var temp = temp.split('/');
                var d = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
                 if(!(d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[0]) && d.getFullYear() == Number(temp[2])))
                 throw new Error("Provide correct date format");
        }
           isValidDate(agreedDeliveryDate);

        let costofGoods=numberofUnits*unitPrice;
        let totalAmountPayable=costofGoods;
        let type="requestorder"
        var dateTime=new Date().toLocaleString().replace(',','');
        const details = {
            "reqOrderId":reqOrderId,
            "buyer":buyer,
            "shipper":shipper,
            "typeofGoods":typeofGoods,
            "numberofUnits":numberofUnits,
            "unitPrice":unitPrice,
            "terminationDays":terminationDays,
            "agreedDeliveryDate":agreedDeliveryDate,
            "lateFee":lateFee,
            "costofGoods":costofGoods,
            "orderAccepted":orderAccepted,
            "totalAmountPayable":totalAmountPayable,
            "type":type,
            "dateTime":dateTime,
        };
        const cc1Args = [
            "PutState",
            reqOrderId,
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

async MonthlyInstallment(ctx,amount,rate,months)
{
    try {

    function checkNumbers(...args) {
        var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
        if (!all_numbers) 
        throw new Error("Provide integer input");
      } 
        checkNumbers(amount,rate,months);

    if(amount<=0 || months<=0 )
        throw new Error(" Provide a valid input for amount/months");
    
    if(rate<0 )
        throw new Error(" Provide a valid input for rate ");


    const Result={};

         // Calculating interest per month
	const interest = (amount * (rate * 0.01)) / months;
	
	// Calculating total payment
	const EMI = ((amount / months) + interest).toFixed(2);
	const Total=months*EMI;
    const totalinterest=interest*months;
         Result.monthly_Installment=EMI;
         Result.total_Amount=Total;
         Result.total_Interest=totalinterest;

         const cc1Args = [
            "PutState",
            amount,
            Buffer.from(JSON.stringify(Result)),
        ];
        const dataAsBytes = await ctx.stub.invokeChaincode(
            "supplychaindata",
            cc1Args,
            "mychannel"
        );

        return Result;
    }
    
    catch (error) {
        console.log(error);
    }
}





 }
 
 module.exports = Chaincode;
               