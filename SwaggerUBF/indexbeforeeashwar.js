const express = require('express');
const cors = require('cors')
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { makeEquipment, wholesalerDistribute, pharmacyReceived, createUser, createProduct, orderProduct, sendToDistributer,sellToConsumer, manufactureDrug,registerPatient,drugApprovalByAuthority,patientApprovalByDoctor} = require('./supplychaindomaintest')


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


// var options = {
//     customCss: ".topbar-wrapper img {content:url('https://www.infosecawareness.in/img/Logo/cdac-new.png');height : 100px;width :100px} .swagger-ui .topbar { background-color: #008CBA ; padding: 10px 0;}" ,
//         explorer: true,
//         customSiteTitle: "CDAC Hyderabad",
//         customfavIcon: "/assets/favicon.ico",
//         customJs: '/custom.js'
//     validatorUrl: null
//   };
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/assets', express.static('assets'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


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
 * /manufactureDrug:
 *  post:
 *   summary: 'API Testing for the ImanufactureDrug for Drug Tracking'
 *   description: 'Manufactures drug based on the disease that are associated with specific signs and symptoms'
 *   
 *   tags: [DrugTracking]
 *   parameters:
 *    
 *    - in: header
 *      name: Name
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Name of the Drug'
 *      example: 'Dolo'
 *    - in: header
 *      name: type
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Type of the Drug'
 *      example: 'Antibiotic'
 *    - in: header
 *      name: Amount
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Amount'
 *      example: '200'
 *    - in: header
 *      name: Chemname
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Chemical Name'
 *      example: 'Sulphatemethyne'
 *    - in: header
 *      name: Nature
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Nature of the Drug'
 *      example: 'painkiller'
 *    - in: header
 *      name: Supplier
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Suppelier of the Drug'
 *      example: 'BioPharma'
 *    - in: header
 *      name: Ulabel
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Universal Label'
 *      example: 'UL132243'
*    - in: header
 *      name: Sides
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Sides Effects'
 *      example: 'sleep'
 *    - in: header
 *      name: Storage
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Storage Area'
 *      example: 'ice'
 *   responses:
 *    200:
 *     description: 'manufactureDrug evaluation result'
 *    500:
 *     description : error
 */
 app.post("/manufactureDrug", manufactureDrug);



/**
 * @swagger
 * /registerPatient:
 *  post:
 *   summary: 'API Testing for the Register Patient for  Drug Tracking'
 *   description: 'Patient will register with his details and disease symptoms'
 *   
 *   tags: [DrugTracking]
 *   parameters:
 *    
 *    - in: header
 *      name: Fname
 *      schema:
 *       type: string
 *      required: true
 *      description: 'First Name'
 *      example: 'Rama'
 *    - in: header
 *      name: Lname
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Last Name'
 *      example: 'Rao'
 *    - in: header
 *      name: Age
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Age'
 *      example: '26'
 *    - in: header
 *      name: Email
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Email-Id'
 *      example: 'ramarao@gmail.com'
 *    - in: header
 *      name: Address
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Address'
 *      example: 'Hyderabad'
 *    - in: header
 *      name: Condition
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Symptoms of disease'
 *      example: 'Fever'
 *   responses:
 *    200:
 *     description: 'register Patient evaluation result'
 *    500:
 *     description : error
 */


 app.post("/registerPatient", registerPatient);



/**
 * @swagger
 * /drugApprovalByAuthority:
 *  post:
 *   summary: 'API Testing for the Drug Approval By Authority for Drug Tracking'
 *   description: 'Standard authority approves the drug based on the rules'
 *   
 *   tags: [DrugTracking]
 *   parameters:
 *    
 *    - in: header
 *      name: Drugid
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Drug Id'
 *      example: 'Drug1'
 *    - in: header
 *      name: Status
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Status'
 *      example: 'Approved'
 *    - in: header
 *      name: Agency
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Agency Name'
 *      example: 'Central Drugs Standard Control Organisation(CDSCO)'
 *   responses:
 *    200:
 *     description: 'drugApprovalByAuthority evaluation result'
 *    500:
 *     description : error
 */
 app.post("/drugApprovalByAuthority", drugApprovalByAuthority);



/**
 * @swagger
 * /patientApprovalByDoctor:
 *  post:
 *   summary: 'API Testing for the Patient Approval By Doctor for Drug Tracking'
 *   description: ':Doctor gets the request from patient for specific disease, based of the patient symtoms he will prescribe the approved drug'
 *   
 *   tags: [DrugTracking]
 *   parameters:
 *    
 *    - in: header
 *      name: PatientId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Patient Id'
 *      example: 'Patient1'
 *    - in: header
 *      name: DrugId
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Drug Id'
 *      example: 'Drug1'
 *    - in: header
 *      name: Status
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Approval Status'
 *      example: 'Approved'
 *    - in: header
 *      name: Designation
 *      schema:
 *       type: string
 *      required: true
 *      description: 'Designation of Approval'
 *      example: 'Doctor'
 *   responses:
 *    200:
 *     description: 'Patient Approval By Doctor evaluation result'
 *    500:
 *     description : error
 */
 app.post("/patientApprovalByDoctor", patientApprovalByDoctor);


app.listen(4444, () => {
    console.log("server listening in port 4444");
})
