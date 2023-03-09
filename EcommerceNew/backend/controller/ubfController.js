const Usermodel = require("../models/userModel");
const { Domain } = require("../models/ubfAdminModel");
// const Domain = require('../models/Domain');

const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jwtToken");

/// Create Domain
const createDomain = asyncHandler(async (req, res) => {
  console.log("Bodyyy::", req.body);
  try {
    const registerAsset = await Domain.create(req.body);

    res.json({ Result: registerAsset, success: true });
  } catch (error) {
    console.log("Error", error);
  }
});

/// Update Domain
const updateDomain = asyncHandler(async (req, res) => {});

/// Get All Domain
const getAllDomains = asyncHandler(async (req, res) => {});

/// Get Domain By ID
const getDomain = asyncHandler(async (req, res) => {});

/// Delete Domain
const deleteDomain = asyncHandler(async (req, res) => {});

module.exports = {
  Create: createDomain,
  GetAllDomain: getAllDomains,
  DeleteDomain: deleteDomain,
  UpdateDomain: updateDomain,
  GetDomain: getDomain,
};
// module.exports = loginUser;
