"use strict";

let express = require("express");
let bodyParser = require("body-parser");

const axios = require("axios").default;

let app = express();
app.use(bodyParser.json());
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const NodeCouchDb = require("node-couchdb");


const { error } = require("console");
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");



//server config
var buyer_Name = "cdac_hyd";
global.buyer_Name = buyer_Name;
var seller_Name = "dell_india";
global.seller_Name = seller_Name;

const user = "demo3";
global.user
const cfgpath =
    "/home/cdac/HLF-ubfagent/HLF-ubfagent/ubf/vars/profiles/sample_connection_for_nodesdk.json";
global.cfgpath
const nodeType = true;
global.nodeType
const mspId = "cdac-com";
global.mspId
const headers = {
    "Content-Type": "application/json",
    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIyOGY0YmIzNzlmZmY0OTU1ZjdlNGYxIiwiZW1haWwiOiJwb2VAY2RhYy5pbiIsImlhdCI6MTY1NzExOTEyOSwiZXhwIjoxNjU3MTI2MzI5fQ.Yz6VIDSD1dt-yKb71OhtmcaVnJaDJI_j116E8g5hNno",
};
global.headers
const ccname = "supplychain";
global.ccname
const channel = "sample";
global.channel
const dbName = "sample_supplychain";
const viewUrl = "_all_docs?include_docs=true&inclusive_end=true";
const couch = new NodeCouchDb({
    auth: {
        user: "admin",
        pass: "adminpw",
    },
    host: '10.244.1.4',
    protocol: 'http',
    port: 7005
});

app.use(cors());

function request() {
    let string1 = "Request_Order_Id_";
    var requestOrderId1 = string1.concat(uuidv4());
    global.requestOrderId = requestOrderId1;
}

function accept() {
    let string2 = "Accept_Order_Id_";
    let acceptOrderId1 = string2.concat(uuidv4());
    global.acceptOrderId = acceptOrderId1;
}

//CHECKING COUCHDB INSTANCE
couch.listDatabases().then(function(dbs) {
    console.log("dbs::", dbs);
});

// GET CALL FOR CHECKING SERVER RUNNING STATUS
app.get("/", async function(req, res) {
    try {
        console.log("SupplyChain server is Running");
        res.status(200).json({ response: "SupplyChain server is Running" });
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF ACCEPT ORDER
app.get("/AcceptedOrderDetails", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {

                const length = data.data.total_rows;
                const returnarrays = [];
                const typevalueaccept = "acceptorder";
                console.log("Accept Order Details::", data.data.rows[0]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalueaccept)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF REQUEST ORDER
app.get("/RequestOrderDetails", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "requestorder";
                console.log("Request Order Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF DISCOUNT 
app.get("/DiscountDetails", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "discount";
                console.log("Discount Order Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF LATE INVOICE
app.get("/LateInvoice", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "lateinvoicepayment";
                console.log("Late Invoide Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF LATE DELIVERY AND PENALTY
app.get("/LateDeliveryandPenalty", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "latedeliveryandpenalty";
                console.log(
                    "Late Delivery and Penalty  Details::",
                    data.data.rows[0]["doc"]
                );
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF FRAGILE GOODS
app.get("/FragileGoods", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "fragilegoods";
                console.log("FragileGoods  Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF PERISHABLE GOODS
app.get("/PerishableGoods", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "perishablegoods";
                console.log("perishablegoods  Details::", data.data.rows[0]["doc"]);
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// GET CALL FOR GET DETAILS OF PURCHASE ORDER FAILURE
app.get("/PurchaceOrderFailure", async function(req, res) {
    try {
        couch.get(dbName, viewUrl).then(
            function(data, headers, status) {
                const length = data.data.total_rows;
                console.log("Length::", length);
                const returnarrays = [];
                const typevalue = "purchaseorderfailure";
                console.log(
                    "Purchace Order Failure Details::",
                    data.data.rows[0]["doc"]
                );
                for (let i = 0; i <= length - 1; i++) {
                    if (data.data.rows[i]["doc"]["type"] == typevalue)
                        returnarrays.push(data.data.rows[i]["doc"]);
                }
                res.send(returnarrays);
            },
            function(err) {
                res.send(err);
            }
        );
    } catch (error) {
        console.log("SupplyChain server Failed to Start");
        process.exit(1);
    }
});


// POST CALL FOR REQUEST ORDER
app.post("/RequestOrder", async function(req, res) {

    request();
    var agreeDeliveryDate = req.body.agreedDeliveryDate.toString();

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "RequestOrder",
                args: [requestOrderId,
                    buyer_Name,
                    seller_Name,
                    req.body.typeofGoods,
                    req.body.numberofUnits,
                    req.body.unitPrice,
                    agreeDeliveryDate,
                    req.body.terminationDays,
                    req.body.lateFee
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR ACCEPT ORDER
app.post("/AcceptOrder", async function(req, res) {

    accept();
    var dateagd = req.body.agreedDeliveryDate.toString();

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "AcceptOrder",
                args: [requestOrderId,
                    acceptOrderId,
                    buyer_Name,
                    seller_Name,
                    dateagd,
                    req.body.orderAccepted
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR DISCOUNT
app.post("/Discount", async function(req, res) {

    let string1 = "Discount_";
    let DiscountId = string1.concat(uuidv4());

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "Discount",
                args: [requestOrderId,
                    DiscountId,
                    req.body.firstVolume,
                    req.body.secondVolume,
                    req.body.firstRate,
                    req.body.secondRate,
                    req.body.thirdRate
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR ACCEPTANCE OF DELIVERY
app.post("/AcceptanceOfDelivery", async function(req, res) {

    request();

    let string1 = "Acceptance_Of_Delivery_";
    let acceptanceofDeliveryId = string1.concat(uuidv4());
    var actualDeliveryDate = req.body.actualDeliveryDate.toString();

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "AcceptanceOfDelivery",
                args: [acceptanceofDeliveryId,
                    requestOrderId,
                    actualDeliveryDate
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR LATE DELIVERY AND PENALTY
app.post("/LateDeliveryandPenalty", async function(req, res) {

    let string1 = "LateDelivery_and_PenaltyId_"
    let LateDeliveryandPenaltyId = string1.concat(uuidv4());
    var actualDeliveryDate = req.body.actualDeliveryDate.toString();
    console.log(actualDeliveryDate)

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "LateDeliveryandPenalty",
                args: [
                    requestOrderId,
                    LateDeliveryandPenaltyId,
                    actualDeliveryDate
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR FRAGILE GOODS
app.post("/FragileGoods", async function(req, res) {

    let string1 = "Fragile_Goods_";
    let FragileGoodsId = string1.concat(uuidv4());

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "FragileGoods",
                args: [requestOrderId,
                    FragileGoodsId,
                    req.body.accelerationMin,
                    req.body.accelerationMax,
                    req.body.accelerometerReadings,
                    req.body.accelerationBreachPenalty
                ],
                ccname: ccname,
                channel: channel,
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR PERISHABLE GOODS
app.post("/PerishableGoods", async function(req, res) {

    let string1 = "Perishable_Goods_Id_";
    let PerishableGoodsId = string1.concat(uuidv4());

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "PerishableGoods",
                args: [requestOrderId,
                    PerishableGoodsId,
                    req.body.minTemperature,
                    req.body.maxTemperature,
                    req.body.minHumidity,
                    req.body.maxHumidity,
                    req.body.penaltyFactor,
                    req.body.tempSensorReading,
                    req.body.humSensorReading
                ],
                ccname: "supplychain",
                channel: "sample",
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR PURCHASE ORDER FAILURE
app.post("/PurchaseOrderFailure", async function(req, res) {

    let string1 = "Purchase_Order_Failure_";
    let PurchaseOrderFailureId = string1.concat(uuidv4());

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "PurchaseOrderFailure",
                args: [requestOrderId,
                    PurchaseOrderFailureId,
                    req.body.maxFailures,
                    req.body.previousFailures,
                    req.body.amountFailureCompensation
                ],
                ccname: "supplychain",
                channel: "sample",
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR LATE INVOICE PAYMENT
app.post("/LateInvoicePayment", async function(req, res) {

    let string1 = "Late_Invoice_Payment";
    let LateInvoicePaymentId = string1.concat(uuidv4());
    var ionvoiceRecievedDate = req.body.invoiceReceivedDate.toString();

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "LateInvoicePayment",
                args: [requestOrderId,
                    LateInvoicePaymentId,
                    ionvoiceRecievedDate,
                    req.body.maxDelay,
                    req.body.lateFee,
                    req.body.interestStartsAfter,
                    req.body.lateInterestRate
                ],
                ccname: "supplychain",
                channel: "sample",
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});


// POST CALL FOR QUERY ALL DETAILS
app.get("/QueryAllDetails", async function(req, res) {

    // AXIOS CALL TO BACKEND SERVER
    axios
        .post(
            "http://10.244.1.4:4000/fabric/v1/invokecc", {
                fcn: "QueryAllDetails",
                args: [],
                ccname: "supplychain",
                channel: "sample",
                cfgpath: cfgpath,
                user: user,
                local: nodeType,
                mspId: mspId,
            }, {
                headers: headers,
            }
        )
        .then(function(response) {
            console.log("Transaction has been submitted");
            console.log(response);
            const result = response.data;
            res.status(200).json({ result: result.result });
        })
        .catch(function(error) {
            console.log(error);
        });
});




app.listen(3000, "10.244.1.51");
console.log("SupplyChain server is  Running on http://10.244.1.51:3000");
