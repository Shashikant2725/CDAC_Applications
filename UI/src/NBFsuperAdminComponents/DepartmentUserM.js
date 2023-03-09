import React, { useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Switch from "@mui/material/Switch";
import trashh from "../images/trashh.png";
import editt from "../images/edittt.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import DepartmentDashboardScript from "./DepartmentDashboardScript";
import {
  newAppnAdminRegister,
  departmentAllAppAdmins,
  listAppAdmin,
  userenableDisable,
} from "../actions/Fabric/FabricAction";
import jwt_decode from "jwt-decode";
import Form from "react-bootstrap/Form";
import Footer from "../components/Footer";
import { InsertChart } from "@material-ui/icons";
import { ToastContainer } from "react-toastify";
import paginationFactory from "react-bootstrap-table2-paginator";
import findapp from "../Errors/errors.json";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { InputGroup, Button } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function DepartmentUserM() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valueChange, setValueChnage] = useState();
  //const [checked, setChecked] = React.useState(valueChange);
  const [togglerValue, setTogglerValue] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [switchArray, setSwitchArray] = React.useState([]);
  const vertical = "top";
  const horizontal = "right";

  const [ErrMsg, setErrMsg] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [regexSnackBar, setRegexSnackBar] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const [open, setOpen] = useState(false);
  const [responseOpen, setResponseOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalClose, setModalClose] = useState(false);

  //const label = { inputProps: { 'aria-label': 'Switch demo' } };
  let Tokendata = useSelector((store) => store.login_api);
  console.log("Tokendata", Tokendata);
  let dynamicToken = Tokendata.response.token;
  console.log("dynamicToken", dynamicToken);

  let data = useSelector((storee) => storee.register_api);
  console.log("dataaaa", data);
  let { errordata, responsedata, loadingdata } = data;
  console.log("responseeeeee", responsedata);

  // const data = useSelector((store) => store.register_api);
  // let { erroor, respoonse, looading } = data;

  // const myhandleChange = (data) => {
  //         console.log('hello switch', data)
  //         //insetArray[index] = true
  //         let bool = data.inset
  //         console.log(!bool)
  //         let decoded = jwt_decode(response)
  //         console.log("deoded", decoded.deptname)
  //         let decodedDepartName = decoded.deptname
  //         //dispatch(userenableDisable(data.email, !bool))
  //         dispatch(listAppAdmin(decoded.deptname,dynamicToken));
  //         //console.log(checked)
  //         //setChecked(!checked)

  //         //setChecked(!checked);
  //         //console.log(insetArray)
  //         //setTogglerValue(!togglerValue)
  // };

  //console.log("togglerValue", togglerValue)

  // const [checked, setChecked] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarIsOpen(false);
    setRegexSnackBar(false);
    setResponseOpen(false);
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

  const dispatch = useDispatch();

  let { error, response, loading } = Tokendata;
  console.log("response", response);
  console.log("response.token", response.token);
  //localStorage.setItem("response", response.token)

  let nbfAdminData = useSelector((stordData) => stordData.newAppnAdminRegister);
  let { errors, responsee, loadings } = nbfAdminData;
  //  console.log("responsessssssss",responsee)
  //  console.log("nbfAdminnnn",nbfAdminData.response.statusCode)
  //  let statusCode=nbfAdminData.response.statusCode
  // console.log("token",response)

  let newTableData = useSelector((abcd) => abcd.appAdminList);
  // console.log("new table data", newTableData)
  let { adminLoading, adminResponse, adminError } = newTableData;
  const [da, setDa] = useState(newTableData.response);
  // console.log("new table data adminLoading", adminLoading)
  // console.log("new table data adminResponse", adminResponse)
  // console.log("new table data adminError", adminError)
  let newAppAdminListResponse = adminResponse;

  useEffect(() => {
    if (newTableData.response) {
      setDa(newTableData.response);
    }
  }, [newTableData.response]);

  let insetArray = [];
  //let switchJSX = <input class="form-check-input" onChange={(e) => handleToggle(check, user.username)} type="checkbox" id="mySwitch" name="darkmode" value={tokenUpdate} checked />
  //let switchJSX = <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" checked />

  if (da) {
    //newTableData.response[1].len = 5
    for (let i = 0; i < da.length; i++) {
      insetArray.push(da[i].inset);
      //setSwitchArray(insetArray)
    }
  }
  //console.log(insetArray)
  //insetArray[2] = true
  //setSwitchArray(insetArray)
  useEffect(() => {
    let decoded = jwt_decode(response.token);
    console.log("deoded", decoded.deptname);
    let decodedDepartName = decoded.deptname;
    dispatch(listAppAdmin(decoded.deptname));
  }, []);

  // function submitHandler() {
  //         console.log('app admin register')
  //         if (password === confirmPassword) {
  //                 console.log("Yes")
  //                 dispatch(newAppnAdminRegister(name, email, phone, password, dynamicToken));
  //         }
  //         else{
  //                 setErrMsg("password and confirm password not same")
  //         }
  // }
  let editDelete = (
    <div>
      <img src={editt} width={18} />
      <img src={trashh} width={18} />
    </div>
  );

  //let data = 'jhj'

  const falseSelector = (e) => {
    console.log("ufvcbyuhfuibevfduivcfriuedfvc");
  };

  const trueSelector = (e) => {
    console.log("true jniofdsnodsfi");
  };

  function statusFormatter(cell, row, rowIndex, formatExtraData) {
    // {console.log("rowwwwwwwwwwwwwwww",row.inset)}
    // return cell ? (
    //         <div>
    //                 <Switch checked={row.inset} inputProps={{ 'aria-label': 'controlled' }} />
    //         </div>
    // ) : (
    //         <div>
    //                 <Switch checked={row.inset} inputProps={{ 'aria-label': 'controlled' }} />
    //         </div>
    // );

    return;
    <Switch checked={row.inset} inputProps={{ "aria-label": "controlled" }} />;
  }

  const [selectedEmail, setSelectedEmail] = useState("");
  const onClickStatus = (row, rowIndex) => {
    setSelectedEmail(row.email);
    // let val = !(inset)
    console.log("???????????????..........", row.email);
    // insetArray
    // adminResponse[rowIndex].inset = val

    let d = da;
    const fil = d.filter((each, index) =>
      index === rowIndex ? { ...each, inset: !each.inset } : each
    );
    console.log("???????????????????????????", fil);
    // const fil = d.map((each,index)=>index===rowIndex?{...each,inset:!each.inset}:each)
    setDa(fil);
    console.log(rowIndex);
    console.log(fil[rowIndex].inset);
    dispatch(userenableDisable(row.email, fil[rowIndex].inset, dynamicToken));
  };
  //console.log("selectedEmail===============",selectedEmail)

  let columns = [
    {
      dataField: "deptname",
      text: "Department Name",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "email",
      text: "E-Mail",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "mobile",
      text: "Mobile",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "role",
      text: "Role",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "inset",
      text: "Enable / Disable",
      align: "center",
      headerAlign: "center",
      //formatter:switchHandler
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log("rowIndexs", rowIndex);
        return (
          <Switch
            checked={row.inset}
            inputProps={{ "aria-label": "controlled" }}
            onChange={() => onClickStatus(row, rowIndex)}
          />
        );
      },
    },
  ];

  // function switchHandler(){
  //         return (<Switch />)
  // }

  const excuiteValue = (e) => {
    //dispatch(userenableDisable(checked))
    console.log(e.target.value);
    //setChecked(e.target.checked)
    setChecked(!checked);
    //console.log(checked)

    // setEnableData(e.target.value)
    // if (e.target.checked == true) {
    //         console.log("event")
    //         setEnableData(true)
    // }
    // else {
    //         console.log("event else ")
    //         setEnableData(false)
    // }
  };

  //  console.log("da........................",da)

  // console.log("checked", checked)

  // function statusFormatter(cell, row, rowIndex, formatExtraData) {
  //         console.log("rowinset", row.inset)
  //         console.log("email", row.email)
  //         setValueChnage(row.inset)
  //         dispatch(userenableDisable(checked))
  //         console.log('rowIndex',row.rowIndex)

  //         function toggleHandler() {
  //                 console.log('toggle', togglerValue)
  //                 setTogglerValue(!togglerValue)
  //         }

  //         return (
  //                 <div>
  //                         <Switch value={togglerValue} onChange={toggleHandler} inputProps={{ 'aria-label': 'controlled' }} />
  //                 </div>
  //         );
  // }

  // const rowEvents = {
  //         onClick: (e, row, rowIndex) => {
  //                 setEnableData(!(row.inset))
  //                 console.log("row Event inset ", !(row.inset))
  //         }
  // }

  const validate = () => {
    console.log("validate");
    const validName = /^[a-zA-Z]{3,24}$/;
    const validDesignation = /^[a-zA-Z]{2,28}$/;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,15}$/;
    const validMobile = /^\d{10}$/;

    if (validName.test(name) === false) {
      setErrMsg(" In designation Minimum 2 and Maximum 28 characters required");
      setRegexSnackBar(true);
    } else {
      if (!validEmail.test(email)) {
        setErrMsg("Email Invalid");
        setRegexSnackBar(true);
      } else {
        if (validPassword.test(password) === false) {
          setErrMsg(
            "Password must have one upper, lower case, number, special symbol"
          );
          setRegexSnackBar(true);
        } else {
          if (validMobile.test(phone) === false) {
            setErrMsg("Mobile No. Invalid");
            setRegexSnackBar(true);
          } else {
            return true;
          }
        }
      }
    }
  };

  // const reloadingData = (data) => {
  //         console.log("aaaaaaaaa", response)

  //         // if (DataTransfer !== undefined) {

  //                 if (response.token !== undefined) {
  //                         handleModalShow()
  //                 } else {
  //                         var errorCode = data.statusCode
  //                         console.log("errorcode", errorCode)
  //                         for (let key in findapp) {
  //                                 let extract = findapp[key]
  //                                 if (key === errorCode) {
  //                                         console.log("extract", extract)

  //                                         setErrMsg(extract)
  //                                         setOpen(true)

  //                                         //  setApiDataSavae(extract);
  //                                 }

  //                         }
  //                         setResponseOpen(true)
  //                 }

  //         // }

  // }

  function ErrorOfMsg(data) {
    console.log("abcd", data);
    let errorMessage = findapp[data.statusCode];
    if (errorMessage !== undefined) {
      setErrMsg(errorMessage);
      setOpen(true);
      setResponseOpen(true);
    }
  }

  function submitHandler(e) {
    setShowErrMsg(false)
    setErrMsg("")
    e.preventDefault();
    console.log("app admin register");
    if (validate() === true) {
      if (password !== confirmPassword) {
        setShowErrMsg(true);
        setErrMsg("password and confirm password are not the same");
      } else {
        setModalClose(true);
        console.log("Yes", response);
        let decoded = jwt_decode(response.token);
        console.log("decoded", decoded);
        console.log("deoded11", decoded.deptname);
        let decodedDepartName = decoded.deptname;
        dispatch(
          newAppnAdminRegister(
            name,
            email,
            phone,
            password,
            decodedDepartName,
            ErrorOfMsg
          )
        );
        window.location.reload();
        const timer = setTimeout(() => {
          console.log("This will run after 1 second!");
          dispatch(listAppAdmin(decoded.deptname));
        }, 100);
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
       setShowErrMsg(true);
      setErrMsg("name or email or phone or password not entered properly");
    }
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // <div>{row}</div>
      console.log("rowIndexxxxxxxxxxxx", da[rowIndex].inset);
      let val = !da[rowIndex].inset;
      da[rowIndex].inset = val;
    },
  };

  let switchJSX1 = (
    <div class="custom-control custom-switch">
      {/* <input type="" class="custom-control-input" id="customSwitches" /> */}
    </div>
  );

  function switchHandler(value, row, index, field) {
    console.log("value", value);
    console.log("row", row);
    console.log("index", index);
    console.log("field", field);

    return switchJSX1;
  }

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <div className="" style={{ width: "100%", height: "14%" }}>
        <Header />
      </div>

      <div
        style={{
          width: "100%",
          height: "74vh",
          display: "flex",
          marginTop: "1.2%",
        }}
      >
        <div
          style={{ width: "17%", height: "100%", backgroundColor: "#137EA9" }}
        >
          {/* <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'white', color: 'black' }} onClick={butHandler4} id='but4'>Dashboard</button> */}
          {/*<button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler1} id='but1'>User Management</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler2} id='but2'>Infrastructure</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler3} id='but3'>User-Infra Binding</button>*/}
          <DepartmentDashboardScript />
        </div>
        <div
          style={{
            width: "83%",
            height: "100%",
            padding: "1%",
            overflow: "auto",
          }}
        >
          <button
            type="button"
            style={{ marginLeft: "84%", marginBottom: "3%" }}
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add App Admin
          </button>
          {da !== undefined && (
            <BootstrapTable
              keyField="id"
              data={da}
              columns={columns}
              rowEvents={rowEvents}
              pagination={paginationFactory()}
            />
          )}
          {/*<table style={{width:'12%'}}>
                                                        <tr style={{border:'1px solid #DEE2E6',height:'40px',borderBottom:'2px solid black',height:'23%'}}>
                                                                <th style={{paddingLeft:'15%'}}>  Company</th>
                                                        </tr>
                                                        {newTableData.response !== undefined && newTableData.response.map((datatable, index) =>
                                                                <tr style={{border:'1px solid #DEE2E6'}}>
                                                                        <td style={{paddingLeft:'19%'}}>
                                                                                <Switch defaultChecked={insetArray[index]} onClick={() => myhandleChange(datatable)}/>
                                                                        </td>
                                                                </tr>)}
                                                        </table>*/}
        </div>
      </div>
      <div
        style={{ width: "100%", height: "10%", position: "fixed", bottom: 0 }}
      >
        <Footer className="footer_text" />
      </div>
      {responseOpen && (
        <Snackbar
          open={responseOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={ErrMsg}
          action={actionn}
          key={vertical + horizontal}
          anchorOrigin={{ vertical, horizontal }}
        >
          <SnackbarContent
            style={{
              backgroundColor: "black",
            }}
            message={<span id="client-snackbar">{ErrMsg}</span>}
            action={actionn}
          />
        </Snackbar>
      )}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ marginTop: "5%" }}
      >
        <div class="modal-dialog" role="document">
          <div
            class="modal-content"
            style={{ borderRadius: "11px", border: "none" }}
          >
            <div
              class="modal-header"
              style={{ backgroundColor: "#137EA9", color: "white" }}
            >
              <h5 class="modal-title" id="exampleModalLabel">
                NBF Admin Registration
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
              <form onSubmit={submitHandler}>
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={(e) => {setName(e.target.value);setShowErrMsg(false)}}
                    value={name}
                    class="form-control"
                    placeholder="Name"
                    required
                  />
                </div>
                <div class="form-group" style={{ marginTop: "3%" }}>
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowErrMsg(false)
                    }}
                    value={email}
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div class="form-group" style={{ marginTop: "3%" }}>
                  <label for="exampleInputEmail2">Phone</label>
                  <input
                    type="tel"
                    onChange={(e) => {setPhone(e.target.value);setShowErrMsg(false)}}
                    value={phone}
                    class="form-control"
                    id="exampleInputEmail2"
                    aria-describedby="emailHelp"
                    placeholder="Enter phone no"
                    required
                  />
                </div>
                <div class="form-group" style={{ marginTop: "3%" }}>
                  <label for="exampleInputPassword3">Password</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ced4da",
                      borderRadius: "3px 3px 3px 3px",
                    }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setShowErrMsg(false);
                        setErrMsg("");
                      }}
                      value={password}
                      class="form-control"
                      id="exampleInputPassword3"
                      placeholder="Password"
                      style={{ border: "none", boxShadow: "none" }}
                      required
                    />
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
                  </div>
                </div>
                <div class="form-group" style={{ marginTop: "3%" }}>
                  <label for="exampleInputPassword4">Confirm Password</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ced4da",
                      borderRadius: "3px 3px 3px 3px",
                    }}
                  >
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setShowErrMsg(false);
                        setErrMsg("");
                      }}
                      value={confirmPassword}
                      class="form-control"
                      id="exampleInputPassword4"
                      placeholder="Confirm Password"
                      style={{ border: "none", boxShadow: "none" }}
                      required
                    />
                    <Button
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      variant="outline-secondary"
                      id="button-addon2"
                      style={{
                        border: "none",
                        boxShadow: "none",
                        marginLeft: "0",
                        background: "none",
                      }}
                    >
                      {!showConfirmPassword ? (
                        <AiOutlineEye style={{ margin: "5px" }} color="black" />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{ margin: "5px" }}
                          color="black"
                        />
                      )}
                    </Button>
                  </div>
                </div>

                <button
                  type="submit"
                  //onClick={submitHandler}
                  class="btn btn-primary"
                  data-dismiss="modal"
                  style={{ marginLeft: "82.5%", marginTop: "3%" }}
                >
                  Submit
                </button>
                {showErrMsg && <p>{ErrMsg}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
