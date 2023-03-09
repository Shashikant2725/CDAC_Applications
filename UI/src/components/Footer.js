import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/footer.css";
import cdac_logo from "../images/photo/CDAC.png";
import meity_logo from "../images/photo/meity-logo.png";
import digital_india_logo from "../images/photo/digital-india.png";
import idrbt_logo from "../images/photo/idrbt.png";
import iiit_logo from "../images/photo/iiit-logo.png";
import iit_hyd_logo from "../images/photo/iit-hydrabad-logo.png";
import nic_logo from "../images/photo/nic-logo.png";
import set_india_chennai_logo from "../images/photo/sets-india-chennai.png";

const Footer = (props) => {
  return (
    <div style={{ 
      backgroundColor: "#f2f4f5" ,
      width:'100%',
      height:'100%',
      paddingLeft: '0px',
      paddingRight: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }}>
      <marquee>
          <a href='https://www.meity.gov.in/'style={{marginLeft:"2%"}}><img src={meity_logo} alt="" width={100} /></a>
          <a href='https://cdac.in/'style={{marginLeft:"7%"}}><img src={cdac_logo} alt="" width={80} /></a>
          <a href='https://www.setsindia.in/'style={{marginLeft:"7%"}}><img src={set_india_chennai_logo} alt="" width={80} /></a>
          <a href='https://www.idrbt.ac.in/'style={{marginLeft:"7%"}}><img src={idrbt_logo} alt="" width={80} /></a>
          <a href='https://www.iith.ac.in/'style={{marginLeft:"7%"}}><img src={iit_hyd_logo} alt="" width={80} /></a>
          <a href='https://www.iiit.ac.in/'style={{marginLeft:"7%"}}><img src={iiit_logo} alt="" width={80} /></a>
          <a href='https://www.nic.in/'style={{marginLeft:"7%"}}><img src={nic_logo} alt="" width={80} /></a>
          <a href='https://www.digitalindia.gov.in/'style={{marginLeft:"7%"}}><img src={digital_india_logo} alt="" width={80} /></a>
          </marquee>
    </div>
  );
};

export default Footer;
