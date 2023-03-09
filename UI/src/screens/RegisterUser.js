import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import axios from 'axios';
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
  Modal
} from "@themesberg/react-bootstrap";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"


import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';


import { newUserReg } from "../actions/Fabric/FabricAction";

import Group from "../images/Group.png";
import logo from ".././images/logo.png";

import logo1 from ".././images/01.png";
import arrow from ".././images/arrow.png";
import epramaan_img from "../images/e-pramaan1.jpeg";
import findapp from "../Errors/errors.json"

//import Footer from '../components/Footer'
import "../css/registeruser.css";
import { URL } from "../config"
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModifiedFooter from "../components/ModifiedFooter";
import Footer from "../components/Footer";

import { RiContactsBookFill } from "react-icons/ri";
import { Block } from "@material-ui/icons";
import Header from "../components/Header";
//import { validEmail, validPassword, validDesignation, validMobile, validName } from "./Regex.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const RegisterUser = () => {

  const [active, setActive] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState()
  const [deptName, setDeptName] = useState("")
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
  const [successSnackBarIsOpen, setsuccessSnackBarIsOpen] = useState(false);
  const [regexSnackBar, setRegexSnackBar] = useState(false)
  let [errormsg, setErrorMsg] = useState("");
  let [apiErrorMsg, setApiErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [ApiDataSave, setApiDataSavae] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const vertical = "top";
  const horizontal = "right";
  const [responseOpen, setResponseOpen] = useState(false)

  const [ErrMsg, setErrMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  // const [NameError,setNameErr]=useState("")
  // const [DesignationError,setDesignationErr]=useState("")
  // const [PasswordError,setPasswordErr]=useState("")
  // const [MobileError,setMobileErr]=useState("")
  // const [NameError,setNameErr]=useState("")
  // // const [pwdError, setPwdError] = useState(false);
  // const [mobileError, setMobileErr] = useState(false);
  // const [designationError, setDesignationErr] = useState(false);
  // const [nameError, setNameErr] = useState(false);




  const action = (
    <React.Fragment>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      // onClick={handleCloses}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const validate = () => {

    console.log("validate")
    const validName = /^[a-zA-Z]{3,24}$/
    const validDesignation = /^[a-zA-Z]{2,28}$/
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,15}$/
    const validMobile = /^\d{10}$/

    if (validName.test(fname) === false) {
      setErrMsg("Please enter valid Username");
      setRegexSnackBar(true)
      //alert("hii")
    }
    else {
      if (validDesignation.test(lname) === false) {
        setErrMsg(" In designation Minimum 2 and Maximum 28 characters required");
        setRegexSnackBar(true)
      }
      else {
        if (!validEmail.test(email)) {
          setErrMsg("Email Invalid");
          setRegexSnackBar(true)
        }
        else {
          if (validPassword.test(password) === false) {
            setErrMsg("Password must have one upper, lower case, number, special symbol");
            setRegexSnackBar(true)
          }
          else {
            if (validMobile.test(mobileNumber) === false) {
              setErrMsg("Mobile No. Invalid");
              setRegexSnackBar(true)
            }
            else {
              return true
            }
          }
        }
      }
    }
  };

  const data = useSelector((store) => store.register_api);
  let { error, response, loading } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = useNavigate();
  const handleClick = (event) => {
    setActive(event.target.id);
  };

  // useEffect(() => {

  //   if (response && response.token ) {
  //     console.log("responseToken",response.token)

  //     history("/");

  //   } 




  // }, [response]);

  const reloadingData = (data) => {
    console.log("aaaaaaa", data)
   
    if (DataTransfer !== undefined) {

      if (data.token !== undefined) {
        setOpen(false)
        setRegexSnackBar(false)
        handleModalShow()  
      } else {
        var errorCode = data.statusCode
        console.log("errorcode", errorCode)
        for (let key in findapp) {
          let extract = findapp[key]
          if (key === errorCode) {
            console.log("extract", extract)

            setErrMsg(extract)
            setOpen(true)

             //  setApiDataSavae(extract);
           }

         }
         setResponseOpen(true)
       }

     }


  }

  const deptChange = (e) => {
    //console.log("sdfsfgefgdefg",e.target.value)
    setDeptName(e.target.value)
  }

  // useEffect(() => {
  //   if (error && error.response.data) {
  //     setErrorMsg(error.response.data)
  //     // errormsg = error.response.data
  //     // console.log("enter into failure loop",errormsg);
  //     setSnackBarIsOpen(true);
  //   }
  // }, [error]);
  // console.log(useLocation);

  function componentDidUpdate(prevProps) {
    console.log(prevProps);

  }


  let finalLink;
  async function LinkURL() {

    const url = `${URL}/dept/sso/linkURL`;
    // console.log(url);

    axios.post(url).then((response) => {

      const data = response.data;
      console.log(data);
      localStorage.clear();
      localStorage.setItem('link', JSON.stringify(data[0]));
      localStorage.setItem('clientId', JSON.stringify(data[1]));
      localStorage.setItem('nonceValue', JSON.stringify(data[2]));
      localStorage.setItem('codeVerifier', JSON.stringify(data[3]));

      localStorage.setItem('path', "/register");

      finalLink = data[0];
      console.log("finalLink => " + finalLink)
      window.location.replace(finalLink);
    })
  }

  async function RegisterNewUser(event) {
    setOpen(true)
    setErrMsg("")
    event.preventDefault()
    // console.log("hii")

    if ((email && password && fname && lname && deptName && confirmPassword && mobileNumber) == "") {
      //console.log("input field cannot be empty ")
      setErrMsg("input field cannot be empty ");
      console.log(ErrMsg)
      setRegexSnackBar(true)
    }
    else {
      if (validate() === true) {
        if (password !== confirmPassword) {
          setErrMsg("password and confirm password not same");
          setRegexSnackBar(true)
        }
        else {

          setRegexSnackBar(true)
          dispatch(newUserReg(deptName, fname, lname, email, password, mobileNumber, cbf => {

            reloadingData(cbf)
          }));
          

        }
      }
    }



  }
  // useEffect(()=>{
  //   if(response.statusCode){
  //     var errorCode = response.statusCode
  //     console.log("errorcode", errorCode)
  //     for(let key in  findapp ){
  //      let extract = findapp[key]
  //      if (key === errorCode) {
  //        console.log("extract", extract)
  //        // setOpen(true)
  //        // setApiErrorMsg(extract)

  //        setApiDataSavae(extract);
  //      }

  //     }
  // }
  // },[response.statusCode])

  const RouteToLogin = () => {


    console.log("heloooooo")
    navigate("/");
  };


  //******************Snack bar part code****************



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarIsOpen(false);
    setRegexSnackBar(false)
  };

  const successhandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsuccessSnackBarIsOpen(false);
  };

  const actionn = (
    <React.Fragment>
      {/* <Button color="primary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
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

  return (
    <>
      <div style={{ width: '100%', height: '100%', backgroundColor: 'white', flexDirection: "row", display: "flex" }}>

        <div
          style={{
            width: "50%",
            backgroundImage: `url(${Group})`,
            backgroundSize: "cover",
            height: "126%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="" style={{ alignItems: "center", marginLeft: "20%" }}>
            <img
              src={logo1} />
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
        {/* <div className="w3-twothird w3-card" style={{
              width: "20%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
              marginTop: "20%",
              marginLeft:"2%"
            }}>


              <img src={epramaan_img} alt="Click here to login With E-pramaan"
                style={{
                  width: "140px", 
                }}
                onClick={LinkURL}
              ></img>
            </div> */}
        <div style={{ width: "30%" }} className="d-flex flex-column justify-content-start align-items-center">
          <div className="">
            <img
              src={logo}
              alt="a"
              className="w3-text-grey w3-padding-16"
              id="logoo"
              style={{ width: "142px", height: "140px", marginLeft: "69%" }}
            />

            <div className="w3-container" style={{ width: "90%", height: "70%" }}>
              <div>

                <div className="login_form">
                  <Form onSubmit={RegisterNewUser}>
                    <label style={{ marginTop: "7px" }} >
                      <p className="email_pass">Department Name</p>
                    </label>
                    <select className="password" onChange={deptChange} required>
                      <option value="">Select Any Option</option>
                      <option value="Ministry Of central Govt">Ministry Of central Govt</option>
                      <option value="SubOrdinate Offcices Of Central GOVT">SubOrdinate Offices Of Central GOVT.</option>
                      <option value="Statutory of bodies">Statutory of bodies</option>
                      <option value="publicsector">Public sector</option>
                      <option value="autonoumsbodies">Autonomus Bodies</option>
                      <option value="others">Others</option>
                    </select>
                    <br />
                    <label >
                      <p className="email_pass">Name</p>
                    </label>
                    <input
                      type="text"
                      className="password"
                      placeholder="Name"
                      required
                      // onInvalid={F => F.target.setCustomValidity("Name Invalid")} 
                      //   htmlInput.oninvalid = function(e) {
                      //     e.target.setCustomValidity("Here is your text!")
                      // }
                      onChange={(e) => setFname(e.target.value)}
                    />

                    <label>
                      <p className="email_pass">Designation</p>
                    </label>
                    <input
                      type="text"
                      className="password"
                      placeholder="Designation"
                      required
                      // onInvalid={F => F.target.setCustomValidity("Designation Invalid")} 
                      onChange={(e) => setLname(e.target.value)}
                    />
                    <label>
                      <p className="email_pass">Your Email</p>
                    </label>
                    <input
                      type="email"
                      className="password"
                      placeholder="Your Email"
                      //  required
                      //  onInvalid={F => F.target.setCustomValidity(`${ErrMsg}`)} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Group>
                      <Form.Group id="password">
                        <Form.Label bsPrefix="email_pass" className="mb-2">
                          Your Password
                        </Form.Label>
                        <InputGroup
                          style={{
                            border: "1px solid #E1E1E1",
                            borderRadius: "3px 3px 3px 3px",
                            height: "42.97px",
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            width: "80%",
                          }}
                          bsPrefix="password">
                          <Form.Control
                            required
                            type={!showPassword ? "password" : "text"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                            style={{
                              width: "80%",
                              boxShadow: "none",
                              border: 0
                            }} />
                          <Button onClick={() => setShowPassword(!showPassword)} variant="outline-secondary" id="button-addon1" style={{
                            border: "none",
                            boxShadow: "none",
                            marginLeft: "0",
                            background: 'none'

                          }}>
                            {!showPassword ? <AiOutlineEye style={{ margin: "5px" }} color="black" /> : <AiOutlineEyeInvisible style={{ margin: "5px" }} color="black" />}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Form.Group>
                    <Form.Group>
                      <Form.Group id="password">
                        <Form.Label bsPrefix="email_pass" className="mb-2">
                          Confirm Password
                        </Form.Label>
                        <InputGroup
                          style={{
                            width: "80%",
                            border: "1px solid #E1E1E1",
                            borderRadius: "3px 3px 3px 3px",
                            height: "42.97px",
                            display: "flex",
                            alignItems: "center",
                            height: "100%"
                          }}
                          bsPrefix="password"
                        >
                          <Form.Control
                            required
                            type={!showConfirmPassword ? "password" : "text"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="off"
                            style={{
                              width: "80%",
                              boxShadow: "none",
                              border: 0
                            }} />
                          <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)} variant="outline-secondary" id="button-addon2" style={{
                            border: "none",
                            boxShadow: "none",
                            marginLeft: "0",
                            background: 'none'

                          }}>
                            {!showConfirmPassword ? <AiOutlineEye style={{ margin: "5px" }} color="black" /> : <AiOutlineEyeInvisible style={{ margin: "5px" }} color="black" />}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Form.Group>
                    {/* <label>
                      <p className="email_pass">Password</p>
                    </label>
                    <input
                      type="password"
                      className="password"
                      placeholder="Password"
                      // required
                      // onInvalid={F => F.target.setCustomValidity("Password Invalid")} 
                      onChange={(e) => setPassword(e.target.value)}
                    /> */}
                    {/* <label>
                      <p className="email_pass">Confirm Password</p>
                    </label>
                    <input
                      type="password"
                      className="password"
                      placeholder="Confirm Password"
                      // required
                      // onInvalid={F => F.target.setCustomValidity("Password InvalidError")} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    /> */}
                    <label>
                      <p className="email_pass">Mobile Number</p>
                    </label>
                    <input
                      type="tel"
                      className="password"
                      placeholder="Mobile Number"
                      // required
                      // onInvalid={F => F.target.setCustomValidity("Mobile Invalid")} 
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />

                    {snackBarIsOpen && (
                      <Snackbar
                        open={snackBarIsOpen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={errormsg}
                        action={actionn}
                        key={vertical + horizontal}
                        anchorOrigin={{ vertical, horizontal }}
                      />

                    )}
                    {(regexSnackBar &&
                      <Snackbar
                        open={regexSnackBar}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={ErrMsg}
                        action={actionn}
                        key={vertical + horizontal}
                        anchorOrigin={{ vertical, horizontal }}>
                        <SnackbarContent style={{
                          backgroundColor: "black",
                        }}
                          message={<span id="client-snackbar">{ErrMsg}</span>}
                          action={actionn}
                        />
                      </Snackbar>
                    )
                    }

                    <div>
                      <Button
                        type="submit"
                        id="sign_in"
                        className=""

                      >
                        Register
                      </Button>
                    </div>
                  </Form>
                  <br />
                  <h5 className="text-center">OR</h5>


                  <Link to="/" style={{ float: "right", textDecoration: "none", marginRight: "2%" }}>



                    <img
                      src={arrow}
                      alt="a"

                    />
                    Back
                  </Link>

                  <div className="" style={{

                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    marginTop: "6%",
                    marginLeft: "10%",
                    width: "80%"


                  }}>


                    <img src={epramaan_img} alt="Click here to login With E-pramaan"
                      style={{
                        width: "140px",
                      }}
                      onClick={LinkURL}
                    ></img>

                  </div>


                  <div>

                    <br /> <br />
                  </div>
                </div>
              </div>

            </div>
            {/* <hr /> */}
          </div>

          {/* {emailErr && <p>Your email is invalid</p>}
          {pwdError && <p>Your password is invalid</p>}
          {nameError && <p>Your name is invalid</p>}
          {designationError && <p>Your designation is invalid</p>}
          {mobileError && <p>Your mobile is invalid</p>} */}


          <div
            className="w3-container"
            style={{ width: "75%", marginLeft: "40%" }}
          >
            {/* <ModifiedFooter /> */}
          </div>
        </div>



        {/* <Stack spacing={2}>
          <Snackbar open={successSnackBarIsOpen} autoHideDuration={6000} onClose={successhandleClose}>
            <Alert onClose={successhandleClose} severity="success" sx={{ width: '100%' }}>
              User registered successfully!!
            </Alert>
          </Snackbar>
        </Stack> */}

        {/* <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={responseOpen}
            autoHideDuration={2000}
            onClose={handleClose}
            message={ApiDataSave}
            action={action}
            key={vertical + horizontal}

          /> */}




      </div>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Registration is sent for approval</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>history("/")}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <div style={{ width: "100%", height: "8%", position: "fixed", bottom: 0, }}>
        <Footer className="footer_text" />
      </div> */}
    </>
  );
};

export default RegisterUser;
