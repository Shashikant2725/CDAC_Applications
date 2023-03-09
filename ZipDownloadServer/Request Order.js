async  RequestOrder(ctx,reqOrderId,buyer,shipper,typeofGoods,numberofUnits,unitPrice,agreedDeliveryDate,terminationDays){
    let orderAccepted="no";
    let costofGoods=numberofUnits*unitPrice;
    let totalAmountPayable=costofGoods;
    let type="requestorder"
    const details = {
        "reqOrderId":reqOrderId,
        "buyer":buyer,
        "shipper":shipper,
        "typeofGoods":typeofGoods,
        "numberofUnits":numberofUnits,
        "unitPrice":unitPrice,
        "terminationDays":terminationDays,
        "agreedDeliveryDate":agreedDeliveryDate,
        //"lateFee":lateFee,
        "costofGoods":costofGoods,
        "orderAccepted":orderAccepted,
        "totalAmountPayable":totalAmountPayable,
        "type":type,
    };
    await ctx.stub.putState(reqOrderId, Buffer.from(JSON.stringify(details)));

    return details;
}