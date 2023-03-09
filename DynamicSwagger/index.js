const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6000;
const DB = require("./config/dbConnect");
const UserRoutes = require("./routes/userRoutes");
// const LoginRouts = require('./routes/userRoutes')
const { notFound, errorHandler } = require("./middleware/errorHandler");
// const { urlencoded } = require('body-parser');
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

app.use("/api/v1", UserRoutes);
app.use("/api/v1/login", UserRoutes);
app.use("/api/v1/allUsers", UserRoutes);
app.use("/api/v1/user/:id", UserRoutes);
app.use("/api/v1/deleteuser/:id", UserRoutes);
app.use("/api/v1/assetCreation", UserRoutes);
app.use("/api/v1/allAssets", UserRoutes);
app.use("/api/v1/allAsset/:id", UserRoutes);
app.use("/api/v1/transferOwner", UserRoutes);
app.use("/api/v1/ownerDetails", UserRoutes);
app.use("/api/v1/deleteasset/:id", UserRoutes);
app.use("/api/v1/updateasset/:id", UserRoutes);

//////Domain routes/////
app.use("/api/v1/domainCreation", UserRoutes);
app.use("/api/v1/allDomains", UserRoutes);
app.use("/api/v1/getDomain/:id", UserRoutes);
app.use("/api/v1/deleteDomain/:id", UserRoutes);
app.use("/api/v1/updateDomain/:id", UserRoutes);

//////Stakeholder routes/////
app.use("/api/v1/StakeholderCreation", UserRoutes);
app.use("/api/v1/allStakeholder", UserRoutes);
app.use("/api/v1/getStakeholder/:id", UserRoutes);
app.use("/api/v1/deleteStakeholder/:id", UserRoutes);
app.use("/api/v1/updateStakeholder/:id", UserRoutes);

//////NodeFunction routes/////
app.use("/api/v1/NodeFunctionCreation", UserRoutes);
app.use("/api/v1/allNodeFunction", UserRoutes);
app.use("/api/v1/getNodeFunction/:id", UserRoutes);
app.use("/api/v1/deleteNodeFunction/:id", UserRoutes);
app.use("/api/v1/updateNodeFunction/:id", UserRoutes);

//////RestApi routes/////
app.use("/api/v1/RestApiCreation", UserRoutes);
app.use("/api/v1/allRestApis", UserRoutes);
app.use("/api/v1/getRestApi/:id", UserRoutes);
app.use("/api/v1/deleteRestApi/:id", UserRoutes);
app.use("/api/v1/updateRestApi/:id", UserRoutes);
app.use("/api/v1/hello", UserRoutes);

// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, "10.244.3.187");
console.log(`Server listening on ${PORT}`);
