import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createApp, eApp } from "../actions/Fabric/FabricAction";
import Footer from "../components/Footer";
import tick from '../images/whiteTickLogo.png'
import '../css/tracker.css'
import '../css/firstScreen.css'
import nA from '../images/newApp.png'
import eA from '../images/ExistingApp.png'
import { Card } from "@themesberg/react-bootstrap";
import { GrAppsRounded } from "react-icons/gr";
import { MdSettingsApplications } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";
import { GrDocumentZip } from "react-icons/gr";
import {MdOutlineSettingsApplications,MdAlignVerticalBottom} from "react-icons/md";

import Header from "../components/Header";

const HomeDashboard = (props) => {
    const [name, setName] = useState("");
    const [applicationType, setApplicationType] = useState("")
    const [appName, setappName] = useState(false);
    const [chooseAnyone, setChooseAnyone] = useState(false)
    const history = useNavigate();
    const dispatch = useDispatch();


    let [isUndefined, setIsUndefined] = useState(false)
    //console.log(activeTab)

    let data = useSelector((store) => store.login_api);
    let { error, response, loading } = data;


    useEffect(() => {
        console.log("response iss login    n", response)
        if (response && response.email === undefined) {
            setIsUndefined(false)
        } else {
            setIsUndefined(true)
        }
    }, [])

    function navigateNetworkSetup() {
        console.log('heyyy')
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
        <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>

            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                {/* <div className="container mainBox" style={{ backgroundColor: 'white', width: '83%', border: '1px solid #B0B5BB', height: '100%' ,position:'relative',marginTop:''}}> */}
                <form className="form">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '20%' }}>


                        <Card style={{ width: '18rem' }} className="shadow text-center ">

                            <Card.Body style={{display:'flex',alignItems:'center'}}>
                                {/* <Card.Title>10</Card.Title> */}
                                <div style={{ width: '6px', height: '100px', backgroundColor: 'green',marginRight:'8%'}}></div> 

                                <div style = {{marginRight :"38px"}}>
                                    <h1>10</h1>
                                    <Card.Text>
                                        App Admins
                                    </Card.Text>
                                </div>
                              <h1 style = {{marginLeft : "30px"}}><FiUserCheck/></h1>  
                              

                            </Card.Body>
                        </Card>



                        <Card style={{ width: '18rem' }} className="shadow text-center ">
                            <Card.Body style={{display:'flex',alignItems:'center'}}>
                                {/* <Card.Title>10</Card.Title> */}
                                <div style={{ width: '6px', height: '100px', backgroundColor: 'orange',marginRight:'8%'}}></div>
                                <div>
                                    <h1>7</h1>
                                    <Card.Text>
                                    All Applications
                                    </Card.Text>
                                </div>
                                <h1 style = {{marginLeft : "30px"}}>
                               <GrAppsRounded style = {{fontSize : "40px"}}/>
                                </h1> 

                            </Card.Body>
                        </Card>

                        


                        {/* <div className="inputs a" onClick={clickHandler1} name="platform"><h1>10</h1><p>All App Admins</p></div>
                            <div className="linee"></div>
                            <div className="inputs b" onClick={clickHandler2} name="platform"><h1>7</h1><p>All Applications</p></div> */}
                    </div>

                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '5%' }}>


                        <Card style={{ width: '18rem' }} className="shadow text-center ">

                            <Card.Body style={{display:'flex',alignItems:'center'}}>
                                {/* <Card.Title>10</Card.Title> */}
                                <div style={{ width: '10px', height: '100px', backgroundColor: 'green',marginRight:'8%'}}></div>
                                <div style = {{marginRight :"38px"}}>
                                    <h1>4</h1>
                                    <Card.Text>
                                        Chain Code Downloded
                                    </Card.Text>
                                </div>
                                <h1>
                                   <h1>
                                    <GrDocumentZip style = {{marginRight: "30px"}}/>
                                   </h1>

                                </h1>

                            </Card.Body>
                        </Card>



                        <Card style={{ width: '18rem' }} className="shadow text-center ">
                            <Card.Body style={{display:'flex',alignItems:'center'}}>
                                {/* <Card.Title>10</Card.Title> */}
                                <div style={{ width: '6px', height: '100px', backgroundColor: 'orange',marginRight:'8%'}}></div>
                                <div>
                                    <h1>2</h1>
                                    <Card.Text>
                                        Domains
                                    </Card.Text>
                                </div>
                                <h1 style = {{marginLeft : "75px"}}>
                               <MdAlignVerticalBottom style = {{fontSize : "55px"}}/>
                                </h1> 

                            </Card.Body>
                        </Card>

                        


                        {/* <div className="inputs a" onClick={clickHandler1} name="platform"><h1>10</h1><p>All App Admins</p></div>
                            <div className="linee"></div>
                            <div className="inputs b" onClick={clickHandler2} name="platform"><h1>7</h1><p>All Applications</p></div> */}
                    </div>



                    {/* <button type="button" className="btn btn-primary" style={{ height: '9%', width: '11%', backgroundColor: '#137EA9', border: 'none' ,position:'absolute',bottom:'3%',right:'3%'}} onClick={navigateNetworkSetup} required>Next</button> */}
                </form>
                {/* </div> */}
            </div>
            <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}>
                <Footer className="footer_text" />
            </div>
        </div>
    );
};

export default HomeDashboard;