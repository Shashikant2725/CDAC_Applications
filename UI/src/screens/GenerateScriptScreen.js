import React from "react";
import Script from "../components/Script";
import { useSelector } from "react-redux";
import '../css/imageDisplay.css'

import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";


// //import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { ThreeDots } from "react-loader-spinner";

import dateFormat, { masks } from "dateformat";
import Header from "../components/Header";
import home from '../images/home.png'
import eye from '../images/eye.png'

const GenerateScriptScreen = (props) => {
  var history = useNavigate();
  const data = useSelector((store) => store.scripts);

  //***********TEXT TRANSMISSION */
  const { error, response, loading } = data;
  //let open = false


  const [index, setIndex] = React.useState(0);

  // React.useEffect(() => {
  //   const intervalId = setInterval(() =>
  //     setIndex(index => index + 1),
  //     3000 // every 3 seconds
  //   );
  //   return () => clearTimeout(intervalId);
  // }, []);

  //***********END ***********/



  //***********RANDOM TEXT STYLE PART  ************/


  const TEXTS = ["1. Remove existing certificates", "2. Generate certificates",
    "2.a Generating public and private keys for orgs", "2.b Cert files for users, peers, ca",
    "2.c tls.config files of peers and orderers", "2.d predefined env files"]

  //****************END ********************/


  // console.log("data script values",loading)

  let appname = localStorage.getItem("AppName")

  let imageBase64 = localStorage.getItem("base64code")


  //let startTime = localStorage.getItem("genScriptStartTime")
  // let startTime = 1
  // console.log("start time is ",startTime)

  let endTime
  let timeGap
  let totalTime
  var timeTaken = 0
  let open = true
  console.log(loading)
  if (loading === false) {
    open = false
    let startTime = localStorage.getItem("UCStartTime")
    let endTime = Date.now();

    var ms = Math.abs(endTime - startTime),
      min = Math.floor((ms / 1000 / 60) << 0),
      sec = Math.floor((ms / 1000) % 60);

    timeTaken = min + " min" + " : " + sec + " sec"
    console.log(min + " min" + ':' + sec + " sec");
    console.log(timeTaken)
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
              <p style={{ color: '#137EA9' }}>Application Setup</p>
              <p>/</p>
              <p>Generate Script</p>
            </div>
            <div className="NavRight"><p data-bs-toggle="modal" data-bs-target="#exampleModal1"><img src={eye} width={18}></img> View Application Setup Details</p></div></div>
          <div className="rightMainScript">
            {/*<div className="d-flex flex-row justify-content-center align-iteems-center" style={{ color: "blue" }}>
              <h6><strong>App Name: {appname}</strong></h6>
    </div>*/}
            <div style={{ width: "100%" }}>
              <img src={`data:image/png;base64,${imageBase64}`} alt="Diagram" style={{ height: "50vh", width: "100%" }} />
              {/* <h6 className="text-uppercase" style={{fontWeight:"bold", textDecoration:"underline", marginTop:"10px"}}>Steps:-</h6> */}
             {/* <ol style={{ marginTop: "11px", fontStyle: "italic", fontFamily: "open-sans" }}>
                <li>Remove existing certificates</li>
                <li>Generate certificates </li>
                <ol style={{ listStyleType: "lower-alpha" }}>
                  <li style={{ color: "#107dac" }}>Generating public and private keys for orgs and</li>
                  <li style={{ color: "#107dac" }}>tls.config files of peers and orderers</li>
                  <li style={{ color: "#107dac" }}>predefined env files</li>
                </ol>
  </ol>*/}
            </div>
            GENERATE SCRIPTS
            {/* {loading && <div></div>} */}
            {response && <div>Response :{totalTime}</div>}
            {error && <div>ERROR :</div>} 
          </div>
        {/*<div className="" style={{ position: 'absolute', top: '50%', right: '10%' }}>
            {loading && <div> Generate Script </div>}
            {response && <div>Response : {timeTaken}</div>}
            {error && <div>ERROR : Request Fail</div>}
  </div>*/}

          {/*<div className="" style={{ position: 'absolute', top: '50%', right: '10%' }}>
              {loading && <div> Upload ChainCode </div>}
              {response && <div>Response : {timeTaken}</div>}
              {error && <div>ERROR : Request Fail</div>}
  </div>*/}
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



export default GenerateScriptScreen;
