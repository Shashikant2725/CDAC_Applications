import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EnrollUsersScript from "../components/EnrollUsersScript"
import { registerUsers } from "../actions/Fabric/FabricAction"
import { BsPlusCircle } from "react-icons/bs";
import Header from "../components/Header";
import Footer from "../components/Footer"
import home from '../images/home.png'
import eye from '../images/eye.png'
//import trashh from '../images/trashh.png'
//import pluss from '../images/pluss.png'


export default function ViewUserScreen() {
        const data = useSelector((store) => store.scripts);
        const { error, response, loading } = data;

        const { apperror, appresponse, apploading } = useSelector((app) => app.appStatus);
        let usernamesOrg = window.localStorage.getItem("orgUsernames");
        let newname = usernamesOrg.split(",")
        let allList = ''
        if (newname) {
                allList = newname.map((u, index) => {
                        return (<div style={{ fontSize: '12px', color: 'black', width: '80%', backgroundColor: 'white', height: '40px', marginTop: '10px', display: 'flex', alignItems: 'center', paddingLeft: '30px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>{u}</div>)
                })
        }
        let appname = ''
        let version = ''
        let plat = ''
        let Env = ''

        if (appresponse) {
                if (appresponse[0] !== null) {
                        appname = appresponse[0].appName
                        version = appresponse[0].verison
                        plat = appresponse[0].platform
                        Env = appresponse[0].environment
                }
                else {
                        appname = localStorage.getItem("AppName")
                        version = localStorage.getItem("Version")
                        plat = localStorage.getItem("Platform")
                        Env = localStorage.getItem("Environment")
                }

        }
        else {
                appname = localStorage.getItem("AppName")
                version = localStorage.getItem("Version")
                plat = localStorage.getItem("Platform")
                Env = localStorage.getItem("Environment")
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
                                justifyContent: 'space-between',
                        }}>
                                <div className="leftScript"><EnrollUsersScript style={{ width: '100%', height: '100%' }} /></div>
                                <div className="rightScript">
                                        <div className="rightNavScript">
                                                <div className="NavLeft">
                                                        <img style={{ color: '#137EA9' }} src={home} width={18}></img>
                                                        <p>/</p>
                                                        <p style={{ color: '#137EA9' }}>Application Setup</p>
                                                        <p>/</p>
                                                        <p>View User</p>
                                                </div>
                                                <div className="NavRight"><p data-bs-toggle="modal" data-bs-target="#exampleModal1"><img src={eye} width={18}></img> View Application Setup Details</p></div>
                                        </div>
                                        <div className="rightMainScript" style={{ position: 'relative', overflow: 'auto' }}>
                                                {allList}
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
                                                                <p>{appname}</p>
                                                        </div>
                                                        <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                                                                <p>Version</p>
                                                                <p style={{ marginLeft: '110px', marginRight: '120px' }}>-</p>
                                                                <p>{version}</p>
                                                        </div>
                                                        <div style={{ height: '25px', width: '100%', backgroundColor: '#F5F5F5', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                                                                <p>Platform</p>
                                                                <p style={{ marginLeft: '100px', marginRight: '120px' }}>-</p>
                                                                <p>{plat}</p>
                                                        </div>
                                                        <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                                                                <p>ENV</p>
                                                                <p style={{ marginLeft: '126px', marginRight: '120px' }}>-</p>
                                                                <p>{Env}</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}