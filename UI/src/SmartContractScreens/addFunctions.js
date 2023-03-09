// import React from "react";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import '../css/imageDisplay.css'
// import home from '../images/home.png'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import TextField from '@mui/material/TextField';
// import ScriptCopy from '../components/Script copy 2'
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Swal from 'sweetalert2';

import React from "react";
import { useState, useEffect,useRef } from "react";
// import '../../css/imageDisplay.css'
// import home from '../../images/SmartContractImages/home.png'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Header from "../NBFsuperAdminComponents/NBFHeader";
import Footer from "../components/Footer";
import TextField from '@mui/material/TextField';
// import ScriptCopy from '../../components/SmartContractScript/ScriptAdmin'
import NBFAdminScript from "../NBFsuperAdminComponents/NBFAdminScript"
 
import { useSelector } from "react-redux";
import axios from "axios";
// import Swal from 'sweetalert2';
// import { Toast } from 'primereact/toast';

// import '../../css/SmartContractCSS/header.css'
import FunctionsTable from "./FunctionDetails"
// import Stakeholder from './Stakeholder'
// import T1 from "./t1";
export default function Stakeholders(){
   
    const data = useSelector((store) => store.start_network);
    const { error, response, loading } = data;
    let startTime = sessionStorage.getItem("startNTime")
    let imageBase64 = sessionStorage.getItem("base64code")
  var timeTaken
    if (loading === false) {
      let endTime = Date.now();
      var ms = Math.abs(endTime - startTime),
        min = Math.floor((ms / 1000 / 60) << 0),
        sec = Math.floor((ms / 1000) % 60);
      timeTaken = min + " min" + ":" + sec + " sec"
      console.log(min + " min" + ':' + sec + " sec");
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
          <div className="leftScript"><NBFAdminScript style={{ width: '100%', height: '100%' }} /></div>
          <div className="rightScript">
            {/* <div className="rightNavScript">
              <div className="NavLeft">
                <img style={{ color: '#137EA9' }} src={home} width={18}></img>
                <p>/</p>
                <p style={{ color: '#137EA9' }}>Application Setup</p>
                <p>/</p>
                <p>Add Stakeholder</p>
              </div>
            </div> */}
            {/* <div className="addDomain">
           
           
           </div> */}
            {/* <div className="rightMainScript">
             
            </div> */}
             <FunctionsTable />

              {/* <Stakeholder /> */}
            {/* <StakeholderDetails /> */}
            {/* <T1 /> */}
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
                </div>
                <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                  <p>Version</p>
                  <p style={{ marginLeft: '110px', marginRight: '120px' }}>-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
}