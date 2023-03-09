import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";


export default function Department() {
  let columns = [{
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
    dataField: "appAdminName",
    text: "App Admin Name",
    align: "center",
    headerAlign: "center",
  },
  {
    dataField: "email",
    text: "Email ID",
    align: "center",
    headerAlign: "center",
  },]

  let data = [{ 'sNo': 1, 'dname': 'E-security', 'appAdminName': 'Vaibhav', 'email': 'vai@cdac.in' },
  { 'sNo': 2, 'dname': 'Cyber Security', 'appAdminName': 'Milo Sparks', 'email': 'dsowsy@yahoo.com' },
  { 'sNo': 3, 'dname': 'E-Learning', 'appAdminName': 'VaiJeffrey Copebhav', 'email': 'dsowsy@yahoo.com' }]
  return (
    <div>
      <BootstrapTable keyField="id" data={data} columns={columns} />
    </div>
  )
}
