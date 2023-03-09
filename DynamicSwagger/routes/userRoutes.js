const express = require('express');
const UserController= require('../controller/userController');
const AssetController= require('../controller/assetController');
const TransferController=require('../controller/transferOwnerController')
const DomainController=require('../controller/domainController')
const StakeholderController=require('../controller/stakeholderController')
const NodeFunctionController=require('../controller/nodeFunctionController')
const RestApiController=require('../controller/restapiController')

const router = express.Router();

router.post("/register",UserController.Create);
router.post("/login",UserController.Login);
router.get("/allUsers",UserController.GetAllusers);
router.get("/user/:id",UserController.GetUser)
router.delete("/deleteuser/:id",UserController.DeleteUser)

router.post("/assetCreation",AssetController.Create)
router.get("/allAssets",AssetController.GetAllAsset);
router.get("/allAsset/:id",AssetController.GetAssets);
router.post("/transferOwner",TransferController.Transfer)
router.get("/ownerDetails",TransferController.TransferAllAsset)
router.delete("/deleteasset/:id",AssetController.DeleteAsset)
router.put("/updateasset/:id",AssetController.UpdateAsset)



//////Domain Routes///////////////////
router.post("/domainCreation",DomainController.Create)
router.get("/allDomains",DomainController.GetAllDomain);
router.get("/getDomain/:id",DomainController.GetDomain)
router.delete("/deleteDomain/:id",DomainController.DeleteDomain)
router.put("/updateDomain/:id",DomainController.UpdateDomain)



//////Stakeholder Routes///////////////////
router.post("/StakeholderCreation",StakeholderController.Create)
router.get("/allStakeholder",StakeholderController.GetAllStakeholder);
router.get("/getStakeholder/:id",StakeholderController.GetStakeholder)
router.delete("/deleteStakeholder/:id",StakeholderController.DeleteStakeholder)
router.put("/updateStakeholder/:id",StakeholderController.UpdateStakeholder)



//////NodeFunction Routes///////////////////
router.post("/NodeFunctionCreation",NodeFunctionController.Create)
router.get("/allNodeFunction",NodeFunctionController.GetAllNodeFunction);
router.get("/getNodeFunction/:id",NodeFunctionController.GetNodeFunction)
router.delete("/deleteNodeFunction/:id",NodeFunctionController.DeleteNodeFunction)
router.put("/updateNodeFunction/:id",NodeFunctionController.UpdateNodeFunction)



//////RestApi Routes///////////////////
router.post("/RestApiCreation",RestApiController.Create)
router.get("/allRestApis",RestApiController.GetAllRestApis);
router.get("/getRestApi/:id",RestApiController.GetRestAPI)
router.delete("/deleteRestApi/:id",RestApiController.DeleteRestApi)
router.put("/updateRestApi/:id",RestApiController.UpdateRestApi)

module.exports = router;