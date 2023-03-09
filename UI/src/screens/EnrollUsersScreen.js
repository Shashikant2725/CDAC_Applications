import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Script2 from "../components/EnrollUsersScript";
import {
  registerUsers,
  eappStatus,
  organizationDataFetchStore,
} from "../actions/Fabric/FabricAction";
import { BsPlusCircle } from "react-icons/bs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import home from "../images/home.png";
import eye from "../images/eye.png";
import trashh from "../images/trashh.png";
import pluss from "../images/pluss.png";
import jwt_decode from "jwt-decode";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import "../css/enrollUser.css";

const EnrollUsersScreen = (props) => {
  const [name, setName] = useState([]);

  const data = useSelector((store) => store.scripts);
  const { error, response, loading } = data;

  let mydata = useSelector((loginData) => loginData.login_api);

  const { apperror, appresponse, apploading } = useSelector(
    (app) => app.appStatus
  );
  console.log("appresponse", appresponse);

  const { imageLoading, imageResponse, imageError } = useSelector(
    (newimageData) => newimageData.imageData
  );

  let roleTypes = useSelector((storeRoleTypes) => storeRoleTypes.userdynamicRolesTypes);
  console.log("RoleTypes", roleTypes);
  let { dynamicRolsError, dynamicRolesResponses, dynamicRolesLoading } = roleTypes;
  console.log("dynamicRolesResponses", dynamicRolesResponses);

  let FetchedorgDetails = useSelector((orgDetails) => orgDetails.orgsDataFetch);
  const { orgsDataFetchLoading, orgsDataFetchResponse, orgsDataFetchError } = FetchedorgDetails;
  console.log("orgsDataFetch11111111111", FetchedorgDetails);

  let organisation = orgsDataFetchResponse[0]?.orgdata
    ? JSON.parse(orgsDataFetchResponse[0]?.orgdata)
    : orgsDataFetchResponse[0];

  console.log(organisation, ".........................");
  let myArray = organisation ? JSON.parse(organisation.data) : [];

  console.log("myyyyyyyyyyyyyyyyyyyy", myArray.length);
  let orgsLength = myArray.length;

  let connectorToken = useSelector((store) => store.login_api);

  let organizations = orgsLength;
  const [miniChannel, setMiniChannel] = useState(1);
  const [inputFieldsCount, setInputFieldsCount] = useState(
    Array(orgsLength).fill(1)
  );
  const [isChecked, setIsChecked] = useState(Array(orgsLength).fill(false));

  const [usernameArray, setUsernameArray] = useState([]);
  const [peerArray, setPeerArray] = useState([]);
  const [roleArray, setRoleArray] = useState([]);
  const [rowHandler, setRowHandler] = useState("");
  const [attData, setAttData] = useState([]);

  console.log("RowHandler", rowHandler);

  console.log("inputFieldsCount.................", inputFieldsCount);
  console.log("orgslength.......................", orgsLength);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  //*************** SELECT OPTIONS FOR ROLES*/
  const options = ["peer", "client"];
  //****** CANAMES AND MSP IDS AND ORG_NAMES FROM SESSION STORAGE */
  const mspId = [];
  const caname = [];
  let orgname = "";
  let newname = "";
  // ***********************************//
  const [usersdata, setUsersData] = useState([]);
  const dispatch = useDispatch();

  const updateInputscount = (index) => {
    setMiniChannel(miniChannel + 1);
    let newArr = [...inputFieldsCount];
    let oldnum = newArr[index];
    newArr[index] = oldnum + 1;
    setInputFieldsCount(newArr);
  };

  const changeIscheckedStatus = (index) => {
    let Arr = [...isChecked];
    let oldstatus = Arr[index];
    Arr[index] = !oldstatus;

    setIsChecked(Arr);
    window.localStorage.setItem("adminStatus", Arr);
  };

  var history = useNavigate();

  let orgnames = [];

  function orgNamesFormatter() {
    let names = organisation ? organisation : [];
    console.log("names.............", names);
    let namesLen = names.length;
    for (let i = 0; i < namesLen; i++) {
      console.log("iiiiiiiiiiiii", names[i].name);
      orgnames.push(names[i].name);
    }
    console.log("jjjjjjjjjj", orgnames);
    return orgnames;
  }

  let appname = localStorage.getItem("AppName");
  let version = localStorage.getItem("Version");
  let plat = localStorage.getItem("Platform");
  let Env = localStorage.getItem("Environment");

  if (appresponse === undefined) {
    orgname = orgNamesFormatter();
    orgsLength = orgname.length;
    organizations = orgsLength;
  } else {
    // console.log(appresponse[0].data.fabric.cas)
    let orArray = [];
    let orgData = JSON.parse(organisation.data);
    orgsLength = orgData.length;
    organizations = orgsLength;

    for (let i of orgData) {
      orArray.push(i.name);
    }
    orgname = orArray;
    newname = orgname;
  }

  if (appresponse[0] !== null) {
    appname = appresponse[0].appName;
    version = appresponse[0].verison;
    plat = appresponse[0].platform;
    Env = appresponse[0].environment;
  }

  function setUsersList(event) {
    for (let i of JSON.parse(organisation.data)) {
      caname.push(i.ca);
      i = i.ca.split(".");
      let count = 0;
      let newarradd;
      let arradd = "";
      for (let k of i) {
        if (count !== 0) {
          arradd = arradd + "-" + k;
        }
        count = count + 1;
      }
      arradd = arradd.substr(1, arradd.length);
      mspId.push(arradd);
    }
    // console.log("SCRIPTS CANAMES IS :- ",caname)
    //console.log("SCRIPTS MSP IS:- ",mspId)
    localStorage.setItem("canames", caname);
    localStorage.setItem("mspid", mspId);
    console.log(mspId, caname);

    let newArr = [];
    let newArrRoles = [];
    let newAttrKeysData = [];
    let newAttrValsData = [];
    let finalArr = [];
    let userDetails = document.getElementsByName("userdata");
    // iterating over number of organizations
    for (let i = 0; i < organizations; i++) {
      // console.log("num of orgs",i)
      // Fetching the data from table rows

      let tr = userDetails[i].getElementsByTagName("input");
      let th = userDetails[i].getElementsByTagName("select");

      //console.log("selected data ",td[i].value)
      // Here we are getting number of input fields in a single organization
      let inputscount = inputFieldsCount[i];
      console.log("inputcounts..................", inputscount);
      let sublist = [];
      let rolesList = [];
      let attributesKeyList = [];
      let attributValueList = [];
      // iterating over a single organization based on number of input fields in a single organization
      let k = 1;
      for (let j = 0; j < inputscount; j++) {
        // here we are fetching the user names and push into the sublist
        const username = tr[j + k].value;
        k = k + 1;
        const attributeKeyValue = tr[j + k].value;
        k = k + 1;
        const attributeValValue = tr[j + k].value;
        const role = th[j].value;
        console.log("userName.........................", username);
        console.log("attributevaluie..............", attributeKeyValue);
        console.log("attribute Val Value .........", attributeValValue);
        console.log("role......................", role);
        //pushing the usernames into a list when it is a nonempty value
        if (username !== "") {
          sublist.push(username);
          rolesList.push(role);
          attributesKeyList.push(attributeKeyValue);
          attributValueList.push(attributeValValue);
          console.log("rolesList is", rolesList);
        }
      }
      //pushing the usernames list into array when array is not empty
      if (sublist.length !== 0) {
        newArr.push(sublist);
        newArrRoles.push(rolesList);
        newAttrKeysData.push(attributesKeyList);
        newAttrValsData.push(attributValueList);
        // console.log("new users List",newArr)
      }
    }
    setUsersData(newArr);
    window.localStorage.setItem("orgUsernames", newArr);

    console.log(appresponse);

    let decode = jwt_decode(connectorToken.response.token);
    console.log("connector", connectorToken.response.token);

    let decodedToken = connectorToken.response.token;
    console.log("ddnkodmd", decodedToken);

    let cfgpath = appresponse[0].cfgpath;

    dispatch(
      registerUsers(
        decodedToken,
        organizations,
        isChecked,
        newArr,
        mspId,
        caname,
        newArrRoles,
        cfgpath,
        newAttrKeysData,
        newAttrValsData
      )
    );

    //history("/viewusers");
  }

  function trashHandler(t, index) {
    console.log(t);
    if (miniChannel > 1) {
      setMiniChannel(miniChannel - 1);
      let a = inputFieldsCount;
      a[index] = a[index] - 1;
      setInputFieldsCount(a);
    }
    //document.getElementById('qqq').style.backgroundColor = 'green'
  }

  function modalHandler() {
    console.log("hey");
  }

  const saveAttributeData = () => {
    console.log("Atrtttttt", attData);
  };

  const onChangeAttributeText = (e) => {
    console.log("eeeeeee", e.target.value);
    setAttData(e.target.value);
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#ECF2F6" }}>
      <div className="" style={{ width: "100%", height: "14%" }}>
        <Header />
      </div>
      <div
        style={{
          width: "100%",
          height: "72%",
          marginTop: "19px",
          marginBottom: "19px",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="leftScript">
          <Script2 style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="rightScript">
          <div className="rightNavScript">
            <div className="NavLeft">
              <img style={{ color: "#137EA9" }} src={home} width={18}></img>
              <p>/</p>
              <p style={{ color: "#137EA9" }}>Application Setup</p>
              <p>/</p>
              <p>Enroll User</p>
            </div>
            <div className="NavRight">
              <p data-bs-toggle="modal" data-bs-target="#exampleModal1">
                <img src={eye} width={18}></img> View Application Setup Details
              </p>
            </div>
          </div>
          <div className="rightMainScript" style={{ position: "relative" }}>
            <Typography variant="h5" gutterBottom style={{ color: "black" }}>
              User Enrollment :
            </Typography>
            {Number(orgsLength > 0) && (
              <div style={{ width: "100%", height: "79%", overflow: "auto" }}>
                {[...Array(organizations)].map((el, index) => (
                  <div
                    style={{
                      width: "89%",
                      height: "50%",
                      marginTop: "1%",
                      backgroundColor: "white",
                      overflow: "auto",
                      paddingTop: "1%",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      borderLeft: "2px solid #137EA9",
                      borderRadius: "4px",
                    }}
                    key={index}
                  >
                    <div style={{ width: "100%", height: "100%" }}>
                      <table
                        name="userdata"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <tbody
                          className=""
                          style={{ width: "100%", height: "100%" }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              color: "black",
                            }}
                          >
                            <Typography
                              variant="h6"
                              gutterBottom
                              style={{ marginLeft: "1%" }}
                            >
                              {newname[index]}
                            </Typography>
                            <h6 style={{ marginRight: "3%" }}>
                              Admin{" "}
                              <input
                                style={{ marginLeft: "3px" }}
                                type="checkbox"
                                onClick={() => changeIscheckedStatus(index)}
                              />
                            </h6>
                          </div>

                          {[...Array(inputFieldsCount[index])].map(
                            (el, newindex) => (
                              <div
                                style={{
                                  width: "100%",
                                  height: "60px",
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "5px",
                                }}
                                key={newindex}
                              >
                                {/* <input
                                                                style={{ width: '24%', height: '39px', backgroundColor: 'white', border: '1px solid #DEE2E6', marginTop: '0px', borderRadius: '5px', paddingLeft: '11px' }}
                                                                type="text"
                                                                id="usernameStyle"
                                                                placeholder="Enter Username"
                                                                name="username"
                                                                className="col-md-10"
                                                                key={index}
                                                                disabled={!isChecked[index]}
                                                            /> */}
                                <Box
                                  component="form"
                                  sx={{
                                    "& .MuiTextField-root": {
                                      m: 1,
                                      width: "13.5ch",
                                    },
                                  }}
                                  noValidate
                                  autoComplete="off"
                                >
                                  <div>
                                    <TextField
                                      type="text"
                                      label="Name"
                                      id="outlined-size-small"
                                      size="medium"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                  </div>
                                </Box>

                                <TextField
                                  id="outlined-select-currency-native"
                                  select
                                  label="Role"
                                  SelectProps={{
                                    native: true,
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                >
                                  {options.map((role) => (
                                    <option>{role}</option>
                                  ))}
                                </TextField>
                                <div
                                  style={{
                                    marginLeft: "1%",
                                    display: "flex",
                                    padding: "9px",
                                    borderStyle: "solid",
                                    borderColor: "#8f8b8b",
                                    borderWidth: "1px",
                                  }}
                                >
                                  <TextField
                                    type="text"
                                    label="Key"
                                    id="outlined-size-small"
                                    size="small"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                  <TextField
                                    type="text"
                                    label="Value"
                                    id="outlined-size-small"
                                    size="small"
                                    style={{ marginLeft: "5px" }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </div>

                                {/* <Box
                                                                 <div>
                                                                <TextField
                                                                    id="outlined-select-currency-native"
                                                                    select
                                                                    label="Role"

                                                                    SelectProps={{
                                                                        native: true,
                                                                    }}

                                                                >
                                                                    {options.map((role) => <option>{role}</option>)}
                                                                </TextField>
                                                            
                                                        </Box>
                                                             <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '13.5ch' }, }} noValidate autoComplete="off"> 
                                                                <div>
                                                                    <TextField type='text'   label="Name"  id="outlined-size-small" size="small"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }} />
                                                                </div>

                                                            </Box> */}

                                {/* <select id="peerStyle">
                                                                <option value="" disabled selected hidden>Select  Peer</option>
                                                                {options.map((role) => <option>{role}</option>)}
                                                            </select> */}

                                <div style={{ display: "flex" }}></div>

                                {/* <button
                                  onClick={modalHandler}
                                  class="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                  style={{
                                    width: "11%",
                                    border: "1px solid #89BED4",
                                    backgroundColor: "#F9F9F9",
                                    borderRadius: "4px",
                                    color: "#137EA9",
                                    height: "52%",
                                    fontSize: "13px",
                                    marginRight: "2%",
                                    marginLeft: "20px",
                                  }}
                                  type="button"
                                >
                                  Add JSON
                                </button> */}
                                {/* <input
                                                    style={{ width: '24%', height: '39px', backgroundColor: 'white', border: '1px solid #DEE2E6', marginTop: '0px', borderRadius: '5px', paddingLeft: '11px' }}
                                                    type="text"
                                                    id="attributeData"
                                                    placeholder="Enter Attribute Data"
                                                    name="attributeData"
                                                    className="col-md-10"
                                                    key={index}
                                                    disabled={!isChecked[index]}
                                                /> */}
                                <p
                                  style={{
                                    marginTop: "2%",
                                    width: "90px",
                                    marginLeft: "20%",
                                  }}
                                >
                                  <img
                                    onClick={() => updateInputscount(index)}
                                    src={pluss}
                                    alt=""
                                    width={17}
                                    style={{ marginRight: "10px" }}
                                    disabled={!isChecked[index]}
                                  ></img>
                                  {newindex === miniChannel - 1 &&
                                  miniChannel != 1 ? (
                                    <img
                                      onClick={() =>
                                        trashHandler(newindex, index)
                                      }
                                      src={trashh}
                                      alt=""
                                      width={17}
                                    ></img>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div
              className="d-flex "
              style={{
                width: "30%",
                height: "9%",
                marginLeft: "82%",
                position: "absolute",
                top: "88%",
              }}
            >
              <button
                onClick={() => setUsersList()}
                className="btn btn-primary"
                style={{
                  height: "100%",
                  width: "30%",
                  marginLeft: "45px",
                  backgroundColor: "#137EA9",
                  border: "none",
                }}
              >
                Enroll
              </button>
            </div>
          </div>
          {/* <h6>Heading For Steps</h6> */}
        </div>
      </div>
      <div
        style={{ width: "100%", height: "8%", position: "fixed", bottom: 0 }}
      >
        <Footer className="footer_text" />
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ marginTop: "12%" }}
      >
        <div class="modal-dialog">
          <div
            class="modal-content"
            style={{ borderRadius: "11px", border: "none" }}
          >
            <div
              class="modal-header"
              style={{ backgroundColor: "#137EA9", color: "white" }}
            >
              <h5 class="modal-title" id="exampleModalLabel">
                Add Json
              </h5>
              <button
                style={{ color: "white" }}
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* <textarea placeholder="Write Json description...." class="form-control" id="exampleFormControlTextarea1" rows="5" onChange={onChangeAttributeText}></textarea> */}

              <TextField
                type="text"
                label="Key"
                id="outlined-size-small"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="text"
                label="Value"
                id="outlined-size-small"
                size="small"
                style={{ marginLeft: "5px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <img
                src={pluss}
                alt=""
                width={17}
                style={{ marginLeft: "10px",marginTop:"7px" }}
              ></img>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={saveAttributeData}
                aria-label="Close"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ marginTop: "9%", marginLeft: "30%" }}
      >
        <div class="modal-dialog">
          <div
            class="modal-content"
            style={{ borderRadius: "12px", border: "none" }}
          >
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                View Application Setup details
              </h5>
              <button
                style={{ color: "white" }}
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div
                style={{
                  height: "25px",
                  width: "100%",
                  backgroundColor: "#F5F5F5",
                  display: "flex",
                  allignItems: "center",
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "800",
                  paddingLeft: "16px",
                }}
              >
                <p>App Name</p>
                <p style={{ marginLeft: "90px", marginRight: "120px" }}>-</p>
                <p>{appname}</p>
              </div>
              <div
                style={{
                  height: "25px",
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  allignItems: "center",
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "800",
                  paddingLeft: "16px",
                }}
              >
                <p>Version</p>
                <p style={{ marginLeft: "110px", marginRight: "120px" }}>-</p>
                <p>{version}</p>
              </div>
              <div
                style={{
                  height: "25px",
                  width: "100%",
                  backgroundColor: "#F5F5F5",
                  display: "flex",
                  allignItems: "center",
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "800",
                  paddingLeft: "16px",
                }}
              >
                <p>Platform</p>
                <p style={{ marginLeft: "100px", marginRight: "120px" }}>-</p>
                <p>{plat}</p>
              </div>
              <div
                style={{
                  height: "25px",
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  allignItems: "center",
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "800",
                  paddingLeft: "16px",
                }}
              >
                <p>ENV</p>
                <p style={{ marginLeft: "126px", marginRight: "120px" }}>-</p>
                <p>{Env}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollUsersScreen;
