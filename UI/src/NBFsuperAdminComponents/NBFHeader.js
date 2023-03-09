import { Link } from "react-router-dom";
import meity_img from "../images/meity_logo.png";
import updated_ubf_logo from "../images/logoo.png";
import sj from "../images/satyamevJayte.png";
import pL from "../images/profile11.png";
import hS from "../images/headerSetting.png";
import uS from "../images/userSearch.png";
import mS from "../images/mysetting.png";
import jwtDecode from "jwt-decode";
import { MdOutlineLogout } from "react-icons/md";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { MdOutlineScreenShare } from "react-icons/md";


import { Button } from '@themesberg/react-bootstrap';

import '../css/header.css'
//mywork
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import home from '../images/home.png'
import app from '../images/apps1.png'
import smart from '../images/smart.png'

// import { useNavigate } from "react-router-dom";

//MYWORK

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";


//mywork

//MYWORK

const Header = (props) => {
  let [activeTab, setActiveTab] = useState("home");
  let [isUndefined,setIsUndefined] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  //console.log(activeTab)

  const history =  useNavigate()

  let data = useSelector((store) => store.login_api);
  let { error, response, loading } = data;

  let adminLogines = useSelector((stores) => stores.adminLoginsuser);
  let { nbfAdminLoginError, nbfAdminLoginResponse, nbfAdminLoginLoading } = adminLogines;
  console.log("adminLogines...............",nbfAdminLoginResponse)
  const decodeValue = jwtDecode(nbfAdminLoginResponse)
  let decodedEmail = decodeValue.email
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  function settingHandler() {
    history("/settingscreen")

    
  }

  const LogoutButton = () => {
    history("/adminLogin")

  }


  return (
    // isUndefined?
    (<div style={{ width: '100%', height: '70%' }}>
      <div id='completeHeader' style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(255, 255, 255)',
        display: 'flex',
        paddingLeft: '3.4%',
        paddingRight: '3.4%',
        justifyContent: 'space-between',
      }}>
        <div id="leftHeader" style={{
          width: '540px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <img src={updated_ubf_logo} width={130}></img>
          <div id="line" style={{
            width: '.4%',
            height: '50%',
            backgroundColor: 'rgb(204, 202, 202)',
            borderRadius: '14px',
            marginLeft: '0px'
          }}></div>
          <div id="ministryDiv" style={{
            display: 'flex',
            height: '100%',
            width: '89%,',
            alignItems: 'center',
          }}>
            <img src={sj} style={{
              width: 'auto',
              height: '60%',
            }}></img>
            <div id="GOI" style={{
              height: '100%',
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: '5px',
            }}>
              <h3 style={{
                fontSize: '11px',
                marginBottom: '1px',
                fontWeight: '700',
                color: 'rgb(51, 50, 50)',
                width: '340px'
              }}>Ministry of Electronics and Information Technology</h3>
              <h5 style={{
                fontSize: '10px',
                color: 'rgb(97, 97, 97)',
              }}>Government of India</h5>
            </div>
          </div>
        </div>
        <div id="rightHeader" style={{
          width: '275px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div id="profileData">
            <h4 style={{
              marginTop: '10px',
              fontSize: '16px',
              marginBottom: '3px',
              textAlign: 'right',
              fontWeight: '500',
              marginRight : "20px"
            }}>{decodedEmail}</h4>
            <h6 style={{
              fontSize: '10px',
              marginTop: '7px',
              fontWeight: '600',
              opacity: '.8'

            }}>Last login : 2022-08-21 <br/> 10:38:52 HR</h6>
          </div>
          <img src={pL} style={{
            width: 'auto',
            height: '60%',
            marginLeft: '20px'
          }}></img>

<>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
         
         <Tooltip title="Account settings">
           <IconButton
             onClick={handleClick}
             size="small"
             sx={{ ml: 2 }}
             aria-controls={open ? 'account-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
           >
           <Avatar src={mS} sx={{ width: 35, height: 35 ,color : "#673ab7",backgroundColor : "white" }} />
           </IconButton>
         </Tooltip>
       </Box>
       <Menu
         anchorEl={anchorEl}
         id="account-menu"
         open={open}
         onClose={handleClose}
         onClick={handleClose}
         PaperProps={{
           elevation: 0,
           sx: {
             overflow: 'visible',
             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
             mt: 1.5,
             '& .MuiAvatar-root': {
               width: 32,
               height: 32,
               ml: -0.5,
               mr: 1,
             },
             '&:before': {
               content: '""',
               display: 'block',
               position: 'absolute',
               top: 0,
               right: 14,
               width: 10,
               height: 10,
               bgcolor: 'background.paper',
               transform: 'translateY(-50%) rotate(45deg)',
               zIndex: 0,
             },
           },
         }}
         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
       >
         <div className="m-2" style = {{textAlign : "center"}}>
         {/* <div className="d-flex flex-row" onClick = {settingHandler}>
        <MdOutlineScreenShare  style = {{fontSize : "30px",color : "137EA9",marginTop : "4px",marginLeft : "20px"}}/>
        <MenuItem  >
          ConnectorScreen
         </MenuItem>
         </div>   */}
         {/* <hr/> */}
         <div className="d-flex flex-row" onClick = {LogoutButton}>
           <MdOutlineLogout style = {{fontSize : "30px",color : "137EA9",marginTop : "4px",marginLeft : "20px"}}/>
        <MenuItem  >
         Logout
         </MenuItem>
         </div>
         </div>
       
       </Menu>
      
      
      </>
        </div>
        
      </div>
      <hr/>
     
       
    </div>
    )
  );
};

export default Header;
