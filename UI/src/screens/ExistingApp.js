import React, { useReducer, useRef } from "react";
import { useState, useEffect,useCallback } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { existingAppReducer } from "../reducers/Fabric/fabricReducer"
import { toast } from "react-toastify";
import { createApp } from "../actions/Fabric/FabricAction";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import BootstrapTable from "react-bootstrap-table-next";
import { eApp, eappStatus,channelTypes,organizationDataFetchStore,threeEndpoints, stopNetwork,removeNetwork } from "../actions/Fabric/FabricAction";
import Header from "../components/Header";
import up from "../images/trending-up.png";
import app from "../images/apps.png";
import dL from "../images/device-laptop.png";
import tick from "../images/whiteTickLogo.png";
import "../css/tracker.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import { BsThreeDots } from "react-icons/bs";

import NotStartedIcon from "@mui/icons-material/NotStarted";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import trashh from '../images/trashh.png'
import editt from '../images/edittt.png'
// import connect from 'react-redux';

import { MdRefresh } from "react-icons/md";
import jwt_decode from "jwt-decode";

import { AiFillCaretDown } from "react-icons/ai";
import { BsFillCaretDownSquareFill } from "react-icons/bs";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from "react-loader-spinner";

import {store} from "../store"


import {
  Col,
  Row,
  Table,
} from "@themesberg/react-bootstrap";
 import Backdrop from '@mui/material/Backdrop';
 import CircularProgress from '@mui/material/CircularProgress';


const ExistingApp = (props) => {

  // const [ExistingAppList] = useReducer(existingAppReducer);
  const [openLoader, setOpenLoader] = React.useState(false);


  const handleClose = () => {
    setOpenLoader(false);
   
  };

  const dispatch = useDispatch()

  useEffect(() => {
    let decode = jwt_decode(mydata.response.token) 
    console.log("decodeEmail",decode.email)
    let mail = decode.email
    dispatch(eApp(mail,mydata.response.token))
  }, [])

  
  const allApiData = useSelector((alldata) => alldata.all_api)
  const {apiloading,apiresponse,apierror,appData} = allApiData
  // console.log("apiloadinggggg",apiloading)
  // console.log("apiloadinggggg",apiresponse)


  // const status = useSelector((status) => status.appStatus)
  //   console.log("stratus.........................",status)
  //   // const { apploading, appresponse, apperror } = status
  //   let appStatusResponse = status.appresponse
  //   console.log("..........................",appStatusResponse)

  // const getAppStatus=()=>{
  //   let dynamicToken = jwt_decode(mydata.response.token) 
  //     console.log("decodeEmail11111",dynamicToken.email)
  //     let userEmail = dynamicToken.email
  //     let channelAppName = statuses
  //   dispatch(eappStatus(dynamicToken,userEmail,channelAppName))
  // }


  useEffect(()=>{
    if(apiresponse!=="" && apiresponse!==undefined){
      let decode = jwt_decode(mydata.response.token) 
    console.log("decodeEmail",decode.email)
    let mail = decode.email
    dispatch(eApp(mail,mydata.response.token))
    }
  },[apiresponse])

  useEffect(() => {
    if(apiloading === true) {
      setOpenLoader(true)
    }else {
      setOpenLoader(false)
    }
  },[allApiData])



  //**********REDUCER FOR EXITED APP *********/
  const data = useSelector((store) => store.eApp);
  const { error, response, loading } = data;

  useEffect(() => {
    if (loading === true) {

      setOpenLoader(true);
      setTimeout(
        () => setOpenLoader(false),
        1000
      );
    }
    else {
      setOpenLoader(false);
    }
  }, [data])


  let mydata = useSelector((store) => store.login_api);
  //let { err, res, load } = mydata;
  //console.log(mydata.response)

  // const status = useSelector((status) => status.appStatus)
  // const { apploading, appresponse, apperror } = status


  // useEffect(() => {
  //   if(apploading === true) {
  //     setOpenLoader(true)
  //   }else {
  //     setOpenLoader(false)
  //   }
  // },[status])

  let [portainerr, setPortainerr] =useState("")
  let [ExpUrl, setExpUrl] =useState("")

  function appStatusResult(data) {
    console.log("ddaattaa",JSON.parse(data[0].explorerurl)["Explorer URL"].replace("\"",""))
    setExpUrl(JSON.parse(data[0].explorerurl)["Explorer URL"].replace("\"",""))
    console.log("ddaattaa",JSON.parse(data[0].portainerurl)["Portainer URL:"])
    setPortainerr(JSON.parse(data[0].portainerurl)["Portainer URL:"])
    // console.log("ddaattaa",data[0])
    // console.log("ddaattaa",data[0].portainerurl)

  }




  const [state, setState] = useState("");
  const [AppName, setName] = useState("");
  const [plat, setPlat] = useState("");
  const [version, setVersion] = useState("");
  const [open, setOpen] = useState(true);
  const [eapp, setEapp] = useState([]);
  const [selectedApp, setSelectedApp] = useState("")
  const [selectedDeleteApp, setSelectedDeleteApp] = useState("")
  const [refreshedApp, setRefreshedApp] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [statuses,setStatus] = useState("")
  //const statusAppName = useState(localStorage.getItem("rowAppname"))
  
  useEffect(() => {
    if(statuses !== ""){
      let dynamicToken = jwt_decode(mydata.response.token) 
      console.log("decodeEmail11111",dynamicToken.email)
      let userEmail = dynamicToken.email
      let channelAppName = statuses
      // dispatch(eappStatus(dynamicToken,userEmail,channelAppName))
      //dispatch(eappStatus(dynamicToken,userEmail,channelAppName))
    //   //localStorage.removeItem("rowAppName")
    }
  },[statuses])

  var history = useNavigate();

  const editDelete = <div>
    <BsThreeDots />
    {/*<img style={{ color: 'red' }} src={trashh} width={20} />*/}
  </div>

  const navigateNextSawtooth = () => {

    console.log(mydata.response.token)
    let decoded = jwt_decode(mydata.response)
    
    console.log("decoded",decoded)
    if (decoded.role === "appAdmin") {
      history("/eapp");

    }
    else {
      history("/departmentDashboard");
    }
  };

  const navigateNextOrderer = () => {
    if (!new RegExp(/^[a-z0-9]{1,16}$/m, "i").test(AppName)) {
      toast.error("Please Enter Valid App Name !!");
    } else {
      //   localStorage.setItem("AppName", name);
      //dispatch(createApp(name))
      history("/organisation");
    }
  };


  const onClickOfRefrsh = async (Appname) => {
    let tokenData =  mydata.response.token
    console.log("tokenData",tokenData)
    let decoded =  jwt_decode(mydata.response)
    let mail = decoded.email
    console.log(Appname)
    //dispatch(eappStatus(Appname,mail,tokenData))
    setTimeout(() => {
      //disableRefresh(Appname)
    }, 500)
  }

  
  function newAppHandler() {
    history("/choose_nw");
   
  }

  const dataFormatter = (cell, row, rowIndex, formatExtraData) => {
    return(
      // <AiFillCaretDown/>
      <BsFillCaretDownSquareFill/>
    )
  }

  const nodeFormatter = (cell, row, rowIndex, formatExtraData) => {
    console.log("row",row.node)
    if (row.node === "test"){
      return "Single Node"
    }else{
      return "Multi Node"
    }
  }

  let mycolumns = [
    {
      formatter: dataFormatter,
      align: "center",
    },
    {
      dataField: "appName",
      text: "App Name",
      align: "left",
      headerAlign: "left",
      sort:true,
    },
    {
      dataField: "node",
      text: "Setup Type",
      align: "center",
      formatter: nodeFormatter,
      headerAlign: "center",
    },
    {
      dataField: "platform",
      text: "Platform",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "status",
      text: "Infra Status",
      align: "center",
      headerAlign: "center",
      style: { color: '#08cc0f' ,textTransform:'capitalize '}
    },
  ]

  let a = []

 const  rowEvents = {
  onClick: (e, row, rowIndex) => {
    // setStatus(row.appName)
    let dynamicToken =  mydata.response.token
    console.log("dynamicToken",dynamicToken)
    let decoded = jwt_decode(mydata.response.token)
    let userEmail = decoded.email
    let channelAppName  =  row.appName
    console.log("channelAppname",channelAppName)
    localStorage.setItem("rowAppName",channelAppName)
    //fetchOrganizationalData(channelAppName)
    // EappStatusRequest(channelAppName)
    // dispatch(channelTypes(userEmail,channelAppName,dynamicToken),organizationDataFetchStore())
    Promise.all([dispatch(channelTypes(userEmail,channelAppName,dynamicToken)),dispatch(organizationDataFetchStore(userEmail,channelAppName)),dispatch(eappStatus(dynamicToken,userEmail,channelAppName,appStatusResult))])
    // setStatus(channelAppName)
    // dispatch(threeEndpoints(userEmail,channelAppName,dynamicToken))
  }
 }


  const onClickOfUploadCC = () => {
    history("/uploadCC")
  }

  const onClickOfUpgradeCC = () => {
    history("/upgradeCC")
  }

  const onClickStartNetwork = () => {
    history("/organizations")
  }

  const onClickOfRemoveNetwork = () => {
    //history("/stopNetwork")
    let token = mydata.response.token
    let dynamicToken = jwt_decode(mydata.response.token) 
    console.log("decodeEmail",token)
    let email = dynamicToken.email
    dispatch(removeNetwork(token, email))
  }

  const onClickOfEnrollUsers = () => {
    //dispatch(organizationDataFetchStore())
    history("/enrollusers")
  }

  const onClickStop = () => {
    let token = mydata.response.token
    let dynamicToken = jwt_decode(mydata.response.token) 
    console.log("decodeEmail",token)
    let email = dynamicToken.email
    dispatch(stopNetwork(token, email))
  }

  const getIcons = (fcn) => {
    console.log("fcn is executed", fcn)
    switch (fcn) {
      case "":
        return <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickStartNetwork}>Start NetWork</Button>
      case "generate":
        return <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfRefrsh}>Resume N/W setup</Button>
      case "netup":
        return <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfRefrsh}>Resume N/W setup</Button>
      case "channel":
        return (
          <>
            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfUploadCC}>upload cc</Button>

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfUpgradeCC}>upgrade cc</Button>

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickStop}>Stop NetWork</Button>            

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfRemoveNetwork}>Remove Network</Button>
          </>
        )
      case "chaincode":
        return (
          <>
            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfUploadCC}>upload cc</Button>

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfEnrollUsers}>Enroll Users</Button>

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfUpgradeCC}>upgrade cc</Button>

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickStop}>Stop NetWork</Button>            

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfRemoveNetwork}>Remove Network</Button>
          </>
        )
      case "chaincodeUpdate":
        return (
          <>
            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfUploadCC}>upload cc</Button>

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfEnrollUsers}>Enroll Users</Button>

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfUpgradeCC}>upgrade cc</Button>

            <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfRemoveNetwork}>Remove Network</Button>
          </>
        )
      case "down":
        return (
        <>
        <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickStartNetwork}>Start NetWork</Button>

        <Button variant="text" style={{ marginLeft: '2%' }} onClick={onClickOfRemoveNetwork}>Remove Network</Button>
        </>
        )

      default:
        return "Hello"
    }
  }

  const getStatus = (fcn) => {
    console.log("fcn in getStatus is",fcn)
    switch (fcn) {
      case "":
        return "Initiated"
      case "generate":
        return "Network Setup Ongoing"
      case "Start n/w":
        return "Network Setup Ongoing"
      case "channel":
        return "Network Running"
      case "chaincode":
        return "ChainCode Installed"
      case "chaincodeUpdate":
        return "Chaincode Updated"
      case "down":
        return "Network Down"
      default:
        return ""
  }
}


const fetchOrganizationalData = (channelAppName) => {
  //setchannelAppName(channelAppName)
    let dynamicToken = jwt_decode(mydata.response.token) 
    console.log("decodeEmail",dynamicToken.email)
    let userEmail = dynamicToken.email
    let AppName = channelAppName
    // dispatch(organizationDataFetchStore())
}

// const [rowExpand,setRowExpand] = useState([0,1])

// const handleOnExpand=(row,isExpand,rowIndex,e)=>{
//   console.log("row,isExpand,index,",row,isExpand,rowIndex)
//   if(isExpand){
//     setRowExpand([0,1])
//   }else{
//     setRowExpand([0,1])
//   }
// }

  const expandRow = {
    renderer: (row) => (
      // return(
      <div>
        <Table hover size="sm">
          <tbody className="text-center">
           
            <tr style={{backgroundColor:"#F2F2F2"}}>
              <td style={{textAlign:"right"}}>Status</td>
              <td>{getStatus(row.fcn)}</td>
            </tr>
            <tr style={{backgroundColor:"#F2F2F2"}}>
              <td style={{textAlign:"right"}}>Action</td>
              <td>{getIcons(row.fcn)}</td>
            </tr>
            
            {
              ( apiloading) && (
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
                // <tr>
                //    <td>Loader</td> 
                //    <td>Loading .............</td> 
                 
                //    </tr>
              )
            }
            {console.log("row...........................",row)}
            {
              ((row.portainerurl !== "" && row.explorerurl !== "") && (row.fcn !== "" && row.fcn !== "down") ) && (
                <tr style={{backgroundColor:"#F2F2F2"}}>
                 <td style={{textAlign:"right"}}>Tools</td> 
                  <td>
                    {/* <a style={{color:"blue"}} href={JSON.parse(row.explorerurl)["Explorer URL"].replace("\"","")} target="_blank">NBF Explorer</a> */}
                    <a style={{color:"blue"}} href={ExpUrl} target="_blank">NBF Explorer</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <a style={{color:"blue"}} href={JSON.parse(row.explorerurl)["Explorer URL"].replace("\"","")} target="_blank">Portainer</a> */}
                    <a style={{color:"blue"}} href={portainerr} target="_blank">Portainer</a>
                  </td>
                </tr>
              )
            }
            {/* {
              (row.fcn === "Chaincode") && (
                <tr style={{backgroundColor:"#F2F2F2"}}>
                  <td style={{textAlign:"right"}}>Tools</td>
                  <td><a>Link 1</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a>Link 2</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a>Rest</a></td>
                </tr>
              )
              
            } */}
          </tbody>
        </Table>
      </div>
      //  )
    ),
    onlyOneExpanding: true,
    // expanded :rowExpand,
    // onExpand:handleOnExpand
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#ECF2F6" }}>
      <div className="" style={{ width: "100%", height: "14%" }}><Header /></div>
      <div
        style={{
          width: "100%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: '2%',
        }}
      >
             <div>
            {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoader}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
       
          {/* <div>

              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={false}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              </div> */}
        <div id="TrackerPortion">
          <div id="mainTrackerData">
            <div id="circleAndData">
              <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
              <p style={{ fontSize: '12px' }}>Apps</p>
            </div>

            <div className="lineDiv"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">2</div>
              <p style={{ fontSize: '12px' }}>Create</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">3</div>
              <p style={{ fontSize: '12px' }}>Orgs</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">4</div>
              <p style={{ fontSize: '12px' }}>Consensus</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">5</div>
              <p style={{ fontSize: '12px' }}>Channel</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">6</div>
              <p style={{ fontSize: '12px' }}>StartNetwork</p>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            width: "73%",
            border: "1px solid #B0B5BB",
            height: "100%",
            paddingTop: "2.5%",
            overflow: "hidden",
            overflowY: 'auto'
          }}
        >
          {/* {response !== undefined && <BootstrapTable keyField="id" data={response} columns={columns} pagination={paginationFactory()} d/>} */}
          <Button onClick={newAppHandler} variant="contained" style={{ marginBottom: '1%', marginLeft: '77%' }}>Create new Application</Button>
          <div style={{ width: '100%' }}>
          {(response !== undefined) && <BootstrapTable keyField="appId" data={response} columns={mycolumns} pagination={paginationFactory()} expandRow={expandRow} rowEvents = {rowEvents} />}
          </div>
          {/* Back BUTTON Start */}
          <div
            className="d-flex "
            style={{
              width: "26%",
              height: "9%",
              marginLeft: "91%",
              marginBottom: '10px'
            }}
          >
            <Button onClick={() => { navigateNextSawtooth(); }} variant="contained">Back</Button>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
      <div style={{ width: "100%", height: "8%", position: "fixed", bottom: 0, }}>
        <Footer className="footer_text" />
      </div>
    </div>
   
   
  );
};


export default ExistingApp;