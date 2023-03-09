// import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useLocation } from "react-router-dom";
import AfterLoginHeader from '../components/Header';
import axios from 'axios';
import { URL } from '../config';



export const ssoLoginSuccessful = () => {
  const token=localStorage.getItem("token")
  return (

    <div>
      <AfterLoginHeader />
      <div style={{ backgroundColor: '#E5E4E2' }} >
        <br />
        <h1
          style={{ textAlign: "center", fontWeight: 'bolder' }}>
          Logged in Successfully!
        </h1>
        {/* <div> Data : {data}</div> */}
        {/* <div> State : {stateId}</div> */}

        {/* <div>Code = {JSON.stringify(authCode)}</div> */}
        {/* <div>Another Method : {JSON.stringify(data)}</div> */}

      </div>
    </div>
  )
}
