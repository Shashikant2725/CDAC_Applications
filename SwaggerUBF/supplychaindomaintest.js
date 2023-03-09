////////////////---------------Late Delivery And Penalty Function starts here--------////////////

exports.LateDeliveryAndPenalty= async(req,res)=>{
    try {
    
        var Result = {}
        var diffDateGlobal;
        var penaltyGlobal;
        var amountGlobal;
        const penaltyPercentage=Number(req.headers.penaltypercentage);
        //Result.type=typeof penaltyPercentage;
        const goodsValue=Number(req.headers.goodsvalue);
        const maxPercentage=Number(req.headers.maxpercentage);
        const terminationDays=Number(req.headers.terminationdays);

        function checkNumbers(...args) {
            var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
            if (!all_numbers) 
            res.status(500).json("Provide integer input");
          } 
            checkNumbers(goodsValue,maxPercentage,penaltyPercentage);

        function checkWholeNumbers(...args) {
            var all_numbers = args.every(a =>typeof a == 'number' && a % 1 == 0);
            if (all_numbers) {
          } else{
            //throw new Error("Input provided for terminationDays is not an whole number");
            res.status(500).json("Input provided for terminationDays is not an whole number");
          }
        }
        checkWholeNumbers(terminationDays);

        if(goodsValue<=0 || terminationDays<=0 )
            res.status(500).json(" Provide a valid input for goodsValue/terminationDays ");

        if(maxPercentage<0 || penaltyPercentage<0 )
            res.status(500).json(" Provide a positive input for maxPercentage/penaltyPercentage ");


        const date1 = new Date();
        function isValidDate(date) {
            var temp = date.replace(/-/g,'/');
            var temp = temp.split('/');
                var d = new Date(temp[0] + '/' + temp[1] + '/' + temp[2]);
                 if(!(d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0])))
                 //throw new Error("Provide correct date format");
                 res.status(500).json("Provide correct date format yyyy-mm-dd");
        }
           isValidDate(req.headers.agreeddeliverydate);

        const date2 = new Date(req.headers.agreeddeliverydate);
        

        if(date2>date1){
            res.status(500).json("Cannot exercise late delivery before delivery date");
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


/////////////////--------------Volume Discount Function Starts here--------------////////////////

exports.VolumeDiscount= async(req,res)=>{
    let firstVolume =  Number(req.headers.firstvolume);
    let secondVolume =  Number(req.headers.secondvolume),
    firstRate =  Number(req.headers.firstrate),
    secondRate =Number(req.headers.secondrate),
    thirdRate =  Number(req.headers.thirdrate);
    let costofGoods=Number(req.headers.costofgoods);
    let maxDiscount=90;

    function checkNumbers(...args) {
        var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
        if (!all_numbers) 
        res.status(500).json("Provide integer input");
      } 
      checkNumbers(firstVolume,secondVolume,firstRate,secondRate,thirdRate,costofGoods);

        if(costofGoods<=0)
            res.status(500).json(" Provide a valid input for costofGoods ");
        
        if(firstVolume<secondVolume)
            res.status(500).json(" firstVolume should be greater than secondVolume ");

        if(firstVolume<0 || secondVolume<0 || firstRate<0 || secondRate<0 || thirdRate<0 )
            res.status(500).json(" Provide a positive input for Volume/Rate ");
        
        if(!(firstRate>=secondRate&&secondRate>=thirdRate))
            res.status(500).json(" Provide a valid input firstRate>=secondRate>=thirdRate ");

        if(maxDiscount< firstRate || maxDiscount< secondRate || maxDiscount< thirdRate)
            res.status(500).json("Discount should not be greater than 90% ");

        var dateTime=new Date().toLocaleString().replace(',','');


    var Result = {}
    Result.dateAndTime=dateTime;
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
/////////////////--------------Volume Discount Function Ends here--------------////////////////


/////////////////--------------Quantity Discount Function Starts here--------------////////////////

exports.QuantityDiscount= async(req,res)=>{

try{
    let netQuantity = Number(req.headers.netquantity);
    let unitPrice = Number(req.headers.unitprice);
    let firstQuantity =  Number(req.headers.firstquantity);
    let secondQuantity =  Number(req.headers.secondquantity),
    firstDiscount =  Number(req.headers.firstdiscount),
    secondDiscount = Number(req.headers.seconddiscount),
    thirdDiscount =  Number(req.headers.thirddiscount);
    let maxDiscount=90;

    function checkNumbers(...args) {
        var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
        if (!all_numbers) 
        res.status(500).json("Provide integer input");
      } 
      checkNumbers(firstQuantity,secondQuantity,firstDiscount,secondDiscount,thirdDiscount,netQuantity,unitPrice);

        if(netQuantity<=0 || unitPrice<=0)
            res.status(500).json(" Provide a valid input for netQuantity ");
        
            let costofGoods=netQuantity*unitPrice; 

        if(firstQuantity<secondQuantity)
            res.status(500).json(" firstQuantity should be greater than secondQuantity ");

        if(firstQuantity<0 || secondQuantity<0 || firstDiscount<0 || secondDiscount<0 || thirdDiscount<0 )
            res.status(500).json(" Provide a positive input for Quantity/Discount ");
        
        if(!(firstDiscount>=secondDiscount&&secondDiscount>=thirdDiscount))
            res.status(500).json(" Provide a valid input firstDiscount>=secondDiscount>=thirdDiscount ");

        if(maxDiscount< firstDiscount || maxDiscount< secondDiscount || maxDiscount< thirdDiscount)
            res.status(500).json("Discount should not be greater than 90% ");

        var dateTime=new Date().toLocaleString().replace(',','');


    var Result = {}
    Result.dateAndTime=dateTime;
    if(netQuantity>=firstQuantity){

        Result.you_got_discount_of=netQuantity*(firstDiscount*0.01);
        Result.discount_amount_is=costofGoods*(firstDiscount*0.01);
        Result.amount_after_discount=costofGoods*(1-firstDiscount*0.01);
        res.send(Result)
    }
    else
    if(netQuantity>=secondQuantity){
        
        Result.you_got_discount_of=netQuantity*(secondDiscount*0.01);
        Result.discount_amount_is=costofGoods*(secondDiscount*0.01);
        Result.amount_after_discount=costofGoods*(1-secondDiscount*0.01);
        res.send(Result);
    }
    else{
        Result.you_got_discount_of=netQuantity*(thirdDiscount*0.01);
        Result.discount_amount_is=costofGoods*(thirdDiscount*0.01);
        Result.amount_after_discount=costofGoods*(1-thirdDiscount*0.01);
        res.send(Result);
    }

    }
 catch(error) {
    res.status(500).json(error);
        }  
}
/////////////////--------------Volume Discount Function Ends here--------------////////////////


/////////////////--------------Acceptance of Delivery Function Starts here--------------////////////////

exports.AcceptanceOfDelivery= async(req,res)=>{
    try {
    
        const ExpectedDeliveryDate=req.headers.agreeddeliverydate;
        const BussinessDays=Number(req.headers.businessdays);

        function checkWholeNumbers(...args) {
            var all_numbers = args.every(a =>typeof a == 'number' && a % 1 == 0);
            if (all_numbers) {
          } else{
            res.status(500).json("Input provided for BussinessDays  is not an whole number");
          }
        }
          checkWholeNumbers(BussinessDays);

        var Result = {};
        let status;
        const date1 = new Date();
        const date2 = new Date(ExpectedDeliveryDate);
        if(date2>date1){
            res.status(500).json("delivered the goods before agreedDelivey");
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


exports.FragileGoods= async(req,res)=>{
        let accelerationMin=Number(req.headers.accelerationmin);
        let accelerationMax=Number(req.headers.accelerationmax);
        let accelerometerReadings=req.headers.accelerometerreadings;
        let accelerationBreachPenalty=Number(req.headers.accelerationbreachpenalty);
        let costofGoods=Number(req.headers.costofgoods);
        var shocks=0;
        let totalPenalty=0;
        let payableAmount=0;
        let result=accelerometerReadings.split(" ");
        let resu=[];
        var Result = {};

        function checkNumbers(...args) {
            var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
            if (!all_numbers) 
            res.status(500).json("Provide integer input");
          } 
            checkNumbers(accelerationMin,accelerationMax,costofGoods,accelerationBreachPenalty);


        for(let a=0;a<result.length;a++)
        {
            checkNumbers(Number(result[a]));  
            resu.push(parseInt(result[a]));
        }
    resu.forEach(function(accelerate)
    {
        if(accelerate>accelerationMax |accelerate<accelerationMin)
            shocks++;
    });

    if(costofGoods<=0 )
    res.status(500).json(" Provide a valid input for costofGoods ");

    if(accelerationBreachPenalty<0 )
    res.status(500).json(" Provide a valid input for accelerationBreachPenalty ");
    
    totalPenalty=shocks*accelerationBreachPenalty;
    payableAmount=costofGoods-totalPenalty;
   
   
        Result.numberofshocks=shocks,
        Result.totalPenalty=totalPenalty,
        Result.payableAmount=payableAmount,
        res.send(Result);

}

exports.PerishableGoods= async(req,res)=>{
        let minTemperature=Number(req.headers.mintemperature);
        let maxTemperature=Number(req.headers.maxtemperature);
        let minHumidity=Number(req.headers.minhumidity);
        let maxHumidity=Number(req.headers.maxhumidity);
        let penaltyFactor=Number(req.headers.penaltyfactor);
        let tempSensorReading=req.headers.tempsensorreading;
        let humSensorReading=req.headers.humsensorreading;
        let costofGoods=Number(req.headers.costofgoods);
        var amount_to_be_paid=0;
        var total_penalty=0;
        var temperature_penalty=0;
        var humidity_penalty=0;
        var Result = {};
        
        function checkNumbers(...args) {
            var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
            if (!all_numbers) 
            res.status(500).json("Provide integer input");
          } 
            checkNumbers(minTemperature,maxTemperature,minHumidity,maxHumidity,penaltyFactor,costofGoods);

        if(costofGoods<=0 )
        res.status(500).json(" Provide a valid input for costofGoods ");
    
        if(penaltyFactor<0 )
        res.status(500).json(" Provide a valid input for penaltyFactor ");
// Auxiliary function calculating penalty from temperature readings
function CalculateTempPenalty(minTemperature,maxTemperature,penaltyFactor,tempSensorReading)
{
    let result=tempSensorReading.split(" ");
    let resu=[];
    for(let a=0;a<result.length;a++)
    {
        checkNumbers(Number(result[a]));
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
        checkNumbers(Number(result[a]));
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

exports.LateInvoicePayment= async(req,res)=>{
 
    const Result={};

    try {

        const invoiceAmountDue = Number(req.headers.invoiceamountdue);
        const lateInterestRate =Number(req.headers.lateinterestrate);

        function checkNumbers(...args) {
            var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
            if (!all_numbers) 
            res.status(500).json("Provide integer input");
          } 
            checkNumbers(lateInterestRate,invoiceAmountDue);

        function isValidDate(date) {
            var temp = date.replace(/-/g,'/');
            var temp = temp.split('/');
                var d = new Date(temp[0] + '/' + temp[1] + '/' + temp[2]);
                 if(!(d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0])))
                 //throw new Error("Provide correct date format");
                 res.status(500).json("Provide correct date format yyyy-mm-dd");
        }
           isValidDate(req.headers.invoiceduedate);

           isValidDate(req.headers.invoicereceiveddate);


        if(invoiceAmountDue<=0 )
            res.status(500).json(" Provide a valid input for invoiceAmountDue ");
    
        if(lateInterestRate<0 )
            res.status(500).json(" Provide a valid input for lateInterestRate ");

            const invoiceDueDate = new Date(req.headers.invoiceduedate);
            const invoiceReceivedDate = new Date(req.headers.invoicereceiveddate);


        const difftime = Math.abs(invoiceReceivedDate - invoiceDueDate);
        const diffDay = Math.round(difftime / (1000 * 60 * 60 * 24));
        let lateInterestRateAmount=0;
        let totalAmount=0;
            if (invoiceDueDate < invoiceReceivedDate) {
                        lateInterestRateAmount = ((lateInterestRate / 100) * invoiceAmountDue * diffDay);
                        totalAmount=lateInterestRateAmount+parseInt(invoiceAmountDue);
                    }
                 else  {
                    totalAmount=invoiceAmountDue;
                }
                Result.diffDay=diffDay;
                Result.totalAmountPayable=totalAmount;
                Result.total_latePayment_Penalty=lateInterestRateAmount;


            res.send(Result);
        }
     catch (error) {
        console.log(error);
    }
}

/////////////////-------------------Late Invoice Payment Function ends here---------------//////////////////

////////////////-------------------Purchace Order Failure Function starts here---------------////////////////////////////

exports.PurchaseOrderFailure=async(req,res)=>{
    try {
    const previousFailures = Number(req.headers.previousfailures);
    const maxFailures=Number(req.headers.maxfailures);
    const Amount=Number(req.headers.amount);
    const failurePenalty=Number(req.headers.failurepenalty);

              function checkWholeNumbers(...args) {
                var all_numbers = args.every(a =>typeof a == 'number' && a % 1 == 0);
                if (all_numbers) {
              } else{
                res.status(500).json("Input provided for maxFailures/previousFailures  is not an whole number");
              }
            }
              checkWholeNumbers(maxFailures,previousFailures);

    if(previousFailures<0 || failurePenalty<0 )
            res.status(500).json(" Provide a valid input for previousFailures/failurePenalty");
    
    if(maxFailures<=0 || Amount<=0 )
            res.status(500).json(" Provide a valid input for maxFailures/Amount ");


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


////////////////-------------------Monthly Installment Function starts here---------------////////////////////////////

exports.MonthlyInstallment=async(req,res)=>{
    try {
    const amount = Number(req.headers.amount);
    const rate=Number(req.headers.rate);
    const months=Number(req.headers.months);

    function checkNumbers(...args) {
        var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
        if (!all_numbers) 
        res.status(500).json("Provide integer input");
      } 
        checkNumbers(amount,rate,months);

    if(amount<=0 || months<=0 )
            res.status(500).json(" Provide a valid input for amount/months");
    
    if(rate<0 )
            res.status(500).json(" Provide a valid input for rate ");


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
         res.send(Result);
    }
    catch (error) {
        console.log(error);
    }
}
 
/////////////////------------------Monthly Installment Function ends here------------/////////////////

////////////////-------------------Installment Sale Function starts here---------------////////////////////////////

exports.InstallmentSale=async(req,res)=>{
    try {
    const principal = Number(req.headers.principal);
    const rate=Number(req.headers.rate);
    const years=Number(req.headers.years);

    function checkNumbers(...args) {
        var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
        if (!all_numbers) 
        res.status(500).json("Provide integer input");
      } 
        checkNumbers(principal,rate,years);

    if(rate<0)
            res.status(500).json(" Provide a valid input for principal");
    
    if(principal<=0 || years<=0 )
            res.status(500).json(" Provide a valid input for rate/years ");


    const Result={};
    var interest = rate / 100 / 12;
    var payments = years * 12;

    // Now compute the monthly payment figure, using esoteric math.
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal*x*interest)/(x-1);

      // This simple method rounds a number to two decimal places.
    function round(x) {
    return Math.round(x*100)/100;
    }
    
    // Check that the result is a finite number. If so, display the results.
    if (!isNaN(monthly) && 
        (monthly != Number.POSITIVE_INFINITY) &&
        (monthly != Number.NEGATIVE_INFINITY)) {

        let payment= round(monthly);
       let total= round(monthly * payments);
       let totalinterest = round((monthly * payments) - principal);
         Result.monthly_Installment_Amount=payment;
         Result.total_Amount=total;
         Result.total_interest_Amount=totalinterest;
         res.send(Result);
    }
}
    catch (error) {
        console.log(error);
    }
}
 
/////////////////------------------Currency Converter Function ends here------------/////////////////


exports.CurrencyConverter=async(req,res)=>{
    try {
    const fromCurrency =req.headers.fromcurrency;
    const toCurrency=req.headers.tocurrency;
    const Value=req.headers.value;
    if(Value<0)
            res.status(500).json(" Provide a valid input for value");

    const Result={};
 
const fetch = require('node-fetch');

let url = "https://api.exchangerate-api.com/v4/latest/USD";

let settings = { method: "Get" };


getResults();

function getResults() {
	fetch(url, settings)
		.then(currency => {
			return currency.json();
		}).then(displayResults);
	
}
// display results after convertion
function displayResults(currency) {
	let fromRate = currency.rates[fromCurrency];
	let toRate = currency.rates[toCurrency];
	finalValue =((toRate / fromRate) * Value).toFixed(2);

        Result.from_Rate=fromRate;
         Result.to_Rate=toRate;
         Result.final_Value=finalValue;
         res.send(Result);
    }

 }
    catch (error) {
        console.log(error);
    }
}
 
/////////////////------------------Currency Converter Function ends here------------/////////////////