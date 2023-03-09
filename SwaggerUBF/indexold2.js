const express = require('express');
const cors = require('cors')
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { LateDeliveryAndPenalty, VolumeDiscount, AcceptanceOfDelivery, FragileGoods, PerishableGoods, LateInvoicePayment, PurchaseOrderFailure, MonthlyInstallment,QuantityDiscount, InstallmentSale,CurrencyConverter } = require('./supplychaindomaintest')


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SupplyChain Domain',
            // version:'1.0.0',
            description: 'Generic APIs for testing functionalities of supplychain domain',
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["index.js"]
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


var corsOptions = {
    origin: 'http://cdac.in',
    optionSuccessStatus: 200
}

app.use(express.json());


/**
 * @swagger
 * /LateDeliveryAndPenalty:
 *  post:
 *   summary: 'API Testing for the Late Delivery and Penality for Supplychain Domain'
 *   description: 'In case of delayed delivery Seller shall pay to Buyer for every day delay penalty amounting to 1% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however,exceed 50.0% of the total value of the Equipment involved in late delivery.If the delay is more than 10 days, the Buyer is entitled to terminate this Contract. By default it takes todays date as delivered date'
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: agreeddeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Date on which Delivery is Agreed Upon'
 *      example: '2022-1-11'
 *    - in: header
 *      name: goodsvalue
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Value of Goods'
 *      example: '1000'
 *    - in: header
 *      name: penaltypercentage
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Penalty Percentage for Goods on Late Delivery'
 *      example: '5'
 *    - in: header
 *      name: maxpercentage 
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Maximum Penalty Percentage for Goods on Late Delivery'
 *      example: '15'
 *    - in: header
 *      name: terminationdays
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Termination Days on Late Delivery'
 *      example: '10'
 *   responses:
 *    200:
 *     description: 'late delivery and penalty evaluation result'
 *    500:
 *     description : error
 */
app.post("/LateDeliveryAndPenalty", LateDeliveryAndPenalty);

/**
 * @swagger
 * /VolumeDiscount:
 *  post:
 *   summary: 'API Testing for the VolumeDiscount for Supplychain Domain'
 *   description: 'If goods value is more than first volume,seller is giving a discount % of firstrate.If goods value is in between first volume and second volume seller is giving a discount % of secondrate and if goods value is less than second volume seller is giving a discount % of thirdrate'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: number
 *      required: true
 *      description: 'cost of Goods'
 *      example: '10000'
 *    - in: header
 *      name: firstvolume
 *      schema:
 *       type: number
 *      required: true
 *      description: 'first Volume'
 *      example: '10000'
 *    - in: header
 *      name: secondvolume
 *      schema:
 *       type: number
 *      required: true
 *      description: 'second Volume'
 *      example: '5000'
 *    - in: header
 *      name: firstrate 
 *      schema:
 *       type: number
 *      required: true
 *      description: 'first discount Rate'
 *      example: '15'
 *    - in: header
 *      name: secondrate
 *      schema:
 *       type: number
 *      required: true
 *      description: 'second discount Rate'
 *      example: '10'
 *    - in: header
 *      name: thirdrate
 *      schema:
 *       type: number
 *      required: true
 *      description: 'third discount Rate'
 *      example: '5'
 *   responses:
 *    200:
 *     description: 'Discount evaluation result'
 *    500:
 *     description : error
 */
app.post("/VolumeDiscount", VolumeDiscount);

/**
 * @swagger
 * /QuantityDiscount:
 *  post:
 *   summary: 'API Testing for the QuantityDiscount for Supplychain Domain'
 *   description: 'If net quantity is more than first quantity,seller is giving a discount % of first discount.If net quantity is in between first quantity and second quantity seller is giving a discount % of second discount and if net quantity is less than second quantity seller is giving a discount % of third discount'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: netQuantity
 *      schema:
 *       type: number
 *      required: true
 *      description: 'net quantity'
 *      example: '100'
 *    - in: header
 *      name: unitPrice
 *      schema:
 *       type: number
 *      required: true
 *      description: 'unit Price'
 *      example: '1000'
 *    - in: header
 *      name: firstQuantity
 *      schema:
 *       type: number
 *      required: true
 *      description: 'first quantity'
 *      example: '100'
 *    - in: header
 *      name: secondQuantity
 *      schema:
 *       type: number
 *      required: true
 *      description: 'second quantity'
 *      example: '50'
 *    - in: header
 *      name: firstDiscount 
 *      schema:
 *       type: number
 *      required: true
 *      description: 'first discount Rate'
 *      example: '15'
 *    - in: header
 *      name: secondDiscount
 *      schema:
 *       type: number
 *      required: true
 *      description: 'second discount Rate'
 *      example: '10'
 *    - in: header
 *      name: thirdDiscount
 *      schema:
 *       type: number
 *      required: true
 *      description: 'third discount Rate'
 *      example: '5'
 *   responses:
 *    200:
 *     description: 'QuantityDiscount evaluation result'
 *    500:
 *     description : error
 */
 app.post("/QuantityDiscount", QuantityDiscount);


/**
 * @swagger
 * /AcceptanceOfDelivery:
 *  post:
 *   summary: 'API Testing for the Acceptance of Delivery for Supplychain Domain'
 *   description: 'The Acceptance Criteria are the specifications the Widgets must meet for Party A to comply with its requirements and obligations under this agreement, If goods received with in the termination days,buyer will accept goods otherwise contract will terminated.
 *                  By default it takes todays date as delivered date'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: ageeddeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Date on which Delivery is Agreed Upon'
 *      example: '2022-1-11'
 *    - in: header
 *      name: businessdays
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Termination Days'
 *      example: '10'
 *   responses:
 *    200:
 *     description: 'Acceptance of Delivery evaluation result'
 *    500:
 *     description : error
 */
app.post("/AcceptanceOfDelivery", AcceptanceOfDelivery);

/**
 * @swagger
 * /FragileGoods:
 *  post:
 *   summary: 'API Testing for the FragileGoods for Supplychain Domain'
 *   description: 'The Equipment to be shipped to the Buyer shall be packed and shipped in accordance with the Specifications and if not specified therein....
 *                 Additionally the Equipment should have proper devices on it to record any shock during transportation as any instance of acceleration outside the bounds of 20 and 40.
 *                 Each shock shall reduce the Contract Price by 100 rs'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: accelerationmin
 *      schema:
 *       type: string
 *      required: true
 *      description: 'minimum acceleration'
 *      example: '20'
 *    - in: header
 *      name: accelerationmax
 *      schema:
 *       type: string
 *      required: true
 *      description: 'maximum acceleration'
 *      example: '40'
 *    - in: header
 *      name: accelerometerreadings
 *      schema:
 *       type: string
 *      required: true
 *      description: 'accelero meter readings'
 *      example: '24 35 36 47 49'
 *    - in: header
 *      name: accelerationbreachpenalty
 *      schema:
 *       type: string
 *      required: true
 *      description: 'acceleration breach penalty'
 *      example: '100'
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of goods'
 *      example: '10000'
 *   responses:
 *    200:
 *     description: 'FragileGoods  evaluation result'
 *    500:
 *     description : error
 */
app.post("/FragileGoods", FragileGoods);

/**
 * @swagger
 * /PerishableGoods:
 *  post:
 *   summary: 'API Testing for the PerishableGoods for Supplychain Domain'
 *   description: 'Shipping containers used must be temperature and humidity controlled, and sensor readings must be logged at least 1 per hours.
 *                 Shipments that have a temperature or humidity reading outside the agreed range have a price penalty applied'
 *  
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: mintemperature
 *      schema:
 *       type: string
 *      required: true
 *      description: 'minimum temperature'
 *      example: '10'
 *    - in: header
 *      name: maxtemperature
 *      schema:
 *       type: string
 *      required: true
 *      description: 'maximum temperature'
 *      example: '20'
 *    - in: header
 *      name: minhumidity
 *      schema:
 *       type: string
 *      required: true
 *      description: 'minimum humidity'
 *      example: '60'
 *    - in: header
 *      name: maxhumidity
 *      schema:
 *       type: string
 *      required: true
 *      description: 'maximum humidity'
 *      example: '80'
 *    - in: header
 *      name: penaltyfactor
 *      schema:
 *       type: string
 *      required: true
 *      description: 'penalty factor'
 *      example: '100'
 *    - in: header
 *      name: tempsensorreading
 *      schema:
 *       type: string
 *      required: true
 *      description: 'temperature sensor reading'
 *      example: '10 15 18 22 23'
 *    - in: header
 *      name: humsensorreading
 *      schema:
 *       type: string
 *      required: true
 *      description: 'humidity sensor reading'
 *      example: '62 64 75 85 90 96'      
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of goods'
 *      example: '10000'
 *   responses:
 *    200:
 *     description: 'PerishableGoods  evaluation result'
 *    500:
 *     description : error
 */
app.post("/PerishableGoods", PerishableGoods);



/**
 * @swagger
 * /LateInvoicePayment:
 *  post:
 *   summary: 'API Testing for the Late Invoice Payment for Supplychain Domain'
 *   description: 'Buyer has to pay invoice amount after receiving the delivery otherwise has to pay interest rate of 1% for every day with due amount'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: invoiceduedate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Due Date to Pay The Amount'
 *      example: '2022-1-11'
 *    - in: header
 *      name: invoicereceiveddate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'invoicereceiveddate'
 *      example: '2022-1-15'
 *    - in: header
 *      name: invoiceamountdue
 *      schema:
 *       type: string
 *      required: true
 *      description: 'invoice amount due'
 *      example: '10000'
 *    - in: header
 *      name: lateinterestrate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Interest Rate for Delay'
 *      example: '1'
 *   responses:
 *    200:
 *     description: 'Late Invoice Payment  evaluation result'
 *    500:
 *     description : error
 */

app.post("/LateInvoicePayment", LateInvoicePayment);

/**
 * @swagger
 * /PurchaseOrderFailure:
 *  post:
 *   summary: 'API Testing for the Purchace Order Failure for Supplychain Domain'
 *   description: 'If previous failures of seller is grater than maximum failure then failure Penalty for seller of amount 500 rs'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: previousfailures
 *      schema:
 *       type: string
 *      required: true
 *      description: 'previous Failures of seller'
 *      example: '3'
 *    - in: header
 *      name: maxfailures
 *      schema:
 *       type: string
 *      required: true
 *      description: 'max limit of Failures'
 *      example: '5'
 *    - in: header
 *      name: amount
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of goods'
 *      example: '10000'
 *    - in: header
 *      name: failurepenalty
 *      schema:
 *       type: string
 *      required: true
 *      description: 'failure Penalty for seller'
 *      example: '500'
 *   
 *   responses:
 *    200:
 *     description: 'Late Invoice Payment  evaluation result'
 *    500:
 *     description : error
 */
app.post("/PurchaseOrderFailure", PurchaseOrderFailure);


/**
 * @swagger
 * /MonthlyInstallment:
 *  post:
 *   summary: 'API Testing for the Monthly Installment for Supplychain Domain'
 *   description: 'Buyer has a provision to pay amount in monthly installments based on the amount,rate of intrest and number of months to pay'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: amount
 *      schema:
 *       type: string
 *      required: true
 *      description: 'amount'
 *      example: '12000'
 *    - in: header
 *      name: rate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'rate'
 *      example: '10'
 *    - in: header
 *      name: months
 *      schema:
 *       type: string
 *      required: true
 *      description: 'months'   
 *      example: '12'
 *   
 *   responses:
 *    200:
 *     description: 'Monthly Installment  evaluation result'
 *    500:
 *     description : error
 */
 app.post("/MonthlyInstallment", MonthlyInstallment);


/**
 * @swagger
 * /InstallmentSale:
 *  post:
 *   summary: 'API Testing for the Installment sale for Supplychain Domain'
 *   description: 'Buyer has a provision to pay amount in monthly installments based on the principal,rate of intrest and number of years to pay'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: principal
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: rate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'rate'
 *      example: '10'
 *    - in: header
 *      name: years
 *      schema:
 *       type: string
 *      required: true
 *      description: 'years'   
 *      example: '1'
 *   
 *   responses:
 *    200:
 *     description: 'Installment Sale evaluation result'
 *    500:
 *     description : error
 */
 app.post("/InstallmentSale", InstallmentSale);


 /**
 * @swagger
 * /CurrencyConverter:
 *  post:
 *   summary: 'API Testing for the CurrencyConverter for Supplychain Domain'
 *   description: 'It converts the amount from one country currency to other country currency based on the user input amount and currency types '
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: fromcurrency
 *      schema:
 *       type: string
 *      required: true
 *      description: 'from currency'
 *      example: 'USD'
 *    - in: header
 *      name: tocurrency
 *      schema:
 *       type: string
 *      required: true
 *      description: 'to currency'
 *      example: 'INR'
 *    - in: header
 *      name: value
 *      schema:
 *       type: string
 *      required: true
 *      description: 'value'   
 *      example: '100'
 *   
 *   responses:
 *    200:
 *     description: 'Currency Converter evaluation result'
 *    500:
 *     description : error
 */
  app.post("/CurrencyConverter", CurrencyConverter);

  
app.listen(4444, () => {
    console.log("server listening in port 4444");
})
