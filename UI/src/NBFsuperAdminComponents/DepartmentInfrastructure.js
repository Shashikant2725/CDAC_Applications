import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { FormControl,InputLabel,Select,MenuItem,ListItemText,ListItemIcon } from '@mui/material';
import { useState, useEffect } from "react";
import { chooseInfrastructure, deptInfraList } from "../actions/Fabric/FabricAction";
import { useDispatch, useSelector } from "react-redux";
import Header from '../components/Header';
import DepartmentDashboardScript from './DepartmentDashboardScript';
import BootstrapTable from "react-bootstrap-table-next";
import jwtDecode from 'jwt-decode';
import Footer from "../components/Footer";
import paginationFactory from 'react-bootstrap-table2-paginator';
 import { ToastContainer } from "react-toastify";
// import { ToastContainer, toast } from 'react-toastify';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import {
  chooseInfaStr,
  ListofIps,
} from "../actions/Fabric/FabricAction";


export default function DepartmentInfrastructure() {
  const [generic, setGeneric] = useState(false);
  const [aws, setAws] = useState(false);
  const [nic, setNic] = useState(false);
  const [localhost, setLocalhost] = useState(false);
  
  //const [tableData, settabledata] = useState();


  //console.log(tableData)
  const dispatch = useDispatch();

  let Tokendataa = useSelector((stores) => stores.login_api);
  let dynamicToken=Tokendataa.response.token
  let { errores, responses, loadings } = Tokendataa;
  useEffect(() => {
    dispatch(ListofIps());
  }, []);
  //console.log(Tokendataa.response)

  let newTableData = useSelector((abcd) => abcd.departmentInfraList)
  const tempipsDa = useSelector((x) => x.nbfgetIPS);
  //console.log(newTableData.response)
  console.log(tempipsDa);
  //console.log(newTableData.response)

  //let switchJSX = <input class="form-check-input" onChange={(e) => handleToggle(check, user.username)} type="checkbox" id="mySwitch" name="darkmode" value={tokenUpdate} checked />
  
  let connectorNameArray = []
  let connectorNames = []
  if (newTableData.response) {
    //newTableData.response[1].len = 5
    for (let i = 0; i < newTableData.response.length; i++) {
      newTableData.response[i].len = i + 1
      connectorNameArray.push(newTableData.response[i].connectorName)
      connectorNames.push(newTableData.response[i].connectorType)
     
      
    }
  }
  //console.log(connectorNameArray)
  console.log("connectorNames",connectorNames.toString())
  const [da, setDa] = useState(newTableData.response)
  const [typeOfNode, setTypeOfNode] = useState("");
  const [ipsDa, setIpsDa] = useState([]);
  const [singleNodeIP,setSingleNodeIP] = useState([])

  useEffect(() => {
    if (newTableData && newTableData.response) {
      setDa(newTableData.response)
    }
  }, [newTableData.response])
  useEffect(() => {
    if (tempipsDa && tempipsDa.response) {
      console.log("aaaaaa",tempipsDa.response)
      setIpsDa(tempipsDa.response);
    }
  }, [tempipsDa]);
  const [selectedIps, setSelectedIps] = useState([]);
  const options = [];
  ipsDa.map((ips) => options.push(ips.ip));
  const isAllSelectedIps =
    options.length > 0 && selectedIps.length === options.length;
  function handleMultiIpsChange(event) {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedIps(selectedIps.length === options.length ? [] : options);
      return;
    }
    setSelectedIps(value);
  }

  function clickHandler1() {
    setGeneric(!generic)
  }
  function clickHandler2() {
    setAws(!aws)
  }
  function clickHandler3() {
    setNic(!nic)
  }
  function clickHandler4() {
    setLocalhost(!localhost)
  }
  function submitHandler() { 
    let connectorDetails = [];
    if (generic) {
      let obj1 = "generic";
      connectorDetails.push(obj1);
    }
    if (aws) {
      let obj1 = "aws";
      connectorDetails.push(obj1);
    }
    if (nic) {
      let obj1 = "nic";
      connectorDetails.push(obj1);
    }
    if (localhost) {
      let obj1 = "localhost";
      connectorDetails.push(obj1);
    }
    console.log("connectorrrrDetails", connectorDetails);
    console.log("connectorrrrDetails length", connectorDetails.length);
    let decreptToken = jwtDecode(Tokendataa.response.token);
    let emailData = decreptToken.email
    console.log("Email -- ",emailData)
    console.log("decreptToken",decreptToken)
    console.log("deptName", decreptToken.deptname);
    console.log("type of node",typeOfNode)
    console.log("singleNode",singleNodeIP)
    console.log("multiNode",selectedIps)
    if(typeOfNode==="singlenode"){
      dispatch(chooseInfaStr(connectorDetails,decreptToken.deptname,singleNodeIP,typeOfNode,emailData))
    }else{
      console.log("multinode")
      dispatch(chooseInfaStr(connectorDetails,decreptToken.deptname,selectedIps,typeOfNode,emailData))
    }
    /*if (connectorDetails.length < 1) {
      toast.error("Please check the box");
      console.log("hii");
    } else {
      dispatch(
        chooseInfrastructure(
          connectorDetails,
          decreptToken.deptname,
          dynamicToken
        )
      );*/

      /*const timer = setTimeout(() => {
        console.log("This will run after 1 second!");
        dispatch(deptInfraList(decreptToken.deptname));
      }, 100);
    }*/
  }

  const dataFormatter = (cell, row, rowIndex, formatExtraData) => {
    return(
     <p>{connectorNames[row.len-1].toString()}</p>
    )
  }

  let columns = [
    {
      dataField: "len",
      text: "Serial No",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "connectorType",
      text: "Connector Type",
      align: "center",
      headerAlign: "center",
      formatter: dataFormatter
    },

    // {
    //   dataField: "cname",
    //   text: "Connector Name",
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      dataField: "requestTime",
      text: "Request Time",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "status",
      text: "Status",
      align: "center",
      headerAlign: "center",
    },
  ]

  const expandRow = {
    renderer: row => (
      <div>
        <p><strong>Connector Name : </strong>{connectorNameArray[row.len - 1]}</p>
      </div>
    )
  };

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(rowIndex)
    }
  };
  //console.log(da)

  // let data = [{ 'sNo': 1, 'ctype': 'AWS', 'regDets': '10:50', 'cname': 'AWS', 'regDets1': '10:50', 'status': 'pending' },
  // { 'sNo': 2, 'ctype': 'NIC', 'regDets': '10:50', 'cname': 'AWS', 'regDets1': '10:50', 'status': 'pending' },
  // { 'sNo': 3, 'ctype': 'AWS', 'regDets': '10:50', 'cname': 'AWS', 'regDets1': '10:50', 'status': 'pending' },
  // { 'sNo': 4, 'regDets': '10:50', 'ctype': 'AWS', 'cname': 'AWS', 'regDets1': '10:50', 'status': 'pending' }]
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      <div className="" style={{ width: '100%', height: '14%' }}>
        <Header />
      </div>

      <div style={{ width: '100%', height: '74vh', display: 'flex', marginTop: '1.2%' }}>
        <div style={{ width: '17%', height: '100%', backgroundColor: '#137EA9' }}>
          {/* <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'white', color: 'black' }} onClick={butHandler4} id='but4'>Dashboard</button> */}
          {/*<button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler1} id='but1'>User Management</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler2} id='but2'>Infrastructure</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler3} id='but3'>User-Infra Binding</button>*/}
          <DepartmentDashboardScript />
        </div>
        <div style={{ width: '83%', height: '100%', padding: '1%', overflow: 'scroll' }}>
        <div style={{}}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormGroup
                style={{
                  marginBottom: "15px",
                  width: "50%",
                }}
              >
                <h4>Choose Infrastructure</h4>
                <FormControlLabel
                  control={
                    <Checkbox onClick={clickHandler1} checked={generic} />
                  }
                  label="Generic"
                />
                <FormControlLabel
                  control={<Checkbox onClick={clickHandler2} checked={aws} />}
                  label="AWS"
                />
                <FormControlLabel
                  control={<Checkbox onClick={clickHandler3} checked={nic} />}
                  label="NIC"
                />
                <FormControlLabel
                  control={
                    <Checkbox onClick={clickHandler4} checked={localhost} />
                  }
                  label="Localhost"
                />
              </FormGroup>
              <FormControl fullWidth style={{ }}>
                <InputLabel id="type-of-node">Select Node</InputLabel>
                <Select
                  labelId="type-of-node"
                  id="demo-simple-select"
                  value={typeOfNode}
                  label="Age"
                  onChange={(e) => setTypeOfNode(e.target.value)}
                >
                  {generic && (
                    <MenuItem value={"singlenode"}>Single Node</MenuItem>
                  )}
                  {generic && (
                    <MenuItem value={"multinode"}>Multi Node</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ }}>
                <InputLabel id="no-of-ip">Select IP</InputLabel>
                {typeOfNode === "singlenode" && (
                  <Select
                    labelId="no-of-ip"
                    id="demo-simple-select"
                    value={singleNodeIP}
                    label="Age"
                    onChange={(e) => setSingleNodeIP([e.target.value])}
                  >
                    {ipsDa &&
                      ipsDa.map((data) => (
                        <MenuItem key={data._id} value={data.IP}>
                          {data.IP}
                          <i>({data.location})</i>
                        </MenuItem>
                      ))}
                  </Select>
                )}
                {typeOfNode === "multinode" && (
                  <Select
                    labelId="no-of-ip"
                    multiple
                    value={selectedIps}
                    onChange={handleMultiIpsChange}
                    renderValue={(selectedIps) => selectedIps.join(", ")}
                  >
                    <MenuItem value="all">
                      <ListItemIcon>
                        <Checkbox checked={isAllSelectedIps} />
                      </ListItemIcon>
                      <ListItemText primary="Select All" />
                    </MenuItem>
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        <ListItemIcon>
                          <Checkbox
                            checked={selectedIps.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </div>
            <Button
              size="small"
              style={{ width: "7%",float:"right",padding:"5px",marginBottom:"10px"}}
              variant="contained"
              onClick={submitHandler}
            >
              Submit
            </Button>
          </div>
          {da !== undefined && <BootstrapTable keyField='len' data={da} columns={columns} expandRow={expandRow} rowEvents={rowEvents} pagination={paginationFactory()} />}

        </div>
      </div>

      <div style={{ width: '100%', height: '10%', position: "fixed", bottom: 0, }}>
        <Footer className="footer_text" />
      </div>
      <ToastContainer autoClose={4000} />

    </div>
  );
}