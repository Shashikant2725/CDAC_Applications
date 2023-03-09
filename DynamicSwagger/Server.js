const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6000;
const UserRoutes = require("./routes/userRoutes");
// const LoginRouts = require('./routes/userRoutes')
const { notFound, errorHandler } = require("./middleware/errorHandler");
// const { urlencoded } = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const axios=require('axios');
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
    const data = {
      myItem1,
      item2,
      item3,
    };

    res.json({ Result: data, success: true });
  } catch (error) {
    console.log("Error", error);
  }
});

app.get("/allDomains/:id", async (req, res) => {
// #swagger.autoHeader=true
    // #swagger.tags = ['Supplychain']
    // #swagger.description = 'Get Domains...'
  const result="Hello I am Shashikant";
  console.log("Result::",result);
  res.status(200).json({Response:result,success: true });
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(1111, "10.244.3.187");
console.log("Server listening on 10.244.3.187");
