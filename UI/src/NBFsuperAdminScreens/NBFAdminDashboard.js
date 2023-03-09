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
import UserManagementDept from "../NBFsuperAdminComponents/UserManagementDept";
import ChooseInfrastructure from "../NBFsuperAdminComponents/ChooseInfrastructure";

import Department from "../NBFsuperAdminComponents/Department";


import '../css/imageDisplay.css'



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



export default function DashboardScreen() {
        const theme = useTheme();
        const [value, setValue] = React.useState(0);
        const [NBAAdminTable, setNBATable] = useState(false);
        const [DRTable, setDRTable] = useState(false);

        function butHandler1() {
                document.getElementById('but1').style.backgroundColor = 'white'
                document.getElementById('but1').style.color = 'black'

                document.getElementById('but2').style.backgroundColor = 'transparent'
                document.getElementById('but2').style.color = 'white'
                setNBATable(true)
                setDRTable(false)

        }
        function butHandler2() {
                document.getElementById('but2').style.backgroundColor = 'white'
                document.getElementById('but2').style.color = 'black'
                document.getElementById('but1').style.backgroundColor = 'transparent'
                document.getElementById('but1').style.color = 'white'
                setNBATable(false)
                setDRTable(true)
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

        const fabs = [
                {
                        color: 'primary',
                        sx: fabStyle,
                        icon: <AddIcon />,
                        label: 'Add',
                },
                {
                        color: 'secondary',
                        sx: fabStyle,
                        icon: <EditIcon />,
                        label: 'Edit',
                },
                {
                        color: 'inherit',
                        sx: { ...fabStyle, ...fabGreenStyle },
                        icon: <UpIcon />,
                        label: 'Expand',
                },
        ];

        return (
                <div style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                        <div className="" style={{ width: '100%', height: '10%' }}>
                                <Header />
                        </div>
                        <Box
                                sx={{
                                        bgcolor: 'background.paper',
                                        width: '100%',
                                        position: 'relative',
                                        minHeight: 200,
                                }}
                        >
                                <AppBar position="static" color="default">
                                        <Tabs
                                                value={value}
                                                onChange={handleChange}
                                                indicatorColor="primary"
                                                textColor="primary"
                                                variant="fullWidth"
                                                aria-label="action tabs example"
                                        >
                                                <Tab label="User Management Department" {...a11yProps(0)} />
                                                <Tab label="Choose Infrastructure" {...a11yProps(1)} />

                                        </Tabs>

                                </AppBar>

                                {/*<SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>*/}
                                <TabPanel value={value} index={0} style={{ height: '100%' }}>
                                        <div style={{ width: '100%', height: '67vh', display: 'flex' }}>
                                                <div style={{ width: '100%', height: '100%', paddingLeft: '3%' }}>
                                                        <UserManagementDept />
                                                        

                                                </div>
                                        </div>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                        <ChooseInfrastructure />
                                </TabPanel>
                                
                        </Box>
                        <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}>
                                <Footer className="footer_text" />
                        </div>
                </div>
        );
}
