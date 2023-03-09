async  AcceptOrder(ctx,reqOrderId,acceptOrderId,buyer,shipper,agreedDeliveryDate1,orderAccepted1){
    const orderAsBytes = await ctx.stub.getState(reqOrderId); 
        if (!orderAsBytes || orderAsBytes.length === 0) {
            throw new Error(`${reqOrderId} does not exist`);
        }
        const order = JSON.parse(orderAsBytes.toString());
        order.orderAccepted = orderAccepted1;
        order.agreedDeliveryDate=agreedDeliveryDate1;

        await ctx.stub.putState(reqOrderId, Buffer.from(JSON.stringify(order)));
    const details = {
        "acceptOrderId":acceptOrderId,
        "buyer":buyer,
        "shipper":shipper,
        "agreedDeliveryDate":agreedDeliveryDate1,
        "orderAccepted":orderAccepted1,
    };
    await ctx.stub.putState(acceptOrderId, Buffer.from(JSON.stringify(details)));

    return details;
}
