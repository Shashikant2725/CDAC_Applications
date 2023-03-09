
import React from "react";
import { useState, useEffect,useRef } from "react";


import Header from "../NBFsuperAdminComponents/NBFHeader";
import Footer from "../components/Footer";
import TextField from '@mui/material/TextField';
import NBFAdminScript2 from "../NBFsuperAdminComponents/NBFAdminScript2"
import AssetHistory from "./AssetHistory.js"

import { useSelector } from "react-redux";
import axios from "axios";
export default function Stakeholders1(){
   
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
          <div className="leftScript"><NBFAdminScript2 style={{ width: '100%', height: '100%' }} /></div>
          <div className="rightScript">
          
             <AssetHistory/>

            
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