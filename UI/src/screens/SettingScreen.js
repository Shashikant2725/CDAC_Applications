import React, { useState } from "react";
//import FileBase64 from "react-file-base64";
import { createConnector } from "../actions/Fabric/FabricAction";

import home from '../images/home.png'

import eye from '../images/eye.png'
import UploadChaincodeScript from "../components/UploadChaincodeScript";
import { useDispatch, useSelector } from "react-redux";
import { fabricCCScript } from "../actions/Fabric/FabricAction";

////import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import { ThreeDots } from "react-loader-spinner"


//import Dropdown from 'react-dropdown';
//import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-dropdown/style.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewComponentScript from '../components/NewComponentScript'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const UploadChaincode = (props) => {

  const data = useSelector((store) => store.fabric_cc);
  const { error, response, loading } = data;

  const [file, setFile] = useState([]);
  // console.log("file is ", file);
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");
  const [language, setSelectedLanguage] = useState("")
  const [connectorName, setConnectorName] = useState("")
  const [MACconnector, setMACConnector] = useState("")
  const [IPconnector, setIPConnector] = useState("")
  const [Locate, setLocate] = useState("")



  localStorage.setItem("selectedlanguage", language)
  let version = localStorage.getItem("Version")
  let plat = localStorage.getItem("Platform")
  let Env = localStorage.getItem("Environment")
  // console.log("language is",language)

  const dispatch = useDispatch();
  let history = useNavigate();
  let connectorToken=useSelector((store)=>store.login_api)

  const options = [
    'node', 'go'
  ];

  let channel = localStorage.getItem("Channel")

  // console.log("Choosen ChainCode Name : " + name);
  const platform = localStorage.getItem("Platform");
  // console.log("updated language is ;- ", language)

  //******** Time calculating *******//

  var timeTaken

  if (loading === false) {
    let startTime = localStorage.getItem("UCStartTime")
    let endTime = Date.now();

    var ms = Math.abs(endTime - startTime),
      min = Math.floor((ms / 1000 / 60) << 0),
      sec = Math.floor((ms / 1000) % 60);

    timeTaken = min + " min" + ":" + sec + " sec"
    console.log(min + " min" + ':' + sec + " sec");
  }


  let appname = localStorage.getItem("AppName")

  function genericHandler() {
    console.log('first')
    let body = {
      'connectorType': 'generic',
      'connectorName': connectorName,
      'ip': IPconnector,
      'mac': MACconnector,
      'location': Locate

    }
    console.log(body)
    
    console.log("connector" , connectorToken.response )
 
    let decodedToken = connectorToken.response

    dispatch(createConnector(decodedToken,body))
    history("/eapp");
  }
  function changeHandler(e) {
    // console.log(e.target.value)
    if (e.target.name === 'connectorName') {
      setConnectorName(e.target.value)
    }
    if (e.target.name === 'MACconnector') {
      setMACConnector(e.target.value)
    }
    if (e.target.name === 'IPconnector') {
      setIPConnector(e.target.value)
    }
    if (e.target.name === 'Locator') {
      setLocate(e.target.value)
    }
  }


  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
      <div className="" style={{ width: '100%', height: '14%' }}><Header /></div>
      <div style={{
        width: '100%',
        height: '72%',
        marginTop: '19px',
        marginBottom: '19px',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div className="leftScript"><NewComponentScript style={{ width: '100%', height: '100%' }} /></div>
        <div className="rightScript">
          <div className="rightNavScript">
            <div className="NavLeft">
              <img style={{ color: '#137EA9' }} src={home} width={18}></img>
              <p>/</p>
              <p style={{ color: '#137EA9' }}>Application Setup</p>
              <p>/</p>
              <p>Connector</p>
            </div>
            <div className="NavRight"><p data-bs-toggle="modal" data-bs-target="#exampleModal1"><img src={eye} width={18}></img> View Application Setup Details</p></div>
          </div>
          <div className="rightMainScript">
            <div style={{ width: '80%', height: '84%', color: 'black'}}>
              <form >
                <div className="mb-3" >
                  <label for="exampleInputEmail1" className="form-label" style = {{color:"black",textAlign : "left"}} >Name of the connector</label>
                  <input type="text" onChange={(e) => changeHandler(e)} value={connectorName} name='connectorName' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label" style = {{color:"black",textAlign : "left"}}>IP of vm</label>
                  <input type="text" onChange={(e) => changeHandler(e)} value={IPconnector} name='IPconnector' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label" style = {{color:"black",textAlign : "left"}}>MAC of vm</label>
                  <input type="text" onChange={(e) => changeHandler(e)} value={MACconnector} name='MACconnector' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label" style = {{color:"black",textAlign : "left"}}>Location</label>
                  <FormControl sx={{ width: 887 }} size="small" style={{ marginRight: '15px' }}>
                    <InputLabel id="demo-select-small">Location</InputLabel>
                    <Select
                      name='Locator'
                      value={Locate}
                      label='Location'
                      onChange={(e) => changeHandler(e)}
                    >

                      <MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
                      <MenuItem value={'Noida'}>Noida</MenuItem>
                      <MenuItem value={'Pune'}>Pune</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>

                </div>




                <button type="button" onClick={genericHandler} class="btn btn-primary" style={{ marginLeft: '110%', marginTop: '4%' }}>Submit</button>
              </form>

            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}><Footer className="footer_text" /></div>
      <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '9%', marginLeft: '30%' }}>
        <div class="modal-dialog">
          <div class="modal-content" style={{ borderRadius: '12px', border: 'none' }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">View Application Setup details</h5>
              <button style={{ color: 'white' }} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div style={{ height: '25px', width: '100%', backgroundColor: '#F5F5F5', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>App Name</p>
                <p style={{ marginLeft: '90px', marginRight: '120px' }}>-</p>
                <p>{appname}</p>
              </div>
              <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>Version</p>
                <p style={{ marginLeft: '110px', marginRight: '120px' }}>-</p>
                <p>{version}</p>
              </div>
              <div style={{ height: '25px', width: '100%', backgroundColor: '#F5F5F5', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>Platform</p>
                <p style={{ marginLeft: '100px', marginRight: '120px' }}>-</p>
                <p>{plat}</p>
              </div>
              <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>ENV</p>
                <p style={{ marginLeft: '126px', marginRight: '120px' }}>-</p>
                <p>{Env}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadChaincode;