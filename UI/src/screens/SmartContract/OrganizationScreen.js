import React from 'react'
import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import tick from '../images/whiteTickLogo.png';
import '../css/tracker.css';
import Footer from "../components/Footer";
import Typography from '@mui/material/Typography';
import arrow from '../images/arrow1.png'
import { orgDataSending, organizationDataStore } from "../actions/Fabric/FabricAction";
import { useDispatch, useSelector } from "react-redux";



export default function OrganizationScreen() {
  const [organisation, setOrganisation] = useState(1);
  const [organisationData, setOrgData] = useState([])
  var history = useNavigate();
  const dispatch = useDispatch();

  let newTableData = useSelector((abcd) => abcd.userdynamicRolesTypes)
  console.log("newTableData",newTableData)

  let connectorToken = useSelector((store) => store.login_api);
        let dynamicTokenResponse = connectorToken.response.token 
        console.log("dynamicTokenResponse",dynamicTokenResponse)

  //console.log(organisation)
  const navigateBack = () => {
    history("/eapp");
  };

  function navigateChannel() {
    let arr = [];
    let caArr = [];
    let orgsNames = [];
    let count = 0;
    //fetching tables
    let orgDetails = document.getElementsByName("data");


    //iterating over tables
    for (let i = 0; i < orgDetails.length; i++) {
      //fetching input values for specific table
      let tr = orgDetails[i].getElementsByTagName("input");
      let tr1 = orgDetails[i].getElementsByTagName("select");

      //console.log(tr1[0].value)
      //Fetching error paragraphs
      let errorfield = orgDetails[i].getElementsByTagName("p");

      //creating object from input values
      const org = new Object();
      org.name = tr[0].value;
      org.peers = tr[1].value;
      org.ca = tr[2].value;
      org.loc = tr1[0].value;

      //console.log("org.ca is", org.peers)
      // }

      //pushing it in array
      arr.push(org);
      caArr.push(org.ca)
      orgsNames.push(org.name)
      console.log("after pushing into array dats is:- ", arr)
    }
    let orgArray = []
    for (let i = 0; i < arr.length; i++) {


      let peerArray = []
      for (let j = 1; j <= arr[i].peers; j++) {
        peerArray.push(
          "peer" +
          j +
          "." +
          arr[i].ca.substr(arr[i].ca.indexOf(".") + 1)
        );
      }

      let a = {
        "orgname": arr[i].name,
        "caname": arr[i].ca,
        "peers": peerArray,
        "location": arr[i].loc,
      }
      orgArray.push(a)
    }
    console.log(orgArray)
    let finalDataformat = {
      "email": localStorage.getItem("email"),
      "appName": localStorage.getItem("rowAppName"),
      "data": orgArray
    }
    console.log("finalDataformat",finalDataformat)
    dispatch(orgDataSending(dynamicTokenResponse,finalDataformat))

    //adding it to session storage
    if (count == 0) {
      window.localStorage.setItem("Organisation", JSON.stringify(arr));
      window.localStorage.setItem("organizationNames", orgsNames);
      console.log("finalfinalfinalfinal",orgsNames)
      let orgs = JSON.stringify(arr)
      dispatch(organizationDataStore(orgs))
      history("/orderer");
    }
  }

  function changeHandler(e) {
    setOrganisation(parseInt(e.target.value))
  }

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
      <div className="" style={{ width: '100%', height: '14%' }}><Header /></div>
      <div className="" style={{ width: '100%', height: '86%', display: 'flex', alignItems: 'center', flexDirection: 'column',overflow:'auto' }}>
        <div id="TrackerPortion" style={{marginTop:'2%'}}>
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
        <div className="container " style={{ backgroundColor: 'white', width: '73%', border: '1px solid #B0B5BB', height: '70%', paddingTop: '1%', marginTop: '15px' }}>
          <div id='completeBox' style={{
            width: '100%',
            height: '100%',
          }}>
            <form id='form' style={{
              width: '100%',
              height: '100%',
            }}>
              <div class="mb-3" style={{
                width: '100%',
                height: '14%',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid #e4e3e3'
              }}>

                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom style={{ marginLeft: '10px', marginTop: '10px' }}>
                  Number of Organisations
                </Typography>
                <img src={arrow} style={{ marginLeft: '10%', marginRight: '10%' }}></img>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  min="1"
                  name='organisation'
                  value={organisation}
                  onChange={changeHandler}
                  style={{
                    height: '70%',
                    width: '10%',
                    marginRight: '204px',
                  }}
                ></input>
              </div>
              <div id="organisations" style={{
                width: '100%',
                height: '70%',
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'auto',
                justifyContent: 'space-between',
              }}>
                {Number(organisation) > 0 && (
                  <div className="" style={{ width: '100%', height: '100%' }}>
                    <div className="row d-flex justify-content-center" style={{ width: '100%', height: '100%' }}>
                      {[...Array(organisation)].map((el, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between"
                          style={{ marginBottom: '10px', width: '31%', height: '49%', marginRight: '12px', borderLeft: '2px solid #137EA9', backgroundColor: '#F9F9F9', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', borderRadius: '5px' }}
                        >
                          <div style={{ width: '100%', height: '100%' }}>
                            <table className="" name="data" style={{ width: '100%', height: '100%', fontSize: '10px' }}>
                              <tbody>
                                <tr>
                                  <th scope="row">Org-{index + 1} Name</th>
                                  <td>
                                    <p
                                      className="col-md-12 text-danger m-0"
                                    ></p>
                                    <input
                                      style={{ width: '82%', height: '55%', marginLeft: '10%' }}
                                      type="text"
                                      className="form-control"
                                      name="orgNameDetails"
                                      defaultValue={
                                        organisationData[index]
                                          ? organisationData[index].name
                                          : ""
                                      }
                                    ></input>
                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">No. of Peers</th>
                                  <td>
                                    <p
                                      className="col-md-12 text-danger m-0"
                                      style={{ fontSize: "13px" }}
                                    ></p>
                                    <input
                                      style={{ width: '82%', height: '55%', marginLeft: '10%' }}
                                      type="number"
                                      className="form-control"
                                      min="1"
                                      name="orgPeerDetails"
                                      placeholder="[0-9]"
                                      defaultValue={
                                        organisationData[index]
                                          ? organisationData[index].peers
                                          : "1"
                                      }
                                    ></input>
                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Org-{index + 1} CA</th>
                                  <td>
                                    <p
                                      className="col-md-12 text-danger m-0"
                                      style={{ fontSize: "13px" }}
                                    ></p>
                                    <input
                                      style={{ width: '82%', height: '55%', marginLeft: '10%' }}
                                      type="text"
                                      className="form-control"
                                      name="orgDetails"
                                      placeholder="eg. ca1.mumbai.com"
                                      defaultValue={
                                        organisationData[index]
                                          ? organisationData[index].ca
                                          : ""
                                      }
                                    ></input>
                                  </td>
                                </tr>

                                <tr>
                                  <th scope="row">Location</th>
                                  <select style={{ width: '82%', height: '35px', marginLeft: '10%', border: '1px solid #CED4DA', borderRadius: '3px', marginTop: '6px', outline: 'none',fontSize : "15px" }}>
                                    <option value="hyderabad">Hyderabad</option>
                                    <option value="noida">Noida</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="delhi">Delhi</option>
                                    <option value="chennai">Chennai</option>
                                  </select>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex " style={{ width: '30%', height: '9%', marginTop: '.5%', marginLeft: '70%' }}>
                <button type="button" style={{ height: '100%', width: '40%', border: '1px solid #137EA9', color: '#137EA9' }} class="btn btn-outline-primary" onClick={navigateBack}>Back</button>
                <button className="btn btn-primary" style={{ height: '100%', width: '40%', marginLeft: '25px', backgroundColor: '#137EA9', border: 'none' }} onClick={navigateChannel}>Next</button>
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
