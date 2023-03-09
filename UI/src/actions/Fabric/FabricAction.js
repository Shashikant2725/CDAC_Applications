import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// ******* Sign Button Code *******
// let username = localStorage.getItem("email");
//cb = callback function
export const getObject = (username, password, cb) => {
  console.log(username, password);
  return (dispatch) => {
    dispatch({
      type: "login-api-request",
    });

    // http://10.244.0.167:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.167:5003/dept/login`;

    const body = {
      email: `${username}`,
      password: `${password}`,
    };

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: "login-api-success",
          payload: response.data,
        });
        toast.success("Success");
        console.log("on success request token", response.data);

        //alert("Login Successfull")
        // window.localStorage.setItem("token", response.data)
        // console.log("success")
        // cb(response.data)
      })
      .catch((error) => {
        dispatch({
          type: "login-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        // toast.success("Success");
        console.log("wrong", error);
      });
  };
};

//*******  existing App Code *******//
export const eApp = (mail, mydata) => {
  console.log("loginbody of eapp", mail);
  console.log("loginbody of eapp", mydata);

  return (dispatch) => {
    dispatch({
      type: "existingApp-api-request",
    });
    const url = `http://10.244.0.167:5000/app/list`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${mydata}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      user: `${mail}`,
    };
    console.log("login body of existing Application", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "existingApp-api-success",
          payload: response.data,
        });
        console.log("exsisiting app in fabricAction", response.data);

        // toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "existingApp-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        // toast.success("Success");
        console.log("wrong");
      });
  };
};

//*********STATUS OF A PARTICULAR APP *********************/
export const eappStatus = (dynamicToken, userEmail, channelAppName,appStatusResult) => {
  // console.log("loginbody of eapp status", email)
  return (dispatch) => {
    dispatch({
      type: "appstatus-api-request",
    });
    const url = `http://10.244.0.167:5000/status`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      user: `${userEmail}`,
      appName: `${channelAppName}`,
    };
    console.log("login body of existing Application status", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "appstatus-api-success",
          payload: response.data,
        });
        console.log("exsisiting app in fabricAction", response);
        //appStatusResult(response.data)
        // toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "appstatus-api-fail",
          payload: error,
        });
        // toast.error("Something went wrong !");
        //toast.success("Success");
        console.log("wrong");
      });
  };
};

// ********* Register User ***********
// export const newUserReg = (fname, lname, email, password) => {
//   return (dispatch) => {
//     dispatch({
//       type: "register-api-request",
//     });

//     const url = `http://10.244.0.223:5003/register`;

//     const body = {
//       "first_name": `${fname}`,
//       "last_name": `${lname}`,
//       "email": `${email}`,
//       "password": `${password}`
//     }

//     axios
//       .post(url, body)
//       .then((response) => {
//         dispatch({
//           type: "register-api-success",
//           payload: response.data,
//         });
//         toast.success("Success");
//         console.log("data is:- ", response.data)
//       })
//       .catch((error) => {
//         dispatch({
//           type: "register-api-fail",
//           payload: error,
//         });
//         toast.error("Something went wrong !");
//         console.log(error)
//         return error
//       });
//   };
// }

export const newUserReg = (
  deptName,
  fname,
  lname,
  email,
  password,
  mobileNumber,
  cbf
) => {
  return (dispatch) => {
    dispatch({
      type: "register-api-request",
    });

    const url = `http://10.244.0.167:5003/dept/register`;

    // const body = {
    //   "first_name": `${fname}`,
    //   "last_name": `${lname}`,
    //   "email": `${email}`,
    //   "password": `${password}`
    // }

    const body = {
      deptname: `${deptName}`,
      name: `${fname}`,
      designation: `${lname}`,
      email: `${email}`,
      password: `${password}`,
      mobile: `${mobileNumber}`,
      role: `deptreg`,
    };

    console.log("body is", body);

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: "register-api-success",
          payload: response.data,
        });
        cbf(response.data);
        toast.success("Success");
        console.log("data is:- ", response.data);
      })
      .catch((error) => {
        dispatch({
          type: "register-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log(error);
        return error;
      });
  };
};
// ********* App Create Request ********
export const createApp = (
  decodedToken,
  name,
  plat,
  env,
  master,
  worker,
  domains,
  email,
  ConnectorName,
  RouteToEApp
) => {
  console.log("domains", domains);
  console.log(master, worker);
  console.log("docodeddddToken", decodedToken);
  return (dispatch) => {
    dispatch({
      type: "NewApp-api-request",
    });

    const url = `http://10.244.0.167:5000/app/create`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${decodedToken}`,
      },
    };

    const body = {
      user: `${email}`,
      appName: `${name}`,
      platform: `${plat}`,
      env: `${env}`,
      version: "2.2.3",
      connectorType: `${localStorage.getItem("ConnectorType")}`,
      //"nodeConf": { "master": master, "worker": worker },
      domainName: `${domains}`,
      connectorId: `${ConnectorName}`,
      //"connectorId":"generic-publicsector-b6da19af-122a-42b2-9391-afa7b795760a",
    };
    const sawtoothbody = {
      user: `${email}`,
      appName: `${name}`,
      platform: `${plat}`,
      env: `${env}`,
      version: "2.2.3",
      connectorType: `${localStorage.getItem("ConnectorType")}`,
    };

    console.log("data is ", body);

    if (localStorage.getItem("Platform") === "fabric") {
      axios
        .post(url, body, header)
        .then((response) => {
          dispatch({
            type: "NewApp-api-success",
            payload: response.data,
          });
          RouteToEApp(response.data);
          toast.success("Success");
          //console.log("App data is:- ",response.data)
        })
        .catch((error) => {
          dispatch({
            type: "NewApp-api-fail",
            payload: error,
          });
          //toast.error("Something went wrong !");
          toast.success("Success");
          //console.log("error is",error)
        });
    } else {
      axios
        .post(url, sawtoothbody, header)
        .then((response) => {
          dispatch({
            type: "NewApp-api-success",
            payload: response.data,
          });
          toast.success("Success");
          //console.log("App data is:- ",response.data)
        })
        .catch((error) => {
          dispatch({
            type: "NewApp-api-fail",
            payload: error,
          });
          //toast.error("Something went wrong !");
          toast.success("Success");
          //console.log("error is",error)
        });
    }
  };
};

// ********* Get Image Request ********
let newData = "";
export const getImage = (
  channel,
  cas,
  peers,
  orderers,
  dynamicToken,
  email
) => {
  return (dispatch) => {
    dispatch({
      type: "getImage-api-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
      },
    };

    // http://10.244.0.167:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.167:5000/generate/dig`;

    const body = {
      appName: `${localStorage.getItem("AppName")}`,
      user: `${email}`,
      platform: `${localStorage.getItem("Platform")}`,
      version: `${localStorage.getItem("version")}`,
      channel,
      environment: `${localStorage.getItem("Environment")}`,
      db: `${localStorage.getItem("dbvariableItem")}`,
      pos: true,
      data: {
        fabric: {
          cas,
          peers,
          orderers,
          settings: {
            ca: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
            peer: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
            orderer: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
          },

          netname: "ubf",
        },
      },
    };

    console.log("obj", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "getImage-api-success",
          payload: response.data,
        });
        newData = response.data;
        localStorage.setItem("base64code", newData);
        toast.success("Success");
        // console.log("data is:- ",response.data)
      })
      .catch((error) => {
        dispatch({
          type: "getImage-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log(error);
      });
  };
};

// *******  Generate Network Code *******
export const genScript = (
  platform,
  environment,
  version,
  channel,
  orderers,
  cas,
  peers,
  pos,
  db,
  dynamicToken,
  email
) => {
  return (dispatch) => {
    dispatch({
      type: "api-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${dynamicToken}`,
      },
    };

    // http://10.244.0.167:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.167:5001/fabric/generate`;

    const body = {
      user: `${email}`,
      platform,
      version,
      appName: `${localStorage.getItem("AppName")}`,
      environment,
      pos: true,
      db: `${localStorage.getItem("dbvariableItem")}`,
      data: {
        channel,
        fabric: {
          cas,
          peers,
          orderers,
          settings: {
            ca: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
            peer: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
            orderer: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
          },

          netname: "ubf",
        },
      },
    };

    console.log("obj", body);
    console.log("bodys array db variable", body.db);
    console.log("bodys array db variable type", typeof body.db);
    //console.log("bodys array pos variable type",typeof(body.pos))

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "api-success",
          payload: response.data,
        });
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
      });
  };
};

// *******  Start Network Code *******
export const startNetwork = (
  platform,
  version,
  appName,
  dynamicToken,
  email
) => {
  return (dispatch) => {
    dispatch({
      type: "start-network-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${dynamicToken}`,
      },
    };

    // `http://10.244.0.167:4000/start_network`    ${process.env.REACT_APP_URL}/fabric/up
    //http://10.244.0.221:5000/fabric/up
    const url = `http://10.244.0.167:5001/fabric/up`;

    const body = {
      user: `${email}`,
      platform: `${localStorage.getItem("Platform")}`,
      consenus: "poet",
      version,
      appName,
    };

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "start-network-success",
          payload: response.data,
        });
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "start-network-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
      });
  };
};

// *******  Channel Network Code *******
export const channelNetwork = (
  decodedToken,
  platform,
  version,
  appName,
  channel,
  email
) => {
  return (dispatch) => {
    dispatch({
      type: "start-channel-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${decodedToken}`,
      },
    };

    // `http://10.244.0.167:4000/channel`    ${process.env.REACT_APP_URL}/fabric/channel
    //http://10.244.0.221:5000/fabric/channel
    const url = `http://10.244.0.167:5001/fabric/channel`;

    const body = {
      user: `${email}`,
      platform,
      version,
      appName,
      channel,
    };

    console.log("body of create channel is", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "start-channel-success",
          payload: response.data,
        });
        console.log("cfg path is:- ", response.data.cfgpath);
        window.localStorage.setItem("cfgpath", response.data.cfgpath);
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "start-channel-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
      });
  };
};

// ******* Upload Fabric Chain-Code Code *******
export const fabricCCScript = (
  decodedToken,
  userEmail,
  platform,
  AppName,
  name,
  language,
  channelss,
  chaincode,
  RouteAfterResponse
) => {
  //console.log(channel)
  return (dispatch) => {
    dispatch({
      type: "fabric-cc-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${decodedToken}`,
      },
    };

    //${process.env.REACT_APP_URL}/fabric/chaincode      http://10.244.0.167:4000/fabric_cc
    //http://10.244.0.221:5000/fabric/chaincode
    const url = `http://10.244.0.167:5001/fabric/chaincode`;

    const body = {
      user: userEmail,
      platform: platform,
      appName: AppName,
      name,
      language: language,
      version: "1.0",
      channel: channelss,
      chaincode,
    };

    console.log("object is", body);
    console.log("language name is", body.language);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "fabric-cc-success",
          payload: response.data,
        });
        RouteAfterResponse(response.data)
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "fabric-cc-fail",
          payload: error,
        });
        toast.error("Success");
      });
  };
};

// ******* Upload Fabric Chain-Code Code *******
export const upgradefabricCCScript = (
  decodedToken,
  userEmail,
  platform,
  AppName,
  name,
  language,
  channelss,
  chaincode
) => {
  console.log(channelss);
  return (dispatch) => {
    dispatch({
      type: "upgradefabric-cc-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${decodedToken}`,
      },
    };

    //${process.env.REACT_APP_URL}/fabric/chaincode      http://10.244.0.167:4000/fabric_cc
    //http://10.244.0.221:5000/fabric/chaincode
    const url = `http://10.244.0.167:5001/fabric/chaincode/update`;

    const body = {
      user: userEmail,
      platform,
      appName: AppName,
      name,
      language: language,
      version: "10.0",
      channel: channelss,
      chaincode,
    };

    console.log("object is", body);
    console.log("language name is", body.language);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "upgradefabric-cc-success",
          payload: response.data,
        });
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "upgradefabric-cc-fail",
          payload: error,
        });
        toast.error("Success");
      });
  };
};

// ******* Enroll Users ************
export const registerUsers = (
  decodedToken,
  organizations,
  isChecked,
  newArr,
  mspId,
  caNames,
  newArrRoles,
  cfgpath,
  newAttrKeysData,
  newAttrValsData
) => {
  console.log("registerUser", cfgpath);
  return (dispatch) => {
    dispatch({
      type: "enroll-user-request",
    });
    // console.log("ddnkodmd",decodedToken)

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": `${decodedToken}`,
      },
    };
    const url = `http://10.244.0.147:4000/fabric/v1/enrollUsers`;

    console.log("newArrRoles", newArrRoles);

    function adStatus(i) {
      let ischeckedornot = isChecked;
      console.log("is checked is:- ", ischeckedornot[i]);
      return ischeckedornot[i];
    }

    function getMsp(i) {
      let msp = mspId;
      //let mssp = msp.split(",")
      //console.log("msp is",mssp[i])
      return msp[i];
    }

    function getCaname(i) {
      let newname = caNames;
      //let newcaname = newname.split(",")
      // console.log("new name is",newname.split(","))

      return newname[i];
    }

    function getUserRole(i) {
      console.log("in function new Arr role is", newArrRoles[i]);
      return newArrRoles[i];
    }

    function getAttData(i) {
      console.log("amdnjfbndbjvhbhjdbfh............", newAttrKeysData[i]);
      return newAttrKeysData[i];
    }

    function getAttValData(i) {
      console.log("amdnjfbndbjvhbhjdbfh............", newAttrValsData[i]);
      return newAttrValsData[i];
    }

    const body = [];

    //console.log("final arr is:-",finalArr)

    for (let i = 0; i < organizations; i++) {
      let checkedStatus = adStatus(i);
      let user = newArr[i];
      //let users = usersdata[i]
      console.log("user    inside loop,", user);
      //console.log("users are",user)
      let msp = `${getMsp(i)}`;
      let caname = `${getCaname(i)}`;
      let userRole = newArrRoles[i];
      let attData = getAttData(i);
      let attValData = getAttValData(i);

      let data = {
        admin: checkedStatus,
        user: user,
        // user : ["deven1","riyaz1"],
        // cfgpath: cfgpath!==""?cfgpath : "/home/cdac3/Desktop/uday/ubfagent/vars/profiles/general_connection_for_nodesdk.json" ,
        //cfgpath: "/home/cdac3/Desktop/uday/ubfagent/vars/profiles/general_connection_for_nodesdk.json",
        cfgpath: cfgpath,
        mspId: `${msp}`,
        //mspId : "cdac-com",
        caname: `${caname}`,
        role: userRole,
        roles: `${attData}`,
        attrkey: `${attValData}`,
        // roles:"test"
      };
      body.push(data);
    }

    console.log("bodys array", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "enroll-user-success",
          payload: response.data,
        });
        toast.success("Success");
        console.log("enroll user :- success");
      })
      .catch((error) => {
        dispatch({
          type: "enroll-user-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
      });
  };
};

// ******* Fabric Stop Network Code *******
export const stopNetwork = (token, email) => {
  return (dispatch) => {
    dispatch({
      type: "network-stop-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    };

    // http://10.244.0.167:4000/stop    ${process.env.REACT_APP_URL}/fabric/down
    //http://10.244.0.221:5000/fabric/down
    const url = `http://10.244.0.167:5001/fabric/down`;

    const body = {
      user: `${email}`,
      platform:"fabric",
      version:"2.2.3",
      appName: `${localStorage.getItem("rowAppName")}`,
    };

    console.log("stop body is ", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "network-stop-success",
          payload: response.data,
        });
        let stopNetworkStoptime = new Date();
        toast.success("Success");
        // alert("Success")
        console.log("stop network :- success");
        console.log("stop network", stopNetworkStoptime);
      })
      .catch((error) => {
        dispatch({
          type: "network-stop-fail",
          payload: error,
        });

        toast.error("Something went wrong !");
        // console.log("stop network :- failed",response.data)
      });
  };
};

// ******* Fabric Remove Network Code ******* //
export const removeNetwork = (token, email) => {
  return (dispatch) => {
    dispatch({
      type: "network-remove-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    };

    // http://10.244.0.167:4000/remove   ${process.env.REACT_APP_URL}/fabric/clean
    //http://10.244.0.221:5000/fabric/clean
    const url = `http://10.244.0.167:5001/fabric/clean`;

    const body = {
      user: `${email}`,
      platform:"fabric",
      version:"2.2.3",
      appName: `${localStorage.getItem("rowAppName")}`,
    };

    console.log("removeNetwork body is ", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "network-remove-success",
          payload: response.data,
        });
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "network-remove-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
      });
  };
};

//********Create Connector Screen  *******/
export const createConnector = (decodedToken, name) => {
  console.log(name);
  return (dispatch) => {
    dispatch({
      type: "connector-api-request",
    });

    const url = `http://10.244.0.167:5000/app/connector`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${decodedToken}`,
      },
    };

    // const body = {
    //   "connectorType": "generic",
    //   "connectorName": `${name}`,
    //   "details":[{'ip':,"mac":}]
    // }

    //console.log("data is ", body)

    axios
      .post(url, name, header)
      .then((response) => {
        dispatch({
          type: "connector-api-success",
          payload: response.data,
        });
        toast.success("Success");
        //console.log("App data is:- ",response.data)
      })
      .catch((error) => {
        dispatch({
          type: "connector-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        //console.log("error is",error)
      });
  };
};

// ********* Sending Organisation data Request ********
export const orgDataSending = (dynamicTokenResponse, orgdata) => {
  console.log(orgdata);
  return (dispatch) => {
    dispatch({
      type: "OrgData-api-request",
    });

    const url = `http://10.244.0.167:4999/label`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${dynamicTokenResponse}`,
      },
    };

    // const body = {
    //   "user": `${localStorage.getItem("email")}`,
    //   "appName": `${name}`,
    //   "platform": `${plat}`,
    //   "env": `${env}`,
    //   "version": "2.2.3",
    //   "connectorType": "generic",
    //   "nodeConf": { "master": master, "worker": worker }
    // }

    //console.log("data is ", body)

    axios
      .post(url, orgdata, header)
      .then((response) => {
        dispatch({
          type: "OrgData-api-success",
          payload: response.data,
        });
        toast.success("Success");
        //console.log("App data is:- ",response.data)
      })
      .catch((error) => {
        dispatch({
          type: "OrgData-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        //console.log("error is",error)
      });
  };
};

//**********Department Admins List ******/
export const departmentAllAppAdmins = (decodedDepartName, dynamicToken) => {
  console.log("All Admin");
  return (dispatch) => {
    dispatch({
      type: "depatmentadmins-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/allDetails`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      deptName: `${decodedDepartName}`,
    };
    console.log("login body of existing Application status", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "depatmentadmins-api-success",
          payload: response.data,
        });
        console.log("all app admins in fabricAction", response);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "depatmentadmins-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

//*********Choose Infra ************/
export const chooseInfrastructure = (ctype, deptname, dynamicToken) => {
  console.log("choose Infra STEP");
  return (dispatch) => {
    dispatch({
      type: "chooseInfra-api-request",
    });

    const url = `http://10.244.0.167:5003/dept/infraApprove`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${dynamicToken}`,
      },
    };

    const body = {
      connectorType: ctype,
      deptName: deptname,
    };
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "chooseInfra-api-success",
          payload: response.data,
        });
        // toast.success("Success");
        //console.log("App data is:- ",response.data)
      })
      .catch((error) => {
        dispatch({
          type: "chooseInfra-api-fail",
          payload: error,
        });
        // toast.error("Something went wrong !");
        //console.log("error is",error)
      });
  };
};

//**********New App Admin Register ******/
export const newAppnAdminRegister = (
  name,
  email,
  phone,
  password,
  decodedDepartName,
  ErrorOfMsg
) => {
  console.log("App Admin Register Fabric Action");
  return (dispatch) => {
    dispatch({
      type: "appAdminregister-api-request",
    });

    const url = `http://10.244.0.167:5003/dept/RegAppAdmin`;

    // const body = {
    //   "first_name": `${fname}`,
    //   "last_name": `${lname}`,
    //   "email": `${email}`,
    //   "password": `${password}`
    // }

    const body = {
      username: `${name}`,
      deptname: `${decodedDepartName}`,
      email: `${email}`,
      password: `${password}`,
      mobile: `${phone}`,
    };

    console.log("body is", body);

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: "appAdminregister-api-success",
          payload: response.data,
        });
        //toast.success("Success");
        console.log("data is:- ", response.data);
        ErrorOfMsg(response.data);
      })
      .catch((error) => {
        dispatch({
          type: "appAdminregister-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        console.log(error);
        return error;
      });
  };
};

// NBF APP ADMINS LIST

// export const  listAppadmin = () => {
//   return (dispatch) => {
//     dispatch({
//       type: "appAdmin-api-request",
//     });

//     const url = `http://10.244.0.223:5003/dept/listappadmin`;

//     axios
//       .get(url)
//       .then((response) => {
//         dispatch({
//           type: "appAdmin-api-success",
//           payload: response.data,
//         });
//         toast.success("Success");
//         console.log("data is:- ", response.data)
//       })
//       .catch((error) => {
//         dispatch({
//           type: "appAdmin-api-fail",
//           payload: error,
//         });
//         toast.error("Something went wrong !");
//         console.log(error)
//         return error
//       });
//   };

// }

//*********List All App Admins **********/
export const listAppAdmin = (decodedDepartName, dynamicToken) => {
  return (dispatch) => {
    dispatch({
      type: "appAdminList-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/listappadmin`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    let body = {
      deptname: decodedDepartName,
    };

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "appAdminList-api-success",
          payload: response.data,
        });
        console.log("exsisiting app in fabricAction", response);

        // toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "appAdminList-api-fail",
          payload: error,
        });
        // toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

export const deptInfraList = (deptname, dynamicToken) => {
  console.log("All Admin");
  return (dispatch) => {
    dispatch({
      type: "deptInfraList-api-request",
    });
    const url = `http://10.244.0.167:5003/nbf/infraApproveList`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      deptName: deptname,
    };
    console.log("login body of existing Application status", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "deptInfraList-api-success",
          payload: response.data,
        });
        console.log("all app admins in fabricAction", response);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "deptInfraList-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

export const userInfraBindingAppAdmin = (
  email,
  deptname,
  ctype,
  cname,
  dynamicToken
) => {
  console.log("All Admin");
  return (dispatch) => {
    dispatch({
      type: "userInfraBindAppAdmin-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/deptUserConnectorApprove`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      email: email,
      deptName: deptname,
      connectorType: ctype,
      connectorName: cname,
    };
    console.log("login body of existing Application status", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "userInfraBindAppAdmin-api-success",
          payload: response.data,
        });
        console.log("all app admins in fabricAction", response);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "userInfraBindAppAdmin-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

export const userenableDisable = (email, checked, dynamicToken) => {
  console.log("inset", checked);
  return (dispatch) => {
    dispatch({
      type: "enableDisable-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/enableDepartment`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      email: email,
      inset: checked,
    };
    console.log("login body of existing Application status", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "enableDisable-api-success",
          payload: response.data,
        });
        console.log("all app admins in fabricAction", response);
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "enableDisable-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

export const netSetUp = (
  dynamicTokenResponse,
  platform,
  environment,
  version,
  channel,
  orderers,
  cas,
  peers,
  pos,
  email
) => {
  return (dispatch) => {
    dispatch({
      type: "all_api_request",
      payload: `${localStorage.getItem("rowAppName")}`,
    });

    // http://10.244.0.167:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.167:5001/fabric/all`;

    const body = {
      user: `${email}`,
      platform,
      version,
      appName: `${localStorage.getItem("rowAppName")}`,
      environment,
      consenus: "devmode",
      channel,
      pos: true,
      db: `${localStorage.getItem("dbvariableItem")}`,
      data: {
        channel,
        fabric: {
          cas,
          peers,
          orderers,
          settings: {
            ca: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
            peer: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
            orderer: {
              FABRIC_LOGGING_SPEC: "INFO",
            },
          },

          netname: "ubf",
        },
      },
    };

    console.log("body of all endpoints is", body);

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: "all_api_success",
          payload: response.data,
        });
        toast.success("Success");
        console.log(
          "iernfiernfvierfvnierfvnienrfvienrfviesnsrfviejnhsfrvikjaed",
          response
        );
      })
      .catch((error) => {
        dispatch({
          type: "all_api_fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        toast.success("Success");
        console.log(
          "errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
          error
        );
      });
  };
};

export const ListOfPlatforms = (dynamicTokenResponse) => {
  console.log("PlatformList");
  return (dispatch) => {
    dispatch({
      type: "platformList-api-request",
    });
    const url = `http://10.244.0.167:5000/platform/listplatforms`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicTokenResponse}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: "platformList-api-success",
          payload: response.data,
        });
        console.log("platformList", response);

        //toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "platformList-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        //toast.success("Success");

        console.log("wrong");
      });
  };
};

// list of vertions
export const listOfVertions = (platform, dynamicTokenResponse) => {
  console.log("listOfvertions");
  return (dispatch) => {
    dispatch({
      type: "listOfvertions-api-request",
    });
    const url = `http://10.244.0.167:5000/platform/listPlatformVersions`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicTokenResponse}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      platform: platform,
    };
    console.log("listOfVertions", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "listOfvertions-api-success",
          payload: response.data,
        });
        console.log("listOfvertions", response);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "listOfvertions-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

//  channel  Name

export const channelTypes = (
  userEmail,
  channelAppName,
  dynamicToken,
  EappStatusRequest
) => {
  console.log("channelNames");
  return (dispatch) => {
    dispatch({
      type: "channelNames-api-request",
    });
    const url = `http://10.244.0.167:5000/app/channellist`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    // const body = {
    //   "user": "devenp@cdac.in",
    //   "appName": "drugtrackandtrace"

    // }
    const body = {
      user: userEmail,
      appName: channelAppName,
    };
    console.log("channelNames", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "channelNames-api-success",
          payload: response.data,
        });
        console.log("channelNames", response);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "channelNames-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

export const nbfAdminDeptRegMng = (dynamicToken) => {
  console.log("NBF Admin");
  return (dispatch) => {
    dispatch({
      type: "nbfAdminDeptRegMng-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/ConfigList`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    //console.log("login body of existing Application status", body)

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: "nbfAdminDeptRegMng-api-success",
          payload: response.data,
        });
        console.log("all app admins in fabricAction", response);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "nbfAdminDeptRegMng-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

// connector types
export const conectorTypes = (email, dynamicToken) => {
  console.log("conectorTypes");
  return (dispatch) => {
    dispatch({
      type: "conectorTypes-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/prefilledDetails`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        "x-access-token": `${dynamicToken}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      email: email,
    };
    console.log("contectorTypes", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "conectorTypes-api-success",
          payload: response.data,
        });
        console.log("conectorTypes", response);

        //toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "conectorTypes-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

// domain roles
export const domainRolesTypes = () => {
  console.log("domainRolesTypes11111111");
  return (dispatch) => {
    dispatch({
      type: "domainRolesTypes-api-request",
    });
    const url = `http://10.244.0.167:5000/app/domain`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // "x-access-token": `${localStorage.getItem("token")}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    // const body = {
    //   "email":"deven2@cdac.in",

    // }
    // console.log("contectorTypes", body)

    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: "domainRolesTypes-api-success",
          payload: response.data,
        });
        console.log("domainRolesTypes", response.data);

        //toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "domainRolesTypes-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

// Roles Data
export const dynamicRoleTypes = (roles) => {
  console.log("dynamicRolesTypes");
  return (dispatch) => {
    dispatch({
      type: "dynamicRolesTypes-api-request",
    });
    const url = `http://10.244.0.167:5000/app/roles`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        // "x-access-token": `${localStorage.getItem("token")}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    const body = {
      domainName: roles,
    };
    console.log("contectorTypes", body);

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "dynamicRolesTypes-api-success",
          payload: response.data,
        });
        console.log("dynamicRolesTypes", response);

        //toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "dynamicRolesTypes-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

//*******ORGANIZATION DATA STORAGE **********/
export const organizationDataStore = (orgdata) => {
  return (dispatch) => {
    dispatch({
      type: "OrgDatasent-api-request",
    });

    // http://10.244.0.167:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.167:5000/app/adata`;

    const body = {
      email: `${localStorage.getItem("email")}`,
      appName: `${localStorage.getItem("rowAppName")}`,
      data: orgdata,
    };

    console.log("orgs bodyyyyyyy", body);

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: "OrgDatasent-api-success",
          payload: response.data,
        });
        toast.success("Success");
        //console.log("gggggggggggggggggggggggggg",JSON.parse(response[0]))
      })
      .catch((error) => {
        dispatch({
          type: "OrgDatasent-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

//********ORGANIZATION DETAILS FETCH API *********/
export const organizationDataFetchStore = (userEmail, channelAppName) => {
  return (dispatch) => {
    dispatch({
      type: "OrgDatafetch-api-request",
    });

    // http://10.244.0.167:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.167:5000/app/fdata`;

    const body = {
      // "email": `${localStorage.getItem("email")}`,
      // "appName" : `${localStorage.getItem("rowAppName")}`,
      // //"data":orgdata,
      email: userEmail,
      appName: channelAppName,
    };

    console.log("orgs bodyyyyyyy", body);

    axios
      .post(url, body)
      .then((response) => {
        dispatch({
          type: "OrgDatafetch-api-success",
          payload: response.data,
        });
        // toast.success("Success");
        //console.log("gggggggggggggggggggggggggg",JSON.parse(response[0]))
      })
      .catch((error) => {
        dispatch({
          type: "OrgDatafetch-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};
// connector names end points

export const nbfadminConnectorNames = (ctype, decodedName) => {
  return (dispatch) => {
    dispatch({
      type: "adminConnectorNames-api-request",
    });

    // http://10.244.0.167:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.167:5003/dept/conDetails`;

    const body = {
      fck: ctype,
      deptName: decodedName,
    };

    console.log("orgs bodyyyyyyy", body);

    axios
      .post(url, body)
      .then((response) => {
        console.log("response", response);
        dispatch({
          type: "adminConnectorNames-api-success",
          payload: response.data,
        });
        toast.success("Success");
        //console.log("gggggggggggggggggggggggggg",JSON.parse(response[0]))
      })
      .catch((error) => {
        dispatch({
          type: "adminConnectorNames-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

// nbfadminLogin

export const nbfAdminLogins = (
  nameuser,
  passwordUser,
  RouteBasedOnResponse
) => {
  return (dispatch) => {
    dispatch({
      type: "nbfAdminLogin-api-request",
    });

    // http://10.244.0.167:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.167:5003/nbf/adminLogin`;

    const body = {
      email: nameuser,
      password: passwordUser,
    };

    console.log("orgs bodyyyyyyy", body);

    axios
      .post(url, body)
      .then((response) => {
        console.log("response", response);
        dispatch({
          type: "nbfAdminLogin-api-success",
          payload: response.data,
        });
        RouteBasedOnResponse(response.data);
        toast.success("Success");
        //console.log("gggggggggggggggggggggggggg",JSON.parse(response[0]))
      })
      .catch((error) => {
        dispatch({
          type: "nbfAdminLogin-api-fail",
          payload: error,
        });
        //toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

export const ListofNIps = () => {
  return (dispatch) => {
    dispatch({
      type: "nbfgetNIPS-api-request",
    });
    const url = `http://10.244.0.167:5003/nbf/getNIps`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        // "x-access-token": `${sessionStorage.getItem("token")}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    axios
      .get(url, header)
      .then((response) => {
        let ipsData = [];
        console.log(response.data);
        if (response.data !== undefined) {
          response.data.forEach((element) => {
            const body = {
              location: element.details.location,
              IP: element.ip,
            };
            ipsData.push(body);
          });
        }
        dispatch({
          type: "nbfgetNIPS-api-success",
          payload: response,
        });
        console.log("IPS", ipsData);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "nbfgetNIPS-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

export const chooseInfaStr=(connectorDetails,deptname,IP,typeOfNode,emailData)=>{
  return (dispatch) => {
    dispatch({
      type: "chooseInfraStr-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/InfraApprove`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // "x-access-token": `${sessionStorage.getItem("token")}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };
    const body={
      "connectorType":connectorDetails,
      "deptName":deptname,
      "ip":IP,
      "node":typeOfNode,
      "reqadmin":emailData
    }
    console.log(body)
    axios
      .post(url,body, header)
      .then((response) => {
        dispatch({
          type: "chooseInfraStr-api-success",
          payload: response.data,
        });
        console.log(response)

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "chooseInfraStr-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong")
      });
  };
}

export const ListOfInfra = () => {
  console.log('InfraList')
  return (dispatch) => {
    dispatch({
      type:"infraList-api-request",
    });
    const url = `http://10.244.0.167:5003/nbf/infraList`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        // "x-access-token": `${sessionStorage.getItem("token")}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: "infraList-api-success",
          payload: response.data,
        });
        console.log("infraList", response)

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "infraList-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong")
      });
  };
}

export const nbfInfraApprove = (connectorName,status,getInfraList) => {
  console.log('Infra Enable Disable')
  return (dispatch) => {
    dispatch({
      type: "nbfInfraApprove-api-request",
    });
    const url = `http://10.244.0.167:5003/nbf/infraApprove`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        // "x-access-token": `${sessionStorage.getItem("token")}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };
    const body = {
      "connectorId": connectorName,
      "status": status
    }
    console.log(body)
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "nbfInfraApprove-api-success",
          payload: response.data,
        });
        console.log(response)
        getInfraList()
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "nbfInfraApprove-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong")
      });
  };
}

export const ListofIps=()=>{
  return (dispatch) => {
    dispatch({
      type:"nbfgetIPS-api-request",
    });
    const url = `http://10.244.0.167:5003/nbf/getIps`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
        // "x-access-token": `${sessionStorage.getItem("token")}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };

    axios
      .get(url, header)
      .then((response) => {
        let ipsData=[]
        console.log(response.data)
        if(response.data!==undefined){
          response.data.forEach((element) => {
            const body = {
              uuid: element.uuid,
              HDD: element.details.storage,
              RAM: element.details.ram,
              cores: element.details.cores,
              location: element.details.location,
              IP: element.ip,
              user: element.loginDetails.userName,
              password: element.loginDetails.userPassword,
            }
            ipsData.push(body)
        })
        }
        dispatch({
          type: "nbfgetIPS-api-success",
          payload: ipsData,
        });
        console.log("IPS", response)

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "nbfgetIPS-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong")
      });
  };
}

export const nbfAddInfra=(HDD,RAM,cores,location,ctype,ip,mac,username,password,getListOfIps)=>{
  return (dispatch) => {
    dispatch({
      type: "nbfaddIPS-api-request",
    });
    const url = `http://10.244.0.167:4999/addIP`;

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": `${sessionStorage.getItem("token")}`,
        //"x-access-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI5MTAxNzkyN2E4YjFkY2MxODQxN2Y2IiwiZW1haWwiOiJhYmNAY2RhYy5pbiIsImlhdCI6MTY1NDAwMzYyMiwiZXhwIjoxNjU0MDEwODIyfQ.bb3IYNQAeCVUzoXvMAo3xKA81LzgYrquVRPUZDq3P4w`
      },
    };
    const body = {
      "details":[{
        "ip":ip,
        "mac":mac,
        "conf":{
            "storage":HDD,
            "ram":RAM,
            "cores":cores,
            "location":location,
        },
        "loginDetails":{
            "userName":username,
            "userPassword":password
        }
    }],
  "connectorType":ctype,
 
 
    }
    console.log(body)
    axios
      .post(url,body, header)
      .then((response) => {
        dispatch({
          type: "nbfInfraApprove-api-success",
          payload: response.data,
        });
        console.log(response)
        getListOfIps()
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "nbfInfraApprove-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong")
      });
  };

}

// Location End Points  

export const nbfAdminLocations = () => {
  console.log("NBF Admin");
  return (dispatch) => {
    dispatch({
      type: "nbfAdminLocations-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/getLocation`;

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //console.log("login body of existing Application status", body)

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: "nbfAdminLocations-api-success",
          payload: response.data,
        });
        console.log("all app admins in fabricAction", response);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "nbfAdminLocations-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};

// addInfra ConnectorNames  

export const nbfAdminConnectorNames = () => {
  
  return (dispatch) => {
    dispatch({
      type: "nbfAdminConnectorNames-api-request",
    });
    const url = `http://10.244.0.167:5003/dept/getConnectorTypes`;

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //console.log("login body of existing Application status", body)

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: "nbfAdminConnectorNames-api-success",
          payload: response.data,
        });
        console.log("all app admins in fabricAction", response);

        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "nbfAdminConnectorNames-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log("wrong");
      });
  };
};