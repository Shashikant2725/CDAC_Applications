import React, { useEffect, useState,useRef } from "react";
import FileBase64 from "react-file-base64";

import home from '../images/home.png'
import eye from '../images/eye.png'
import UploadChaincodeScript from "../components/UploadChaincodeScript";
import { useDispatch, useSelector } from "react-redux";
import { fabricCCScript, channelTypes,eappStatus,organizationDataFetchStore} from "../actions/Fabric/FabricAction";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";



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


  const history = useNavigate()

  //loader part
  const [openLoader, setOpenLoader] = React.useState(false);
  const handleCloseLoader = () => {
    setOpenLoader(false);
  };

  const [channelss,setChannel] = useState("")
  console.log("channelResponsessssssssssssssss",channelss)

  let connectorToken=useSelector((store)=>store.login_api);
  const dispatch = useDispatch();

  let mydata = useSelector((loginData) => loginData.login_api);

  const data = useSelector((store) => store.fabric_cc);
  const { error, response, loading } = data;

  useEffect(()=>{
  if(loading===true){
    setOpenLoader(true)
   
  }
  else{
    setOpenLoader(false)
  }
  },[data])

  const { apperror, appresponse, apploading } = useSelector((app) => app.appStatus);
  console.log("app response in script ",appresponse)


  const { imageLoading, imageResponse, imageError } = useSelector((newimageData) => newimageData.imageData)
  

  const channelData = useSelector((channelStore) => channelStore. userDynamicChannels)
  console.log("channelData",channelData)
  const {channelErrors,channelResponse,channelLoading} = channelData
  console.log("channelResponse",channelResponse)

  // let emailData = localStorage.getItem("email")
  // let userAppName = localStorage.getItem("ApplicationName")
  
  

  // useEffect(() => {
   
  //   dispatch(channelTypes(emailData,userAppName))

  // },[])

  // useEffect(() => {
  //   console.log("sdfsdfsdfsdf")
  //   let AppName = localStorage.getItem("rowAppName")
  //   let dynamicToken =  mydata.response.token
  //   let decoded = jwt_decode(mydata.response.token)
  //   let userEmail = decoded.email
  //   dispatch(eappStatus(dynamicToken,userEmail,AppName))  
    


  // },[])



  const [file, setFile] = useState([]);
  console.log("file is ", file);
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");
  const [language, setSelectedLanguage] = useState("node")
  const [openn, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  //const [open, setOpen] = React.useState(false);
  let open = false
  console.log(appresponse)
  localStorage.setItem("selectedlanguage", language)
  // console.log("language is",language)

  

  let channelArray = localStorage.getItem("Channel")

  const options = [
    'node', 'go'
  ];


  let dummyChannnel = 'sample'
  if(localStorage.getItem("Channel")){
    
    dummyChannnel = localStorage.getItem("Channel")
  }

  let channel = localStorage.getItem("Channel")

  console.log("Choosen ChainCode Name : " + name);
  const platform = localStorage.getItem("Platform");

  // let chainCodeData = useSelector((chainDetails) => chainDetails.appStatus)
  // const {apperror,appresponse,apploading} = chainCodeData
  // console.log("chainCodeData" , appresponse)

  function RouteAfterResponse(data){
    console.log("upload chain code",data.result)
    if(data.result !== ""){
      history("/eapp")
    }
  }
  
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

  useEffect(() => {
    let channelAppName = localStorage.getItem("rowAppName")
    let dynamicToken =  mydata.response.token
    let decoded = jwt_decode(mydata.response.token)
    let userEmail = decoded.email
    dispatch(organizationDataFetchStore(userEmail,channelAppName))
},[])

  function display() {
    // console.log("asdawdasdasdasdawd",appresponse[1].function)
    // if (appresponse[1].function === "channel") {
            let platform = appresponse[0].platform
            //let channel = appresponse[0].channelname
            let userEmail = appresponse[0].email
            let AppName = appresponse[0].appName
    
            let chaincode = "";
            if (file.length != 0) {
              let str = file.base64;
              console.log(`base 64 code is ${str}`)
              chaincode = str.substring(str.indexOf(",") + 1);
            }
    
            let UploadChaincodeStartTime = Date.now();
            localStorage.setItem("UCStartTime", UploadChaincodeStartTime)
            
            console.log("connector" , connectorToken.response )
         
            let decodedToken = connectorToken.response.token
    
             dispatch(fabricCCScript(decodedToken,userEmail,platform,AppName,name,language,channelss, chaincode,RouteAfterResponse ));
            console.log(`channel code ${channel}`)
          //}

  }

  

  // function display() {
  //   open = true
  //   console.log(openn)
  //   setOpen(!openn);
  //   console.log(openn)
  //   //setLoaderCondition(true)
  //   console.log('first')
    
  //    if (imageResponse !== undefined) {
  //     if (appresponse[1].function === "channel") {
  //       let platform = appresponse[0].platform
  //       let channel = appresponse[0].channelname
  //       let userEmail = appresponse[0].email
  //       let AppName = appresponse[0].appName

  //       console.log("userEmail",appresponse[0].email)
  //       let chaincode = "";
  //       if (file.length != 0) {
  //         let str = file.base64;
  //         console.log(`base 64 code is ${str}`)
  //         chaincode = str.substring(str.indexOf(",") + 1);
  //       }

  //       let UploadChaincodeStartTime = Date.now();
  //       localStorage.setItem("UCStartTime", UploadChaincodeStartTime)

  //       // dispatch(fabricCCScript(userEmail,platform,AppName,name,language,channelss, chaincode ));
  //       //console.log(`channel code ${channel}`)
  //     }
  //     else {
  //       let chaincode = "";
  //       if (file.length != 0) {
  //         let str = file.base64;
  //         console.log(`base 64 code is ${str}`)
  //         chaincode = str.substring(str.indexOf(",") + 1);
  //       }
  //       // console.log("modified name is : " + modifiedName);
  //       //console.log("chaincode : " + chaincode);

  //       //****** calculating the start time of api call and store in local storage ****

  //       let UploadChaincodeStartTime = Date.now();
  //       localStorage.setItem("UCStartTime", UploadChaincodeStartTime)

  //       // dispatch(fabricCCScript(name, channelss, chaincode, platform));
  //       //console.log(`channel code ${channel}`)
  //     }
  //   }
  //   else {
  //     let chaincode = "";
  //     if (file.length != 0) {
  //       let str = file.base64;
  //       console.log(`base 64 code is ${str}`)
  //       chaincode = str.substring(str.indexOf(",") + 1);
  //     }
  //     // console.log("modified name is : " + modifiedName);
  //     //console.log("chaincode : " + chaincode);

  //     //****** calculating the start time of api call and store in local storage ****

  //     let UploadChaincodeStartTime = Date.now();
  //     localStorage.setItem("UCStartTime", UploadChaincodeStartTime)
  //     console.log(channel,platform)
  //     // dispatch(fabricCCScript(name, channelss, chaincode, platform));
  //     //console.log(`channel code ${channel}`)
  //   }

  // }

  const getLanguage = (e) => {
    console.log("option is", e.target.value)
    setSelectedLanguage(e.target.value)
  }
  console.log("updated language is ;- ", language)

  //******** Time calculating *******//
  var timeTaken = 0
  
  // if (response) {
  //   setOpen(false);
  // }

  console.log(loading)
  if (loading === false) {
    open = false
    let startTime = localStorage.getItem("UCStartTime")
    let endTime = Date.now();

    var ms = Math.abs(endTime - startTime),
      min = Math.floor((ms / 1000 / 60) << 0),
      sec = Math.floor((ms / 1000) % 60);

    timeTaken = min + " min" + " : " + sec + " sec"
    console.log(min + " min" + ':' + sec + " sec");
    console.log(timeTaken)

  }

  const selectedChannel = (e) => {
    console.log("e.target.val",e.target.value)
  }
  // let afterButtonClick = (<div style={{ marginTop: '20%', marginLeft: '20%' }}>
  //   {(response === undefined && (loaderCondition)) && loadingqj}
  //   {response && <div>Response Time : {timeTaken}</div>}
  //   {error && <div>ERROR : Request Fail</div>}
  // </div>)
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
              <p>Upload Chaincode</p>
            </div>
            <div className="NavRight"><p data-bs-toggle="modal" data-bs-target="#exampleModal1"><img src={eye} width={18}></img> View Application Setup Details</p></div>
          </div>
          <div className="rightMainScript">
            <div style={{ width: '50%', height: '67%' }}>
              <div className="input-group-append" style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>

                <div style={{ backgroundColor: '#F9F9F9', width: '100%', height: '50%', padding: '10px', border: '1px solid #E4E4E4', marginBottom: '2%' }} >
                  <p style={{ color: 'grey' }}>Choose your template</p>
                  <div style={{ width: '100%', backgroundColor: 'white', height: '62%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #137EA9' }}>
                    <span className="border border-secondary rounded col-md-12" style={{ width: '60%' }}>
                      <FileBase64 multiple={false} onDone={getFiles} />
                    </span>
                  </div>

                </div>

                <div style={{ backgroundColor: '#F9F9F9', width: '100%', height: '34%', padding: '10px', border: '1px solid #E4E4E4', marginBottom: '2%' }} >
                  <p style={{ color: 'grey' }}>Choose any Language</p>
                  <select className="w-100" placeholder="select any language" onChange={getLanguage} style={{ width: "100%", height: '45%', fontSize: "14px", borderRadius: "4px", backgroundColor: "white", border: '1px solid #D0D2D6' }}>
                    {options.map((language) => <option style={{ width: "280px", fontSize: "14px", borderRadius: "2px", backgroundColor: "transparent" }}>{language}</option>)}
                  </select>
                </div>

                <div style={{ backgroundColor: '#F9F9F9', width: '100%', height: '34%', padding: '10px', border: '1px solid #E4E4E4' }} >
                  <p style={{ color: 'grey' }}>Choose any Channel</p>
                  <select className="w-100" placeholder="select any Channel" style={{ width: "100%", height: '45%', fontSize: "14px", borderRadius: "4px", backgroundColor: "white", border: '1px solid #D0D2D6' }} onChange={(e) => setChannel(e.target.value)}>
                    <option>......Select Channel.....</option>
                    {channelResponse !== undefined && channelResponse.map((channelNames,index) => <option style={{ width: "280px", fontSize: "14px", borderRadius: "2px", backgroundColor: "transparent" }} value={channelNames}>{channelNames}</option> )}
                    {/* {options.map((language) => <option style={{ width: "280px", fontSize: "14px", borderRadius: "2px", backgroundColor: "transparent" }}>{dummyChannnel}</option>)} */}
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
            </div>
          </div>
          <div className="" style={{ position: 'absolute', top: '50%', right: '10%' }}>
            {/* {loading && <div> Upload ChainCode <ThreeDots color="#00BFFF" height={80} width={80} /></div>} */}
            {response && <div>Response : {timeTaken}</div>}
            {error && <div>ERROR : {timeTaken}</div>}
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}><Footer className="footer_text" /></div>

      {/*Backdrop code*/}
      {/*<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openn}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
    </Backdrop>*/}

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
                <p>{localStorage.getItem("Version")}</p>
              </div>
              <div style={{ height: '25px', width: '100%', backgroundColor: '#F5F5F5', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>Platform</p>
                <p style={{ marginLeft: '100px', marginRight: '120px' }}>-</p>
                <p>{localStorage.getItem("Platform")}</p>
              </div>
              <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>ENV</p>
                <p style={{ marginLeft: '126px', marginRight: '120px' }}>-</p>
                <p>{localStorage.getItem("Environment")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadChaincode;