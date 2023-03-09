import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";

import home from '../images/home.png'

import eye from '../images/eye.png'
import UploadChaincodeScript from "../components/UploadChaincodeScript";
import { useDispatch, useSelector } from "react-redux";
import { upgradefabricCCScript,channelTypes,eappStatus } from "../actions/Fabric/FabricAction";
import jwt_decode from "jwt-decode";


// //import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { ThreeDots } from "react-loader-spinner"

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Terminal from 'terminal-in-react';
import Header from "../components/Header";
import Footer from "../components/Footer"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UploadChaincode = (props) => {

    //loader part
    const [openLoader, setOpenLoader] = React.useState(false);
    const handleCloseLoader = () => {
      setOpenLoader(false);
    };

  const data = useSelector((store) => store.fabric_cc);
  const { error, response, loading } = data;
  // useEffect(()=>{
  //   if(loading===true){
  //     setOpenLoader(true)
     
  //   }
  //   else{
  //     setOpenLoader(false)
  //   }
  //   },[data])


   let connectorToken=useSelector((store)=>store.login_api)
  

  const [file, setFile] = useState([]);
  console.log("file is ", file);
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");
  const [language, setSelectedLanguage] = useState("node")
  const [chooseversion, setVersion] = useState("")
  const [channelss,setChannel] = useState("")
  console.log("channelss",channelss)
   

  localStorage.setItem("selectedlanguage", language)
  let version = localStorage.getItem("Version")
  let plat = localStorage.getItem("Platform")
  let Env = localStorage.getItem("Environment")
  // console.log("language is",language)

  const dispatch = useDispatch();
  const history = useNavigate()

  let mydata = useSelector((loginData) => loginData.login_api); 

  const channelData = useSelector((channelStore) => channelStore. userDynamicChannels)
  console.log("channelData",channelData)
  const {channelErrors,channelResponse,channelLoading} = channelData
  console.log("channelResponse",channelResponse)

  const { apperror, appresponse, apploading } = useSelector((app) => app.appStatus);
  console.log("app response in script ",appresponse)

  const upgradeChainCodeData =  useSelector((upgradeData) => upgradeData.upgradeFabricChaincode)
  const {upgradeloading,upgraderesponse,upgradeerror} =  upgradeChainCodeData
  console.log("upgradeloading",upgradeloading)

  useEffect(()=>{
    if(upgradeloading===true){
      setOpenLoader(true)
     
    }
    else{
      setOpenLoader(false)
    }
    },[upgradeChainCodeData])
  console.log("upgrade Response",upgraderesponse)


  useEffect(() => {
    if(upgraderesponse !== undefined){
      history("/eapp")
    }

  },[upgraderesponse])


  
  useEffect(() => {
    let AppName = localStorage.getItem("rowAppName")
    let dynamicToken =  mydata.response.token
    let decoded = jwt_decode(mydata.response.token)
    let userEmail = decoded.email
    dispatch(eappStatus(dynamicToken,userEmail,AppName))  
    


  },[])

  // let emailData = localStorage.getItem("email")
  // let userAppName = localStorage.getItem("ApplicationName")
  

  // useEffect(() => {
   
  //   dispatch(channelTypes(emailData,userAppName))

  // },[])

  const options = [
    'node', 'go'
  ];

  let channel = localStorage.getItem("Channel")
 

  console.log("Choosen ChainCode Name : " + name);
  const platform = localStorage.getItem("Platform");

  function getFiles(files) {

    let str = files.name;
    str.endsWith(".zip") ? setFile(files) : setFile([]);
    if (str.endsWith(".zip")) {
      // let modifiedName = str.substr(0, newName.lastIndexOf('.'));
      let modifiedName = str.split(".")[0];
      setName(modifiedName);
      // console.log("in side modified name",modifiedName);
    }
  }

  function display() {
    if (appresponse[2].function === "chaincode") {
      let platform = appresponse[0].platform
      let channel = appresponse[0].channelname
      let userEmail = appresponse[0].email
      let AppName = appresponse[0].appName

      console.log("userEmail",appresponse[0].email)
      let chaincode = "";
      if (file.length != 0) {
        let str = file.base64;
        console.log(`base 64 code is ${str}`)
        chaincode = str.substring(str.indexOf(",") + 1);
      }

      let UploadChaincodeStartTime = Date.now();
      localStorage.setItem("UCStartTime", UploadChaincodeStartTime)
      
    console.log("connector" , connectorToken.response )
 
    let decodedToken = connectorToken.response

      dispatch(upgradefabricCCScript(decodedToken,userEmail,platform,AppName,name,language,channelss,chaincode ));
      console.log(`channel code ${channel}`)
    }

  }

  // function display() {
  //   let chaincode = "";
  //   if (file.length != 0) {
  //     let str = file.base64;
  //     console.log(`base 64 code is ${str}`)
  //     chaincode = str.substring(str.indexOf(",") + 1);
  //   }
  //   // console.log("modified name is : " + modifiedName);
  //   //console.log("chaincode : " + chaincode);

  //   //****** calculating the start time of api call and store in local storage ****

  //   let UploadChaincodeStartTime = Date.now();
  //   localStorage.setItem("UCStartTime", UploadChaincodeStartTime)

  //   dispatch(upgradefabricCCScript(name, channel, chaincode, platform));
  //   //console.log(`channel code ${channel}`)
  // }

  const getLanguage = (e) => {
    console.log("option is", e.target.value)
    setSelectedLanguage(e.target.value)
  }
  console.log("updated language is ;- ", language)

  //******** Time calculating *******//
  const getVersion = (e) => {
    console.log("option is", e.target.value)
    setVersion(e.target.value)
  }

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

  const showMsg = () => {
    'Hello World'
  }

  let appname = localStorage.getItem("AppName")


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
         <div>
            {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoader}
              onClick={handleCloseLoader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        <div className="leftScript"><UploadChaincodeScript style={{ width: '100%', height: '100%' }} /></div>
        <div className="rightScript">
          <div className="rightNavScript">
            <div className="NavLeft">
              <img style={{ color: '#137EA9' }} src={home} width={18}></img>
              <p>/</p>
              <p style={{ color: '#137EA9' }}>Application Setup</p>
              <p>/</p>
              <p>Upgrade Chaincode</p>
            </div>
            <div className="NavRight"><p data-bs-toggle="modal" data-bs-target="#exampleModal1"><img src={eye} width={18}></img> View Application Setup Details</p></div>
          </div>
          <div className="rightMainScript">
            <div style={{ width: '50%', height: '67%' }}>
              <div className="input-group-append" style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>

                <div style={{ backgroundColor: '#F9F9F9', width: '100%', height: '40%', padding: '5px', border: '1px solid #E4E4E4', marginBottom: '2%' }} >
                  <p style={{ color: 'grey' }}>Choose your template</p>
                  <div style={{ width: '100%', backgroundColor: 'white', height: '62%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #137EA9' }}>
                    <span className="border border-secondary rounded col-md-12" style={{ width: '60%' }}>
                      <FileBase64 multiple={false} onDone={getFiles} />
                    </span>
                  </div>

                </div>

                <div style={{ backgroundColor: '#F9F9F9', width: '100%', height: '27%', padding: '5px', border: '1px solid #E4E4E4', marginBottom: '2%' }} >
                  <p style={{ color: 'grey' }}>Choose any Language</p>
                  <select className="w-100" placeholder="select any language" onChange={getLanguage} style={{ width: "100%", height: '45%', fontSize: "12px", borderRadius: "4px", backgroundColor: "white", paddingLeft: '5px' ,border:'1px solid #D0D2D6'}}>
                    {options.map((language) => <option style={{ width: "280px", fontSize: "20px", borderRadius: "2px", backgroundColor: "transparent" }}>{language}</option>)}
                  </select>
                </div>

                <div style={{ backgroundColor: '#F9F9F9', width: '100%', height: '27%', padding: '5px', border: '1px solid #E4E4E4' , marginBottom: '2%' }} >
                  <p style={{ color: 'grey' }}>Choose your Version type</p>
                  <input className="w-100" placeholder="enter your version type ..." onChange={getVersion} style={{ width: "100%", height: '45%', fontSize: "12px", borderRadius: "4px", backgroundColor: "white", paddingLeft: '5px', border: '1px solid grey', outline: 'none',border:'1px solid #D0D2D6' }}>

                  </input>
                </div>

                <div style={{ backgroundColor: '#F9F9F9', width: '100%', height: '27%', padding: '5px', border: '1px solid #E4E4E4' }} >
                  <p style={{ color: 'grey' }}>Choose any Channel</p>
                  <select className="w-100" placeholder="select any Channel" style={{ width: "100%", height: '45%', fontSize: "12px", borderRadius: "4px", backgroundColor: "white",border:'1px solid #D0D2D6' }} onChange={(e) => setChannel(e.target.value)}>
                  <option>......Select Channel.....</option>
                  {channelResponse !== undefined && channelResponse.map((channelNames,index) => <option style={{ width: "280px", fontSize: "14px", borderRadius: "2px", backgroundColor: "transparent" }} value={channelNames}>{channelNames}</option> )}

                    {/* {options.map((language) => <option style={{ width: "280px", fontSize: "20px", borderRadius: "2px", backgroundColor: "transparent" }}>sample</option>)} */}
                  </select>
                </div>

                <div>
                  <button
                    style={{ backgroundColor: '#137EA9', border: 'none', marginTop: '20px', color: 'white' }}
                    type="submit"
                    className="btn btn-success float-end "
                    onClick={display}
                  >
                    Submit Deployment
                  </button>
                </div>

              </div>
              <div className="">
                {loading && <div> Upload ChainCode </div>}
                {response && <div>Response : {timeTaken}</div>}
                {error && <div>ERROR : Request Fail</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}><Footer className="footer_text" /></div>
      <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '9%',marginLeft:'30%'}}>
        <div class="modal-dialog">
          <div class="modal-content" style={{borderRadius:'12px',border:'none'}}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">View Application Setup details</h5>
              <button style={{ color: 'white' }} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div style={{height:'25px',width:'100%',backgroundColor:'#F5F5F5',display:'flex',allignItems:'center',fontSize:'12px',color:'black',fontWeight:'800',paddingLeft:'16px'}}>
                    <p>App Name</p>
                    <p style={{marginLeft:'90px',marginRight:'120px'}}>-</p>
                    <p>{appname}</p>
              </div>
              <div style={{height:'25px',width:'100%',backgroundColor:'white',display:'flex',allignItems:'center',fontSize:'12px',color:'black',fontWeight:'800',paddingLeft:'16px'}}>
                    <p>Version</p>
                    <p style={{marginLeft:'110px',marginRight:'120px'}}>-</p>
                    <p>{version}</p>
              </div>
              <div style={{height:'25px',width:'100%',backgroundColor:'#F5F5F5',display:'flex',allignItems:'center',fontSize:'12px',color:'black',fontWeight:'800',paddingLeft:'16px'}}>
                    <p>Platform</p>
                    <p style={{marginLeft:'100px',marginRight:'120px'}}>-</p>
                    <p>{plat}</p>
              </div>
              <div style={{height:'25px',width:'100%',backgroundColor:'white',display:'flex',allignItems:'center',fontSize:'12px',color:'black',fontWeight:'800',paddingLeft:'16px'}}>
                    <p>ENV</p>
                    <p style={{marginLeft:'126px',marginRight:'120px'}}>-</p>
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