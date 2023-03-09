import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import Switch from '@mui/material/Switch';
import trashh from '../images/trashh.png'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";



export default function UserManagementDept() {

        //MUI multidropdown
        const [personName, setPersonName] = React.useState([]);
        console.log(personName)
        const handleChange = (event) => {
                const {
                        target: { value },
                } = event;
                setPersonName(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value,
                );
        };
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
                PaperProps: {
                        style: {
                                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                width: 250,
                        },
                },
        };

        const names = [
                'AWS',
                'Generic',
                'NIC',
                'myConnector',

        ];
        let multiselectDropdown = <FormControl sx={{ m: 0.5, width: 150 }}>
                <InputLabel id="demo-multiple-checkbox-label">Connector</InputLabel>
                <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Connector" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                >
                        {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        <button style={{ padding: '6px', fontSize: '11px', border: 'none' }}>Check</button>
                                </MenuItem>
                        ))}
                </Select>
        </FormControl>

        //MUI multidropdown
        let columns = [
                {
                        dataField: "sNo",
                        text: "Serial No",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "dname",
                        text: "Department Name",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "name",
                        text: "Name",
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
                        dataField: "ctype",
                        text: "Connector Type",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "cname",
                        text: "Connector Name",
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

        let data = [{ 'sNo': 1, 'dname': 'e-security', 'name': 'Vaibhav', 'email': 'vai@cdac.in', 'ctype': multiselectDropdown, 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
        { 'sNo': 2, 'dname': 'e-security', 'name': 'Milo Sparks', 'email': 'dsowsy@yahoo.com', 'ctype': multiselectDropdown, 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
        { 'sNo': 3, 'dname': 'e-security', 'name': 'Vaibhav', 'email': 'vai@cdac.in', 'ctype': multiselectDropdown, 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> },
        { 'sNo': 4, 'dname': 'e-security', 'name': 'VaiJeffrey Copebhav', 'email': 'dsowsy@yahoo.com', 'ctype': multiselectDropdown, 'enableDisable': <Switch defaultChecked={false} />, 'action': <img style={{ color: 'red' }} src={trashh} width={20} /> }]

        const expandRow = {
                renderer:row => (
                        <div>
                                <p>{`This Expand row is belong to rowKey ${row.sNo}`}</p>
                                <p>You can render anything here, also you can add additional data on every row object</p>
                                <p><strong>Department Name : </strong>{row.dname}</p>
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
                <div>
                        <BootstrapTable keyField='sNo' data={data} columns={columns} expandRow={expandRow} rowEvents={rowEvents} />
                </div>
        )
}
