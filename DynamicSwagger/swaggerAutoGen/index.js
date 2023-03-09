const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const bodyParser = require("body-parser");
const router1 = require("../routes/userRoutes");
const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.post(...);
// app.use(app.router);
// router.initialize(app);
app.use(express.json());
app.use("/api/v1/allDomains", router.route);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.listen(3000, () => {
  console.log(`Running on 3000`);
});
