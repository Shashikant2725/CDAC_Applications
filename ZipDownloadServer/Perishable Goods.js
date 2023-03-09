async PerishableGoods(ctx,requestOrderId,PerishableGoodsId,minTemperature,maxTemperature,minHumidity,maxHumidity,
    penaltyFactor,tempSensorReading,humSensorReading)
{
const orderAsBytes = await ctx.stub.getState(requestOrderId); 
 if (!orderAsBytes || orderAsBytes.length === 0) {
throw new Error(`${requestOrderId} does not exist`);
     }
const order = JSON.parse(orderAsBytes.toString());
let agreedDeliveryDate1=order.agreedDeliveryDate;
let actualDeliveryDate1=order.actualDeliveryDate;
let totalAmountPayable1=order.totalAmountPayable;
const dueDate=new Date(agreedDeliveryDate1);
const date = new Date(actualDeliveryDate1);
var amount_to_be_paid=0;
var total_penalty=0;
var contractTerminated=false;
var temperature_penalty=0;
var humidity_penalty=0;

// Auxiliary function calculating penalty from temperature readings
function CalculateTempPenalty(minTemperature,maxTemperature,penaltyFactor,tempSensorReading)
{
    let result=tempSensorReading.split(" ");
    let res=[];
    for(let a=0;a<result.length;a++)
    {
        res.push(parseInt(result[a]));
    }
var count=0;
res.forEach(function(temp)
{
if (temp>maxTemperature)
count++;
else
if(temp<minTemperature)
count++;
});
count=count*penaltyFactor;
return count;

}
// Auxiliary function calculating penalty from humidity readings
function CalculateHumPenalty(minHumidity,maxHumidity,
                penaltyFactor,humSensorReading)
{
    let result=humSensorReading.split(" ");
    let res=[];
    for(let a=0;a<result.length;a++)
    {
        res.push(parseInt(result[a]));
    }
var count1=0;
res.forEach(function(hum)
{
if (hum>maxHumidity)
count1++;
else
if(hum<minHumidity)
count1++;
});
count1=count1*penaltyFactor;
return count1;
}



let terminationDays1=order.terminationDays;
const diffTime = Math.abs(dueDate - date);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log("Delivered after "+diffDays+" days");
if(diffDays>terminationDays1)
{
    amount_to_be_paid=0;
    total_penalty=0;
    contractTerminated=true;
}
else{

temperature_penalty=CalculateTempPenalty(minTemperature,maxTemperature,
penaltyFactor,tempSensorReading);
humidity_penalty=CalculateHumPenalty(minHumidity,maxHumidity,
penaltyFactor,humSensorReading);
total_penalty=temperature_penalty+humidity_penalty;
amount_to_be_paid=Math.max(totalAmountPayable1-total_penalty,0);

}
order.totalAmountPayable=amount_to_be_paid;
order.perishableGoodsPenalty=total_penalty;
order.ContractTerminated=contractTerminated;
order.amount_after_perishablePenalty=amount_to_be_paid;
await ctx.stub.putState(requestOrderId, Buffer.from(JSON.stringify(order)));
let type="perishablegoods";
const details = {
    "PerishableGoodsId":PerishableGoodsId,
    "agreedDeliveryDate":agreedDeliveryDate1,
    "actualDeliveryDate":actualDeliveryDate1,
    "minTemperature":minTemperature,
    "maxTemperature": maxTemperature,
    "minHumidity": minHumidity,
    "maxHumidity": maxHumidity,
    "penaltyFactor":penaltyFactor,
    "tempSensorReading":tempSensorReading,
    "humSensorReading":humSensorReading,
    "costofGoods":totalAmountPayable1,
    "amount_to_be_paid":amount_to_be_paid,
    "total_penalty":total_penalty,
    "contractTerminated":contractTerminated,
    "temperature_penalty":temperature_penalty,
    "humidity_penalty":humidity_penalty,
    "type":type,
};
await ctx.stub.putState(PerishableGoodsId, Buffer.from(JSON.stringify(details)));

return JSON.stringify(details); 

}  
