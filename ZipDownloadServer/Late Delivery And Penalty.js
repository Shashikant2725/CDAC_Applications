async LateDeliveryandPenalty(ctx, requestOrderId,LateDeliveryandPenaltyId,penaltyPercentage,maxPercentage) {
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
