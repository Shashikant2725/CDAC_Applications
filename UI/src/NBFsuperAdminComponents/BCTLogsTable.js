import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import Switch from '@mui/material/Switch';
import trashh from '../images/trashh.png'




export default function BCTLogsTable() {
        
        //let data = 'jhj'
        let columns = [{
                dataField: "sNo",
                text: "Serial No",
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

        let data = [{'sNo':1, 'name':'Vaibhav','email':'vai@cdac.in', 'enableDisable':<Switch defaultChecked={false} />,'action':<img style={{color:'red'}} src={trashh} width={20}/>},
        {'sNo':2, 'name':'Milo Sparks','email':'dsowsy@yahoo.com', 'enableDisable':<Switch defaultChecked={false} />,'action':<img src={trashh} width={20}/>},
        {'sNo':3, 'name':'Vaibhav','email':'vai@cdac.in', 'enableDisable':<Switch defaultChecked={false} />,'action':<img src={trashh} width={20}/>},
        {'sNo':4, 'name':'VaiJeffrey Copebhav','email':'dsowsy@yahoo.com', 'enableDisable':<Switch defaultChecked={false} />,'action':<img src={trashh} width={20}/>}]

        return (
                <div>
                        <button type="button" style={{marginLeft:'84%',marginBottom:'3%'}} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">NBF Admin</button>
                        <BootstrapTable keyField="id" data={data} columns={columns} />
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '5%' }}>
                                <div class="modal-dialog">
                                        <div class="modal-content" style={{ borderRadius: '11px', border: 'none' }}>
                                                <div class="modal-header" style={{ backgroundColor: '#137EA9', color: 'white' }}>
                                                        <h5 class="modal-title" id="exampleModalLabel">NBF Admin Registration</h5>
                                                        <button style={{ color: 'white' }} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                        <form>
                                                                <div class="form-group">
                                                                        <label>Name</label>
                                                                        <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Name" />
                                                                </div>
                                                                <div class="form-group" style={{ marginTop: '3%' }}>
                                                                        <label for="exampleInputEmail1">Email address</label>
                                                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                                                </div>
                                                                <div class="form-group" style={{ marginTop: '3%' }}>
                                                                        <label for="exampleInputPassword1">Password</label>
                                                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                                </div>
                                                                <div class="form-group" style={{ marginTop: '3%' }}>
                                                                        <label for="exampleInputPassword1">Confirm Password</label>
                                                                        <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Confirm Password" />
                                                                </div>

                                                                <button type="submit" class="btn btn-primary" style={{ marginLeft: '82.5%', marginTop: '3%' }}>Submit</button>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}
