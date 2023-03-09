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



// POST CALL FOR ACCEPT ORDER
app.post("/createAsset", async function(req, res) {

    // AXIOS CALL TO BACKEND SERVER
    const assetArgs={
        key:req.body.key,
        publicMutableData:req.body.publicMutableData,
        privateMutableData:req.body.privateMutableData,
        publicImmutableData:req.body.publicImmutableData,
        privateImmutableData:req.body.privateImmutableData
    }
    console.log("data::",assetArgs);
    res.status(200).json({ result: assetArgs});
    // axios
    //     .post(
    //         "http://10.244.1.4:4000/fabric/v1/invokecc", {
    //             fcn: "AcceptOrder",
    //             args: [requestOrderId,
    //                 acceptOrderId,
    //                 buyer_Name,
    //                 seller_Name,
    //                 dateagd,
    //                 req.body.orderAccepted
    //             ],
    //             ccname: ccname,
    //             channel: channel,
    //             cfgpath: cfgpath,
    //             user: user,
    //             local: nodeType,
    //             mspId: mspId,
    //         }, {
    //             headers: headers,
    //         }
    //     )
    //     .then(function(response) {
    //         console.log("Transaction has been submitted");
    //         console.log(response);
    //         const result = response.data;
    //         res.status(200).json({ result: result.result });
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     });
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

app.listen(7000, "10.244.3.187");
console.log("SupplyChain server is  Running on http://10.244.3.187:7000");
