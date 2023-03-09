import React from "react";
import { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../css/scripts.css";
import {
  genScript,
  startNetwork,
  stopNetwork,
  removeNetwork,
  channelNetwork,
} from "../actions/Fabric/FabricAction";
//import ImageDisplay from "../screens/ImageDisplay"
//import EnrollUsersScreen from "../screens/EnrollUsersScreen";

//import { BsCheck2Circle } from "react-icons/bs";
//import startnetwork from "../images/photo/startnetwork.png"
//import deploychaincode from "../images/photo/deploychaincode.png"
//import stopnetwork from "../images/photo/stopnetwork.png"
//import removenetwork from "../images/photo/removenetwork.png"
//import enrollusers from "../images/photo/enrollusers.png"

import { AiOutlinePlayCircle, AiFillSetting } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { GrCertificate } from "react-icons/gr";
import { BsStopCircleFill } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { AiFillStop } from "react-icons/ai";
//import Header from "./Header";3
import jwt_decode from "jwt-decode";



const Script = (props) => {
  const dispatch = useDispatch();
  var history = useNavigate();

 let connectorToken=useSelector((store)=>store.login_api);
 console.log("app connectorToken is ", connectorToken)

  let dynamicToken=connectorToken.response.token

 let decode=jwt_decode(connectorToken.response.token)
 let mail=decode.email

 console.log("app decode is ", decode)

 console.log("app mail is ", mail)
 

  const data = useSelector((store) => store.scripts);
  const { error, response, loading } = data;



  const { apperror, appresponse, apploading } = useSelector((app) => app.appStatus);
  console.log("app response is ", appresponse)
  console.log("app response is 0", appresponse[0])
  console.log("app response is 1", appresponse[1])

  // const platform = localStorage.getItem("Platform");
  // let environment = localStorage.getItem("Environment");
  // let version = localStorage.getItem("Version");
  // let channel = localStorage.getItem("Channel");
  // let orderers = localStorage.getItem("Orderers").split(",");
  // let pos = localStorage.getItem("checked");
  // const organisation = JSON.parse(localStorage.getItem("Organisation"));


  //*****************DEFINING A VARIABLE AND ASSIGN THE VALUES GLOBALLY BASED ON FLOWS *********/

  const { imageLoading, imageResponse, imageError } = useSelector((newimageData) => newimageData.imageData)

  // let NewappName = imageResponse !== undefined ? localStorage.getItem("appName") : appresponse[0].appName

  // console.log("app Name in new Kind is",imageResponse)

  //const [isDisplay,setisDisplay] = useState(true)

  const db = Boolean(localStorage.getItem("dbvariableItem"))

  let isDisplay = true

  const cas = [];

  const peers = [];

  const caname = [];

  const mspId = [];

  //***********CREATE CHANNEL************ */

  // function channelScript() {
  //   if (imageResponse !== undefined) {
  //     if (appresponse[1].function === "up") {
  //       let platform = appresponse[0].platform
  //       let version = appresponse[0].verison
  //       let channel = appresponse[0].channelname
  //       let appName = appresponse[0].appName
  //       console.log("inside if condition")
        
  //       console.log("connector" , connectorToken.response )
     
  //       let decodedToken = connectorToken.response
  //     dispatch(channelNetwork(decodedToken,platform, version, appName, channel,mail));
  //     }
  //     else {
  //       console.log("outside if condition1111")
  //       let channelStart = Date.now();
  //       let platform = localStorage.getItem("Platform");
  //       let environment = localStorage.getItem("Environment");
  //       let version = localStorage.getItem("Version");
  //       let channel = localStorage.getItem("Channel");
  //       let appName = localStorage.getItem("AppName")
  //       localStorage.setItem("channelStartTime", channelStart)
       
  //         console.log("connector" , connectorToken.response )
       
  //         let decodedToken = connectorToken.response
         
      
      
      
  //       dispatch(channelNetwork(decodedToken,platform, version, appName, channel,mail));
  //     }
  //   }
  //   else {
  //     console.log("outside if condition")
  //     let channelStart = Date.now();
  //     let platform = localStorage.getItem("Platform");
  //     let environment = localStorage.getItem("Environment");
  //     let version = localStorage.getItem("Version");
  //     let channel = localStorage.getItem("Channel");
  //     let appName = localStorage.getItem("AppName")
  //     localStorage.setItem("channelStartTime", channelStart)
     
  //         console.log("connector" , connectorToken.response )
       
  //         let decodedToken = connectorToken.response
         
      
      
      
  //       dispatch(channelNetwork(decodedToken,platform, version, appName, channel,mail));
  //   }
  // }

  //*****************START NETWORK**************/
  // function startScript() {
  //   if (imageResponse !== undefined) {
  //     if (appresponse[1].function === "generate") {
  //       let platform = appresponse[0].platform
  //       let version = appresponse[0].verison
  //       let appName = appresponse[0].appName
  //       //console.log("inside if condition")
  //       dispatch(startNetwork(platform, version, appName,dynamicToken,mail));
  //     }
  //     else {
  //       console.log("outside if condition")
  //       let channelStart = Date.now();
  //       let platform = localStorage.getItem("Platform");
  //       let environment = localStorage.getItem("Environment");
  //       let version = localStorage.getItem("Version");
  //       let channel = localStorage.getItem("Channel");
  //       let appName = localStorage.getItem("AppName");
  //       localStorage.setItem("channelStartTime", channelStart)
  //       dispatch(startNetwork(platform, version, appName,dynamicToken,mail));
  //     }
  //     // if (appresponse[1].function === null){
  //     //   console.log("outside if condition")
  //     // let channelStart = Date.now();
  //     // let platform = localStorage.getItem("Platform");
  //     // let environment = localStorage.getItem("Environment");
  //     // let version = localStorage.getItem("Version");
  //     // let channel = localStorage.getItem("Channel");
  //     // let appName = localStorage.getItem("AppName");
  //     // localStorage.setItem("channelStartTime", channelStart)
  //     // dispatch(startNetwork(platform, version, appName,mail));
  //     // }
  //   }
  //   else {
  //     console.log("outside if condition")
  //     let channelStart = Date.now();
  //     let platform = localStorage.getItem("Platform");
  //     let environment = localStorage.getItem("Environment");
  //     let version = localStorage.getItem("Version");
  //     let channel = localStorage.getItem("Channel");
  //     let appName = localStorage.getItem("AppName");
  //     localStorage.setItem("channelStartTime", channelStart)
  //     dispatch(startNetwork(platform, version, appName,dynamicToken,mail));
  //   }


  //   /**************GET RESPONSE FROM THE RESUME APPLICATION REDUCER ************* */
  //   // if(response.data.fcn !== ""){
  //   //   //GET THE DATA FROM JSON AND FORMAT IT
  //   // }
  //   // else{
  //   //   let startNetworkTime = Date.now();
  //   //   localStorage.setItem("startNTime", startNetworkTime)
  //   //   dispatch(startNetwork(platform, version,mail));
  //   // }
  // }

  //*************************STOP NETWORK****************/

  function stopScript() {
    //if (imageResponse !== undefined) {
      //if (appresponse[1].function === "chaincode" || "chaincodeUpdate") {
        let stopnetworkstartTime = Date.now();
        localStorage.setItem("stopNWstartTime", stopnetworkstartTime)
        let platform = appresponse[0].platform
        let version = appresponse[0].verison
        dispatch(stopNetwork(platform, version,dynamicToken,mail));
     // }
    //   else {
    //     // setStopTick(true)
    //     let stopnetworkstartTime = Date.now();
    //     localStorage.setItem("stopNWstartTime", stopnetworkstartTime)
    //     let platform = localStorage.getItem("Platform");
    //     let version = localStorage.getItem("Version");
    //     dispatch(stopNetwork(platform, version,dynamicToken,mail));
    //   }
    // }
    // else {
    //   // setStopTick(true)
    //   let stopnetworkstartTime = Date.now();
    //   localStorage.setItem("stopNWstartTime", stopnetworkstartTime)
    //   let platform = localStorage.getItem("Platform");
    //   let version = localStorage.getItem("Version");
    //   dispatch(stopNetwork(platform, version,dynamicToken,mail));
    // }
  }

  //*************************REMOVE NETWORK**************/

  function removeScript() {
    // if (imageResponse !== undefined) {
      // if (appresponse[1].function === "chaincode"||"down") {
        let platform = appresponse[0].platform
        let version = appresponse[0].verison
        let removestartTime = appresponse[0].removestartTime
        dispatch(removeNetwork(platform, version,dynamicToken,mail));
      // }
    //   else {
    //     // setRemoveTick(true)
    //     let removestartTime = Date.now();
    //     localStorage.setItem("removeNwStartTime", removestartTime)
    //     let platform = localStorage.getItem("Platform");
    //     let version = localStorage.getItem("Version");
    //     dispatch(removeNetwork(platform, version, removestartTime,dynamicToken,mail));
    //   }
    // }
    // else {
    //   // setRemoveTick(true)
    //   let removestartTime = Date.now();
    //   localStorage.setItem("removeNwStartTime", removestartTime)
    //   let platform = localStorage.getItem("Platform");
    //   let version = localStorage.getItem("Version");
    //   dispatch(removeNetwork(platform, version, removestartTime,dynamicToken,mail));
    // }
  }

  //********GENERATE SCRIPTS **************/

  // function generateScript(e) {

  //   e.preventDefault();
  //   console.log('gS')
  //   if (imageResponse !== undefined) {
  //     console.log('gS1')
  //     if (appresponse[1].function === null) {
  //       console.log("outside if condition 11111111")
  //       let genScriptTime = Date.now();
  //       localStorage.setItem("genScriptStartTime", genScriptTime)
  //       const organisation = JSON.parse(localStorage.getItem("Organisation"));
  //       isDisplay = false
  //       for (let i = 0; i < organisation.length; i++) {
  //         cas.push(organisation[i].ca);
  //         for (let j = 1; j <= organisation[i].peers; j++) {
  //           peers.push(
  //             "peer" +
  //             j +
  //             "." +
  //             organisation[i].ca.substr(organisation[i].ca.indexOf(".") + 1)
  //           );
  //         }
  //       }
  //       let newcas = []
  //       newcas.push(cas)
  //       localStorage.setItem("casmsp", newcas)
  //       console.log("time stamp", genScriptTime)
  //       const platform = localStorage.getItem("Platform");
  //       let environment = localStorage.getItem("Environment");
  //       let version = localStorage.getItem("Version");
  //       let channel = localStorage.getItem("Channel");
  //       let orderers = localStorage.getItem("Orderers").split(",");
  //       let pos = localStorage.getItem("checked");
  //       dispatch(genScript(platform, environment, version, channel, orderers, cas, peers, pos, db,dynamicToken,mail));
  //     }
  //   }
  //   else {
  //     console.log("outside if condition 22222222")
  //     let genScriptTime = Date.now();
  //     localStorage.setItem("genScriptStartTime", genScriptTime)
  //     const organisation = JSON.parse(localStorage.getItem("Organisation"));
  //     isDisplay = false
  //     for (let i = 0; i < organisation.length; i++) {
  //       cas.push(organisation[i].ca);
  //       for (let j = 1; j <= organisation[i].peers; j++) {
  //         peers.push(
  //           "peer" +
  //           j +
  //           "." +
  //           organisation[i].ca.substr(organisation[i].ca.indexOf(".") + 1)
  //         );
  //       }
  //     }
  //     let newcas = []
  //     newcas.push(cas)
  //     localStorage.setItem("casmsp", newcas)
  //     console.log("time stamp", genScriptTime)
  //     const platform = localStorage.getItem("Platform");
  //     let environment = localStorage.getItem("Environment");
  //     let version = localStorage.getItem("Version");
  //     let channel = localStorage.getItem("Channel");
  //     let orderers = localStorage.getItem("Orderers").split(",");
  //     let pos = localStorage.getItem("checked");
  //     dispatch(genScript(platform, environment, version, channel, orderers, cas, peers, pos, db,dynamicToken,mail));
  //     console.log("pos", pos)
  //     console.log("db is", db)
  //   }
  //   history('/generateScript')
  // }

  //this function is for ENROLL USERS 
  // function OrganizationList() {
  //   dispatch(registerUsers(organizations, newArr, isChecked))
  //   for (let i of organisation) {
  //     caname.push(i.ca)
  //     i = i.ca.split(".")
  //     let count = 0;
  //     let newarradd
  //     let arradd = ""
  //     for (let k of i) {
  //       if (count !== 0) {
  //         arradd = arradd + "-" + k
  //       }
  //       count = count + 1
  //     }
  //     arradd = arradd.substr(1, arradd.length)
  //     mspId.push(arradd)
  //   }
  //   // console.log("SCRIPTS CANAMES IS :- ",caname)
  //   //console.log("SCRIPTS MSP IS:- ",mspId)
  //   localStorage.setItem("canames", caname)
  //   localStorage.setItem("mspid", mspId)
  // }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="list-group" style={{ width: '100%', height: '100%' }}>
        <div className="side-menu" style={{ width: '15%', height: '80%' }}>
          <nav className="nav-style">
            {/* onClick={e => {setgenTickButton({display: 'block'});}}        add in the link or onclick and try again*/}
            {/* <Link to="/generateScript" onClick={generateScript} className="check12">
              <AiFillSetting style={{ marginLeft: '3px', marginRight: "5px", fontSize: "18px" }} />  Generate Script
            </Link> */}
            {/* <button onClick={(e)=>generateScript(e)} className="check12" id="extraCss" style={{border:'none',backgroundColor:'#137EA9'}}>
              <AiFillSetting style={{ marginRight: "5px", fontSize: "18px" }} />  Generate Script
            </button> */}
            {/* <Link to="/startNetwork" onClick={startScript} className="check12"> */}
              {/* <img src={startnetwork} alt="startlogo" className="border-0 bg-transparent" style={{backgroundColor:"transparent"}}/>  Start Network */}
              {/* <AiOutlinePlayCircle style={{ marginLeft: '3px', marginRight: "5px", fontSize: "18px" }} />  Start Network */}
            {/* </Link> */}

            {/* <Link to="/createChannel" onClick={channelScript} className="check12">
              <VscSettings className="" style={{ marginLeft: '3px', marginRight: "5px", fontSize: "18px" }} />  Create Channel
            </Link> */}

            <Link to="/stopNetwork" onClick={stopScript} className="check12">
              <BsStopCircleFill className="" style={{ marginLeft: '3px', marginRight: "5px", fontSize: "18px" }} />  Stop Network
            </Link>

            <Link to="/removeNetwork" onClick={removeScript} className="check12">
              <AiFillStop className="" style={{ marginLeft: '3px', marginRight: "5px", fontSize: "18px" }} />  Remove Network
            </Link>
          </nav>
        </div>
      </div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Script;