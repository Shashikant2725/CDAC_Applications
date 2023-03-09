const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6000;
const DB = require("./config/dbConnect");
const { Domain, Stakeholder } = require("./models/ubfAdminModel");
// const swaggerAutogen = require("swagger-autogen")();
// const doc = {
//   info: {
//     title: "Generic APIs for Testing Functionality",
//     description: "Using this API we can execute functions",
//   },
//   host: "10.244.3.187:9000",
//   schemes: ["http"],
// };

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

app.use(
  cors({
    origin: "*",
  })
);


app.post("/createDomain", async (req, res) => {
  console.log("Bodyyy::", req.headers);

  try {
    

    // #swagger.autoHeader=true
     // #swagger.tags = ['Supplychain']
        // #swagger.description = 'createDomain...'
    const myItem1 = req.headers.item1;

    const { item2, item3 } = req.headers;

    console.log("myItem1::", myItem1);
    console.log("item2::", item2);
    console.log("item3::", item3);
    const data={
      myItem1,
      item2,
      item3
    }

    res.json({ Result: data, success: true });
  } catch (error) {
    console.log("Error", error);
  }
});


app.post("/createDomain3", async (req, res) => {
  console.log("Bodyyy::", req.headers);

  try {
    

    // #swagger.autoHeader=true
     // #swagger.tags = ['Supplychain']
             // #swagger.description = 'createDomain3...'

    const myItem1 = req.headers.item1;

    const { item2, item3 } = req.headers;

    console.log("myItem1::", myItem1);
    console.log("item2::", item2);
    console.log("item3::", item3);
    const data={
      myItem1,
      item2,
      item3
    }

    res.json({ Result: data, success: true });
  } catch (error) {
    console.log("Error", error);
  }
});
app.post("/createDomain1", async (req, res) => {
  console.log("Bodyyy::", req.body);

  try {
   

    // #swagger.autoHeader=true
     // #swagger.tags = ['Drug Track and Trace']
                  // #swagger.description = 'createDomain1...'

   
    const myItem1 = req.body.item1;

    const { createDrug1,manufactureDate} = req.body;

    console.log("myItem1::", myItem1);
    console.log("create_Drug::", createDrug1);
    console.log("manufacture_Date::", manufactureDate);
    const data={
      myItem1,
      createDrug1,
      manufactureDate
    }
    res.json({ Result: data, success: true });
  } catch (error) {
    console.log("Error", error);
  }
});
// const outputFile = "./swagger_output.json";
// const endpointsFiles = ["./server"];
// swaggerAutogen(outputFile, endpointsFiles, doc);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, "10.244.3.187");
console.log(`Server listening on ${PORT}`);
