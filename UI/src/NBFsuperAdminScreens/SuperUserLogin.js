import React, { useEffect, useState, Suspense} from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import bgimage from "../images/bgimage.svg";

import Group from "../images/Group.png";
import logo from "../images/logo.png";
import NBF from "../images/01.png";

// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Stack from '@mui/material/Stack';
// import MuiAlert from '@mui/material/Alert';

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getObject } from "../actions/Fabric/FabricAction";
import FirstScreen from "../screens/FirstScreen";
import Header from "../components/Header";

import ModifiedFooter from "../components/ModifiedFooter";

import "../css/loginScreen.css";
import { FcLock } from "react-icons/fc";

import "../css/header.css";

const SuperUserLogin = (props) => {
  //const {setProfile} = props

  let data = useSelector((store) => store.login_api);
  let { error, response, loading } = data;

  const [apiResponse,setApiResponse] = useState("")

  useEffect(() => {
    if(response && response.token && response.token !== undefined){
      setApiResponse(response)
    }
  },[response])
  
  console.log("apiResponse",apiResponse)

  // console.log("response is",response)
  // console.log("error is",error)

  let newToken = localStorage.getItem("token");
  let history = useNavigate();

  const dispatch = useDispatch();

  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("user");


  let usernameEmpty = false;
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  let usernameError = "usernameRequired**";
  let passwordError = "passwordRequired**";

  const emailChange = (event) => {
    // console.log("event",event.target.value)
    localStorage.setItem("email",`${event.target.value}`)
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  async function getData() {
    let result = await (dispatch(getObject(username, password)),response);
    console.log("result isssssssssssssssssss",response)
    console.log("result isssssssssssssssssss",result)

    // return
    //   { response.token !== undefined && 
    
    //     (
    //     <Suspense fallback={<h1>Loading profile...</h1>}>
    //       {history("/choose_nw")}
    //     </Suspense>
    //     )
    //   }
      
    
    // if ((username && password) !== "null") {
    //   dispatch(getObject(username, password));
      

    //   //history("/choose_nw")
    // //   let result = await response
    // //   if(result !== undefined){
    // //     history("/first_screen");
    // //   }
    // //   else{
    // //     history("/")
    // //   }
    // //   // if (response !== undefined) {
    // //   //   console.log("response is", response);
    // //   //   history("/first_screen");
    // //   // } else {
    // //   //   console.log("error is", error);
    // //   // }
    // } 
    // else {
    //   if (username === "") {
    //     usernameEmpty = true;
    //     return usernameError;
    //   } else {
    //     usernameEmpty = false;
    //   }
    //   if (password === "") {
    //     setPasswordEmpty(true);
    //     return passwordError;
    //   } else {
    //     setPasswordEmpty(false);
    //   }
    // }
  }

  useEffect(() => {
    if (response && response.token && response.token !== undefined) {
      history("/first_screen");
      //response = ""
    }

  },[response])

  let setSnackBarIsOpen = ''

  useEffect(() => {
    if (error && error.response.data) {
     // setErrorMsg(error.response.data)
      // errormsg = error.response.data
      // console.log("enter into failure loop",errormsg);
      setSnackBarIsOpen(true);
    }
  }, [error]);

   //******************Snack bar part code****************

  //  const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setSnackBarIsOpen(false);
  // };

  // const successhandleClose = (event,reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setsuccessSnackBarIsOpen(false);
  // };


  // const action = (
  //   <React.Fragment>
  //     {/* <Button color="secondary" size="small" onClick={handleClose}>
  //       UNDO
  //     </Button> */}
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );


  

  //*************************************************** */


  function regPage() {
    history("/register");
  }

  function onclicksignin() {
    history("/");
  }


  return (
    //token !== null window.location.path
    <>
    {/* {(apiResponse !== "") ? window.location.pathname = "/first_screen":"null"} */}
    <div style={{ width: '100%', height: '100%', backgroundColor: 'white', flexDirection: "row", display: "flex" }}>
      <div
        style={{
          width: "50%",
          backgroundImage: `url(${Group})`,
          backgroundSize: "cover",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="" style={{ alignItems: "center", marginLeft: "20%" }}>
          <img
            src={NBF} />
        </div>
        <div style={{ marginLeft: "20%", textAlign: "Left" }}>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#FFFFFF",
              marginTop: "18px",
            }}
          >
            Welcome to{" "}
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              NATIONAL BLOCKCHAIN FRAMEWORK
            </span>
          </p>
          <hr
            style={{
              color: "#FFFFFF",
              opacity: "68%",
              width: "57%",
              marginLeft: "",
            }}
          />
        </div>
        <p
          style={{
            fontStyle: "Medium",
            fontSize: "13px",
            textAlign: "left",
            letterSpacing: "0.39px",
            lineHeight: "22px",
            opacity: "80%",
            color: "#ffffff",
            marginLeft: "20%",
            width: "57%",
          }}
        >
          The 'National Strategy on Blockchain' as brought out by the Ministry
          of Electronics and Information Technology (MeitY), Government of
          India,
        </p>
        <div style={{ marginLeft: "20%" }}>
          <button
            style={{
              opacity: "100%",
              top: "89.09px",
              width: "130px",
              height: "40.03px",
              backgroundColor: "transparent",
              color: "#ffffff",
              fontSize: "13px",
              border: "1px solid #ffffff"
            }}
          >
            Read more ...
          </button>
        </div>
      </div>
      <div style={{ width: "50%" }} className="d-flex flex-column justify-content-start align-items-center">
        <div>
          <img
            src={logo}
            width={180}
            alt="MEITY LOGO"
            style={{ height: 'auto' }}
          />
        </div>
        <div style={{ border: "2px solid #EFEFEF", width: "40%", height: "450px" }}>
          <div
            className="w-100 d-flex flex-row justify-content-between"
            style={{ height: "10%" }}
          >
            <h4 style={{marginLeft:'9%',marginTop:'9%'}}>Login</h4>
            
          </div>
          <div
            className="mt-5"
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "10%",
            }}
          >
            <Form>
              <Form.Group id="email" className="mb-3">
                <Form.Label
                  style={{
                    fontSize: "14px",
                    fontStyle: "Regular",
                    letterSpacing: "0.35px",
                    lineHeight: "17px",
                    fontWeight: "900",
                  }}
                >
                  Enter Your Email
                </Form.Label>
                <InputGroup
                  style={{
                    width: "140%",
                    border: "1px solid #E1E1E1",
                    borderRadius: "3px 3px 3px 3px",
                    height: "42.97px",
                  }}
                >
                  <Form.Control
                    autoFocus
                    required
                    type="email"
                    placeholder="example@company.com"
                    value={username}
                    onChange={emailChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Group id="password" className="mb-4">
                  <Form.Label
                    style={{
                      fontSize: "14px",
                      fontStyle: "Regular",
                      letterSpacing: "0.35px",
                      lineHeight: "17px",
                      fontWeight: "900",
                    }}
                  >
                    Your Password
                  </Form.Label>
                  <InputGroup
                    style={{
                      width: "140%",
                      border: "1px solid #E1E1E1",
                      borderRadius: "3px 3px 3px 3px",
                      height: "42.97px",
                    }}
                  >
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={passwordChange}
                    />
                  </InputGroup>
                  {/* {passwordEmpty && (
                    <p style={{ color: "red" }}>{passwordError}</p>
                  )} */}
                </Form.Group>
              </Form.Group>
            </Form>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "20%",
              }}
            >
              <Button
                style={{
                  border: "1px solid #E1E1E1",
                  borderRadius: "3px 3px 3px 3px",
                  width: "140%",
                  height: "42.62px",
                  //marginLeft: "45%",
                  backgroundColor: "#137EA9",
                  fontStyle: "Poppins-Medium",
                  fontSize: "15px",
                  letterSpacing: "0.38px",
                  lineHeight: "18px",
                  fontWeight: "900",
                }}
                type="submit"
                onClick={getData}
              >
                Sign In
              </Button>
            </div>
          </div>
          <div
            className="d-flex flex-row justify-content-between align-items-center"
            style={{ width: "84%", marginLeft: "10%" }}
          >
            <div className="d-flex flex-row justify-content-center align-items-center">
              <input
                type="checkbox"
                className="mb-3"
                style={{ border: "2px solid #898989 2px 2px 2px 2px" }}
              />
              <p
                className=""
                style={{
                  fontStyle: "Regular",
                  fontSize: "12px",
                  letterSpacing: "0.6px",
                  lineHeight: "15px",
                  textAlign: "left",
                  color: "#000000",
                  opacity: "60%",
                  width: "100px",
                  height: "14px",
                }}
              >
                Remember Me
              </p>
            </div>
            <div>
              <p
                style={{
                  fontStyle: "Regular",
                  fontSize: "12px",
                  fontWeight: "900",
                  letterSpacing: "0.3px",
                  lineHeight: "15px",
                  textAlign: "right",
                  color: "#004B8F",
                  opacity: "100%",
                  width: "115px",
                  height: "14px",
                }}
              >
                Forgot Password?
              </p>
            </div>
          </div>
          <hr
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginLeft: "10%",
              marginRight: "7%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <strong
              style={{
                color: "#017BA8",
                textAlign: "center",
                fontStyle: "regular",
                fontSize: "14px",
                letterSpacing: "0.35px",
                lineHeight: "17px",
                fontWeight: "900",
                opacity: "100%",
                cursor: "pointer"
              }}
              onClick={regPage}
            >
              Register New User?
            </strong>
          </div>
          <div className="" style={{ width: "90%" }}>
            <ModifiedFooter />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SuperUserLogin;
