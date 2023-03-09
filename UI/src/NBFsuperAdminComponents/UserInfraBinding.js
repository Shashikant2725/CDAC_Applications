import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import UserInfraBindingStatus from "../NBFsuperAdminComponents/UserInfraBindingStatus";
import Header from '../components/Header';
import DepartmentDashboardScript from './DepartmentDashboardScript';
import { useSelector, useDispatch } from "react-redux";
import { chooseInfrastructure, userInfraBindingAppAdmin, departmentAllAppAdmins,nbfadminConnectorNames } from '../actions/Fabric/FabricAction';
import jwtDecode from 'jwt-decode';
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";



export default function UserInfraBinding() {
        const [appAdmin, setAppAdmin] = React.useState('');
        const [ctype, setCtype] = React.useState('');
        console.log("ctype",ctype)
        const [cname, setCname] = React.useState('');

        //console.log('hello')

        let appAdminArray = []
        const dispatch = useDispatch();
        const data = useSelector((store) => store.appAdminList);
        const { error, response, loading } = data;
        //console.log(response)

        let Tokendataa = useSelector((stores) => stores.login_api);
        let { errores, responses, loadings } = Tokendataa;
        let dynamicToken= jwtDecode(Tokendataa.response.token)
        let decodedName =  dynamicToken.deptname
        let decodeEmail=dynamicToken.email
        console.log("emaiiiiiil",decodeEmail)
        // let decode = jwtDecode(dynamicToken.deptname)
        // console.log("decode",decode)

        console.log(Tokendataa.response)

        let nbfConnectorNamesms = useSelector((name) => name.nbfConnectorNames)
        console.log("nbfConnectorNames",nbfConnectorNamesms.adminConnectorFetchResponse)

      

        let newTableData = useSelector((abcd) => abcd.departmentInfraList)
        console.log(newTableData.response)
        let validConnectorNames = []
        if (newTableData.response) {
                for (let i = 0; i < newTableData.response.length; i++) {
                        //console.log(newTableData.response[i].status)
                        if (newTableData.response[i].status === 'approved' && newTableData.response[i].connectorType === ctype) {
                                validConnectorNames.push(newTableData.response[i].connectorName)
                        }
                }
        }

        //console.log(validConnectorNames)
        const handleChange1 = (event) => {
                setAppAdmin(event.target.value);
        };
        const handleChange2 = (event) => {
               
                setCtype(event.target.value);
                dispatch(nbfadminConnectorNames(event.target.value,decodedName))
        };
        const handleChange3 = (event) => {
                setCname(event.target.value);
        };

        if (response) {
                for (let i = 0; i < response.length; i++) {
                        appAdminArray.push(response[i].email)
                }
        }
        //console.log(cname)

        function dataHandler() {
                //let cnamee = 'aws-Ministry Of central Govt-28a65375-f6c8-470f-a411-15db4f7713cd'
                // console.log('cname====', cname)
                let decreptToken = jwtDecode(Tokendataa.response.token)
                //console.log("deptName", decreptToken.deptname)
                dispatch(userInfraBindingAppAdmin(appAdmin, decreptToken.deptname, ctype, cname,dynamicToken))
                dispatch(departmentAllAppAdmins(decreptToken.deptname,dynamicToken))
        }

        return (

                <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                        <div className="" style={{ width: '100%', height: '14%' }}>
                                <Header />
                        </div>

                        <div style={{ width: '100%', height: '74vh', display: 'flex', marginTop: '1.2%' }}>
                                <div style={{ width: '17%', height: '100%', backgroundColor: '#137EA9' }}>
                                        {/* <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'white', color: 'black' }} onClick={butHandler4} id='but4'>Dashboard</button> */}
                                        {/*<button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler1} id='but1'>User Management</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler2} id='but2'>Infrastructure</button>
                                        <button style={{ width: '100%', height: '15%', border: 'none', marginTop: '5%', backgroundColor: 'transparent', color: 'white' }} onClick={butHandler3} id='but3'>User-Infra Binding</button>*/}
                                        <DepartmentDashboardScript />
                                </div>
                                <div style={{ width: '83%', height: '100%', padding: '1%', overflow: 'auto' }}>

                                        <Box sx={{ minWidth: 120 }}>
                                                <FormControl style={{ width: '12%' }}>
                                                        <InputLabel id="demo-simple-select-label">App Admin</InputLabel>
                                                        <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={appAdmin}
                                                                label="App Admin"
                                                                onChange={handleChange1}
                                                        >
                                                                {(response !== undefined) && appAdminArray.map((n, i) => <MenuItem value={n}>{n}</MenuItem>)}
                                                                <MenuItem value={decodeEmail}>{decodeEmail}</MenuItem>
                                                        </Select>
                                                </FormControl>
                                                <FormControl style={{ width: '14%', marginLeft: '2%' }}>
                                                        <InputLabel id="demo-simple-select-label">Connector Type</InputLabel>
                                                        <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={ctype}
                                                                label="Connector Type"
                                                                onChange={handleChange2}
                                                        >
                                                                <MenuItem value={'generic'}>Generic</MenuItem>
                                                                <MenuItem value={'aws'}>AWS</MenuItem>
                                                                <MenuItem value={'nic'}>NIC</MenuItem>
                                                                <MenuItem value={'localhost'}>localhost</MenuItem>
                                                        </Select>
                                                </FormControl>
                                                <FormControl style={{ width: '14.5%', marginLeft: '2%' }}>
                                                        <InputLabel id="demo-simple-select-label">Connector Name</InputLabel>
                                                        <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={cname}
                                                                label="Connector Name"
                                                                onChange={handleChange3}
                                                        >

                                                                { (nbfConnectorNamesms.adminConnectorFetchResponse!== undefined)&&nbfConnectorNamesms.adminConnectorFetchResponse.map((n, i) => <MenuItem value={n.connectorName}>{n.connectorName}</MenuItem>)}
                                                        </Select>
                                                </FormControl>
                                                <Button onClick={dataHandler} size="large" style={{ width: '8%', marginLeft: '4%' }} variant="contained">Submit</Button>
                                        </Box>
                                        <hr />
                                        <strong>Status :</strong>
                                        <UserInfraBindingStatus />
                                </div>
                        </div>

                        <div style={{ width: '100%', height: '10%', position: "fixed", bottom: 0 }}>
                                <Footer className="footer_text" />
                        </div>
                        <ToastContainer autoClose={2000} />
                </div>
        );
}
