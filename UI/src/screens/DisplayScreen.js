import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaBlackberry } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import editt from '../images/edittt.png'
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getImage, } from "../actions/Fabric/FabricAction";
import Header from "../components/Header";
import { netSetUp } from "../actions/Fabric/FabricAction"


import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import tick from '../images/whiteTickLogo.png'
import jwt_decode from "jwt-decode";


const DisplayScreen = (props) => {

  let Tokendata = useSelector((store) => store.login_api);
  let dynamicTokenResponse = Tokendata.response.token 

  const platformDatas =  useSelector((storeData) => storeData.appStatus)
  const {apperror, appresponse, apploading} = platformDatas
  console.log("appresponse",appresponse)
 
  let decode=jwt_decode(Tokendata.response.token)
  let mail=decode.email

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const organisation = JSON.parse(localStorage.getItem("Organisation"));
  console.log('HhHhHhelllooooOoOoOoOoOoOoOoO')
  console.log(localStorage.getItem("Organisation"))
  let orderers = localStorage.getItem("Orderers").split(",");

  //****Making Changes for Multiple API calls ***********/

  //   const db = Boolean(localStorage.getItem("dbvariableItem"))

  //   let isDisplay = true

  //   const excas = [];

  //   const newpeers = [];

  //   const newcaname = [];

  //   const newmspId = [];

  //   const { imageLoading, imageResponse, imageError } = useSelector((newimageData) => newimageData.imageData)

  //   const data = useSelector((store) => store.scripts);
  //   const { error, response, loading } = data;

  //   const data1 = useSelector((store1) => store1.start_network);
  //   const { error1, response1, loading1 } = data1;

  //   console.log("fiujfverfgvier,tgtrg",data1)
  //   //console.log("shdfbusbrfuisbhrfekige",response1)

  //   useEffect(() => {
  //     if(data1.response !== undefined){
  //       setOpen(false)
  //       history("/createChannel")
  //     }
  //   },[data1])


  //   //******API CALL FOR START NETWORK *****************/
  //   useEffect(() => {
  //     if(response !== undefined){
  //       let platform = localStorage.getItem("Platform");
  //       let environment = localStorage.getItem("Environment");
  //       let version = localStorage.getItem("Version");
  //       let channel = localStorage.getItem("Channel");
  //       let appName = localStorage.getItem("AppName");
  //       console.log("start n/w hitted")
  //       dispatch(startNetwork(platform, version, appName));
  //     }
  //   },[response])



  // //********************API CALL FOR GENERATE SCRIPTS  ***************/
  //   useEffect(() => {
  // if(imageResponse !== undefined && response === undefined){
  //   console.log("in Genscript")
  // const organisation = JSON.parse(localStorage.getItem("Organisation"));
  //   isDisplay = false
  //   for (let i = 0; i < organisation.length; i++) {
  //     excas.push(organisation[i].ca);
  //     for (let j = 1; j <= organisation[i].peers; j++) {
  //       newpeers.push(
  //         "peer" +
  //         j +
  //         "." +
  //         organisation[i].ca.substr(organisation[i].ca.indexOf(".") + 1)
  //       );
  //     }
  //   }
  //   let newcas = []
  //   newcas.push(cas)
  //   localStorage.setItem("casmsp", newcas)
  //   //console.log("time stamp", genScriptTime)
  //   const platform = localStorage.getItem("Platform");
  //   let environment = localStorage.getItem("Environment");
  //   let version = localStorage.getItem("Version");
  //   let channel = localStorage.getItem("Channel");
  //   let orderers = localStorage.getItem("Orderers").split(",");
  //   let pos = localStorage.getItem("checked");
  //   console.log("generate scripts hitted")
  //   dispatch(genScript(platform, environment, version, channel, orderers, cas, newpeers, pos, db,mail));
  //   console.log("pos", pos)
  //   console.log("db is", db)
  // }

  //   },[imageResponse])

  //   console.log("organization details are",organisation)

  let cas = []
  let peers = []

  let channel = localStorage.getItem("Channel");


  const Orderers = localStorage.getItem('Orderers')
  const dispatch = useDispatch();

  var history = useNavigate();

  function navigateBack() {
    history("/channels");
  }

  function navigateToEdit() {
    history("/choose_nw");
  }

  function navigateNext() {
    for (let i = 0; i < organisation.length; i++) {
      cas.push(organisation[i].ca);
      for (let j = 1; j <= organisation[i].peers; j++) {
        peers.push(
          "peer" +
          j +
          "." +
          organisation[i].ca.substr(organisation[i].ca.indexOf(".") + 1)
        );
      }
    }
    console.log("get image hitted", peers)
    //dispatch(getImage(channel, cas, peers, orderers,dynamicTokenResponse,mail))
    //setOpen(true);
    //history("/diagram");
    const platform = appresponse[0].platform;
    let environment = appresponse[0].node;
    let version = 2.23;
    //let channel = localStorage.getItem("Channel");
    let channel = (JSON.parse(localStorage.getItem("Channel")));
    let orderers = localStorage.getItem("Orderers").split(",");
    let appNames = localStorage.getItem("rowAppName")
    let pos = localStorage.getItem("checked");
    
    dispatch(netSetUp(dynamicTokenResponse ,platform, environment, version, channel, orderers, cas, peers, pos,mail))
    history("/eapp")
  }



  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '14%' }}>
        <Header />
      </div>
      <div id="TrackerPortion" className="container" style={{ marginTop: '2%' }}>
        <div id="mainTrackerData">
          <div id="circleAndData">
            <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
            <p style={{ fontSize: '12px' }}>Apps</p>
          </div>

          <div className="lineDiv"></div>
          <div id="circleAndData">
            <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
            <p style={{ fontSize: '12px' }}>Create</p>
          </div>
          <div className="lineDiv"></div>
          <div id="circleAndData">
            <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
            <p style={{ fontSize: '12px' }}>Orgs</p>
          </div>
          <div className="lineDiv"></div>
          <div id="circleAndData">
            <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
            <p style={{ fontSize: '12px' }}>Consensus</p>
          </div>
          <div className="lineDiv"></div>
          <div id="circleAndData">
            <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
            <p style={{ fontSize: '12px' }}>Channel</p>
          </div>
          <div className="lineDiv"></div>
          <div id="circleAndData">
            <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
            <p style={{ fontSize: '12px' }}>StartNetwork</p>
          </div>
        </div>
      </div>
      <div className="container" style={{
        border: '1px solid #B4B8BE',
        width: '75%',
        height: '60%',
        padding: '20px',
        backgroundColor: 'white',
      }}>
        <div className="d-flex col-md-7 m-auto" style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h6 style={{ fontSize: '14px', color: '#000000', fontWeight: '600', letterSpacing: '.5px' }}>Configured Network Details</h6>
          <button style={{ border: 'none', backgroundColor: 'white', color: '#308EB3' }} onClick={() => { navigateToEdit(); }}><h6 style={{ color: '#137EA9', fontWeight: '600', letterSpacing: '.92px', fontSize: '14px' }}> <img src={editt} width={20}></img> Edit Details</h6></button>
        </div>

        <div style={{ width: '100%', fontSize: '14px', height: '82%', overflow: 'auto' }} className="d-flex align-middle justify-content-center ">
          <table className="table table-striped" style={{ border: '1px solid #F2F2F2' }} >

            <tbody >
              <tr style={{ height: '10px' }}>
                <td style={{ border: '0px solid black', fontWeight: '600' }} scope="row">Platform</td>
                <th style={{ border: '0px solid black', width: '15%' }}>-</th>
                <th style={{ border: '0px solid black' }}>{appresponse[0].platform}</th>
              </tr>
              <tr style={{ height: '8%' }}>
                <th style={{ border: '0px solid black', width: '15%' }} scope="row">Environment</th>
                <th style={{ border: '0px solid black', width: '15%' }}>-</th>
                <td style={{ border: '0px solid black' }}><strong>{appresponse[0].node}</strong></td>
              </tr>
              <tr style={{ height: '8%' }}>
                <th style={{ border: '0px solid black', width: '15%' }} scope="row">Version</th>
                <th style={{ border: '0px solid black', width: '15%' }}>-</th>
                <td style={{ border: '0px solid black' }}><strong>2.2.3</strong></td>
              </tr>
              <tr style={{ height: '8%' }}>
                <th style={{ border: '0px solid black', width: '15%' }} scope="row" className="align-left">
                  Orderers
                </th>
                <th style={{ border: '0px solid black', width: '15%' }}>-</th>
                <td style={{ border: '0px solid black' }}><strong>
                  {localStorage
                    .getItem("Orderers")
                    .split(",")
                    .map((ord) => (
                      <dd>{ord}</dd>
                    ))}

                </strong>
                </td>
              </tr>
              <tr style={{ height: '9%' }}>
                <th style={{ border: '0px solid black', width: '15%' }} scope="row" className="align-left">
                  Organisation
                </th>
                <th style={{ border: '0px solid black', width: '15%' }}>-</th>
                <td style={{ border: '0px solid black' }}><strong>
                  {organisation.map((org) => (
                    <div>
                      <dd>
                        <strong>Name : {org.name}</strong>
                      </dd>
                      <dd>Peers  :  {org.peers}</dd>
                      <dd>CA : {org.ca}</dd>
                      {/* {canames.push(org.ca)} */}
                      <br />
                    </div>
                  ))}
                </strong>
                </td>
              </tr>
              <tr style={{ height: '10%' }}>
                <th style={{ border: '0px solid black', width: '15%' }} scope="row">Channel Name</th>
                <th style={{ border: '0px solid black', width: '15%' }}>-</th>
                <td style={{ border: '0px solid black' }}><strong>{localStorage.getItem("Channel")}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex " style={{ width: '30%', height: '10%', marginLeft: '70%',marginTop:'12px' }}>
          <button type="button" style={{ height: '100%', width: '40%', border: '1px solid #137EA9', color: '#137EA9' }} class="btn btn-outline-primary" onClick={navigateBack}>Back</button>
          <button className="btn btn-primary" style={{ height: '100%', width: '76%', marginLeft: '25px', backgroundColor: '#137EA9', border: 'none' }} onClick={navigateNext}>Start Network</button>
        </div>
      </div>
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}>
        <Footer className="footer_text" />
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default DisplayScreen;