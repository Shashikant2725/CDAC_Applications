import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";

import ScriptSawtooth from "./../components/ScriptsSawtooth";
import { sawtoothTPScript } from "../actions/Sawtooth/SawtoothAction";
import Footer from "../components/Footer";
import Header from "../components/Header"
import home from '../images/home.png'
import eye from '../images/eye.png'

const SawtoothTPScreen = (props) => {
  const [file, setFile] = useState([]);
  const [name, setName] = useState("certificate");
  const [template, setTemplate] = useState("");

  const dispatch = useDispatch();

  function getFiles(files) {
    let str = files.name;
    str.endsWith(".zip") ? setFile(files) : setFile([]);
  }

  function display() {
    let chaincode = "";
    if (file.length != 0) {
      let str = file.base64;
      chaincode = str.substring(str.indexOf(",") + 1);
      console.log(chaincode);
      setName(file.name);
    }
    console.log("name : " + name);
    console.log("chaincode : " + chaincode);
    dispatch(sawtoothTPScript(name, chaincode));
  }

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6', position: 'relative' }}>
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
        <div className="leftScript"><ScriptSawtooth style={{ width: '100%', height: '100%' }} /></div>
        <div className="rightScript">
          <div className="rightNavScript">
            <div className="NavLeft">
              <img style={{ color: '#137EA9' }} src={home} width={18}></img>
              <p>/</p>
              <p style={{ color: '#137EA9' }}>Application Setup</p>
              <p>/</p>
              <p>Sawtooth TP</p>
            </div>
            <div className="NavRight"><p data-bs-toggle="modal" data-bs-target="#exampleModal1"><img src={eye} width={18}></img> View Application Setup Details</p></div>                    </div>
          <div className="rightMainScript">
            <div className="row">
              <div class="input-group-append" >
                <div className="row" >
                  <div
                    className=" col-12 justify-content-center row py-3 p-2 bg-light align-items-center"
                    style={{
                      height:'150px',
                      width:'90%',
                      marginLeft:'2%',
                      color:'black'
                    }}
                  >
                    <div className="col-md-6" >
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="platform"
                          id="platform1"
                          onClick={() => {
                            setFile([]);
                            setName("certificate");
                            setTemplate("existingTemplate");
                          }}
                        />
                        <label className="form-check-label" for="platform1">
                          Existing Template
                        </label>
                      </div>
                      <div class="form-check" style={{marginTop:'4%'}}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="platform"
                          id="platform2"
                          onClick={() => {
                            setTemplate("userTemplate");
                          }}
                        />
                        <label className="form-check-label" for="platform2">
                          Choose Your Template
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6" >
                      {template === "existingTemplate" && (
                        <div className="row  d-flex justify-content-center align-self-center align-middle">
                          <select
                            class="form-select-sm w-50 my-3"
                            aria-label="Default select example"
                            onChange={(e) => setName(e.target.value)}
                          >
                            <option selected hidden={true}>
                              Certificate
                            </option>
                            <option value="certificate">Certificate</option>
                            <option value="other" disabled="disabled">
                              Other
                            </option>
                          </select>


                        </div>
                      )}

                      {template === "userTemplate" && (
                        <div className="row  d-flex justify-content-center align-self-center align-middle">
                          {/* <blockquote className="blockquote fs-6 m-0 p-0">
                    Upload chaincode file
                  </blockquote> */}
                          <span className="border border-secondary rounded col-md-8 w-100 p-0">
                            <FileBase64 multiple={false} onDone={getFiles} />
                          </span>
                        </div>
                      )}

                    </div>
                  </div>
                  <div>
                    {/* {template === "userTemplate" && ( */}
                    <button
                      style={{ border: 'none', marginTop: '16%', marginLeft: '80%' }}
                      type="submit"
                      class="btn btn-primary"
                      onClick={display}
                    >
                      Deploy Smart Contract
                    </button>
                    {/* )} */}
                  </div>
                </div>
              </div>
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
                <p>{localStorage.getItem("AppName")}</p>
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

export default SawtoothTPScreen;