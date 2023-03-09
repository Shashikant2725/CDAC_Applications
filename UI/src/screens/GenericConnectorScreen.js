import React, { useEffect } from 'react'
import { useState, useContext, createContext } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import tick from '../images/whiteTickLogo.png';
import '../css/tracker.css';
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { createApp, eappStatus } from "../actions/Fabric/FabricAction";



import jwt_decode from 'jwt-decode';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import arrow from '../images/arrow1.png'

export default function GenericConnectorScreen() {
        const [AllHDD, setAllHDD] = useState([]);
        const [AllRAM, setAllRAM] = useState([]);
        const [Allcores, setAllcores] = useState([]);
        const [AllLocation, setAllLocation] = useState([]);
        const [numberOfVM, setNumberOfVM] = useState(1);

        let connectorToken = useSelector((store) => store.login_api);
        let dynamicTokenResponse = connectorToken.response.token
        console.log("dynamicTokenResponse", dynamicTokenResponse)
        let decode = jwt_decode(connectorToken.response.token)
        let mail = decode.email

        // useEffect(() => {
        //         let appname = localStorage.getItem("rowAppName")
        //         console.log("appname", appname)
        //         //dispatch(eappStatus(dynamicTokenResponse, mail,))

        // }, [])


        var history = useNavigate();
        const dispatch = useDispatch();

        const theme = useTheme();

        const navigateBack = () => {
                history("/choose_nw");
        };

        function changeHandler(e) {
                if (localStorage.getItem("NodeType") !== 'single') {
                        setNumberOfVM(parseInt(e.target.value))
                }
        }

        console.log("hello World", localStorage.getItem("AppName"), localStorage.getItem("Platform"))
        function navigateChannel() {

                let master = {
                        "ram": AllRAM[0],
                        "storage": AllHDD[0],
                        "cores": Allcores[0],
                        "location": AllLocation[0],
                }
                let worker = []
                if (numberOfVM > 1) {
                        for (let i = 1; i < numberOfVM; i++) {
                                let a = {
                                        "ram": AllRAM[i],
                                        "storage": AllHDD[i],
                                        "cores": Allcores[i],
                                        "location": AllLocation[i],
                                }
                                worker.push(a)
                        }
                }


                console.log("hello World", localStorage.getItem("AppName"), localStorage.getItem("Platform"))
                //dispatch(createApp(name, plat))
                dispatch(createApp(dynamicTokenResponse, localStorage.getItem("AppName"), localStorage.getItem("Platform"), localStorage.getItem("Environment"), master, worker, localStorage.getItem("domainName"), mail,localStorage.getItem("ConnectorName")))
                history("/eapp");
        }

        function HDDHandler(i, e) {
                console.log(e.target.value)
                let a = AllHDD
                a[i] = e.target.value
                setAllHDD(a)
                console.log(AllHDD)
        }

        function RAMHandler(i, e) {
                console.log(e.target.value)
                let a = AllRAM
                a[i] = e.target.value
                setAllRAM(a)
                console.log(AllRAM)
        }

        function coresHandler(i, e) {
                console.log(e.target.value)
                let a = Allcores
                a[i] = e.target.value
                setAllcores(a)
                console.log(Allcores)
        }

        const handleChange = (i, event) => {
                console.log(event.target.value)
                let a = AllLocation
                a[i] = event.target.value
                setAllLocation(a);
                console.log(AllLocation)
        };

        return (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
                        <div className="" style={{ width: '100%', height: '14%' }}><Header /></div>
                        <div className="" style={{ width: '100%', height: '86%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <div id="TrackerPortion" style={{ width: '73%', height: '10%', marginTop: '15px' }}>
                                        <div id="mainTrackerData">
                                                <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
                                                <div className="lineDiv"></div>
                                                <div className="circleDiv stepsC" style={{
                                                        backgroundColor: '#137EA9',
                                                        color: 'white',
                                                }}><img src={tick} alt="" width={12} ></img></div>
                                                <div className="lineDiv stepsL" style={{ backgroundColor: '#137EA9' }}></div>
                                                <div className="circleDiv stepsC" style={{
                                                        backgroundColor: '#137EA9',
                                                        color: 'white',
                                                }}><img src={tick} alt="" width={12} ></img></div>
                                                <div className="lineDiv stepsL"></div>
                                                <div className="circleDiv stepsC">4</div>
                                                <div className="lineDiv stepsL"></div>
                                                <div className="circleDiv stepsC">5</div>

                                        </div>
                                </div>
                                <div className="container " style={{ backgroundColor: 'white', width: '73%', border: '1px solid #B0B5BB', height: '75%', paddingTop: '2%', marginTop: '15px' }}>
                                        <div id='completeBox' style={{
                                                width: '100%',
                                                height: '100%',
                                        }}>
                                                <form id='form' style={{
                                                        width: '100%',
                                                        height: '100%',
                                                }}>
                                                        <div class="mb-3" style={{
                                                                width: '100%',
                                                                height: '14%',
                                                                backgroundColor: '#f9f9f9',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                border: '1.5px solid #e4e3e3',
                                                                paddingRight: '24%',
                                                                justifyContent: 'space-around'

                                                        }}>
                                                                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom style={{ marginLeft: '10px', marginTop: '10px' }}>
                                                                        Number of VMs
                                                                </Typography>
                                                                <img src={arrow}></img>
                                                                <input
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="exampleInputEmail1"
                                                                        aria-describedby="emailHelp"
                                                                        min="1"
                                                                        name='organisation'
                                                                        value={numberOfVM}
                                                                        onChange={changeHandler}
                                                                        style={{
                                                                                height: '70%',
                                                                                width: '12%',
                                                                        }}
                                                                ></input>
                                                        </div>

                                                        <div id="organisations" style={{
                                                                width: '100%',
                                                                height: '68%',
                                                                display: 'flex',
                                                                flexWrap: 'wrap',
                                                                overflow: 'auto',
                                                                justifyContent: 'space-between',
                                                        }}>
                                                                {Number(numberOfVM) > 0 && (
                                                                        <div style={{ width: '100%', height: '100%' }}>
                                                                                <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap' }}>
                                                                                        {[...Array(numberOfVM)].map((el, index) => (
                                                                                                <Card sx={{ display: 'flex', backgroundColor: '#F9F9F9', flexDirection: 'column', marginRight: '16px', marginBottom: '20px', borderLeft: '2px solid #137EA9', height: '77%' }}>
                                                                                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{ marginLeft: '44%', marginTop: '10px' }}>
                                                                                                                VM {index + 1}
                                                                                                        </Typography>

                                                                                                        <div style={{ display: 'flex' }}>
                                                                                                                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '13ch' }, }} noValidate autoComplete="off">
                                                                                                                        <div>
                                                                                                                                <TextField type='number' onChange={(e) => HDDHandler(index, e)} value={AllHDD[index]} label="HDD" id="outlined-size-small" size="small" defaultValue={120}  InputLabelProps={{
                                                                                                                                        shrink: true,
                                                                                                                                }} />
                                                                                                                        </div>
                                                                                                                </Box>
                                                                                                                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '13.5ch' }, }} noValidate autoComplete="off">
                                                                                                                        <div>
                                                                                                                                <TextField type='number' onChange={(e) => RAMHandler(index, e)} value={AllRAM[index]} label="RAM"   defaultValue={16} id="outlined-size-small" size="small" 
                                                                                                                                InputLabelProps={{
                                                                                                                                        shrink: true,
                                                                                                                                }} />
                                                                                                                        </div>

                                                                                                                </Box>
                                                                                                        </div>

                                                                                                        <Box
                                                                                                                component="form"
                                                                                                                sx={{
                                                                                                                        '& .MuiTextField-root': { m: 1, width: '28ch' },
                                                                                                                }}
                                                                                                                noValidate
                                                                                                                autoComplete="off"
                                                                                                        >
                                                                                                                <div>
                                                                                                                        <TextField
                                                                                                                                type='number'
                                                                                                                                onChange={(e) => coresHandler(index, e)}
                                                                                                                                value={Allcores[index]}
                                                                                                                                label="Cores"
                                                                                                                                defaultValue={2} 
                                                                                                                                id="outlined-size-small"
                                                                                                                                size="small"
                                                                                                                                InputLabelProps={{
                                                                                                                                        shrink: true,
                                                                                                                                }}
                                                                                                                        />
                                                                                                                </div>

                                                                                                        </Box>

                                                                                                        <Box
                                                                                                                component="form"
                                                                                                                sx={{
                                                                                                                        '& .MuiTextField-root': { m: 1, width: '28ch' },
                                                                                                                }}
                                                                                                                noValidate
                                                                                                                autoComplete="off"
                                                                                                        >
                                                                                                                <div>
                                                                                                                        <TextField
                                                                                                                                id="outlined-select-currency"
                                                                                                                                select
                                                                                                                               
                                                                                                                                size="small"
                                                                                                                                defaultValue=""
                                                                                                                                helperText=""
                                                                                                                                value={AllLocation[index]}
                                                                                                                                label="Location"
                                                                                                                                onChange={(e) => handleChange(index, e)}
                                                                                                                                
                                                                                                                                InputLabelProps={{
                                                                                                                                        shrink: true,
                                                                                                                                }}
                                                                                                                        >
                                                                                                                                <MenuItem value={'hyderabad'}>Hyderabad</MenuItem>
                                                                                                                                {/* {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
                                                                                                                        </TextField>
                                                                                                                </div>
                                                                                                        </Box>

                                                                                                        {/* <FormControl sx={{ m: 1, width: 277 }} size="small" style={{ marginRight: '15px' }}>
                                                                                                                <InputLabel id="demo-select-small" 
                                                                                                                >Location</InputLabel>
                                                                                                                <Select
                                                                                                                        labelId="demo-select-small"
                                                                                                                        id="demo-select-small"
                                                                                                                        value={AllLocation[index]}
                                                                                                                        label="Location"
                                                                                                                        onChange={(e) => handleChange(index, e)}
                                                                                                                        
                                                                                                                >

                                                                                                                        <MenuItem value={'hyderabad'}>Hyderabad</MenuItem>
                                                                                                                       
                                                                                                                </Select>
                                                                                                        </FormControl> */}

                                                                                                </Card>

                                                                                        ))}
                                                                                </div>
                                                                        </div>
                                                                )}
                                                        </div>
                                                        <div className="d-flex " style={{ width: '30%', height: '9%', marginTop: '1.2%', marginLeft: '68%' }}>
                                                                <button type="button" style={{ height: '100%', width: '40%', border: '1px solid #137EA9', color: '#137EA9' }} class="btn btn-outline-primary" onClick={navigateBack}>Back</button>
                                                                <button type="button" className="btn btn-primary" style={{ height: '100%', width: '40%', marginLeft: '25px', backgroundColor: '#137EA9', border: 'none' }} onClick={navigateChannel}>Next</button>
                                                        </div>
                                                </form>
                                        </div>
                                </div>
                        </div>
                        <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}>
                                <Footer className="footer_text" />
                        </div>
                </div>
        )
}
