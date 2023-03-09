import * as React from 'react';
import PropTypes from 'prop-types';
//import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useState } from "react";

import Header from "../NBFsuperAdminComponents/NBFHeader";
import Footer from "../components/Footer";
import NBFScript from "../NBFsuperAdminComponents/NBFScript";
import DepartmentUserM from "../NBFsuperAdminComponents/DepartmentUserM";
import Department from "../NBFsuperAdminComponents/Department";
import DepartmentInfrastructure from "../NBFsuperAdminComponents/DepartmentInfrastructure";
import UserInfraBinding from "../NBFsuperAdminComponents/UserInfraBinding";
import { departmentAllAppAdmins } from "../actions/Fabric/FabricAction";
import { useDispatch, useSelector } from "react-redux";
import HomeDashboard from "../NBFsuperAdminComponents/HomeDashboard";
import NBFAdminScript from '../NBFsuperAdminComponents/NBFAdminScript';

import { Card } from "@themesberg/react-bootstrap";





import '../css/imageDisplay.css'
import Switch from '@mui/material/Switch';
import { FaClosedCaptioning } from 'react-icons/fa';

const label = { inputProps: { 'aria-label': 'Switch demo' } };



function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
                <Typography
                        component="div"
                        role="tabpanel"
                        hidden={value !== index}
                        id={`action-tabpanel-${index}`}
                        aria-labelledby={`action-tab-${index}`}
                        {...other}
                >
                        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
                </Typography>
        );
}

TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
};

function a11yProps(index) {
        return {
                id: `action-tab-${index}`,
                'aria-controls': `action-tabpanel-${index}`,
        };
}

const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
};

const fabGreenStyle = {
        color: 'common.white',
        bgcolor: green[500],
        '&:hover': {
                bgcolor: green[600],
        },
};



export default function DepartmentDashboard() {
        const theme = useTheme();
        const [value, setValue] = React.useState(0);
        const [NBAAdminTable, setNBATable] = useState(false);
        const [DRTable, setDRTable] = useState(false);
        const [bind, setBind] = useState(false);
        const [dash, setDash] = useState(true);


        const dispatch = useDispatch()


        const handleChange = (event, newValue) => {
                setValue(newValue);
        };

        const handleChangeIndex = (index) => {
                setValue(index);
        };

        const transitionDuration = {
                enter: theme.transitions.duration.enteringScreen,
                exit: theme.transitions.duration.leavingScreen,
        };



        return (
                <div style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                        <div className="" style={{ width: '100%', height: '14%' }}>
                                <Header/>
                        </div>
                        <div style={{ width: '100%', height: '74vh', display: 'flex'}}>
                                <div style={{ width: '17%', height: '100%', backgroundColor: '#137EA9' }}>
                                        {/* <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'z#137EA9', color: 'black' }} onClick={butHandler4} id='but4'>Dashboard</button> */}
                                        {/*<button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler1} id='but1'>User Management</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler2} id='but2'>Infrastructure</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler3} id='but3'>User-Infra Binding</button>*/}
                                        <NBFAdminScript />
                                </div>
                                <div style={{ width: '83%', height: '100%', paddingLeft: '3%' }}>
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                {/* <div className="container mainBox" style={{ backgroundColor: 'white', width: '83%', border: '1px solid #B0B5BB', height: '100%' ,position:'relative',marginTop:''}}> */}
                                                <form className="form">
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '25%' }}>


                                                                <Card style={{ width: '18rem' }} className="shadow text-center ">

                                                                        <Card.Body>
                                                                                {/* <Card.Title>10</Card.Title> */}
                                                                                <h1>10</h1>
                                                                                <Card.Text>
                                                                                        App Admins
                                                                                </Card.Text>
                                                                        </Card.Body>
                                                                </Card>



                                                                <Card style={{ width: '18rem' }} className="shadow text-center ">

                                                                        <Card.Body>
                                                                                {/* <Card.Title>10</Card.Title> */}
                                                                                <h1>7</h1>
                                                                                <Card.Text>
                                                                                        All Applications
                                                                                </Card.Text>
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
                                        {/*NBAAdminTable && <DepartmentUserM />*/}
                                        {/*DRTable && <DepartmentInfrastructure />*/}
                                        {/*bind && <UserInfraBinding />*/}


                                </div>
                        </div>
                        <div style={{ width: '100%', height: '10%', position: "fixed", bottom: 0, }}>
                                <Footer className="footer_text" />
                        </div>
                </div>
        );
}
