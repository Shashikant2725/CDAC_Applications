import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import Script from "../../components/SmartContractScript/Script";
import { useSelector } from "react-redux";
import home from '../../images/home.png'
import '../../css/SmartContractCSS/header.css'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import T4 from "./t4";

export default function TemplateLibrary() {

  let [activeTab, setActiveTab] = useState("templatelibrary");
  var history = useNavigate();

  var items = document.getElementsByClassName('nav-link');

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', printDetails);
  }

  function printDetails(e) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains("active")) {
        items[i].classList.toggle("active")
      }
    }
    this.classList.add("active");
  }
  let a = document.querySelector(".homee")
  let b = document.querySelector(".app")
  let c = document.querySelector(".templatelibrary")


  function clickHandler1() {
    setActiveTab("templatelibrary")
    history("/")
  }
  const data = useSelector((store) => store.start_network);
  const { error, response, loading } = data;
  let startTime = localStorage.getItem("startNTime")
  let imageBase64 = localStorage.getItem("base64code")

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
        <div className="leftScript"><Script style={{ width: '100%', height: '100%' }} /></div>
        <div className="rightScript">
          <div className="rightNavScript">
            <div className="NavLeft">
              <img style={{ color: '#137EA9' }} src={home} width={18}></img>
              <p>/</p>
              <p style={{ color: '#137EA9' }}>Smart Contract</p>
              <p>/</p>
              <p className={activeTab === 'templatelibrary' ? "enableProps linkCss" : "linkCss disableProps"} onChange={clickHandler1}>Template Library</p>
            </div>
          </div>
            <div style={{ width: "100%" }}>
              <T4 />
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
                {/* <p>{localStorage.getItem("AppName")}</p> */}
              </div>
              <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>Version</p>
                <p style={{ marginLeft: '110px', marginRight: '120px' }}>-</p>
                {/* <p>{localStorage.getItem("Version")}</p> */}
              </div>
              {/* <div style={{ height: '25px', width: '100%', backgroundColor: '#F5F5F5', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                    <p>Platform</p>
                    <p style={{ marginLeft: '100px', marginRight: '120px' }}>-</p>
                    <p>{localStorage.getItem("Platform")}</p>
                  </div> */}
              {/* <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                    <p>ENV</p>
                    <p style={{ marginLeft: '126px', marginRight: '120px' }}>-</p>
                    <p>{localStorage.getItem("Environment")}</p>
                  </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}