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