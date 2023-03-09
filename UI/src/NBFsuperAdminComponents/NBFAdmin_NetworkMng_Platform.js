import * as React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { ListOfPlatforms } from '../actions/Fabric/FabricAction';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BootstrapTable from "react-bootstrap-table-next";
import Switch from '@mui/material/Switch';
import trashh from '../images/trashh.png'

export default function NBFAdmin_NetworkMng_Connector() {
        const dispatch = useDispatch();
        const [ctype, setCtype] = React.useState('');
        // let data = useSelector((store) => store.login_api);
        // let { error, response, loading } = data;
        React.useEffect(() => {
                dispatch(ListOfPlatforms())    
        }, [])
        let PlatformsData = useSelector((stores) => stores.userPlatformsList);
        console.log("ListOfPlatforms", PlatformsData.responses)
        //if(PlatformsData.responses!==undefined) console.log(PlatformsData.responses[0])
        const handleChange = (event) => {
                setCtype(event.target.value);
        };


        let columns = [
                {
                        dataField: "sNo",
                        text: "Serial No",
                        align: "center",
                        headerAlign: "center",
                },

                {
                        dataField: "ctype",
                        text: "Platform Name",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "description",
                        text: "Description",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "enableDisable",
                        text: "Enable / Disable",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "action",
                        text: "Action",
                        align: "center",
                        headerAlign: "center",
                },]

        let data = [{ 'sNo': 1, 'description': 'e-security', 'ctype': (PlatformsData.responses!==undefined &&`${PlatformsData.responses[0].platform}`), 'enableDisable': <Switch defaultChecked={true} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
        { 'sNo': 2, 'description': 'e-security', 'ctype': (PlatformsData.responses!==undefined &&`${PlatformsData.responses[1].platform}`), 'enableDisable': <Switch defaultChecked={true} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> }]

        return (
                <div>
                        <Box sx={{ minWidth: 120 }} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ width: '2px', height: '2px' }}></div>
                                {/*<FormControl style={{ width: '15%' }}>
          <InputLabel id="demo-simple-select-label">Connector Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ctype}
            label="Connector Type"
            onChange={handleChange}
          >
            <MenuItem value={'AWS'}>AWS</MenuItem>
            <MenuItem value={'NIC'}>NIC</MenuItem>
            <MenuItem value={'Generic'}>Generic</MenuItem>
            <MenuItem value={'localhost'}>localhost</MenuItem>
          </Select>
        </FormControl>
  <TextField style={{ marginLeft: '2%' }} id="outlined-basic" label="Description" variant="outlined" />*/}
                                <Button style={{ marginLeft: '2%' }} data-bs-toggle="modal" data-bs-target="#exampleModal" variant="contained" size="large">Create Platform</Button>

                        </Box>
                        <div style={{ marginTop: '2%' }}>
                                <BootstrapTable keyField='sNo' data={data} columns={columns} />

                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '5%' }}>
                                <div className="modal-dialog">
                                        <div className="modal-content" style={{ borderRadius: '11px', border: 'none' }}>
                                                <div className="modal-header" style={{ backgroundColor: '#137EA9', color: 'white' }}>
                                                        <h5 className="modal-title" id="exampleModalLabel">Create Platform</h5>
                                                        <button style={{ color: 'white' }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                        <form>
                                                                <TextField id="outlined-basic" label="Platform Name" variant="outlined" style={{marginBottom:'4%'}} fullWidth/>

                                                                <TextField
                                                                        fullWidth
                                                                        id="outlined-multiline-static"
                                                                        label="Description"
                                                                        multiline
                                                                        rows={4}
                                                                />

                                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{ marginLeft: '82.5%', marginTop: '4%' }}>Submit</button>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
