const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const cors = require('cors');
const app =express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 6000;
const DB = require('./config/dbConnect');
const  UserRoutes = require('./routes/userRoutes');
// const LoginRouts = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorHandler');
// const { urlencoded } = require('body-parser');
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors({
    origin: '*'
}));
app.use('/api/v1',UserRoutes);
app.use('/api/v1/login',UserRoutes);
app.use('/api/v1/allUsers',UserRoutes);
app.use('/api/v1/user/:id',UserRoutes);
app.use('/api/v1/deleteuser/:id',UserRoutes);

app.use('/api/v1/assetCreation',UserRoutes);
app.use('/api/v1/allAssets',UserRoutes);
app.use('/api/v1/allAsset/:id',UserRoutes);
app.use('/api/v1/transferOwner',UserRoutes);
app.use('/api/v1/ownerDetails',UserRoutes);
app.use('/api/v1/deleteasset/:id',UserRoutes);
app.use('/api/v1/updateasset/:id',UserRoutes);


app.use('/api/v1/assetfieldsCreation',UserRoutes);
app.use('/api/v1/allAssetsFields',UserRoutes);
app.use('/api/v1/allAssetFields/:id',UserRoutes);
app.use('/api/v1/deleteassetFields/:id',UserRoutes);
app.use('/api/v1/updateassetFields/:id',UserRoutes);

app.use('/api/v1/domainCreation',UserRoutes);
app.use('/api/v1/allDomains',UserRoutes);
app.use('/api/v1/getdomain/:id',UserRoutes);
app.use('/api/v1/deletedomain/:id',UserRoutes);
app.use('/api/v1/updatedomain/:id',UserRoutes);

app.use('/api/v1/StakeholderCreation',UserRoutes);
app.use('/api/v1/allStakeholders',UserRoutes);
app.use('/api/v1/getStakeholder/:id',UserRoutes);
app.use('/api/v1/deleteStakeholder/:id',UserRoutes)
app.use('/api/v1/updateStakeholder/:id',UserRoutes)

app.use('/api/v1/NodeFunctionCreation',UserRoutes);
app.use('/api/v1/allNodeFunctions',UserRoutes);
app.use('/api/v1/getNodeFunction/:id',UserRoutes);
app.use('/api/v1/deleteNodeFunction/:id',UserRoutes)
app.use('/api/v1/updateNodeFunction/:id',UserRoutes)








app.use(notFound);
app.use(errorHandler);
app.listen(PORT,'10.244.3.187')
    console.log(`Server listening on ${PORT}`);

