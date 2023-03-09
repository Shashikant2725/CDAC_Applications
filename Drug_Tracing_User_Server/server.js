const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
const PORT = 4500;
app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established succesfully.");
})

var userRoutes = require('./api/users');
var productRoutes = require('./api/product');
var orderRoutes = require('./api/order')
var rateRoutes = require('./api/vendorRating')
var iosRoutes= require('./api/iosTesting');

app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', rateRoutes);
app.use('/',iosRoutes);

app.listen(PORT, '10.244.3.187')
    console.log("Server is running on port: " + PORT);

