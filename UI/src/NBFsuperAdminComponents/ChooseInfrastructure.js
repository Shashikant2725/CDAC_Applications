import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import trashh from '../images/trashh.png'



export default function ChooseInfrastructure() {
        
        //let data = 'jhj'
        let columns = [{
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
                dataField: "action",
                text: "Action",
                align: "center",
                headerAlign: "center",
        },]

        let data = [{'dname':'e-security', 'name':'Vaibhav','email':'vai@cdac.in', 'ctype':'AWS','action':<img style={{color:'red'}} src={trashh} width={20}/>},
        {'dname':'e-security', 'name':'Milo Sparks','email':'dsowsy@yahoo.com', 'ctype':'Generic','action':<img style={{color:'red'}} src={trashh} width={20}/>},
        {'dname':'e-security', 'name':'Vaibhav','email':'vai@cdac.in', 'ctype':'NIC','action':<img style={{color:'red'}} src={trashh} width={20}/>},
        ]
        return (
                <div>
                        <BootstrapTable keyField="id" data={data} columns={columns} />
                </div>
                
        )
}
