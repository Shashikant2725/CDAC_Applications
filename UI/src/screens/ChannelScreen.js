import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import tick from '../images/whiteTickLogo.png'
import '../css/tracker.css';
import Footer from "../components/Footer";
import trashh from '../images/trashh.png'
import pluss from '../images/pluss.png'

import { DropdownButton, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

import { getImage,eappStatus } from "../actions/Fabric/FabricAction";





import Header from "../components/Header";
import jwt_decode from "jwt-decode";

const ChannelScreen = (props) => {
  
  let mydata = useSelector((loginData) => loginData.login_api);

  useEffect(() => {
    if (localStorage.getItem("Channel")) {
      setChannel(localStorage.getItem("Channel"));
    }
  }, []);

  const [channel, setChannel] = useState("");
  const [channelErr, setChannelErr] = useState(false);
  const [isChecked, setCheckBox] = useState(true);
  const [dbVariable, setDbVariable] = useState(false)
  const [miniChannel, setMiniChannel] = useState(1)
  const [trashCondition, setTrashCondition] = useState(false)
  const [channelVA, setChannelVA] = useState([]);

  //console.log("dbVariable11111", typeof (dbVariable))
  //console.log("type of dbVariable11111", dbVariable)

  console.log(`channel :- ${channel}`)
  const organisation = JSON.parse(localStorage.getItem("Organisation"));
  let orderers = localStorage.getItem("Orderers").split(",");
  //let orderers = ''
  //console.log("organization details are",organisation)

  let cas = []
  let peers = []

  const Orderers = localStorage.getItem('Orderers')
  const dispatch = useDispatch();

  window.localStorage.setItem("checked", isChecked);

  // useEffect(() => {
  //   console.log("sdfsdfsdfsdf")
  //   let AppName = localStorage.getItem("rowAppName")
  //   console.log("appname",AppName)
  //   let dynamicToken =  mydata.response.token
  //   let decoded = jwt_decode(mydata.response.token)
  //   let userEmail = decoded.email
  //   dispatch(eappStatus(dynamicToken,userEmail,AppName))  
    


  // },[])

  const platformDatas =  useSelector((storeData) => storeData.appStatus)
  const {apperror, appresponse, apploading} = platformDatas
  console.log("appresponse",appresponse)


  let environment = appresponse !== undefined && appresponse[0].node 

  let checkedornot = localStorage.getItem("checked");
  // console.log(`isChecked or not is :- ${isChecked}`)

  const onClickCheckBox = () => {
    setCheckBox(!isChecked)
    // console.log(`inside of onclickcheckbox function ${isChecked}`)
  }

  var history = useNavigate();

  function navigateOrganisation() {
    history("/orderer");
  }

  // function navigateDetails() {
  //   if (!new RegExp(/^[a-z0-9]{4,25}$/m, "i").test(channel)) {
  //     setChannelErr(true);
  //   } else {
  //     let submit = document.getElementsByName("ChannelDetail");
  //     window.localStorage.setItem("Channel", submit[0].value);
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
  //     dispatch(getImage(channel, cas, peers, orderers,dynamicToken,mail))
  //     history("/network_details");
  //   }
  // }

  function navigateDetails() {
    console.log('hello channel')
    let errorfield = document.getElementsByName("error");
    let arr = [];
    let count = 0;
    console.log("my channel")
    console.log(channelVA)
    window.localStorage.setItem("Channel", JSON.stringify(channelVA));
    
    for (let i = 0; i < miniChannel; i++) {
      if (!new RegExp(/^[a-z0-9]{20,25}$/m, "i").test(channelVA[i])) {
        //arr = []; 
        errorfield[i].innerHTML = "";
        arr.push(channelVA[i]);
      } else {
        errorfield[i].innerHTML = "Enter Valid Input";
        count++;
      }
    }
    if (count == 0) {
      // wgindow.localStorage.setItem("Channel", arr.toString());

      history("/network_details");
      //console.log('hello')
    }

  }


  const getSelectedDb = (e) => {
    // console.log("e value is",e.target.value)
    if (e.target.value === "couch") {
      setDbVariable(true)
      console.log("variable", dbVariable)
    } else {
      setDbVariable(false)
    }
  }

  localStorage.setItem("dbvariableItem", dbVariable)

  function manageChannelArray(e, i) {
    let newState = channelVA
    newState[i] = e.target.value
    console.log(newState)
    setChannelVA(newState)
    console.log(channelVA)
  }

  function changeHandler(e) {
    setTrashCondition(true)
    setMiniChannel(miniChannel + 1)
  }
  function trashHandler(t) {
    console.log(t)
    if (miniChannel > 1) {
      setMiniChannel(miniChannel - 1)
    }

    //document.getElementById('qqq').style.backgroundColor = 'green'
  }

  let checker = 0
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
      <div className="" style={{ width: '100%', height: '14%' }}><Header /></div>
      <div style={{ width: '100%', height: '86%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div id="TrackerPortion" style={{ marginTop: '2%' }}>
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
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
              <p style={{ fontSize: '12px' }}>Consensus</p>
            </div>
            <div className="lineDiv"></div>
            <div id="circleAndData">
              <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
              <p style={{ fontSize: '12px' }}>Channel</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">6</div>
              <p style={{ fontSize: '12px' }}>StartNetwork</p>
            </div>
          </div>
        </div>
        <div className="container" style={{ backgroundColor: 'white', width: '73%', border: '1px solid #B0B5BB', height: '75%', paddingTop: '2%', marginTop: '15px' }}>


          {/**Adding COUCH DB DROPDOWN HERE */}
          <div className="d-flex justify-content-center" style={{ backgroundColor: 'white', width: '100%', height: '12%', alignItems: 'center', marginBottom: '1%' }}>
            <div className="bg-light" style={{ border: "1px solid #E4E4E4", backgroundColor: '#F9F9F9', width: '95%', height: '100%', display: 'flex' }}>
              {(environment == "prod" || environment === "test") && <div className="d-flex" style={{ width: '100%', alignItems: 'center' }}>
                <label htmlFor="for-checking">
                  <h6 style={{ marginTop: '9px' }}>
                    <strong style={{ marginLeft: '20px' }}>World State DB</strong>
                  </h6>
                </label>
                <div className="d-flex" style={{ width: "32.5%", height: '70%', marginLeft: '2.7%' }}>
                  <select style={{ width: "99%", fontSize: "14px", borderRadius: "3px", height: '100%', outline: 'none', border: '1px solid #CED4DA' }} onChange={getSelectedDb}>
                    <option value="level">Level(Default)</option>
                    <option value="couch">Couch</option>
                  </select>
                </div>
                <div style={{ width: '13%', marginLeft: '8%' }}>
                  {/**Adding IPFS STORAGE BUTTON HERE */}
                  {(environment == "prod" || environment === "test") && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3%' }}>
                    <div >
                      <input type="checkbox" checked={isChecked} onChange={onClickCheckBox} id="for-checking" style={{ width: "21px", height: "21px" }} />
                    </div>
                    <label htmlFor="for-checking" className="">
                      <h6 style={{ display: 'flex' }}>
                        <strong>File</strong>
                        <strong style={{ marginLeft: '5px' }}>Storage</strong>
                      </h6>
                    </label>
                  </div>}
                </div>
              </div>}
            </div>
          </div>



          <div style={{ width: '100%', height: '60%', overflow: 'auto' }}>
            {Number(miniChannel) > 0 && (
              <div className="" style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {[...Array(miniChannel)].map((el, index) => (
                    <div className="d-flex justify-content-center" style={{ width: '100%', height: '20%', marginBottom: '1%' }}>
                      <div style={{ border: "1px solid #E4E4E4", backgroundColor: '#F9F9F9', width: '95%', height: '100%', display: 'flex', alignItems: 'center' }}>
                        <strong style={{ marginLeft: '2%' }}>Channel Name {index + 1}</strong>
                        <div className="" style={{ display: 'flex', width: '42%', alignItems: 'center' }}>
                          <input type="text" name="ChannelDetail" value={channelVA[index]} onChange={(e) => manageChannelArray(e, index)}
                            class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            style={{
                              height: '100%',
                              width: '77%',
                              marginLeft: '20px'
                            }}></input>
                          {channelErr && (
                            <span
                              className="d-flex align-items-center text-danger ms-2"
                              style={{ fontSize: "13px" }}
                            >
                              Enter Valid Input
                            </span>
                          )}
                        </div>
                        <span
                          name='error'
                          className="text-danger"
                          style={{ fontSize: "13px", width: '140px' }}
                        ></span>
                        <div style={{ marginLeft: '19%' }}>
                          <img onClick={(e) => changeHandler(e)} src={pluss} alt="" width={17} style={{ marginRight: '10px' }} ></img>
                          {(index === miniChannel - 1) && miniChannel != 1 ? (<img onClick={() => trashHandler(index)} src={trashh} alt="" width={17} ></img>) : ''}
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            )}

          </div>
          <div className="d-flex " style={{ width: '30%', height: '9%', marginLeft: '68%', marginTop: '4.5%' }}>
            <button type="button" style={{ height: '100%', width: '40%', border: '1px solid #137EA9', color: '#137EA9' }} class="btn btn-outline-primary" onClick={navigateOrganisation}>Back</button>
            <button className="btn btn-primary" style={{ height: '100%', width: '40%', marginLeft: '25px', backgroundColor: '#137EA9', border: 'none' }} onClick={navigateDetails}>Next</button>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}>
        <Footer className="footer_text" />
      </div>
    </div>
  );
};

export default ChannelScreen;