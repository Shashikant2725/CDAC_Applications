
 'use strict';
 
 const { Contract } = require('fabric-contract-api');
               
 class Chaincode extends Contract {
               
               async  AcceptanceOfDelivery(ctx,acceptanceofDeliveryId,reqOrderId,actualDeliveryDate1){
    let status="";
    const orderAsBytes = await ctx.stub.getState(reqOrderId); 
        if (!orderAsBytes || orderAsBytes.length === 0) {
            throw new Error(`${reqOrderId} does not exist`);
        }
        const order = JSON.parse(orderAsBytes.toString());
        let agreedDeliveryDate1=order.agreedDeliveryDate;
        let terminationDays1=order.terminationDays;
        //lateFee1=order.lateFee;
        let shipper1=order.shipper;
        let buyer1=order.buyer;
        order.actualDeliveryDate=actualDeliveryDate1;
        await ctx.stub.putState(reqOrderId, Buffer.from(JSON.stringify(order)));

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
    };
    await ctx.stub.putState(acceptanceofDeliveryId, Buffer.from(JSON.stringify(details)));

    return details;
}async LateDeliveryandPenalty(ctx, requestOrderId,LateDeliveryandPenaltyId,penaltyPercentage,maxPercentage) {
    const orderAsBytes = await ctx.stub.getState(requestOrderId); 
    if (!orderAsBytes || orderAsBytes.length === 0) {
        throw new Error(`${requestOrderId} does not exist`);
    }
    const order = JSON.parse(orderAsBytes.toString());
    let agreedDeliveryDate1=order.agreedDeliveryDate;
    let terminationDays1=order.terminationDays;
    let actualDeliveryDate1=order.actualDeliveryDate;
    let costofgoods=order.totalAmountPayable;

    let contractTerminated=false;
    let penalty_for_seller=0;
    let amount_to_be_paid=0;
     const date1 = new Date(actualDeliveryDate1);
     const date2 = new Date(agreedDeliveryDate1);

    
if(date2>date1){
    throw new Error("Cannot exercise late delivery before delivery date");
}
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log("Delivered after "+diffDays+" days");
let diffRatio = diffDays;
let penalty = diffRatio*(penaltyPercentage/100*costofgoods);
let maxpenalty = Math.min(penalty,maxPercentage/100*costofgoods);

        
if(diffDays>terminationDays1)
{
    contractTerminated=true;
 }

else{	

    penalty_for_seller=maxpenalty;
    amount_to_be_paid=costofgoods-maxpenalty;
}
order.ContractTerminated=contractTerminated;
order.totalAmountPayable=amount_to_be_paid;
order.delayedDays=diffDays;
order.penalty_for_delay=penalty_for_seller;
order.amount_after_lateDeliveryandPenalty=amount_to_be_paid;
let type="latedeliveryandpenalty";
await ctx.stub.putState(requestOrderId, Buffer.from(JSON.stringify(order)));
const details = {
    "LateDeliveryandPenaltyId":LateDeliveryandPenaltyId,
    "penaltyPercentage":penaltyPercentage,
    "costofGoods":costofgoods,
    "maxPercentage":maxPercentage,
    "terminationDays":terminationDays1,
    "agreedDeliveryDate":agreedDeliveryDate1,
    "actualDeliveryDate":actualDeliveryDate1,
    "contractTerminated": contractTerminated,
    "penalty_for_seller": penalty_for_seller,
    "amount_to_be_paid": amount_to_be_paid,
    "diffDays":diffDays,
    "type":type,
};
await ctx.stub.putState(LateDeliveryandPenaltyId, Buffer.from(JSON.stringify(details)));

return details;
}
    async PurchaseOrderFailure(ctx,requestOrderId,PurchaseOrderFailureId,maxFailures,previousFailures,amountFailureCompensation) {

        const orderAsBytes = await ctx.stub.getState(requestOrderId); 
        if (!orderAsBytes || orderAsBytes.length === 0) {
       throw new Error(`${requestOrderId} does not exist`);
            }
       const order = JSON.parse(orderAsBytes.toString());
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
        await ctx.stub.putState(requestOrderId, Buffer.from(JSON.stringify(order)));
        let type="purchaseorderfailure"
    const details = {
        "PurchaseOrderFailureId":PurchaseOrderFailureId,
        "costofGoods":costofGoods,
        "maxFailures":maxFailures,
        "previousFailures": previousFailures,
        "amountFailureCompensation": amountFailureCompensation,
        "payableAmount":payableAmount,
        "type":type,
    };
	await ctx.stub.putState(PurchaseOrderFailureId, Buffer.from(JSON.stringify(details)));

	return details;
    }




 }
 
 module.exports = Chaincode;
               