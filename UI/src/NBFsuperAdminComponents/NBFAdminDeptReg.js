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
import { useState,useEffect } from "react";

import Header from "../NBFsuperAdminComponents/NBFHeader";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import HomeDashboard from "../NBFsuperAdminComponents/HomeDashboard";
import NBFAdminScript from '../NBFsuperAdminComponents/NBFAdminScript';
import { Card } from "@themesberg/react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import trashh from '../images/trashh.png'
import { ToastContainer } from "react-toastify";

import paginationFactory from 'react-bootstrap-table2-paginator';
import { nbfAdminDeptRegMng,userenableDisable } from '../actions/Fabric/FabricAction';




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


export default function NBFAdminDeptReg() {
        const theme = useTheme();
        const dispatch = useDispatch()
        const [value, setValue] = React.useState(0);
        const [NBAAdminTable, setNBATable] = useState(false);
        useEffect(() => {
                dispatch(nbfAdminDeptRegMng())    
        }, [])


        let deptData = useSelector((abcd) => abcd.nbfAdminDeptRegMng)
        //const [da, setDa] = useState(deptData.response)
        const [da, setDa] = useState()
        useEffect(()=>{
                if(deptData.response){
                        setDa(deptData.response)
                }
        },[deptData.response])
        console.log(deptData)
        //console.log(deptData.response)

   

        if (deptData.response) {
                //newTableData.response[1].len = 5
                for (let i = 0; i < deptData.response.length; i++) {
                        deptData.response[i].len = i + 1
                  //connectorNameArray.push(deptData.response[i].connectorName)
                }
              }

        

        let insetArray = []
        if (da) {
                //newTableData.response[1].len = 5
                for (let i = 0; i < da.length; i++) {
                        insetArray.push(da[i].inset)
                        //setSwitchArray(insetArray)
                }
        }

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

       
        const onClickStatus = (row, rowIndex) => {
                // let val = !(inset)
                // insetArray
                // adminResponse[rowIndex].inset = val
                let d = da      
                const fil = d.map((obj,index)=>index===rowIndex? { ...obj, inset: !obj.inset } : obj);
                setDa(fil)
                console.log(fil[rowIndex].email,fil[rowIndex].inset)
                dispatch(userenableDisable(fil[rowIndex].email,fil[rowIndex].inset))
        }

        let columns = [
                {
                        dataField: "len",
                        text: "Serial No",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "deptname",
                        text: "Department Name",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "designation",
                        text: "Designation",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "email",
                        text: "Email",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "mobile",
                        text: "Mobile",
                        align: "center",
                        headerAlign: "center",
                },

                {
                        dataField: "inset",
                        text: "Enable / Disable",
                        align: "center",
                        headerAlign: "center",
                        formatter: (cell, row, rowIndex, formatExtraData) => {
                                return (
                                        <Switch checked={row.inset} inputProps={{ 'aria-label': 'controlled' }} onChange={() => onClickStatus(row, rowIndex)} />
                                )
                        }
                },
                {
                        dataField: "action",
                        text: "Action",
                        align: "center",
                        headerAlign: "center",
                },]

        let data = [{ 'sNo': 1, 'dname': 'e-security', 'name': 'Vaibhav', 'email': 'vai@cdac.in', 'mobile': 989897878, 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
        { 'sNo': 2, 'dname': 'e-security', 'name': 'Milo Sparks', 'email': 'dsowsy@yahoo.com', 'mobile': 3489897878, 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
        { 'sNo': 3, 'dname': 'e-security', 'name': 'Vaibhav', 'email': 'vai@cdac.in', 'mobile': 9121297878, 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
        { 'sNo': 4, 'dname': 'e-security', 'name': 'VaiJeffrey Copebhav', 'email': 'dsowsy@yahoo.com', 'mobile': 989897878, 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> }]

        const expandRow = {
                renderer: row => (
                        <div>
                                <p><strong>Department Name : </strong>{row.deptname}</p>
                                <p><strong>Email : </strong>{row.email}</p>
                        </div>
                )
        };

        const rowEvents = {
                onClick: (e, row, rowIndex) => {
                        console.log(rowIndex)
                }
        };


        return (
                <div style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                        <div className="" style={{ width: '100%', height: '14%' }}>
                                <Header />
                        </div>
                        <div style={{ width: '100%', height: '76vh', display: 'flex' }}>
                                <div style={{ width: '17%', height: '100%', backgroundColor: '#137EA9' }}>
                                        {/* <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'z#137EA9', color: 'black' }} onClick={butHandler4} id='but4'>Dashboard</button> */}
                                        {/*<button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler1} id='but1'>User Management</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler2} id='but2'>Infrastructure</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler3} id='but3'>User-Infra Binding</button>*/}
                                        <NBFAdminScript />
                                </div>
                                <div style={{ width: '83%', height: '100%', padding: '3%',overflowX:"auto" }}>
                                        
                                        {da !== undefined && <BootstrapTable keyField='len' data={da} columns={columns} expandRow={expandRow} rowEvents={rowEvents} pagination={ paginationFactory()} />}
                                        <ToastContainer autoClose={2000} />
                                </div>
                        </div>
                        <div style={{ width: '100%', height: '10%', position: "fixed", bottom: 0, }}>
                                <Footer className="footer_text" />
                        </div>
                </div>
        );
}
