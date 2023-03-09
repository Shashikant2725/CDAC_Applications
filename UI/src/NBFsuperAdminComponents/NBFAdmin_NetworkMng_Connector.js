import * as React from 'react';
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
  const [ctype, setCtype] = React.useState('');

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
      text: "Connector Type",
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

  let data = [{ 'sNo': 1, 'description': 'e-security', 'ctype': 'AWS', 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
  { 'sNo': 2, 'description': 'e-security', 'ctype': 'NIC', 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
  { 'sNo': 3, 'description': 'e-security', 'ctype': 'localhost', 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
  { 'sNo': 4, 'description': 'e-security', 'ctype': 'AWS', 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> }]

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
        <Button style={{ marginLeft: '2%' }} data-bs-toggle="modal" data-bs-target="#exampleModal" variant="contained" size="large">Create Connector</Button>

      </Box>
      <div style={{ marginTop: '2%' }}>
        <BootstrapTable keyField='sNo' data={data} columns={columns} />

      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '5%' }}>
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: '11px', border: 'none' }}>
            <div className="modal-header" style={{ backgroundColor: '#137EA9', color: 'white' }}>
              <h5 className="modal-title" id="exampleModalLabel">Create Connector</h5>
              <button style={{ color: 'white' }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <FormControl fullWidth style={{marginBottom:'4%'}}>
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
