import React, { useEffect, useState, Suspense,useRef } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { toast } from "react-toastify";
import findapp from "../Errors/errors.json"

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import {BiHelpCircle} from "react-icons/bi"

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
  Overlay,
  Tooltip
} from "@themesberg/react-bootstrap";
import bgimage from "../images/bgimage.svg";

import Group from "../images/Group.png";
import logo from "../images/logo.png";
import NBF from "../images/01.png";
import epramaan_img from "../images/e-pramaan1.jpeg";
import { URL } from "../config"
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Stack from '@mui/material/Stack';
// import MuiAlert from '@mui/material/Alert';
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getObject } from "../actions/Fabric/FabricAction";
import FirstScreen from "../screens/FirstScreen";
import Header from "../components/Header";

import ModifiedFooter from "../components/ModifiedFooter";
import Footer from "../components/Footer";
import "../css/loginScreen.css";
import { FcLock } from "react-icons/fc";

import "../css/header.css";
import { textAlign } from "@mui/system";
import HelpIcon from '@mui/icons-material/Help';


const LoginScreen = (props) => {
  //const {setProfile} = props

  let data = useSelector((store) => store.login_api);
  let { error, response, loading } = data;
  // console.log("newresponse",response)

  // const [apiResponse,setApiResponse] = useState("")

  // useEffect(() => {
  //   if(response && response.token && response.token !== undefined){

  //     setApiResponse(response)

  //   }
  // },[response])
  // console.log("response is",response)
  // console.log("error is",error)
  // snack bar  Data
  const [ApiDataSave, setApiDataSavae] = useState("")
  const [open, setOpen] = useState(false);

  const vertical = "top"
  const horizontal = "right"

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  // snack bar close Data

  let newToken = localStorage.getItem("token");
  let history = useNavigate();

  const dispatch = useDispatch();

  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("user");
  const [loginEmailError, setLoginEmailError] = useState(false)
  const [loginPasswordError, setLoginPasswordError] = useState(false)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  const [loginErrorEmailMsg, setLoginErrorEmailMsg] = useState("")     
  const [loginErrorPasswordMsg, setLoginErrorPasswordMsg] = useState("")   
  const [showPassword, setShowPassword] = useState(false) 

  let usernameEmpty = false;
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  let usernameError = "usernameRequired**";
  let passwordError = "passwordRequired**";

  const [show,setShow]=useState(false)
  const target = useRef(null)

  function emailValidation(email) {
    //const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   // const emailRegex= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   //const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g 
   const emailRegex = /^\w+([\.-]?w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/
   return emailRegex.test(email)
  }

  function specialCharacterInPassword(password){
    var specialCharacterCheck = /^(?=.*[!@#$%^&*()_+{}:;"'<>,.?])/
    return specialCharacterCheck.test(password)
  }

  function passwordValidation(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,15}$/;
    return passwordRegex.test(password)
  }


  const emailChange = (e) => {
    setLoginEmailError(false)
    setLoginErrorEmailMsg("")
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    if(password.length<24){
      setLoginPasswordError(false)
      setLoginErrorPasswordMsg("")
      setPassword(e.target.value);
    }else{
      setLoginPasswordError(false)
      setLoginErrorPasswordMsg("")
      if(e.nativeEvent.inputType==="deleteContentBackward"){
        setPassword(password.substring(0,password.length-1))
      }
    }
  };

  /*const passwordChange = (e) => {
    if(password.length<24){
    if(!specialCharacterInPassword(e.target.value)){
      setLoginPasswordError(true)
      setLoginErrorPasswordMsg("At least 1 special character should present")
    }else if(!passwordValidation(e.target.value)){
      setLoginPasswordError(true)
      setLoginErrorPasswordMsg("Password not validated")
    }
    else{
      setLoginPasswordError(false)
      setLoginErrorPasswordMsg("")
    }
    setPassword(e.target.value);
    }else{
      if(e.nativeEvent.inputType==="deleteContentBackward"){
        setPassword(password.substring(0,password.length-1))
      }
    }
  };*/

  async function getData(event) {

    event.preventDefault();

    if(!emailValidation(username)){
      setLoginEmailError(true)
      setLoginErrorEmailMsg("Invalid Email")
      if(localStorage.getItem("email")) localStorage.removeItem("email")
    }else{
      setLoginEmailError(false)
    setLoginErrorEmailMsg("")
    localStorage.setItem("email",`${username}`)
    }

    if(!specialCharacterInPassword(password)){
      setLoginPasswordError(true)
      setLoginErrorPasswordMsg("Atleast 1 special character")
    }else if(!passwordValidation(password)){
      setLoginPasswordError(true)
      setLoginErrorPasswordMsg("Password not validated")
    }else{
      setLoginPasswordError(false)
      setLoginErrorPasswordMsg("")
    }
    (dispatch(getObject(username, password)));

    // const myPromise = new Promise((resolve, reject) => {
    //   resolve(dispatch(getObject(username, password)))
    // });
    // myPromise.then((data)=>{
    //   console.log("result isssssssssssssssssss", data)
    // console.log("result isssssssssssssssssss", result)
    // })

    // console.log("result isssssssssssssssssss", response)
    // console.log("result isssssssssssssssssss", result)

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
  };




  let finalLink;
  function LinkURL() {

    const url = `${URL}/dept/sso/linkURL`;
    axios.post(url).then((response) => {

      const data = response.data;
      console.log(data);
      localStorage.clear();
      localStorage.setItem('link', JSON.stringify(data[0]));
      localStorage.setItem('clientId', JSON.stringify(data[1]));
      localStorage.setItem('nonceValue', JSON.stringify(data[2]));
      localStorage.setItem('codeVerifier', JSON.stringify(data[3]));
      localStorage.setItem('path', "/login");



      finalLink = data[0];
      console.log("finalLink => " + finalLink)
      window.location.replace(finalLink);

    });

  }

  // console.log("response", response)
  // console.log("error", error)

  useEffect(() => {

    if (response) {

      var errorcode = response.statusCode
      console.log("errorcode",errorcode)
      console.log("errorcode", errorcode)
      for (let key in findapp) {
        // console.log("key",key)
        let extract = findapp[key]
        if (key === errorcode) {
           console.log("extract", extract)
          setOpen(true)
          setApiDataSavae(extract)

        }





      }

      history("/")
      if (response.token) {
        let decoded = jwt_decode(response.token)
        console.log("deoded", decoded.role)
        if (decoded.role === "deptreg")
          history("/departmentDashboard")
        else if (decoded.role === "appAdmin")
          history("/eapp")
      }

      // } else if (response !== undefined) {

      //   console.log("responseToken", response)
      //   let decoded = jwt_decode(response)
      //   console.log("deoded", decoded.role)
      //   if (decoded.role === "deptreg") {
      //     history("/departmentDashboard")
      //   }else if(decoded.role === "appAdmin"){
      //     history("/eapp")

      // }

      // history("/departmentDashboard");
      //response = ""
    }



    // console.log("responseToken", response)

  }, [response])

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
        <div style={{ width: "50%", height: "80%" }} className="d-flex flex-column justify-content-start align-items-center">
          <div>
            <img
              src={logo}
              width={140}
              alt="MEITY LOGO"
              style={{ height: 'auto' }}
            />
          </div>
          <div style={{ border: "2px solid #EFEFEF", width: "40%", height: "80%" }}>
            {/*<div
              className="w-100 d-flex flex-row justify-content-between"
              style={{ height: "10%" }}
            >
              <button
                className={
                  activeTab === "user"
                    ? "selectedbutton button"
                    : "button unselectedbutton"
                }
                onClick={() => setActiveTab("user")}
              >
                User
              </button>
              <button
                className={
                  activeTab === "admin"
                    ? "selectedbutton button"
                    : "button unselectedbutton"
                }
                onClick={() => setActiveTab("admin")}
              >
                Admin
              </button>
              </div>*/}
            <h5 style={{ marginLeft: '26%', marginTop: '5%' }}>Department Login</h5>
            <div
              className="mt-4"
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "10%",
              }}
            >


              <Form onSubmit={getData} >





                <Form.Group id="email" className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: "14px",
                      fontStyle: "Regular",
                      letterSpacing: "0.35px",
                      lineHeight: "17px",
                      fontWeight: "900",
                      color: "black",
                      textAlign: "left"
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
                      autoComplete="off"
                      placeholder="example@company.com"

                      value={username}
                      onChange={emailChange}
                    />
                  </InputGroup>
                {username!=="" && loginEmailError &&<p style={{color:"red",fontSize:"10px"}}>{loginErrorEmailMsg}</p>}
                </Form.Group>
                <Form.Group>
                  <Form.Group id="password" className="mb-4 mt-2">
                    <Form.Label
                      style={{
                        fontSize: "14px",
                        fontStyle: "Regular",
                        letterSpacing: "0.35px",
                        lineHeight: "17px",
                        fontWeight: "900",
                        color: "black",
                        textAlign: "left"
                      }}
                    >
                      Your Password
                    </Form.Label>
                    {/* <InputGroup
                      style={{
                        width: "140%",
                        border: "1px solid #E1E1E1",
                        borderRadius: "3px 3px 3px 3px",
                        height: "42.97px",
                      }}
                    >
                      <Form.Control
                        required
                        type={!showPassword?"password":"text"}
                        placeholder="Password"
                        value={password}
                        onChange={passwordChange}
                        autoComplete="off"
                        style={{
                          width:"90%",
                          boxShadow:"none",
                         
                          border:0
                        }}
                      />
                       <Button onClick={()=>setShowPassword(!showPassword)} variant="outline-secondary" id="button-addon1" style={{
                          border:"none",
                          boxShadow:"none",
                          marginLeft:"0",
                          background:'none'
        
                        }}>
                      {!showPassword?<AiOutlineEye style={{margin:"5px"}} color="black"/>:<AiOutlineEyeInvisible style={{margin:"5px"}} color="black"/>}
                      </Button> 
                    </InputGroup> */}
                    <InputGroup
                      style={{
                        width: "140%",
                        border: "1px solid #E1E1E1",
                        borderRadius: "3px 3px 3px 3px",
                        height: "42.97px",
                        display:"flex",
                        alignItems:"center",
                        height:"100%"
                      }}
                      bsPrefix="password-field"
                    >
                      <Form.Control
                        required
                        type={!showPassword?"password":"text"}
                        placeholder="Password"
                        value={password}
                        // onmouseover="mytoolTip('Click a form field to see its requirements.')" onmouseout="mytoolTip('')"
                        onChange={passwordChange}
                        autoComplete="off"
                        style={{
                          width:"100%",
                          boxShadow:"none",
                          border:0
                        }}
                      />
                       <Button onClick={()=>setShowPassword(!showPassword)} variant="outline-secondary" id="button-addon1" style={{
                          border:"none",
                          boxShadow:"none",
                          marginLeft:"0",
                          background:'none'
        
                        }}>
                      {!showPassword?<AiOutlineEye style={{margin:"5px"}} color="black"/>:<AiOutlineEyeInvisible style={{margin:"5px"}} color="black"/>}
                      </Button>
                      <Button variant="outline-secondary" id="button-addon2" ref={target} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}
                      style={{
                          border:"none",
                          boxShadow:"none",
                          marginLeft:"0",
                          background:'none'
                        }}>
                          <BiHelpCircle color="black"/>
                        </Button>
                        <Overlay target={target.current} show={show} placement="bottom">
                          {(props)=>(
                            <Tooltip id="overlay" {...props}>
                              Password must contain 3-24 characters: with atleast a number, a upper case and a special character
                            </Tooltip>
                          )}
                        </Overlay>
                    </InputGroup> 
                    
                    {/* {passwordEmpty && (
                    <p style={{ color: "red" }}>{passwordError}</p>
                  )} */}
                  </Form.Group>
                </Form.Group>
                {password!=="" && loginPasswordError && <p style={{color:"red",fontSize:"10px"}}>{loginErrorPasswordMsg}</p>}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    //  marginLeft: "20%",
                  }}
                >
                  <Button
                    style={{

                      border: "1px solid #E1E1E1",
                      borderRadius: "3px 3px 3px 3px",
                      width: "140%",
                      height: "42.62px",
                      marginLeft: " 40%",
                      backgroundColor: "#137EA9",
                      fontStyle: "Poppins-Medium",
                      fontSize: "15px",
                      letterSpacing: "0.38px",
                      lineHeight: "18px",
                      fontWeight: "900",
                    }}

                    type="submit"

                  >
                    Sign In
                  </Button>

                </div>
              </Form>
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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

              }}
            >

              <span
                style={{
                  // border: "1px solid #E1E1E1",
                  // borderRadius: "3px 3px 3px 3px",

                  height: "42.62px",
                  //marginLeft: "45%",
                  // backgroundColor: "#137EA9",
                  fontStyle: "Poppins-Medium",
                  fontSize: "15px",
                  letterSpacing: "0.38px",
                  lineHeight: "18px",
                  fontWeight: "900",
                  textAlign: "center"
                }}


              >
                OR
              </span>
              {/* TODO -  */}
              <img src={epramaan_img} alt="Click here to login With E-pramaan"
                style={{ width: "100px" }}
                onClick={LinkURL}
              ></img>
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
                // alignItems: "center",
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
                Department Registration
              </strong>
              {/* TODO -  */}
              {/* <img src={epramaan_img} alt="Click here to login With E-pramaan"
                style={{ width: "100px", marginLeft: "20px" }}
                onClick={LinkURL}
              ></img> */}
            </div>
            {/* <div className="" style={{ width: "90%" }}>
              <ModifiedFooter />
            </div> */}

          </div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={ApiDataSave}
            action={action}
            key={vertical + horizontal}

          />
          <div style={{ width: "50%", height: "8%", position: "fixed", bottom: 0, }}>
            <Footer className="footer_text" />
          </div>
        </div>

      </div>

    </>
  );
};

export default LoginScreen;
