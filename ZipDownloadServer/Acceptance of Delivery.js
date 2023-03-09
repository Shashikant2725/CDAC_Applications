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
}
