import React from "react";
import { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../css/scripts.css";
import enrollUser from '../images/enrollUser.png';
import viewUser from '../images/viewUser.png';


import {
        genScript,
        startNetwork,
        stopNetwork,
        removeNetwork,
        channelNetwork,
} from "../actions/Fabric/FabricAction";
//import ImageDisplay from "../screens/ImageDisplay"
//import EnrollUsersScreen from "../screens/EnrollUsersScreen";

//import { BsCheck2Circle } from "react-icons/bs";
//import startnetwork from "../images/photo/startnetwork.png"
//import deploychaincode from "../images/photo/deploychaincode.png"
//import stopnetwork from "../images/photo/stopnetwork.png"
//import removenetwork from "../images/photo/removenetwork.png"
//import enrollusers from "../images/photo/enrollusers.png"

import { AiOutlinePlayCircle, AiFillSetting } from "react-icons/ai";
import { GrCertificate } from "react-icons/gr";
import { BsStopCircleFill } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { AiFillStop } from "react-icons/ai";
//import Header from "./Header";
import jwt_decode from "jwt-decode";

const EnrollUsersScript = (props) => {
        const dispatch = useDispatch();
        //const [genTickButton, setgenTickButton] = useState({ display: 'none' })
        // // let genTickButton = false
        // const [stoptick,setStopTick] = useState(false)
        // const [removetick,setRemoveTick] = useState(false)
        /*****************GET THE REDUCER OF RESUME APPLICTION AND THE RESPONSE OF IT */

        /************************************************** */
        const data = useSelector((store) => store.scripts);
        const { error, response, loading } = data;


        let connectorToken = useSelector((store) => store.login_api);
        let dynamicToken = connectorToken.response.token

        let decode = jwt_decode(connectorToken.response.token)
        let mail = decode.response


        //const platform = localStorage.getItem("Platform");
        //let environment = localStorage.getItem("Environment");
        //let version = localStorage.getItem("Version");
        //let channel = localStorage.getItem("Channel");
        //let orderers = localStorage.getItem("Orderers").split(",");
        let pos = localStorage.getItem("checked");
        const organisation = JSON.parse(localStorage.getItem("Organisation"));

        //const [isDisplay,setisDisplay] = useState(true)

        const db = Boolean(localStorage.getItem("dbvariableItem"))

        let isDisplay = true
        let platformm = window.localStorage.getItem("Platform")
        const cas = [];

        const peers = [];

        const caname = [];

        const mspId = [];

        // function channelScript() {
        //         let channelStart = Date.now();
        //         localStorage.setItem("channelStartTime", channelStart)
        //         dispatch(channelNetwork(platform, version, channel,mail));
        // }

        //this function is for ENROLL USERS 
        // function OrganizationList() {
        //         //dispatch(registerUsers(organizations,newArr,isChecked))
        //         for (let i of organisation) {
        //                 caname.push(i.ca)
        //                 i = i.ca.split(".")
        //                 let count = 0;
        //                 let newarradd
        //                 let arradd = ""
        //                 for (let k of i) {
        //                         if (count !== 0) {
        //                                 arradd = arradd + "-" + k
        //                         }
        //                         count = count + 1
        //                 }
        //                 arradd = arradd.substr(1, arradd.length)
        //                 mspId.push(arradd)
        //         }
        //         // console.log("SCRIPTS CANAMES IS :- ",caname)
        //         //console.log("SCRIPTS MSP IS:- ",mspId)
        //         localStorage.setItem("canames", caname)
        //         localStorage.setItem("mspid", mspId)
        // }

        return (
                <div style={{ width: '100%', height: '100%' }}>
                        <div className="list-group" style={{ width: '100%', height: '100%' }}>
                                <div className="side-menu" style={{ width: '15%', height: '80%' }}>
                                        <nav className="nav-style">
                                                <Link to="/enrollusers" className="check12">
                                                        <img src={enrollUser} width={18}></img>
                                                        Enroll Users
                                                </Link>

                                                <Link to="/enrollusers" className="check12">
                                                        <img src={viewUser} width={18}></img>
                                                        View Users
                                                </Link>

                                        </nav>
                                </div>
                        </div>

                        <ToastContainer autoClose={2000} />
                </div>
        );
};

export default EnrollUsersScript;
