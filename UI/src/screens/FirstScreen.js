import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createApp,eApp } from "../actions/Fabric/FabricAction";
import Footer from "../components/Footer";
import tick from '../images/whiteTickLogo.png'
import '../css/tracker.css'
import '../css/firstScreen.css'
import nA from '../images/newApp.png'
import eA from '../images/ExistingApp.png'


import Header from "../components/Header";

const FirstScreen = (props) => {
    const [name, setName] = useState("");
    const [applicationType, setApplicationType] = useState("")
    const [appName, setappName] = useState(false);
    const [chooseAnyone,setChooseAnyone] = useState(false)
    const history = useNavigate();
    const dispatch = useDispatch();


    let [isUndefined,setIsUndefined] = useState(false)
  //console.log(activeTab)

  let data = useSelector((store) => store.login_api);
  let { error, response, loading } = data;

  
  useEffect(()=>{
    console.log("response iss login    n",response)
    if(response && response.email===undefined){
      setIsUndefined(false)
    }else{
        setIsUndefined(true)
    }
  },[])

    function navigateNetworkSetup() {
        if(!chooseAnyone){
            toast.error("Please Choose Valid Input !!");
            // dispatch(eApp(localStorage.getItem("email")))
            // history("/eapp")
        }
        if(applicationType === "newApplication"){
                    history("/choose_nw");
        }

        if(applicationType === "existingApplication"){
                    history("/eapp");
        }

        // else{
        //     // dispatch(eApp(localStorage.getItem("email")))2
        //     if(applicationType === "newApplication"){
        //         history("/choose_nw");
        //     }
        //     else{
        //         history("/eapp")
        //     }
            
        // }
        
    }
    function clickHandler1() {
        //console.log('check')
        setApplicationType("newApplication")
        document.querySelector('.a').style.border = '2px solid #89BED4'
        document.querySelector('.b').style.border = '2px solid #F0F0F0'
        document.querySelector('.a').style.boxShadow = '8px 8px 8px #DCECF3'
        document.querySelector('.b').style.boxShadow = '0px 0px 0px #DCECF3'
        document.querySelector('.a').style.opacity = '1'
        document.querySelector('.b').style.opacity = '.43'
        setChooseAnyone(true)
    }
    function clickHandler2() {
        //console.log('check222222')
        setApplicationType("existingApplication")
        document.querySelector('.b').style.border = '2px solid #89BED4'
        document.querySelector('.a').style.border = '2px solid #F0F0F0'
        document.querySelector('.b').style.boxShadow = '8px 8px 8px #DCECF3'
        document.querySelector('.a').style.boxShadow = '0px 0px 0px #DCECF3'
        document.querySelector('.b').style.opacity = '1'
        document.querySelector('.a').style.opacity = '.3'
        setChooseAnyone(true)
    }

    // let username

    // if (localStorage.getItem("email") !== "null") {
    //     username = localStorage.getItem("email")
    //     { <UsernameDisplay username={username} /> }
    // }


    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
            <div className="" style={{ width: '100%', height: '14%' }}>
                <Header />
            </div>
            <div style={{ width: '100%', height: '86%', display: 'flex', alignItems: 'center',flexDirection: 'column' }}>
                <div id="TrackerPortion" style={{ width: '73%', height: '10%',marginTop:'10px' }}>
                    <div id="mainTrackerData">
                        <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
                        <div className="lineDiv"></div>
                        <div className="circleDiv stepsC" >2</div>
                        <div className="lineDiv stepsL"></div>
                        <div className="circleDiv stepsC">3</div>
                        <div className="lineDiv stepsL"></div>
                        <div className="circleDiv stepsC">4</div>
                        <div className="lineDiv stepsL"></div>
                        <div className="circleDiv stepsC">5</div>

                    </div>
                </div>
                <div className="container mainBox" style={{ backgroundColor: 'white', width: '73%', border: '1px solid #B0B5BB', height: '75%' ,position:'relative',marginTop:'10px'}}>
                    <div style={{marginTop:'2%',fontSize:'21px',letterSpacing:'1px',color:'#314768'}}><strong>Application Type</strong></div>
                    <p style={{marginTop:'.3%',fontWeight:'900',opacity:'.6'}}>Please select one of the option below to proceed further</p>
                    <form className="form">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <div className="inputs a" onClick={clickHandler1} name="platform"><img src={nA}></img><p>New Application</p></div>
                            <div className="linee"></div>
                            <div className="inputs b" onClick={clickHandler2} name="platform"><img src={eA}></img><p>Existing Application</p></div>
                        </div>
                        <button type="button" className="btn btn-primary" style={{ height: '9%', width: '11%', backgroundColor: '#137EA9', border: 'none' ,position:'absolute',bottom:'3%',right:'3%'}} onClick={navigateNetworkSetup} required>Next</button>
                    </form>
                </div>
                <ToastContainer autoClose={2000} />
            </div>
            <div style={{ width: '100%', height: '8%',position: "fixed",bottom: 0, }}>
                <Footer className="footer_text" />
            </div>
        </div>
    );
};

export default FirstScreen;