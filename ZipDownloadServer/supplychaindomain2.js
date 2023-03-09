////////////////---------------Late Delivery And Penalty Function starts here--------////////////

exports.LateDeliveryAndPenalty1= async(req,res)=>{
    try {
    
        var Result = {}
        var diffDateGlobal;
        var penaltyGlobal;
        var amountGlobal;
        const penaltyPercentage=req.headers.penaltypercentage;
        const goodsValue=req.headers.goodsvalue;
        const maxPercentage=req.headers.maxpercentage;
        const terminationDays=req.headers.terminationdays;
        const date1 = new Date();
        const date2 = new Date(req.headers.agreeddeliverydate);

        if(date2>date1){
            throw new Error("Cannot exercise late delivery before delivery date");
        }
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        let diffRatio = diffDays;
        diffDateGlobal=diffRatio;
        let penalty = diffRatio*(penaltyPercentage/100*goodsValue);
        let maxpenalty = Math.min(penalty,maxPercentage/100*goodsValue);
        if(diffDays>terminationDays)
        {
            Result.Termination = "Contract Terminated"
            res.send(Result)
        }
        else{
        penaltyGlobal=maxpenalty;
        let amount=goodsValue-maxpenalty;
        amountGlobal=amount;
        Result.Date_Difference= diffDateGlobal
        Result.Penalty = penaltyGlobal
        Result.Amount = amountGlobal
        res.send(Result)
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

/////////////////---------------Late Delivery And Penalty Function Ends here---------------////////////


exports.Discount1= async(req,res)=>{
    let firstVolume =  req.headers.firstvolume;
    let secondVolume =  req.headers.secondvolume,
    firstRate =  req.headers.firstrate,
    secondRate =  req.headers.secondrate,
    thirdRate =  req.headers.thirdrate;
    let costofGoods=req.headers.costofgoods;
    var Result = {}
  try{
    if(costofGoods>=firstVolume){
        Result.you_got_discount_of=firstRate;
        Result.discount_amount_is=costofGoods*(firstRate*0.01);
        Result.amount_after_discount=costofGoods*(1-firstRate*0.01);
        res.send(Result)
    }
    else
    if(costofGoods>=secondVolume){
        Result.you_got_discount_of=secondRate;
        Result.discount_amount_is=costofGoods*(secondRate*0.01);
        Result.amount_after_discount=costofGoods*(1-secondRate*0.01);
        res.send(Result);
    }
    else{
        Result.you_got_discount_of=thirdRate;
        Result.discount_amount_is=costofGoods*(thirdRate*0.01);
        Result.amount_after_discount=costofGoods*(1-thirdRate*0.01);
        res.send(Result);
    }
    }
 catch(error) {
    res.status(500).json(error);
        }  
}



/////////////////--------------Acceptance of Delivery Function Starts here--------------////////////////

exports.AcceptanceOfDelivery1= async(req,res)=>{
    try {
    
        const ExpectedDeliveryDate=req.headers.expectdate;
        const BussinessDays=req.headers.businessdays

        console.log(ExpectedDeliveryDate);
        console.log(BussinessDays);
        var Result = {};
        let status;
        const date1 = new Date();
        const date2 = new Date(ExpectedDeliveryDate);
        if(date2>date1){
            throw new Error("delivered the goods before agreedDelivey");
        }
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if(diffDays>BussinessDays)
        {
            
            Result.Status = "OUTSIDE_INSPECTION_PERIOD";
            res.send(Result);
        }else{
            
        
            Result.Status = "PASSED_TESTING";
            res.send(Result);
           
        }
    
    } catch (error) {
        res.status(500).json(error);
    }
}
////////////////////--------------Acceptance of Delivery Function ends here-----------------/////////////////////


exports.FragileGoods1= async(req,res)=>{
        let accelerationMin=req.headers.accelerationmin;
        let accelerationMax=req.headers.accelerationmax;
        let accelerometerReadings=req.headers.accelerometerreadings;
        let accelerationBreachPenalty=req.headers.accelerationbreachpenalty;
        let costofGoods=req.headers.costofgoods;
        var shocks=0;
        let totalPenalty=0;
        let payableAmount=0;
        let result=accelerometerReadings.split(" ");
        let resu=[];
        var Result = {};
        for(let a=0;a<result.length;a++)
        {
            resu.push(parseInt(result[a]));
        }
    resu.forEach(function(accelerate)
    {
        if(accelerate>accelerationMax |accelerate<accelerationMin)
            shocks++;
    });


    totalPenalty=shocks*accelerationBreachPenalty;
    payableAmount=costofGoods-totalPenalty;
   
   
        Result.numberofshocks=shocks,
        Result.totalPenalty=totalPenalty,
        Result.payableAmount=payableAmount,
        res.send(Result);

}

exports.PerishableGoods1= async(req,res)=>{
        let minTemperature=req.headers.mintemperature;
        let maxTemperature=req.headers.maxtemperature;
        let minHumidity=req.headers.minhumidity;
        let maxHumidity=req.headers.maxhumidity;
        let penaltyFactor=req.headers.penaltyfactor;
        let tempSensorReading=req.headers.tempsensorreading;
        let humSensorReading=req.headers.humsensorreading;
        let costofGoods=req.headers.costofgoods;
        var amount_to_be_paid=0;
        var total_penalty=0;
        var temperature_penalty=0;
        var humidity_penalty=0;
        var Result = {};

// Auxiliary function calculating penalty from temperature readings
function CalculateTempPenalty(minTemperature,maxTemperature,penaltyFactor,tempSensorReading)
{
    let result=tempSensorReading.split(" ");
    let resu=[];
    for(let a=0;a<result.length;a++)
    {
        resu.push(parseInt(result[a]));
    }
var count=0;
resu.forEach(function(temp)
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
    let resu=[];
    for(let a=0;a<result.length;a++)
    {
        resu.push(parseInt(result[a]));
    }
var count1=0;
resu.forEach(function(hum)
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

temperature_penalty=CalculateTempPenalty(minTemperature,maxTemperature,
penaltyFactor,tempSensorReading);
humidity_penalty=CalculateHumPenalty(minHumidity,maxHumidity,
penaltyFactor,humSensorReading);
total_penalty=temperature_penalty+humidity_penalty;
amount_to_be_paid=Math.max(costofGoods-total_penalty,0);


Result.temperaturePenalty=temperature_penalty;
Result.humidityPenalty=humidity_penalty;
Result.totalPenalty=total_penalty;
Result.amount_tobe_paid=amount_to_be_paid;
res.send(Result);
}  



///////////////////--------------Late Invoice Payment Function Starts here-----------------//////////////////

exports.LateInvoicePayment1= async(req,res)=>{
 
    const Result={};
    const invoiceAmountDue = parseInt(req.headers.invoiceamountdue);
    const interestStartsAfter = parseInt(req.headers.intereststartsafter);
    const maxDelay = parseInt(req.headers.maxdelay);
    const invoiceReceivedDate = new Date();
    const invoiceDueDate = new Date(req.headers.invoiceduedate);
    const lateInterestRate =req.headers.lateinterestrate;
    const lateFee =parseInt(req.headers.latefee);
    const difftime = Math.abs(invoiceReceivedDate - invoiceDueDate);
    const diffDay = Math.round(difftime / (1000 * 60 * 60 * 24));
    try {
        if (invoiceDueDate < invoiceReceivedDate) {
            if (diffDay > maxDelay) {
                if (diffDay <= interestStartsAfter) {
                    let lateAmount = lateFee * (diffDay - maxDelay);

                    totalAmount=(invoiceAmountDue + lateAmount);
                    Result.late_amount=lateAmount;
                    Result.Invoice_payment_received_after_maxdelay=diffDay;
                    Result.Total_amount_to_be_paid_Rs=totalAmount;
                    res.send(Result);
                } else if (diffDay >= interestStartsAfter) {
                    const diffTerm = Math.abs(diffDay - interestStartsAfter);
                    lateInterestRateAmount = ((lateInterestRate / 100) * invoiceAmountDue * diffTerm);
                    penalty = (invoiceAmountDue+lateInterestRateAmount)+ (diffDay - maxDelay) * lateFee;

                    Result.penalty_for_delay=(diffDay - maxDelay) * lateFee;
                    Result.buyer_have_to_pay_interest_of=diffTerm;
                    Result.Amount_for_interest_rate=lateInterestRateAmount;
                    Result.total_amount_to_be_paid_Rs=penalty;
                    res.send(Result);
                }

            } else if (diffDay <= maxDelay) {
               
                Result.Invoice_payment_is_on_time_and_received_before_maxdelay=maxDelay;
                Result.there_is_no_penalty_and_received_payment_of_Rs=invoiceAmountDue;
                res.send(Result);
            }
        } else if (invoiceDueDate > invoiceReceivedDate) {
           
            Result.Invoice_payment_is_received_in_time=invoiceAmountDue;
            res.send(Result);
        }
    } catch (error) {
        console.log(error);
    }
}

/////////////////-------------------Late Invoice Payment Function ends here---------------//////////////////

////////////////-------------------Purchace Order Failure Function starts here---------------////////////////////////////

exports.purchaseOrderFailure1=async(req,res)=>{
    try {
    const previousFailures = parseInt(req.headers.previousfailures);
    const maxFailures=parseInt(req.headers.maxfailures);
    const Amount=parseInt(req.headers.amount);
    const failurePenalty=parseInt(req.headers.failurepenalty);
    const Result={};
    if(previousFailures>maxFailures)
    {
        Result.failure_Penalty=failurePenalty;
        let finalamount=Amount-failurePenalty;
       Result.final_amount=finalamount;
       res.send(Result);
    }else{
        Result.final_amount=Amount;
        res.send(Result);
         }
    }
    catch (error) {
        console.log(error);
    }
}
 
/////////////////------------------Purchace Order Failure Function ends here------------/////////////////