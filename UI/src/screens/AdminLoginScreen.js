import React, { useEffect, useState, Suspense } from "react";
import { Formik, Form, Field, ErrorMessage, replace } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import epramaan from "../images/e-pramaan1.jpeg";
import Button from "@mui/material/Button";
import cdac_logo from "../images/photo/CDAC.png";
import meity_logo from "../images/photo/meity-logo.png";
import digital_india_logo from "../images/photo/digital-india.png";
import idrbt_logo from "../images/photo/idrbt.png";
import iiit_logo from "../images/photo/iiit-logo.png";
import iit_hyd_logo from "../images/photo/iit-hydrabad-logo.png";
import nic_logo from "../images/photo/nic-logo.png";
import set_india_chennai_logo from "../images/photo/sets-india-chennai.png";
// import blockchain from "../images/blockchain.jpg";

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
  //Form,
  Card,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import bgimage from "../images/bgimage.svg";

import Group from "../images/Group.png";
import logo from "../images/logo.png";
import NBF from "../images/01.png";

// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Stack from '@mui/material/Stack';
// import MuiAlert from '@mui/material/Alert';
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getObject, nbfAdminLogins } from "../actions/Fabric/FabricAction";

import FirstScreen from "./FirstScreen";
import Header from "../components/Header";

import ModifiedFooter from "../components/ModifiedFooter";

//import "../css/loginScreen.css";
import { FcLock } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import "../css/header.css";
import { InputAdornment } from "@mui/material";
import findapp from "../Errors/errors.json";

const NewLoginScreen = (props) => {
  let adminLogines = useSelector((stores) => stores.adminLoginsuser);
  let { nbfAdminLoginError, nbfAdminLoginResponse, nbfAdminLoginLoading } =
    adminLogines;
  console.log("nbfAdminLoginResponse", nbfAdminLoginResponse);
  console.log("nbfAdminLoginError", adminLogines);
  // console.log("newresponse",response)

  // const [apiResponse,setApiResponse] = useState("")

  // useEffect(() => {
  //   if(response && response.token && response.token !== undefined){

  //     setApiResponse(response)

  //   }
  // },[response])
  // console.log("response is",response)
  // console.log("error is",error)

  let history = useNavigate();

  const dispatch = useDispatch();

  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("user");

  let usernameEmpty = false;
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const vertical = "top";
  const horizontal = "right";
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setShowSnackbar(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  function RouteBasedOnResponse(data) {
    console.log(data);
    if (data !== undefined) {
      if (data.status) {
        for (let key in findapp) {
          let extract = findapp[key];
          if (key === data.status) {
            console.log("extract", extract);
            setShowSnackbar(true);
            setSnackbarMsg(extract);
          }
        }
      }else{
        history("/nbfAdminDeptReg");
      }
    } else {
      history("/");
    }
    /*if (data !== undefined) {
      history("/nbfAdminDeptReg");
    } else {
      history("/");
    }*/
  }

  const initialValues = {
    name: "",
    password: "",
  };
  async function getData(values) {
    console.log(values);
    dispatch(
      nbfAdminLogins(values.name, values.password, RouteBasedOnResponse)
    );
  }

  async function onSubmit(event) {
    event.preventDefault();
    let nameuser = username;
    let passwordUser = password;
    console.log(nameuser, passwordUser);
  }

  function regPage() {
    history("/newregisterscreen");
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .email()
      .matches(/^\w+([\.-]?w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/, "Invalid Email")
      .min(3, "It's too short")
      .required("You Must Provide Email"),
    password: Yup.string()
       .matches(
         /^(?=.*[!@#$%^&*()_+{}:;"'<>,.?])/,
         "Password should have a special character"
       )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,15}$/,
        "Invalid Password"
      )
      .min(6, "Minimum characters should be 6")
      .required("You Must Provide Password"),
    // .matches(passwordRegExp, "Password must have one upper, lower case, number, special symbol").required('You Must Provide Password'),
  });

  return (
    //token !== null window.location.path
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <div style={{ width: "50%", height: "100%", backgroundColor: "#004563" }}>
        <div
          style={{
            width: "100%",
            height: "88%",
            backgroundImage: ` url(${Group})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className = "d-flex flex-column justify-content-center"

          
        >
          <div
            style={{
              width: "100%",
              height: "50%",
              
            }}
            
          >
            <div style={{ color: "white" }}>
              <img src={NBF} style={{ marginTop: "25%", marginLeft: "10%" }} />
              <p style={{ marginTop: "2%", marginLeft: "10%" }}>
                Welcome to{" "}
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  NATIONAL BLOCKCHAIN FRAMEWORK
                </span>
              </p>
              <p style={{ marginTop: "2%", marginLeft: "10%" }}>
                The 'National Strategy on Blockchain' as brought out by the
                Ministry of Electronics and Information Technology (MeitY),
                Government of India
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "12%",
            display: "flex",
            backgroundColor: "#023950",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <a
            style={{
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://www.digitalindia.gov.in/"
          >
            <img src={meity_logo} alt="" width={50} />
          </a>
          <a
            style={{
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://cdac.in/"
          >
            <img src={cdac_logo} alt="" width={50} />
          </a>
          <a
            style={{
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://setsindia.in/"
          >
            <img src={set_india_chennai_logo} alt="" width={50} />
          </a>
          <a
            style={{
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://www.idrbt.ac.in/"
          >
            <img src={idrbt_logo} alt="" width={40} />
          </a>
          <a
            style={{
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://www.iiit.ac.in/"
          >
            <img src={iit_hyd_logo} alt="" width={50} />
          </a>
          <a
            style={{
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://www.iiit.ac.in/"
          >
            <img src={iiit_logo} alt="" width={50} />
          </a>
          <a
            style={{
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://www.nic.in/"
          >
            <img src={nic_logo} alt="" width={40} />
          </a>
          <a
            style={{
              width: "55px",
              height: "55px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://digitalindia.gov.in/"
          >
            <img src={digital_india_logo} alt="" width={50} />
          </a>
        </div>
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "60%",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            display: "flex",
            flexDirection: "column",
            padding: "4.5%",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "5%" }}>
            <img src={logo} width={85} />
          </div>

          <Typography
            variant="h5"
            gutterBottom
            style={{
              marginBottom: "5%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "40px",
                backgroundColor: "black",
                marginRight: "2%",
                borderRadius: "2px",
              }}
            ></div>{" "}
            Admin Login
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={getData}
            type="submit"
          >
            {(props) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  autoComplete="off"
                  id="standard-basic"
                  label="Username"
                  //value={username}
                  //onChange={emailChange}
                  name="name"
                  variant="standard"
                  style={{ marginBottom: "8%", width: "100%" }}
                  autoFocus
                  type="email"
                  error={props.errors.name && props.touched.name}
                  helperText={<ErrorMessage name="name" />}
                  required
                />
                <Field
                  as={IconTextField}
                  required
                  id="standard-password-input"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  variant="standard"
                  style={{ marginBottom: "8%", width: "100%" }}
                  // value={password}
                  // onChange={passwordChange}
                  name="password"
                  error={props.errors.password && props.touched.password}
                  helperText={<ErrorMessage name="password" />}
                  iconEnd={
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      variant="outline-secondary"
                      id="button-addon1"
                      style={{
                        border: "none",
                        boxShadow: "none",
                        marginLeft: "0",
                        background: "none",
                      }}
                    >
                      {!showPassword ? (
                        <AiOutlineEye style={{ margin: "5px" }} color="black" />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{ margin: "5px" }}
                          color="black"
                        />
                      )}
                    </Button>
                  }
                />
                <p
                  style={{
                    textAlign: "right",
                    fontSize: "12px",
                    marginBottom: "7%",
                  }}
                >
                  Forget Password ?
                </p>
                <div style={{ textAlign: "right", marginBottom: "4%" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: "25%" }}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {/* <TextField
            autoComplete="off"
            id="standard-basic"
            label="Username"
            value={username}
            onChange={emailChange}
            variant="standard"
            style={{ marginBottom: "8%" }}
            autoFocus
            required
          /> */}
          {/* <div style={{ display: "flex", alignItems: "center" }}>
            <IconTextField
              required
              id="standard-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="standard"
              style={{ marginBottom: "4%", width: "100%" }}
              value={password}
              onChange={passwordChange}
              iconEnd={
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  variant="outline-secondary"
                  id="button-addon1"
                  style={{
                    border: "none",
                    boxShadow: "none",
                    marginLeft: "0",
                    background: "none",
                  }}
                >
                  {!showPassword ? (
                    <AiOutlineEye style={{ margin: "5px" }} color="black" />
                  ) : (
                    <AiOutlineEyeInvisible
                      style={{ margin: "5px" }}
                      color="black"
                    />
                  )}
                </Button>
              }
            />        
          </div> */}
          {/* <p
            style={{ textAlign: "right", fontSize: "12px", marginBottom: "7%" }}
          >
            Forget Password ?
          </p>
          <div style={{ textAlign: "right", marginBottom: "4%" }}>
            <Button
              type="submit"
              onClick={getData}
              variant="contained"
              style={{ width: "25%" }}
            >
              Sign In
            </Button>
          </div> */}
          {/* <strong style={{ textAlign: "center", marginBottom: "4%" }}>
            OR
          </strong> */}
          {/* <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a
              style={{
                cursor: "pointer",
                border: "0px solid #bab8b8",
                padding: "3%",
                textAlign: "center",
                borderRadius: "7px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              href="https://authenticate.epramaan.gov.in/"
            >
              <img src={epramaan} width={90} />{" "}
            </a>
          </div> */}
          {/* <hr /> */}
          {/* <div
            onClick={regPage}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            New Admin Registration ?
          </div> */}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={showSnackbar}
        autoHideDuration={3000}
        message={snackbarMsg}
        action={action}
        key={vertical + horizontal}
      />
    </div>
  );
};

const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
    />
  );
};

export default NewLoginScreen;
