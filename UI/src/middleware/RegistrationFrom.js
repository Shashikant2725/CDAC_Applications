import axios from "axios";
import React, { useState } from "react";
import Header from '../components/Header';
import '../css/regFrom.css'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';





const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const RegistrationFrom = (props) => {

    const data = useSelector((store) => store.register_api);
    let { error, response, loading } = data;


    const history = useNavigate();

    const handleClick = (event) => {
        setActive(event.target.id);
    };

    let decoded = JSON.parse(localStorage.getItem('userData'))
    let userData = decoded
    console.log(userData);
    const mobile_number = userData.mobile_number
    const exp = userData.exp
    // console.log(mobile_number)
    const [active, setActive] = useState("");

    const [fname, setFname] = useState(userData.name);
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState(mobile_number)
    const [deptName, setDeptName] = useState("")

    const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
    const [successSnackBarIsOpen, setsuccessSnackBarIsOpen] = useState(false);
    let [errormsg, setErrorMsg] = useState("");
    let [successmsg, setSuccessMsg] = useState("");
    const vertical = "top";
    const horizontal = "right";

    //setMobileNumber(mobile_number)

    // useEffect(() => {

    // }, [])
    const dispatch = useDispatch();

    async function RegisterNewUser() {
        // console.log(deptName);
// 
        if(email && lname && deptName ){

        const url = `http://10.244.0.140:5003/dept/sso/register`;

        // const body = {
        //   "first_name": `${fname}`,
        //   "last_name": `${lname}`,
        //   "email": `${email}`,
        //   "password": `${password}`
        // }

        const body = {
            "deptname": `${deptName}`,
            "name": `${fname}`,
            "designation": `${lname}`,
            "email": `${email}`,
            // "password": `${password}`,
            "mobile": `${mobileNumber}`,
            "role": `deptreg`,
            "exp":exp
        }

        console.log("body is", body)

        axios
            .post(url, body)
            .then((response) => {
                dispatch({
                    type: "register-api-success",
                    payload: response.data,
                });
                toast.success("Success");
                console.log("data is:- ", response.data)
            })
            .catch((error) => {
                dispatch({
                    type: "register-api-fail",
                    payload: error,
                });
                toast.error("Something went wrong !");
                
                console.log(error)
                RouteToLogin("")
                return error
            });
        }else{
            toast.error("Input validation missing !");
                
            console.log("Input validation missing")
            return ""
        }
    };

    const deptChange = (e) => {
        //console.log("sdfsfgefgdefg",e.target.value)
        setDeptName(e.target.value)
    }

    const RouteToLogin = (e) => {
        history("/");
    };


    //******************Snack bar part code****************

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarIsOpen(false);
    };

    const successhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setsuccessSnackBarIsOpen(false);
    };


    const action = (
        <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
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




    return (
        <>
            <div style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <div className="" style={{ width: '100%', height: '14%' }}>
                    <Header />
                </div>
                <div className=".show1" style={{
                    display: "block",
                    transition: "800ms",
                    Opacity: 1
                }}>

                    < div className="login-form1" >

                        <div className="form-box1 solid">

                            <form>

                                <h1 className="login-text1">Profile Details</h1>
                                <br></br>

                                <label >
                                    <p className="form-label">
                                        Department Name</p></label><br></br>

                                <select className="login-box1" onChange={deptChange} 
                                    
                                    >
                                    <option >Select Any option</option>
                                    <option value="Ministry Of central Govt">Ministry Of central Govt</option>
                                    <option value="SubOrdinate Offcices Of Central GOVT">SubOrdinate Offcices Of Central GOVT.</option>
                                    <option value="Statutory of bodies">Statutory of bodies</option>
                                    <option value="publicsector">Public sector</option>
                                    <option value="autonoumsbodies">Autonomus Bodies</option>
                                    <option value="others">Others</option>
                                </select>
                                <br />
                                <br />

                                <label >
                                    <p className="form-label">
                                        Email</p></label><br></br>

                                <input

                                    type="text"

                                    name="email"
                                    required={true}
                                    
                                    className="login-box1"
                                    onChange={(e) => setEmail(e.target.value)}
                                /><br />
                                <label>
                                    <p className="form-label">Name</p>
                                </label>
                                <input
                                    type="text"
                                    className="login-box1"
                                    placeholder=""
                                    value={fname}
                                    disabled
                                    onChange={(e) => setFname(e.target.value)}
                                />
                                <br />
                                <label>
                                    <p className="form-label">Designation</p>
                                </label>
                                <input
                                    type="text"
                                    className="login-box1"
                                    placeholder=""
                                    required={true}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                                <br></br>
                                <label >
                                    <p className="form-label">Mobile Number</p></label><br></br>

                                <input

                                    type="text"

                                    name="text"

                                    className="login-box1"
                                    value={mobileNumber}
                                    disabled

                                /><br></br>

                                <input type="submit" onClick={RegisterNewUser} value="register" className="login-btn1" />

                            </form> </div>

                    </div >

                </div >
                {snackBarIsOpen && (
                    <Snackbar
                        open={snackBarIsOpen}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={errormsg}
                        action={action}
                        key={vertical + horizontal}
                        anchorOrigin={{ vertical, horizontal }}
                    />
                    //<h1>Hi</h1>
                )}
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={successSnackBarIsOpen} autoHideDuration={6000} onClose={successhandleClose}>
                    <Alert onClose={successhandleClose} severity="success" sx={{ width: '100%' }}>
                        User registered successfully!!
                    </Alert>
                </Snackbar>
            </Stack>

        </>

    )

}
export default RegistrationFrom;