import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import Switch from '@mui/material/Switch';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState,useEffect } from "react";
import trashh from '../images/trashh.png';
import editt from '../images/edittt.png';
import { useSelector, useDispatch } from "react-redux";
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
        Col,
        Row,
        Table,
      } from "@themesberg/react-bootstrap";




export default function UserInfraBindingStatus() {
        const mydata = useSelector((store) => store.departmentAllAdmins);
        //const { error, response, loading } = mydata;
        //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA",mydata)

        let connectorTypeArray = []
       

        let deptArray = []

        let requestTimeArray = []

        let approvedTimeArray = []
        let ipAdresses = []
        


        if (mydata.response) {
                //newTableData.response[1].len = 5
                for (let i = 0; i < mydata.response.length; i++) {
                        mydata.response[i].len = i + 1
                        connectorTypeArray.push(mydata.response[i].connectorType)
                        deptArray.push(mydata.response[i].departmentName)
                        requestTimeArray.push(mydata.response[i].requestTime)
                        approvedTimeArray.push(mydata.response[i].approvedTime)
                        ipAdresses.push(mydata.response[i].ip)
                                
                }
        }

        // console.log("approvedTimeArray",approvedTimeArray)
        console.log("connectorTypeArray",connectorTypeArray)

        const [da, setDa] = useState(mydata.response)

        useEffect(() => {
                if (mydata.response) {
                        setDa(mydata.response)
                }
        }, [mydata.response])


        //console.log(connectorTypeArray)
        //console.log(mydata)

        //<img src={editt} width={18} />
        let editDelete = <div>
                <img src={trashh} width={18} />
        </div>
        let columns = [
                {
                        dataField: "len",
                        text: "Serial No",
                        align: "center",
                        headerAlign: "center",
                },
                {
                        dataField: "appAdmin",
                        text: "App Admin",
                        align: "center",
                        headerAlign: "center",
                },


                {
                        dataField: "connectorName",
                        text: "Connector Name",
                        align: "center",
                        headerAlign: "center",
                },


                {
                        dataField: "action",
                        text: "Action",
                        align: "center",
                        headerAlign: "center",
                        formatter: actionformat
                },]

        
        function actionformat() {
                return editDelete
        }

        // const expandRow = {
        //         renderer: row => (
        //                 <div>
        //                         <p><strong>Department Name : </strong>{deptArray[row.len - 1]}</p>
        //                         <p><strong>Connector Type : </strong>{connectorTypeArray[row.len - 1]}</p>
        //                         <p><strong>Request Time : </strong>{requestTimeArray[row.len - 1]}</p>
        //                         <p><strong>Approve Date : </strong>{approvedTimeArray[row.len-1]}</p>

        //                 </div>
        //         )
        // };

        const expandRow = {
                renderer: (row) => (
                  // return(
                  <div>
                    <Table hover size="sm">
                      <tbody className="text-center">
                       
                        <tr style={{backgroundColor:"#F2F2F2"}}>
                          <td className='col-2'>Department Name :</td>
                          <td className='col-10'>{deptArray[row.len - 1]}</td>

                      
                        </tr>
                        <tr style={{backgroundColor:"#F2F2F2"}}>
                        <td className='col-2'>Connector Type :</td>
                          <td className='col-10'>{connectorTypeArray[row.len - 1]}</td>
                       </tr>

                       <tr style={{backgroundColor:"#F2F2F2"}}>
                        <td className='col-2'>IP Address: </td>
                          <td className='col-10'>{ipAdresses[row.len - 1]}</td>
                       </tr>


                       <tr style={{backgroundColor:"#F2F2F2"}}>
                          <td className='col-2'> Requested time :</td>
                          <td className='col-10'>{requestTimeArray[row.len - 1]}</td>
                       </tr>
                       <tr style={{backgroundColor:"#F2F2F2"}}>
                          <td  className='col-2'>Approved time :</td>
                          <td className='col-10'>{approvedTimeArray[row.len-1]}</td>
                       </tr>
                        
                      
                       
                      
                      </tbody>
                    </Table>
                  </div>
                  //  )
                ),
                onlyOneExpanding: true,
                // expanded :rowExpand,
                // onExpand:handleOnExpand
              };




        const rowEvents = {
                onClick: (e, row, rowIndex) => {
                        console.log(rowIndex)
                }
        };

        return (
                <div>
                        
                        {da !== undefined && <BootstrapTable keyField='len' data={da} columns={columns} expandRow={expandRow} rowEvents={rowEvents} pagination={paginationFactory()} />}

                </div>
        )
}
