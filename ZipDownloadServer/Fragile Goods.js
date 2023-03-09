async FragileGoods(ctx, requestOrderId,FragileGoodsId,accelerationMin,accelerationMax,accelerometerReadings,accelerationBreachPenalty)
    {
        var shocks=0;
        let totalPenalty=0;
        let payableAmount=0;
        let result=accelerometerReadings.split(" ");
        let res=[];
        for(let a=0;a<result.length;a++)
        {
            res.push(parseInt(result[a]));
        }
    res.forEach(function(accelerate)
    {
        if(accelerate>accelerationMax |accelerate<accelerationMin)
            shocks++;
    });

    const orderAsBytes = await ctx.stub.getState(requestOrderId); 
    if (!orderAsBytes || orderAsBytes.length === 0) {
        throw new Error(`${requestOrderId} does not exist`);
    }
    const order = JSON.parse(orderAsBytes.toString());
    let costofGoods=order.totalAmountPayable;

    totalPenalty=shocks*accelerationBreachPenalty;
    payableAmount=costofGoods-totalPenalty;
    order.fragilePenalty=totalPenalty;
    order.amount_after_fragilePenalty=payableAmount;
    order.totalAmountPayable=payableAmount;
    let type="fragilegoods";
    await ctx.stub.putState(requestOrderId, Buffer.from(JSON.stringify(order)));
    const details = {
        "FragileGoodsId":FragileGoodsId,
        "accelerationMin":accelerationMin,
        "accelerationMax":accelerationMax,
        "accelerometerReadings":accelerometerReadings,
        "accelerationBreachPenalty":accelerationBreachPenalty,
        "costofGoods":costofGoods,
        "numberofshocks":shocks,
        "totalPenalty":totalPenalty,
        "payableAmount":payableAmount,
        "type":type,
    };
	await ctx.stub.putState(FragileGoodsId, Buffer.from(JSON.stringify(details)));

	return details;

}