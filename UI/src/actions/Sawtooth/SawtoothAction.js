import axios from "axios";
import { toast } from "react-toastify";

// Sawtooth Endpoints Start From Here
// ******* Generate Script Endpoint for Sawtooth Network Creation *******
// export const genSawtoothScript = (platform, nodes, consensus) => {
  
//   return (dispatch) => {
//     dispatch({
//       type: "sawooth-api-request",
//     });

//     const header = {
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": `${localStorage.getItem("token")}`,
//       },
//     };

//     // http://c80b-203-194-101-117.ngrok.io      http://localhost:4000/sawtooth
//     const url = `http://10.244.0.140:5001/fabric/generate`;

//     const body = {
//       user: `${localStorage.getItem("email")}`,
//       platform,
//       version: "1.2.6",
//       consensus,
//       peering: "static",
//       noOfnode: 1,
//       scheduler: "serial",
//       network: "trust",
//       keys: "default",
//     };
//     console.log('sawtooth generate flow',body)
    

//     axios
//       .post(url, body, header)
//       .then((response) => {
//         dispatch({
//           type: "sawooth-api-success",
//           payload: response.data,
//         });
//         toast.success("Success");
//       })
//       .catch((error) => {
//         dispatch({
//           type: "sawooth-api-fail",
//           payload: error,
//         });
//         toast.error("Something went wrong !");
//       });
//   };
// };

export const genSawtoothScript = (
  platform,
  environment,
  version,
  channel,
  orderers,
  cas,
  peers,
  pos,
  db,
) => {
  return (dispatch) => {
    dispatch({
      type: "sawtooth-api-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    };

    // http://localhost:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.140:5001/fabric/gensawtooth`;

    const body = {
      user: `${localStorage.getItem("email")}`,
      platform:`${localStorage.getItem("Platform")}`,
      version:`${localStorage.getItem("Version")}`,
      appName: `${localStorage.getItem("AppName")}`,
      environment:`${localStorage.getItem("Environment")}`,
    };

    console.log("obj", body)
    console.log("bodys array db variable", body.db)
    console.log("bodys array db variable type", typeof (body.db))
    //console.log("bodys array pos variable type",typeof(body.pos))

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "sawtooth-api-success",
          payload: response.data,
        });
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "sawtooth-api-fail",
          payload: error,

        });
        toast.error("Something went wrong !");
      });
  };
};

// ******* start sawtooth network endpoint *******
// export const startSawtoothScript = () => {
//   return (dispatch) => {
//     dispatch({
//       type: "sawtooth-start-request",
//     });

//     const header = {
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": `${localStorage.getItem("token")}`,
//       },
//     };

//     //http://c80b-203-194-101-117.ngrok.io/runstartscript      http://localhost:4000/start_sawtooth_nw
//     const url = `http://10.244.0.140:5001/fabric/up`;

//     axios
//       .get(url, header)
//       .then((response) => {
//         dispatch({
//           type: "sawtooth-start-success",
//           payload: response.data,
//         });
//         toast.success("Success");
//       })
//       .catch((error) => {
//         dispatch({
//           type: "sawtooth-start-fail",
//           payload: error,
//         });
//         toast.error("Something went wrong !");
//       });
//   };
// };

export const startSawtoothScript = (platform, version, appName) => {
  return (dispatch) => {
    dispatch({
      type: "sawtooth-start-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    };

    // `http://localhost:4000/start_network`    ${process.env.REACT_APP_URL}/fabric/up
    //http://10.244.0.221:5000/fabric/up
    const url = `http://10.244.0.140:5001/fabric/up`;

    const body = {
      user: `${localStorage.getItem("email")}`,
      platform: `${localStorage.getItem("Platform")}`,
      consenus: 'devmode',
      version:`${localStorage.getItem("Version")}`,
      appName:`${localStorage.getItem("AppName")}`,
    };

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "sawtooth-start-success",
          payload: response.data,
        });
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "sawtooth-start-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
      });
  };
};

// ******* stop sawtooth network endpoint *******
export const stopSawtoothScript = () => {
  return (dispatch) => {
    dispatch({
      type: "sawtooth-stop-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    };

    //http://c80b-203-194-101-117.ngrok.io/runstopscript    http://localhost:4000/stop_sawtooth_nw
    const url = `http://10.244.0.140:5001/fabric/down`;

    const body = {
      user: `${localStorage.getItem("email")}`,
      platform:`${localStorage.getItem("Platform")}`,
      version:`${localStorage.getItem("Version")}`,
      appName: `${localStorage.getItem("AppName")}`,
    };

    axios
      .post(url,body, header)
      .then((response) => {
        dispatch({
          type: "sawtooth-stop-success",
          payload: response.data,
        });
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "sawtooth-stop-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
      });
  };
};

// ******* Sawtooth Transaction Processor endpoint *******
export const sawtoothTPScript = (tp,chaincode) => {
  return (dispatch) => {
    dispatch({
      type: "sawtooth-tp-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //http://10.210.0.124:3033/start_tp    http://localhost:4000/sawtooth_tp
    const url = `http://10.244.1.140:5001/start_tp`;

    const body = {
      tp,
      ip: "10.210.0.83",
      chaincode,
    };

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: "sawtooth-tp-success",
          payload: response.data,
        });
        toast.success("Success");
      })
      .catch((error) => {
        dispatch({
          type: "sawtooth-tp-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
      });
  };
};

export const getSawtoothImage = () => {
  return (dispatch) => {
    dispatch({
      type: "getImage-api-request",
    });

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    };

    // http://localhost:4000/generate_network
    // ${process.env.REACT_APP_URL}/fabric/generate
    //http://10.244.0.221:5000/fabric/generate

    const url = `http://10.244.0.140:5000/diagram`;

    //console.log("obj", body)

    axios
      .post(url,header)
      .then((response) => {
        dispatch({
          type: "getImage-api-success",
          payload: response.data,
        });
        let newData = response.data;
        console.log(newData)
        localStorage.setItem("Sawtooth_base64code", newData);
        toast.success("Success");
        // console.log("data is:- ",response.data)
      })
      .catch((error) => {
        dispatch({
          type: "getImage-api-fail",
          payload: error,
        });
        toast.error("Something went wrong !");
        console.log(error)
      });
  };
};
