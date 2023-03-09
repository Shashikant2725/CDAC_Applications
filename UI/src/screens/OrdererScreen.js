import React from 'react'
import { useState,useEffect} from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import tick from '../images/whiteTickLogo.png'
import Footer from "../components/Footer";
import { fabricCCScript, channelTypes,eappStatus} from "../actions/Fabric/FabricAction";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";


export default function OrdererScreen() {
  const [orderer, setOrderer] = useState(3);
  const [ordererData, setOrdererData] = useState([]);
  const  dispatch = useDispatch()

  let mydata = useSelector((loginData) => loginData.login_api);

  // useEffect(() => {
  //   console.log("sdfsdfsdfsdf")
  //   let AppName = localStorage.getItem("rowAppName")
  //   console.log("appname",AppName)
  //   let dynamicToken =  mydata.response.token
  //   let decoded = jwt_decode(mydata.response.token)
  //   let userEmail = decoded.email
  //   //dispatch(eappStatus(dynamicToken,userEmail,AppName))  
  // },[])



  const platformDatas =  useSelector((storeData) => storeData.appStatus)
  const {apperror, appresponse, apploading} = platformDatas
  console.log("appresponse",appresponse)

  var history = useNavigate();

  const navigateBack = () => {
    history("/organizations");
  };

  //const navigateChannel = () => {
  //history("/organizations");
  //  history("/channels");
  //};

  let platform = appresponse !== undefined && appresponse[0].platform 
  console.log("abcdefsfdhgdhfjgfkjgj",platform)

  function navigateChannel() {
    console.log('hello orderer')

    let radioButtonArray1 = document.getElementsByName("firstInput");
    let radioButtonArray2 = document.getElementsByName("secondInput");
    let radioButtonArray3 = document.getElementsByName("thirdInput");
    let radioButtonArray = [];

    for (let k = 0; k < orderer; k++) {
      radioButtonArray.push(
        radioButtonArray1[k].value +
        "." +
        radioButtonArray2[k].value +
        "." +
        radioButtonArray3[k].value
      );
    }
    console.log(radioButtonArray)
    let errorfield = document.getElementsByName("error");
    let arr = [];
    let count = 0;
    for (let i = 0; i < radioButtonArray.length; i++) {
      console.log(radioButtonArray[i]);
      if (
        !new RegExp(
          /^[o][r][d][e][r][e][r]+[0-9]\.[a-z]{0,14}\.[a-z]{2,3}$/m,
          "i"
        ).test(radioButtonArray[i])
      ) {
        errorfield[i].innerHTML = "Enter Valid Input";
        //arr = [];
        count++;
      } else {
        errorfield[i].innerHTML = "";
        arr.push(radioButtonArray[i]);
      }
    }
    console.log(count)
    if (count == 0) {
      window.localStorage.setItem("Orderers", arr.toString());
      history("/channels");
    } else {
      console.log('heyyy')
    }
    console.log(platform)
    if (platform === 'sawtooth') {
      history("/nw_dtl_sawtooth");
    }
    // else{
    //   history("/channels");
    // }
  }

  function saw_navigateChannel () {
    if (platform === 'sawtooth') {
      history("/nw_dtl_sawtooth");
    }
  }

  function changeHandler(e) {
    setOrderer(parseInt(e.target.value))
  }
  //console.log('organisation')
  //console.log(localStorage.getItem("Organisation"))
  //let AllList = <SmallOrdererBox />
  //let fii = 3

  //if (orderer) {
  //  fii = parseInt(orderer)
  //}
  //let filledArray = Array(fii).fill(33);
  //let a = 0
  //AllList = filledArray.map((r, i) => {
  //  a = a + 1
  //  return <SmallOrdererBox key={i} ord={a} />
  //})
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
      <div className="" style={{ width: '100%', height: '14%' }}><Header /></div>
      <div className="" style={{ width: '100%', height: '86%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
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
            <div className="lineDiv"></div>
            <div id="circleAndData">
              <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
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
        <div className="container " style={{ backgroundColor: 'white', width: '73%', border: '1px solid #B0B5BB', height: '70%', padding: '2%', marginTop: '15px' }}>
          <div id='completeBox' style={{
            width: '100%',
            height: '100%',
          }}>

            <form id='form' style={{
              width: '100%',
              height: '100%'
            }}>

              <div id='mbParent' style={{
                marginBottom: '8px',
                width: '100%',
                height: '15%',
                backgroundColor: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <div class="mb-3" style={{
                  justifyContent: 'space-around',
                  width: '49%',
                  height: '100%',
                  backgroundColor: '#f9f9f9',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e4e3e3',
                }}>
                  <label for="exampleInputEmail1" class="form-label" style={{
                    marginBottom: 0,
                    padding: '0',
                    paddingLeft:"15px",
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '600',
                    color:"black"
                  }}>Consensus Algorithms</label>
                  <select
                    onChange={(e) => localStorage.setItem("sawtoothCon")}
                    type="text"
                    id="cars"
                    style={{
                      border: '1px solid rgb(211, 208, 208)',
                      outline: 'none',
                      paddingLeft: '7px',
                      width: '20%',
                      height: '70%',
                      borderRadius: '5px',
                      opacity: '.8',
                      marginRight:"2%"
                    }}
                    
                  >
                   {platform === "fabric" || "undefined" ? <option value="RAFT">RAFT</option> : <><option value="DevMode">DevMode</option><option value="PBFT">PBFT</option><option value="POET">POET</option><option value="RAFT">RAFT</option></>} 

                  </select>
                </div>

                <div class="mb-3" style={{
                  justifyContent: 'space-around',
                  width: '49%',
                  height: '100%',
                  backgroundColor: '#f9f9f9',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e4e3e3',
                }}>
                  <label for="exampleInputEmail1" class="form-label" style={{
                    marginBottom: 0,
                    padding: '0',
                    paddingLeft:"15px",
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '600',
                    color:"black"
                  }}>No. of Orderers</label>
                  <select
                    type="number"
                    id="cars"
                    onChange={changeHandler}
                    value={orderer}
                    name="organisation"
                    style={{
                      border: '1px solid rgb(211, 208, 208)',
                      outline: 'none',
                      paddingLeft: '7px',
                      width: '20%',
                      height: '70%',
                      borderRadius: '5px',
                      opacity: '.8',
                      marginRight:"2%"
                    }}
                  >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="9">9</option>
                  </select>
                </div>
              </div>

              <div id="organisations" style={{
                width: '100%',
                height: '73%',
                display: 'flex',
                overflow: 'auto',
                flexDirection: 'column',
                flexWrap: 'nowrap'
              }}>
                {
                  platform === "fabric" && (
                    <>
                    <h6 id='title' style={{ opacity: '.7', marginTop: '11px' }}>Please check your Orderer details</h6>
                    {[...Array(orderer)].map((el, index) => (
                    <div key={index} className="col-md-112 d-flex" style={{ width: '100%' }}>
                      {/* {console.log(ordererData)} */}
                      <div className="row col-md-9" style={{ width: '50%' }}>
                        <div className="" style={{ width: '21%', height: '40%', marginTop: '4%' }}>
                          <label htmlFor="exampleInputEmail1" className="d-flex align-middle justify-content-start text-center">
                            <strong>Orderer {index + 1}</strong>
                          </label>
                        </div>
                        <div className="d-flex col-md-9 ">
                          <div className="col-md-12">
                            <div className="row g-2">
                              <div className=" col">
                                <input style={{ height: '51%', width: '100%', border: '1px solid #89BED4', backgroundColor: '#EFFAFF' }}
                                  type="text"
                                  name="firstInput"
                                  className="form-control justify-content-start mb-3 mt-3"
                                  value={"orderer" + (index + 1)}
                                />
                              </div>
                              {/* <p className='col-auto fs-2 p-0  my-auto'>.</p> */}
  
                              <div className=" col">
                                <input
                                  style={{ height: '51%', width: '100%', border: '1px solid #89BED4' }}
                                  type="text"
                                  name="secondInput"
                                  className="form-control justify-content-start mb-3 mt-3"
                                  placeholder="example"
                                  defaultValue={
                                    ordererData[index]
                                      ? ordererData[index].split(".")[1]
                                      : ""
                                  }
                                />
                              </div>
  
                              {/* <p className='col-auto fs-2 p-0  my-auto mb-1'>.</p> */}
  
                              <div className="col">
                                <input
                                  style={{ height: '51%', width: '100%', border: '1px solid #89BED4' }}
                                  type="text"
                                  name="thirdInput"
                                  className="form-control  justify-content-start mb-3 mt-3"
                                  placeholder="com"
                                  defaultValue={
                                    ordererData[index]
                                      ? ordererData[index].split(".")[2]
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          {/* For display validation Error */}
                          <span
                            name='error'
                            className="text-danger d-flex justify-content-start col-md-5 align-middle mt-4 ms-1"
                            style={{ fontSize: "13px" }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  ))}
                    </>
                    )
                }
                {/* <h6 id='title' style={{ opacity: '.7', marginTop: '11px' }}>Please check your Orderer details</h6> */}
                
              </div>
              <div className="d-flex " style={{ width: '30%', height: '9%', marginLeft: '70%', marginTop: '2%' }}>
                <button type="button" style={{ height: '100%', width: '40%', border: '1px solid #137EA9', color: '#137EA9' }} class="btn btn-outline-primary" onClick={navigateBack}>Back</button>
                <button type="button" className="btn btn-primary" style={{ height: '100%', width: '40%', marginLeft: '25px', backgroundColor: '#137EA9', border: 'none' }} onClick={platform === "fabric" ? navigateChannel : saw_navigateChannel }>Next</button>
              </div>
            </form>
          </div>

        </div>
      </div>
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}>
        <Footer className="footer_text" />
      </div>
    </div>
  )
}
