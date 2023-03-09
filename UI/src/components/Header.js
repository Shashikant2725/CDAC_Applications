import { Link } from "react-router-dom";
import meity_img from "../images/meity_logo.png";
import updated_ubf_logo from "../images/logoo.png";
import sj from "../images/satyamevJayte.png";
import pL from "../images/profile11.png";
import hS from "../images/headerSetting.png";
import uS from "../images/userSearch.png";
import mS from "../images/mysetting.png";
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
import { Button } from '@themesberg/react-bootstrap';
// import { getObject } from "../actions/Fabric/FabricAction";
import {store} from "../store"
import '../css/header.css'
//mywork
import React, { useEffect, useState } from "react";
import { useParams,useNavigate,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineScreenShare } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";


// import { Link } from '@mui/material';

import home from '../images/home.png'
import app from '../images/apps1.png'
import smart from '../images/smart.png'

// import { useNavigate } from "react-router-dom";

//MYWORK

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import jwtDecode from 'jwt-decode';

import {persistor} from "../store"
import { Logout } from "@mui/icons-material";
import jwt_decode from "jwt-decode";

// import appReducer from "../reducers/index.js"




//mywork

//MYWORK
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Header = (props) => {
  let [activeTab, setActiveTab] = useState("home");
  let [isUndefined, setIsUndefined] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  let mydata = useSelector((store) => store.login_api);
  console.log("myyy",mydata)
  let decode = jwt_decode(mydata.response.token);
  let identifiedRole = decode.role
    console.log("mydata", decode.role);
 
  //console.log(activeTab)
  const [value, setValue] = React.useState(0);
  //let { id } = useParams();
  //let id=localStorage.getItem("val")
  const location = useLocation();
  const dispatch = useDispatch()
  console.log('hash', location.hash);
  console.log('pathname', location.pathname);
  let currentLocation=location.pathname
  const handleChange = (event, newValue) => {
    
    setValue(newValue);
    //localStorage.setItem("val",newValue)
    
  };
  useEffect(()=>{
    if(location.pathname!=="/departmentDashboard"){
      if(location.pathname!=="/deptusermanagement"){
        if(location.pathname!=="/deptinfra"){
          if(location.pathname!=="/userinfrabinding"){
            setValue(1);
          }
          
        }
       
      }
      
      
    }
    // if(location.pathname==="/templatelibrary"){
    //   setValue(2);
    //   //alert("")
    // }
   
    //  if(id!== undefined){
    //   setValue(1);
    //   alert(id)
    //  }
     
  },[currentLocation])

  let data = useSelector((store) => store.login_api);
  let { error, response, loading } = data;
  // let Tokendataa = useSelector((stores) => stores.login_api);
  // let { errores, responses, loadings } = Tokendataa;
  let dynamicToken= jwtDecode(data.response.token)
  let dept =  dynamicToken.deptname
  //console.log("deptnammmmmmeeee",decodedName)

  useEffect(() => {
    // console.log("response iss login",response)
    if (response && response.email === undefined) {
      setIsUndefined(true)
    }
  }, [])

  // console.log("response iss login    n",response.email)

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


  let username = "user"

  if (localStorage.getItem("email") !== "null") {
    username = localStorage.getItem("email")
  }

  //added this function to display the header in first screen onwords based on username
  // function getclassname() {
  //   if(username !== ""){
  //     return ""
  //   }else{
  //     return "d-none"
  //   }

  // }
  let a = document.querySelector(".homee")
  let b = document.querySelector(".app")
  let c = document.querySelector(".smart")


  function clickHandler1() {
    setActiveTab("home")
    history("/choose_nw")
  }
  function clickHandler2() {
    setActiveTab("app")
    history("/first_screen")
  }
  function clickHandler3() {
    setActiveTab("smart")
    history("/templatelibrary")
  }
  function clickHandler4() {
    setActiveTab("deploy")
    history("/uploadCC")
  }
  function clickHandler5() {
    setActiveTab("manage")
    history("/enrollusers")
  }
  function settingHandler() {
    history("/settingscreen")
    // history("/dropDown")

    
  }


  function onClickHome() {
    console.log('first')
    //history("/homedashboard")
  }

   

  

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    // setTimeout(() => {
    //   LogoutButton()
    // }, 1800000);
    // 30 mins

    const LogoutButton = () => {
      localStorage.clear()
      persistor.purge();
      history("/")
      window.location.reload("/")
      store.dispatch({type:"login-api-empty"})
      //return appReducer({})
      localStorage.setItem("persist:root",{"login_api":"{}","register_api":"{}","newApp":"{}","eApp":"{}","appStatus":"{}","imageData":"{}","scripts":"{}","start_network":"{}","start_channel":"{}","stop_network":"{}","remove_network":"{}","fabric_cc":"{}","connector":"{}","sawtooth_gen_script":"{}","start_sawtooth_nw":"{}","stop_sawtooth_nw":"{}","sawtooth_tp":"{}","orgData":"{}","sawtoothImage":"{}","upgradeFabricChaincode":"{}","departmentAllAdmins":"{}","chooseInfra":"{}","newAppnAdminRegister":"{}","appAdminList":"{}","departmentInfraList":"{}","userInfraBindingAppAdmin":"{}","userenableDisable":"{}","all_api":"{}","userPlatformsList":"{}","userPlatformsVertions":"{}","userDynamicChannels":"{}","nbfAdminDeptRegMng":"{}","userconectorTypes":"{}","userdomainRolesTypes":"{}","userdynamicRolesTypes":"{}","orgsData":"{}","orgsDataFetch":"{}","nbfConnectorNames":"{}","_persist":"{\"version\":-1,\"rehydrated\":true}"}	
    )
    }



  return (
    // isUndefined?
    <div style={{ width: '100%', height: '100%' }}>
      <div id='completeHeader' style={{
        width: '100%',
        height: '62%',
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
          width: '500px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div id="profileData" style={{}}>
            <h4 style={{
              marginTop: '8px',
              fontSize: '16px',
              marginBottom: '1px',
              textAlign: 't',
              marginRight:"100px",
              fontWeight: '500'
            }}>{localStorage.getItem("email")}</h4>
              <p style={{
              marginTop: '5px',
              fontSize: '13px',
              marginBottom: '1px',
              marginRight:"30px",
              textAlign: '',
              fontWeight: '200',
              paddingRight:"2px",
              width:"120%"
            }}>{dept}</p>
            <h6 style={{
              width: '130%',
              fontSize: '10px',
              marginTop: '5px',
              fontWeight: '600',
              opacity: '.8',
              marginRight: '20px'

            }}>Last login : 2023-01-16 10:38:52 HR</h6>
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
          <div className="d-flex flex-row" onClick = {settingHandler}>
         <MdOutlineScreenShare  style = {{fontSize : "30px",color : "137EA9",marginTop : "4px",marginLeft : "20px"}}/>
         <MenuItem  >
           ConnectorScreen
          </MenuItem>
          </div>  
          <hr/>
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

      <div className="subHeader">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {identifiedRole !== "appAdmin"&&<Tab component={Link} to='/departmentDashboard' onClick={onClickHome} label="Home" {...a11yProps(0)} />}
              <Tab component={Link} to='/eapp' label="Application" {...a11yProps(1)} />
              <Tab component={Link} to='/templatelibrary'   label="Smart Contract Studio" {...a11yProps(2)}  />
              {/*<Tab component={Link} to='/uploadCC' label="Deployment" {...a11yProps(3)} />
        <Tab component={Link} to='/uploadCC' label="User Management" {...a11yProps(4)} />*/}
            </Tabs>
          </Box>

        </Box>
      </div>
    </div>

  );
};

export default Header;
