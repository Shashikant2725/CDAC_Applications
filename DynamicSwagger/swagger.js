const swaggerAutogen = require("swagger-autogen");
const doc = {
  info: {
    title: "Generic APIs for Testing Functionality",
    description: "Using this API we can execute functions",
    version: "2.0.0",
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
  },
  host: "10.244.3.187:1111",
};

const outputFile = "./swagger_output.json";
// const endpointsFiles = ["./routes/userRoutes"];
const endpointsFiles = ["./Server"];

// swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import('./Server.js'); // Your project's root file
});