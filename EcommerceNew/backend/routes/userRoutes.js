const express = require('express');
const UserController= require('../controller/userController');
const AssetController= require('../controller/assetController');
const TransferController=require('../controller/transferOwnerController');
const AssetByAdminController=require('../controller/assetByAdminController');
const DomainController=require('../controller/ubfController')
const Stakeholderontroller=require('../controller/ubfController1')
const NodeFunctionController=require('../controller/ubfController2')

const router = express.Router();

router.post("/register",UserController.Create);
router.post("/login",UserController.Login);
router.get("/allUsers",UserController.GetAllusers);
router.get("/user/:id",UserController.GetUser);
router.delete("/deleteuser/:id",UserController.DeleteUser);

router.post("/assetCreation",AssetController.Create)
router.get("/allAssets",AssetController.GetAllAsset);
router.get("/allAsset/:id",AssetController.GetAssets);
router.post("/transferOwner",TransferController.Transfer)
router.get("/ownerDetails",TransferController.TransferAllAsset);
router.delete("/deleteasset/:id",AssetController.DeleteAsset);
router.put("/updateasset/:id",AssetController.UpdateAsset);



router.post("/assetfieldsCreation",AssetByAdminController.CreateAssetByAdmin);
router.get("/allAssetsFields",AssetByAdminController.GetAllAssetByAdmin);
router.get("/allAssetFields/:id",AssetByAdminController.GetAssetsByAdmin);
router.delete("/deleteassetFields/:id",AssetByAdminController.DeleteAssetByAdmin);
router.put("/updateassetFields/:id",AssetByAdminController.UpdateAssetByAdmin);
// router.post("/transferOwner",AssetByAdminController.Transfer)
// router.get("/ownerDetails",AssetByAdminController.TransferAllAsset);

router.post("/domainCreation",DomainController.Create);
router.get("/allDomains",DomainController.GetAllDomain);
router.get("/getdomain/:id",DomainController.GetDomain);
router.delete("/deletedomain/:id",DomainController.DeleteDomain);
router.put("/updatedomain/:id",DomainController.UpdateDomain);

router.post("/StakeholderCreation",Stakeholderontroller.Create);
router.get("/allStakeholders",Stakeholderontroller.GetAllStakeholders);
router.get("/getStakeholder/:id",Stakeholderontroller.GetStakeholder);
router.delete("/deleteStakeholder/:id",Stakeholderontroller.DeleteStakeholder);
router.put("/updateStakeholder/:id",Stakeholderontroller.UpdateStakeholder);


router.post("/NodeFunctionCreation",NodeFunctionController.Create);
router.get("/allNodeFunctions",NodeFunctionController.GetAllNodeFunctions);
router.get("/getNodeFunction/:id",NodeFunctionController.GetNodeFunction);
router.delete("/deleteNodeFunction/:id",NodeFunctionController.DeleteNodeFunction);
router.put("/updateNodeFunction/:id",NodeFunctionController.UpdateNodeFunction);


module.exports = router;