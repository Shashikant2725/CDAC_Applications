const express=require('express');
const cors=require('cors')


const { Gateway, Wallets } = require('fabric-network')
const path = require('path')
const fs = require('fs')
const { error } = require('console')
const app=express();


const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');
const {LateDeliveryAndPenalty,AcceptanceOfDelivery,VolumeDiscount,FragileGoods,PerishableGoods,PurchaseOrderFailure,LateInvoicePayment,QueryDetails,QueryAllDetails}=require('./supplychaindomain_copy_3')

let bodyParser = require('body-parser')

app.use(bodyParser.json())

const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'SupplyChain Domain',
            version:'1.0.0',
            description:'API for testing functionalities of supplychain domain',
            servers:["http://localhost:3000"]
        }
    },
    apis:["index_copy.js"]
}
const swaggerDocs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));


var corsOptions={
    origin:'http://cdac.in',
    optionSuccessStatus:200
}

app.use(express.json());

/**
 * @swagger
 * definitions:
 *  LateDeliveryAndPenalty:
 *   type: object
 *   properties:
 *    agreeddeliverydate:
 *     type: string
 *     description: 'The Date on which Delivery is Agreed Upon'
 *     example: '2022-1-11'
 *    goodsvalue:
 *     type: string
 *     description: 'The Value of Goods'
 *     example: '1000'
 *    penaltypercentage:
 *     type: string
 *     description: 'The Penalty Percentage for Goods on Late Delivery'
 *     example: '5'
 *    maxpercentage:
 *     type: string
 *     description: 'The Maximum Percentage of Penalty for Goods on Late Delivery'
 *     example: '15'
 *    terminationdays:
 *     type: string
 *     description: 'The Termination Days on Late Delivery'
 *     example: '10'
 *    username:
 *     type: string
 *     description: 'The Name of registered User in Chaincode'
 *     example: 'Shashikant'
 *    id:
 *     type: string
 *     description: 'The ID of Transaction.'
 *     example: '1005'
 *  AcceptanceOfDelivery:
 *   type: object
 *   properties:
 *    id:
 *     type: string
 *     description: 'The ID of Transaction'
 *     example: '1005'
 *    shipper:
 *     type: string
 *     description: 'The Name of shipper'
 *     example: 'Shashikant'
 *    buyer:
 *     type: string
 *     description: 'The Name of Buyer'
 *     example: 'Satish'
 *    terminationdays:
 *     type: string
 *     description: 'The Termination Days on Late Delivery'
 *     example: '10'
 *    username:
 *     type: string
 *     description: 'The Name of registered User in Chaincode'
 *     example: 'Shashikant'  
 *    agreeddeliverydate:
 *     type: string
 *     description: 'Date on Which Goods Delivery Expected.'
 *     example: '2022-1-1'  
 *  VolumeDiscount:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: 'The Name of Registered User in Smart Contact.'
 *     example: 'Eashwar'
 *    id:
 *     type: string
 *     description: 'The ID of Transaction'
 *     example: '1011'
 *    costofgoods:
 *     type: string
 *     description: 'Cost of Goods'
 *     example: '5'
 *    firstvolume:
 *     type: string
 *     description: 'First Volume of Goods'
 *     example: '15'
 *    secondvolume:
 *     type: string
 *     description: 'Second Volume of Goods'
 *     example: '10'
 *    firstrate:
 *     type: string
 *     description: 'First Rate of Goods'
 *     example: 'Shashikant'
 *    secondrate:
 *     type: string
 *     description: 'Second Rate of Goods'
 *     example: '1005'     
 *    thirdrate:
 *     type: string
 *     description: 'Third Rate of Goods'
 *     example: '1005' 
 *  FragileGoods:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: 'The Name of Registered User in Smart Contact.'
 *     example: 'Eashwar'
 *    id:
 *     type: string
 *     description: 'The ID of Transaction'
 *     example: '1011'
 *    accelerationmin:
 *     type: string
 *     description: 'minimum acceleration'
 *     example: '5'
 *    accelerationmax:
 *     type: string
 *     description: 'maximim acceleration'
 *     example: '15'
 *    accelerometerreadings:
 *     type: string
 *     description: 'set of accelerometer Readings'
 *     example: '["2 5 7 8 9"]'
 *    accelerationbreachpenalty:
 *     type: string
 *     description: 'acceleration Breach Penalty'
 *     example: '100'
 *    costofgoods:
 *     type: string
 *     description: 'cost of Goods'
 *     example: '10000'     
 *  PerishableGoods:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: 'Registered Username in Smart Contract'
 *     example: 'Eashwar'
 *    id:
 *     type: string
 *     description: 'Id of Transactions'
 *     example: '9999'
 *    mintemperature:
 *     type: string
 *     description: 'minimum Temperature'
 *     example: '15'
 *    maxtemperature:
 *     type: string
 *     description: 'maximum Temperature'
 *     example: '25'
 *    minhumidity:
 *     type: string
 *     description: 'minimum Humidity'
 *     example: '60'
 *    maxhumidity:
 *     type: string
 *     description: 'maximum Humidity'
 *     example: '80'
 *    penaltyfactor:
 *     type: string
 *     description: 'penalty Factor'
 *     example: '100' 
 *    tempsensorreading:
 *     type: string
 *     description: 'set of temperature Sensor Reading'
 *     example: '["15 29 30 40 17"]'  
 *    humsensorreading:
 *     type: string
 *     description: 'set of humidity Sensor Reading.'
 *     example: '["65 85 70 90 55"]'
 *    costofgoods:
 *     type: string
 *     description: 'cost of Goods'
 *     example: '10000'
 *    agreeddeliverydate:
 *     type: string
 *     description: 'agreed Delivery Date'
 *     example: '2022-1-20'
 *    actualdeliverydate:
 *     type: string
 *     description: 'actual Delivery Date'
 *     example: '2022-1-18'
 *  PurchaseOrderFailure:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: 'The Name of Registered User in Smart Contact.'
 *     example: 'Eashwar'
 *    id:
 *     type: string
 *     description: 'The ID of Transaction'
 *     example: '1011'
 *    agreeddeliverydate:
 *     type: string
 *     description: 'agreedDeliveryDate'
 *     example: '2022-1-10'
 *    actualdeliverydate:
 *     type: string
 *     description: 'actualDeliveryDate'
 *     example: '2022-1-20'
 *    costofgoods:
 *     type: string
 *     description: 'cost of Goods'
 *     example: '10000'
 *    maxfailures:
 *     type: string
 *     description: 'maximum Failures allowed'
 *     example: '5'
 *    previousfailures:
 *     type: string
 *     description: 'seller previous number of Failures'
 *     example: '3'
 *    latefee:
 *     type: string
 *     description: 'lateFee for delay'
 *     example: '100'
 *    amountfailurecompensation:
 *     type: string
 *     description: 'amount Failure Compensation'
 *     example: '1000'     
 * LateInvoicePayment:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: 'Registered Username in Smart Contract'
 *     example: 'Eashwar'
 *    id:
 *     type: string
 *     description: 'Id of Transactions'
 *     example: '9999'
 *    invoiceamountdue:
 *     type: string
 *     description: 'Due Amount'
 *     example: '500'
 *    invoiceduedate:
 *     type: string
 *     description: 'Invoice Due Date'
 *     example: '2022-1-1'
 *    invoicereceiveddate:
 *     type: string
 *     description: 'Invoice Received Date'
 *     example: '2022-1-11'
 *    maxdelay:
 *     type: string
 *     description: 'Maximum Delay'
 *     example: '10'
 *    latefee:
 *     type: string
 *     description: 'Late Fee on delivery'
 *     example: '100' 
 *   intereststartsafter:
 *     type: string
 *     description: 'Interest Rate After Due'
 *     example: '5'  
 *   lateinterestrate:
 *     type: string
 *     description: 'Late Interest Rate.'
 *     example: '200'
 * QueryDetails:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: 'Registered Username in Smart Contract'
 *     example: 'Eashwar'
 *    id:
 *     type: string
 *     description: 'Id of Transactions'
 *     example: '5000'
 * QueryAllDetails:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: 'Registered Username in Smart Contract'
 *     example: 'Eashwar'
 *   
 */

/**
 * @swagger
 * /LateDeliveryAndPenalty:
 *  post:
 *   summary: 'API Testing for the Late Delivery and Penality for Supplychain Domain'
 *   description: 'In case of delayed delivery except for Force Majeure cases,"Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however,exceed 55.0% of the total value of the Equipment involved in late delivery.If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *    - in: header
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The ID of Record to get whole Recod regarding ID.'
 *      example: '1005'
 *    - in: header
 *      name: penaltypercentage
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Penalty Percentage for Goods on Late Delivery'
 *      example: '5'
 *    - in: header
 *      name: goodsvalue
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Value of Goods'
 *      example: '1000'
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
 *    - in: header
 *      name: agreeddeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Date on which Delivery is Agreed Upon'
 *      example: '2022-1-11'
 *   
 *   responses:
 *    200:
 *     description: 'LateDeliveryAndPenalty Evaluation Result'
 *    500:
 *     description : error
 */
app.post("/LateDeliveryAndPenalty", LateDeliveryAndPenalty);



/**
 * @swagger
 * /AcceptanceOfDelivery:
 *  post:
 *   summary: 'API Testing for Acceptance of Delivery for Supplychain Domain'
 *   description: 'he Acceptance Criteria are the specifications the Widgets must meet for Party A to comply with its requirements and obligations under this agreement, detailed in Attachment X, attached to this agreement.'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *    - in: header
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The ID of Record to get whole Recod regarding ID.'
 *      example: '1005'
 *    - in: header
 *      name: shipper
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Shipper'
 *      example: 'Shashikant'
 *    - in: header
 *      name: buyer
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Buyer'
 *      example: 'Satish'
 *    
 *    - in: header
 *      name: terminationdays
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Termination Days on Late Delivery'
 *      example: '10'
 *    - in: header
 *      name: agreeddeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Date on which Delivery is Agreed Upon'
 *      example: '2022-1-11'
 *   
 *   responses:
 *    200:
 *     description: 'AcceptanceOfDelivery Evaluation Result'
 *    500:
 *     description : error
 */
 app.post("/AcceptanceOfDelivery", AcceptanceOfDelivery);

/**
 * @swagger
 * /VolumeDiscount:
 *  post:
 *   summary: 'API Testing for Volume Discount for Supplychain Domain'
 *   description: 'he Acceptance Criteria are the specifications the Widgets must meet for Party A to comply with its requirements and obligations under this agreement, detailed in Attachment X, attached to this agreement.'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *    - in: header
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The ID of Record to get whole Recod regarding ID.'
 *      example: '1005'
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Cost of Goods'
 *      example: '1000'
 *    - in: header
 *      name: firstvolume
 *      schema:
 *       type: string
 *      required: true
 *      description: 'First Voume of Goods'
 *      example: '25'
 *    
 *    - in: header
 *      name: secondvolume
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Second Volume of Goods'
 *      example: '10'
 *    - in: header
 *      name: firstrate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'First Rate of Goods'
 *      example: '10'
 *    - in: header
 *      name: secondrate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Second Rate of Goods'
 *      example: '15'
 *    - in: header
 *      name: thirdrate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Third Rate of Goods'
 *      example: '12'
 *   responses:
 *    200:
 *     description: 'VolumeDiscount Evaluation Result'
 *    500:
 *     description : error
 */
 app.post("/VolumeDiscount", VolumeDiscount);

 /**
 * @swagger
 * /FragileGoods:
 *  post:
 *   summary: 'API Testing for Volume Discount for Supplychain Domain'
 *   description: 'he Acceptance Criteria are the specifications the Widgets must meet for Party A to comply with its requirements and obligations under this agreement, detailed in Attachment X, attached to this agreement.'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *    - in: header
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The ID of Record to get whole Recod regarding ID.'
 *      example: '1005'
 *    - in: header
 *      name: accelerationmin
 *      schema:
 *       type: string
 *      required: true
 *      description: 'minimum acceleration'
 *      example: '10'
 *    - in: header
 *      name: accelerationmax
 *      schema:
 *       type: string
 *      required: true
 *      description: 'maximum acceleration'
 *      example: '25'
 *    
 *    - in: header
 *      name: accelerometerreadings
 *      schema:
 *       type: string
 *      required: true
 *      description: 'accelerometerReadings'
 *      example: '["10 15 30 40 35"]'
 *    - in: header
 *      name: accelerationbreachpenalty
 *      schema:
 *       type: string
 *      required: true
 *      description: 'acceleration Breach Penalty'
 *      example: '100'
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of Goods'
 *      example: '10000'
 *   responses:
 *    200:
 *     description: 'FragileGoods Evaluation Result'
 *    500:
 *     description : error
 */
  app.post("/FragileGoods", FragileGoods);

  /**
 * @swagger
 * /PerishableGoods:
 *  post:
 *   summary: 'API Testing for Volume Discount for Supplychain Domain'
 *   description: 'he Acceptance Criteria are the specifications the Widgets must meet for Party A to comply with its requirements and obligations under this agreement, detailed in Attachment X, attached to this agreement.'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *    - in: header
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The ID of Record to get whole Recod regarding ID.'
 *      example: '1005'
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
 *      example: '25'
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
 *      description: 'penalty Factor'
 *      example: '100'
 *    
 *    - in: header
 *      name: tempsensorreading
 *      schema:
 *       type: string
 *      required: true
 *      description: 'set of temperature Sensor Reading'
 *      example: '["10 15 30 40 35"]'
 *    - in: header
 *      name: humsensorreading
 *      schema:
 *       type: string
 *      required: true
 *      description: 'set of humidity Sensor Reading'
 *      example: '["70 65 90 85 83"]'
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of Goods'
 *      example: '10000'
 *    - in: header
 *      name: agreeddeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'agreedDeliveryDate'
 *      example: '2022-1-20'
 *    - in: header
 *      name: actualdeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'actual Delivery Date'
 *      example: '2022-1-18'
 *   responses:
 *    200:
 *     description: 'PerishableGoods Evaluation Result'
 *    500:
 *     description : error
 */
   app.post("/PerishableGoods", PerishableGoods);

 /**
 * @swagger
 * /PurchaseOrderFailure:
 *  post:
 *   summary: 'API Testing for Volume Discount for Supplychain Domain'
 *   description: 'he Acceptance Criteria are the specifications the Widgets must meet for Party A to comply with its requirements and obligations under this agreement, detailed in Attachment X, attached to this agreement.'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *    - in: header
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The ID of Record to get whole Recod regarding ID.'
 *      example: '1005'
 *    - in: header
 *      name: agreeddeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'agreed Delivery Date'
 *      example: '2022-1-10'
 *    - in: header
 *      name: actualdeliverydate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'actualDeliveryDate'
 *      example: '2022-1-20'
 *    
 *    - in: header
 *      name: costofgoods
 *      schema:
 *       type: string
 *      required: true
 *      description: 'cost of Goods'
 *      example: '10000'
 *    - in: header
 *      name: maxfailures
 *      schema:
 *       type: string
 *      required: true
 *      description: 'maximum number of Failures allowed'
 *      example: '5'
 *    - in: header
 *      name: previousfailures
 *      schema:
 *       type: string
 *      required: true
 *      description: 'previous Failures of seller'
 *      example: '3'
 *    - in: header
 *      name: latefee
 *      schema:
 *       type: string
 *      required: true
 *      description: 'late Fee for delay of goods per day '
 *      example: '100'
 *    - in: header
 *      name: amountfailurecompensation
 *      schema:
 *       type: string
 *      required: true
 *      description: 'amount Failure Compensation'
 *      example: '1000'
 *   responses:
 *    200:
 *     description: 'PurchaseOrderFailure Evaluation Result'
 *    500:
 *     description : error
 */
  app.post("/PurchaseOrderFailure", PurchaseOrderFailure);

 /**
 * @swagger
 * /LateInvoicePayment:
 *  post:
 *   summary: 'API Testing for Late Invoice Payment for Supplychain Domain'
 *   description: 'In case of delayed delivery except for Force Majeure cases,"Dan" (the Seller) shall pay to "Steve" (the Buyer) for every 2 days of delay penalty amounting to 10.5% of the total value of the Equipment whose delivery has been delayed. Any fractional part of a days is to be considered a full days. The total amount of penalty shall not however,exceed 55.0% of the total value of the Equipment involved in late delivery.If the delay is more than 15 days, the Buyer is entitled to terminate this Contract.'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *    - in: header
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The ID of Record to get whole Recod regarding ID.'
 *      example: '1005'
 *    - in: header
 *      name: invoiceamountdue
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Invoice Amount Due'
 *      example: '1000'
 *    - in: header
 *      name: invoiceduedate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Invoice Due Date'
 *      example: '2022-1-19'
 *    
 *    - in: header
 *      name: invoicereceiveddate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Invoice Received Date'
 *      example: '2022-1-11'
 *    - in: header
 *      name: maxdelay
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Maximum Delay'
 *      example: '10'
 *    - in: header
 *      name: latefee
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Late Fee on late Delivery'
 *      example: '50'
 *    - in: header
 *      name: intereststartsafter
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Interest Rate After Due'
 *      example: '10'
 *    - in: header
 *      name: lateinterestrate
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Interest Rate After Late'
 *      example: '10'
 *   responses:
 *    200:
 *     description: 'LateInvoicePayment Evaluation Result'
 *    500:
 *     description : error
 */
  app.post("/LateInvoicePayment", LateInvoicePayment);

/**
 * @swagger
 * /QueryDetails:
 *  get:
 *   summary: 'API Testing for Query Details for Supplychain Domain'
 *   description: 'We will Get All Details which is Stored in Data Base with User ID'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *    - in: header
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The ID of Record to get whole Recod regarding ID.'
 *      example: '1005'
 * 
 *   responses:
 *    200:
 *     description: 'QueryDetails Evaluation Result'
 *    500:
 *     description : error
 */
 app.get("/QueryDetails", QueryDetails);

 /**
 * @swagger
 * /QueryAllDetails:
 *  get:
 *   summary: 'API Testing for Query All Details for Supplychain Domain'
 *   description: 'We will Get All Details which is Stored in Data Base.'
 *   
 *   parameters:
 *    
 *    - in: header
 *      name: username
 *      schema:
 *       type: string
 *      required: true
 *      description: 'The Name of Registered User in Chaincode'
 *      example: 'Shashikant'
 *   
 * 
 *   responses:
 *    200:
 *     description: 'QueryDetails Evaluation Result'
 *    500:
 *     description : error
 */
  app.get("/QueryAllDetails", QueryAllDetails);


app.listen(8000,()=>{
    console.log("server listening in port 8000");
})