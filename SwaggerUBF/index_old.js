const express = require('express');
const cors = require('cors')
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { makeEquipment, wholesalerDistribute, pharmacyReceived, createUser, createProduct, orderProduct, sendToDistributer,sellToConsumer, createDrug,createCust,verifyUpdateDrugByGovt,approveCust} = require('./supplychaindomaintest')


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Generic APIs for Testing Functionality',
            // version:'1.0.0',
            // description: 'Generic APIs for testing functionalities of supplychain domain',
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["index.js"]
}


var options = {
    customCss: ".topbar-wrapper img {content:url('https://www.infosecawareness.in/img/Logo/cdac-new.png');height : 100px;width :100px} .swagger-ui .topbar { background-color: #619e97 ; padding: 10px 0;}" ,
        explorer: true,
        customSiteTitle: "CDAC Hyderabad",
        customfavIcon: "/assets/favicon.ico",
        // customJs: '/custom.js'
    // validatorUrl: null
  };
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/assets', express.static('assets'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));


var corsOptions = {
    origin: 'http://cdac.in',
    optionSuccessStatus: 200
}

app.use(express.json());


/**
 * @swagger
 * /makeEquipment:
 *  post:
 *   summary: 'API Testing for makeEquipment for PharmaLedger Domain'
 *   description: 'manufacture makes different types of equipment which are used in pharma.'
 *   tags: [PharmaLedger]
 *   parameters:
 *    
 *    - in: header
 *      name: Manufacturer
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Name of the manufacturer'
 *      example: 'Dr.Reddys'
 *    - in: header
 *      name: EquipmentNumber
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Enter equipment number'
 *      example: 'DV101'
 *    - in: header
 *      name: EquipmentName
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Enter equipment name'
 *      example: 'ventilator'
 *    - in: header
 *      name: OwnerName 
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Enter owner name'
 *      example: 'Dr.Reddys'
 *   responses:
 *    200:
 *     description: 'makeEquipment evaluation result'
 *    500:
 *     description : error
 */
app.post("/makeEquipment", makeEquipment);

/**
 * @swagger
 * /wholesalerDistribute:
 *  post:
 *   summary: 'API Testing for wholesalerDistribute for PharmaLedger Domain'
 *   description: 'In this a group of people, preferably referred to as the wholesale distributor, which buys products in bulk from the manufacturers only to redistribute the products, most commonly to retailers.'
 *   
 *   tags: [PharmaLedger]
 *   parameters:
 *    
 *    - in: header
 *      name: EquipmentNumber
 *      schema:
 *       type: string
 *      required: true
 *      description: 'equipment number'
 *      example: 'DV101'
 *    - in: header
 *      name: OwnerName
 *      schema:
 *       type: string
 *      required: true
 *      description: 'owner name'
 *      example: 'Delivery'
 *   responses:
 *    200:
 *     description: 'wholesalerDistribute evaluation result'
 *    500:
 *     description : error
 */
app.post("/wholesalerDistribute", wholesalerDistribute);

/**
 * @swagger
 * /pharmacyReceived:
 *  post:
 *   summary: 'API Testing for pharmacyReceived for PharmaLedger Domain'
 *   description: 'pharmacy receives the equipment from distributor.'
 *   
 *   tags: [PharmaLedger]
 *   parameters:
 *    
 *    - in: header
 *      name: EquipmentNumber
 *      schema:
 *       type: string
 *      required: true
 *      description: 'equipment number'
 *      example: 'DV101'
 *    - in: header
 *      name: OwnerName
 *      schema:
 *       type: string
 *      required: true
 *      description: 'owner name'
 *      example: 'Apollo'
 *   responses:
 *    200:
 *     description: 'pharmacyReceived evaluation result'
 *    500:
 *     description : error
 */
 app.post("/pharmacyReceived", pharmacyReceived);


/**
 * @swagger
 * /createUser:
 *  post:
 *   summary: 'API Testing for the createUser for SupplyChain Domain'
 *   description: 'user will be created based on the parameters provided,user can be manufacturer,distributor or consumer'
 *  
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: UserID
 *      schema:
 *       type: string
 *      required: true
 *      description: 'User ID'
 *      example: 'cdac'
 *    - in: header
 *      name: Name
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Name'
 *      example: 'cdac'
 *    - in: header
 *      name: Email
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Email Id'
 *      example: 'cdac@gmail.com'
 *    - in: header
 *      name: UserType
 *      schema:
 *       type: string
 *      required: true
 *      description: 'User Type'
 *      example: 'manufacturer'
 *    - in: header
 *      name: Address
 *      schema:
 *       type: string
 *      required: true
 *      description: 'address'
 *      example: 'Hyderabad'
 *    - in: header
 *      name: Password
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Password'
 *      example: '*****'
 *   responses:
 *    200:
 *     description: 'createUser  evaluation result'
 *    500:
 *     description : error
 */
app.post("/createUser", createUser);



/**
 * @swagger
 * /createProduct:
 *  post:
 *   summary: 'API Testing for the createProduct for Supplychain Domain'
 *   description: 'manufacture will create the product based on the requirement'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: ProductId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Product Id'
 *      example: 'Product1'
 *    - in: header
 *      name: Name
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Name of the Product'
 *      example: 'Circuit'
 *    - in: header
 *      name: ManufacturerId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Manufacturer Id'
 *      example: 'cdac'
 *    - in: header
 *      name: Price
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Price'
 *      example: '1000'
 *    - in: header
 *      name: Status
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Status'
 *      example: 'Available'
 *   responses:
 *    200:
 *     description: 'createProduct  evaluation result'
 *    500:
 *     description : error
 */

app.post("/createProduct", createProduct);

/**
 * @swagger
 * /orderProduct:
 *  post:
 *   summary: 'API Testing for the orderProducte for Supplychain Domain'
 *   description: 'Consumer will order the available product based on his requirement'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: ProductId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Product Id'
 *      example: 'Product1'
 *    - in: header
 *      name: ConsumerId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Consumer Id'
 *      example: 'NIC'
 *   responses:
 *    200:
 *     description: 'orderProduct evaluation result'
 *    500:
 *     description : error
 */
app.post("/orderProduct", orderProduct);


/**
 * @swagger
 * /sendToDistributer:
 *  post:
 *   summary: 'API Testing for the Send To Distributer for Supplychain Domain'
 *   description: 'manufacturer will give the odrered product of consumer for delivery'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: ProductId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Product Id'
 *      example: 'Product1'
 *    - in: header
 *      name: DistributorId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Distributor Id'
 *      example: 'Delivery'
 *   responses:
 *    200:
 *     description: 'Send To Distributer  evaluation result'
 *    500:
 *     description : error
 */
 app.post("/sendToDistributer", sendToDistributer);


/**
 * @swagger
 * /sellToConsumer:
 *  post:
 *   summary: 'API Testing for the sellToConsumer for Supplychain Domain'
 *   description: 'Delivery agent will deliver the product to the consumer'
 *   
 *   tags: [Supplychain]
 *   parameters:
 *    
 *    - in: header
 *      name: ProductId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'ProductId'
 *      example: 'Product1'
 *   responses:
 *    200:
 *     description: 'Installment Sale evaluation result'
 *    500:
 *     description : error
 */
 app.post("/sellToConsumer", sellToConsumer);




/**
 * @swagger
 * /createDrug:
 *  post:
 *   summary: 'API Testing for the Installment sale for Supplychain Domain'
 *   description: 'Buyer has a provision to pay amount in monthly installments based on the principal,rate of intrest and number of years to pay'
 *   
 *   tags: [DrugTracking]
 *   parameters:
 *    
 *    - in: header
 *      name: name
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: type
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: amount
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: chemname
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: nature
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: supplier
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: ulabel
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
*    - in: header
 *      name: sides
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: storage
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *   responses:
 *    200:
 *     description: 'Installment Sale evaluation result'
 *    500:
 *     description : error
 */
 app.post("/createDrug", createDrug);



/**
 * @swagger
 * /createCust:
 *  post:
 *   summary: 'API Testing for the Installment sale for Supplychain Domain'
 *   description: 'Buyer has a provision to pay amount in monthly installments based on the principal,rate of intrest and number of years to pay'
 *   
 *   tags: [DrugTracking]
 *   parameters:
 *    
 *    - in: header
 *      name: fname
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Martin'
 *      example: '100000'
 *    - in: header
 *      name: lname
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Luther'
 *      example: '100000'
 *    - in: header
 *      name: age
 *      schema:
 *       type: string
 *      required: true
 *      description: '46'
 *      example: '100000'
 *    - in: header
 *      name: email
 *      schema:
 *       type: string
 *      required: true
 *      description: 'jjohn@gmail.com'
 *      example: '100000'
 *    - in: header
 *      name: address
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Hyderabad'
 *      example: '100000'
 *    - in: header
 *      name: condition
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Yes'
 *      example: '100000'
 *    - in: header
 *      name: doctorapproval
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Approved'
 *      example: '100000'
*    - in: header
 *      name: drugid
 *      schema:
 *       type: string
 *      required: true
 *      description: '12345'
 *      example: '100000'
 *   responses:
 *    200:
 *     description: 'Installment Sale evaluation result'
 *    500:
 *     description : error
 */


 app.post("/createCust", createCust);



/**
 * @swagger
 * /verifyUpdateDrugByGovt:
 *  post:
 *   summary: 'API Testing for the Installment sale for Supplychain Domain'
 *   description: 'Buyer has a provision to pay amount in monthly installments based on the principal,rate of intrest and number of years to pay'
 *   
 *   tags: [DrugTracking]
 *   parameters:
 *    
 *    - in: header
 *      name: drugid
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: status
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *   responses:
 *    200:
 *     description: 'Installment Sale evaluation result'
 *    500:
 *     description : error
 */
 app.post("/verifyUpdateDrugByGovt", verifyUpdateDrugByGovt);



/**
 * @swagger
 * /approveCust:
 *  post:
 *   summary: 'API Testing for the Installment sale for Supplychain Domain'
 *   description: 'Buyer has a provision to pay amount in monthly installments based on the principal,rate of intrest and number of years to pay'
 *   
 *   tags: [DrugTracking]
 *   parameters:
 *    
 *    - in: header
 *      name: customerid
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *    - in: header
 *      name: status
 *      schema:
 *       type: string
 *      required: true
 *      description: 'principal'
 *      example: '100000'
 *   responses:
 *    200:
 *     description: 'Installment Sale evaluation result'
 *    500:
 *     description : error
 */
 app.post("/approveCust", approveCust);


app.listen(4444, () => {
    console.log("server listening in port 4444");
})
