
 'use strict';
 
 const { Contract } = require('fabric-contract-api');
               
 class Chaincode extends Contract {
               
               
async FragileGoods(ctx, requestOrderId,FragileGoodsId,accelerationMin,accelerationMax,accelerometerReadings,accelerationBreachPenalty)
{
    try{
        var shocks=0;
        let totalPenalty=0;
        let payableAmount=0;

        function checkNumbers(...args) {
            var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
            if (!all_numbers) 
              throw new Error("Provide integer input");
          } 
          checkNumbers(accelerationMin,accelerationMax,accelerometerReadings,accelerationBreachPenalty);

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

    const cc1Args2 = ["GetState", requestOrderId];
    const orderAsBytes = await ctx.stub.invokeChaincode(
        "supplychaindata",
        cc1Args2,
        "mychannel"
    ); 
    if (orderAsBytes.status!=200) {
    throw new Error(`${requestOrderId} does not exist`);
    }
    const temp2 = orderAsBytes.payload.toString();
    const order=JSON.parse(temp2.toString());
    let costofGoods=order.totalAmountPayable;

    if(accelerationBreachPenalty<0 )
        throw new Error(" Provide a valid input for accelerationBreachPenalty ");

    totalPenalty=shocks*accelerationBreachPenalty;
    payableAmount=costofGoods-totalPenalty;
    order.fragilePenalty=totalPenalty;
    order.amount_after_fragilePenalty=payableAmount;
    order.totalAmountPayable=payableAmount;
    let type="fragilegoods";
    var dateTime=new Date().toLocaleString().replace(',','');

    const cc1Args1 = [
        "PutState",
        requestOrderId,
        Buffer.from(JSON.stringify(order)),
    ];
    const dataAsBytes1 = await ctx.stub.invokeChaincode(
        "supplychaindata",
        cc1Args1,
        "mychannel"
    );
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
        "dateTime":dateTime,
    };
    const cc1Args = [
        "PutState",
        FragileGoodsId,
        Buffer.from(JSON.stringify(details)),
    ];
    const dataAsBytes = await ctx.stub.invokeChaincode(
        "supplychaindata",
        cc1Args,
        "mychannel"
    );

	return details;
    }
    catch(error) {
        console.error(`Failed to submit transaction: ${error}`);
    }  
}

async PerishableGoods(ctx,requestOrderId,PerishableGoodsId,minTemperature,maxTemperature,minHumidity,maxHumidity,
                penaltyFactor,tempSensorReading,humSensorReading)
{
    try{
            const cc1Args2 = ["GetState", requestOrderId];
            const orderAsBytes = await ctx.stub.invokeChaincode(
            "supplychaindata",
            cc1Args2,
            "mychannel"
            ); 
    if (orderAsBytes.status!=200) {
    throw new Error(`${requestOrderId} does not exist`);
    }
    const temp2 = orderAsBytes.payload.toString();
    const order=JSON.parse(temp2.toString()); 

            function checkNumbers(...args) {
                var all_numbers = args.every(a => typeof a == 'number' && !isNaN(a));
                if (!all_numbers) 
                  throw new Error("Provide integer input");
              } 
              checkNumbers(minTemperature,maxTemperature,minHumidity,maxHumidity,penaltyFactor,tempSensorReading,humSensorReading);

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
            
            if(penaltyFactor<0 )
                res.status(500).json(" Provide a valid input for penaltyFactor ");

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
            const cc1Args1 = [
                "PutState",
                requestOrderId,
                Buffer.from(JSON.stringify(order)),
            ];
            const dataAsBytes1 = await ctx.stub.invokeChaincode(
                "supplychaindata",
                cc1Args1,
                "mychannel"
            );
            let type="perishablegoods";
            var dateTime=new Date().toLocaleString().replace(',','');
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
                "dateTime":dateTime,
            };
          const cc1Args = [
            "PutState",
            PerishableGoodsId,
            Buffer.from(JSON.stringify(details)),
        ];
        const dataAsBytes = await ctx.stub.invokeChaincode(
            "supplychaindata",
            cc1Args,
            "mychannel"
        );

            return JSON.stringify(details); 

            }  
            catch(error) {
                console.error(`Failed to submit transaction: ${error}`);
                }  
}

async  LateInvoicePayment(ctx,requestOrderId,LateInvoicePaymentId,invoiceReceivedDate,lateInterestRate) 
{
        try {
                const cc1Args2 = ["GetState", requestOrderId];
                const orderAsBytes = await ctx.stub.invokeChaincode(
                "supplychaindata",
                cc1Args2,
                "mychannel"
                ); 
                if (orderAsBytes.status!=200) {
                throw new Error(`${requestOrderId} does not exist`);
                }
                const temp2 = orderAsBytes.payload.toString();
                const order=JSON.parse(temp2.toString());
                 let invoiceDueDate=order.actualDeliveryDate;
                let invoiceAmountDue=order.totalAmountPayable;

                function isValidDate(date) {
                    var temp = date.replace(/-/g,'/');
                    var temp = temp.split('/');
                        var d = new Date(temp[0] + '/' + temp[1] + '/' + temp[2]);
                         if(!(d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[2]) && d.getFullYear() == Number(temp[0])))
                         //throw new Error("Provide correct date format");
                         throw new Error("Provide correct date format yyyy-mm-dd");
                }
                   isValidDate(invoiceReceivedDate);

                if(lateInterestRate<0 )
                        throw new Error(" Provide a valid input for lateInterestRate ");

            const invoiceReceivedDate2 = new Date(invoiceReceivedDate);
            const invoiceDueDate2 = new Date(invoiceDueDate);
            const difftime = Math.abs(invoiceReceivedDate2 - invoiceDueDate2);
            const diffDay = Math.round(difftime / (1000 * 60 * 60 * 24));
            let lateInterestRateAmount=0;
            let totalAmount=0;
            if (invoiceDueDate2 < invoiceReceivedDate2) {
                        lateInterestRateAmount = ((lateInterestRate / 100) * invoiceAmountDue * diffDay);
                        totalAmount=lateInterestRateAmount+parseInt(invoiceAmountDue);
                    }
                 else  {
                    totalAmount=invoiceAmountDue;
                }
    
            order.totalAmountPayable=totalAmount;
            order.total_latePayment_Penalty=lateInterestRateAmount;
            const cc1Args1 = [
                "PutState",
                requestOrderId,
                Buffer.from(JSON.stringify(order)),
            ];
            const dataAsBytes1 = await ctx.stub.invokeChaincode(
                "supplychaindata",
                cc1Args1,
                "mychannel"
            );
            let type="lateinvoicepayment";
            var dateTime=new Date().toLocaleString().replace(',','');
            const details = {
                "LateInvoicePaymentId":LateInvoicePaymentId,
                "invoiceAmountDue":invoiceAmountDue,
                "invoiceDueDate":invoiceDueDate,
                "invoiceReceivedDate":invoiceReceivedDate,
                "lateInterestRate": lateInterestRate,
                "lateInterestRateAmount":lateInterestRateAmount,
                "totalAmount":totalAmount,
                "type":type,
                "dateTime":dateTime,

            };
            const cc1Args = [
                "PutState",
                LateInvoicePaymentId,
                Buffer.from(JSON.stringify(details)),
            ];
            const dataAsBytes = await ctx.stub.invokeChaincode(
                "supplychaindata",
                cc1Args,
                "mychannel"
            );
        
            return details;
    
        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
        }
}



 }
 
 module.exports = Chaincode;
               