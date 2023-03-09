import React from "react";
import Script from "../components/Script";
import { useSelector } from "react-redux";

// //import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { ThreeDots } from "react-loader-spinner"

import Header from "../components/Header"
import Footer from "../components/Footer"


const StopNetworkScreen = (props) => {
  const data = useSelector((store) => store.stop_network);
  const { error, response, loading } = data;

  // let startTime = localStorage.getItem("stopNWstartTime")

  let appname = localStorage.getItem("AppName")

  // var timeTaken

  // if (loading === false) {
  //   let endTime = Date.now();

  //   var ms = Math.abs(endTime - startTime),
  //     min = Math.floor((ms / 1000 / 60) << 0),
  //     sec = Math.floor((ms / 1000) % 60);

  //   timeTaken = min + " min" + ":" + sec + " sec"
  //   console.log(min + " min" + ':' + sec + " sec");
  // }

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

        <div className="col-md-8 mt-3 ms-5">
          {/*<div className="col-md-8 mt-3 ms-5 mb-5 d-flex flex-row justify-content-center align-items-center" style={{ color: "blue" }}>
            <h6><strong>App Name: {appname}</strong></h6>
    </div>*/}
          <div>
          </div>
          Stop Network
          {loading && <div></div>}
          {response && <div>Response : </div>}
          {error && <div>ERROR</div>}
        </div>
      </div>
      <div style={{ width: '100%', height: '8%',position: "fixed",bottom: 0, }}><Footer className="footer_text" /></div>
    </div>
  );
};

export default StopNetworkScreen;
