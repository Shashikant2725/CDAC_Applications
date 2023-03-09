import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { departmentAllAppAdmins, deptInfraList } from '../actions/Fabric/FabricAction';
import jwtDecode from 'jwt-decode';
import '../css/nbfScript.css'
import userM from '../images/userM.png'
import infra from '../images/infra.png'
import userInfra from '../images/userInfra.png'



export default function DepartmentDashboardScript() {
        var history = useNavigate();
        const dispatch = useDispatch();
        let Tokendata = useSelector((store) => store.login_api);
        let { error, response, loading } = Tokendata;
        let dynamicToken=Tokendata.response.token
        //console.log(response)

        function butHandler1() {
                //document.getElementById('but1').style.backgroundColor = 'white'
                //document.getElementById('but1').style.color = 'black'

                //document.getElementById('but2').style.backgroundColor = 'transparent'
                //document.getElementById('but2').style.color = 'white'

                //document.getElementById('but3').style.backgroundColor = 'transparent'
                //document.getElementById('but3').style.color = 'white'
                history('/deptusermanagement')

                // document.getElementById('but4').style.backgroundColor = 'transparent'
                // document.getElementById('but4').style.color = 'white'

        }
        function butHandler2() {
                //document.getElementById('but2').style.backgroundColor = 'white'
                //document.getElementById('but2').style.color = 'black'
                //document.getElementById('but1').style.backgroundColor = 'transparent'
                //document.getElementById('but1').style.color = 'white'
                //document.getElementById('but3').style.backgroundColor = 'transparent'
                //document.getElementById('but3').style.color = 'white'

                // document.getElementById('but4').style.backgroundColor = 'transparent'
                // document.getElementById('but4').style.color = 'white'
                let jwtTokenData = jwtDecode(response.token)
                //console.log(jwtTokenData.deptname)
                dispatch(deptInfraList(jwtTokenData.deptname,dynamicToken))
                history('/deptinfra')

        }
        function butHandler3() {
                history('/userinfrabinding')
                //document.getElementById('but3').style.backgroundColor = 'white'
                //document.getElementById('but3').style.color = 'black'
                //document.getElementById('but1').style.backgroundColor = 'transparent'
                //document.getElementById('but1').style.color = 'white'
                //document.getElementById('but2').style.backgroundColor = 'transparent'
                //document.getElementById('but2').style.color = 'white'
                // document.getElementById('but4').style.backgroundColor = 'transparent'
                // document.getElementById('but4').style.color = 'white'
                let jwtTokenData = jwtDecode(response.token)
                //console.log(jwtTokenData.deptname)
                dispatch(departmentAllAppAdmins(jwtTokenData.deptname,dynamicToken))
        }
        // function butHandler4() {
        //         // document.getElementById('but4').style.backgroundColor = 'white'
        //         // document.getElementById('but4').style.color = 'black'
        //         document.getElementById('but3').style.backgroundColor = 'transparent'
        //         document.getElementById('but3').style.color = 'white'
        //         document.getElementById('but1').style.backgroundColor = 'transparent'
        //         document.getElementById('but1').style.color = 'white'
        //         document.getElementById('but2').style.backgroundColor = 'transparent'
        //         document.getElementById('but2').style.color = 'white'

        //         //dispatch(departmentAllAppAdmins())

        // }
        return (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column',paddingTop:'3%'}}>
                        <button className='nbfscriptCss' onClick={butHandler1} id='but1'> <img style={{marginLeft:'3%',marginRight:'2%'}} src={userM} width={19}></img>       User Management</button>
                        <button className='nbfscriptCss' onClick={butHandler2} id='but2'> <img style={{marginLeft:'3%',marginRight:'4%'}} src={infra} width={16}></img>       Infrastructure</button>
                        <button className='nbfscriptCss'  onClick={butHandler3} id='but3'> <img style={{marginLeft:'3%',marginRight:'4%'}} src={userInfra} width={17}></img>  User-Infra Binding</button>
                </div>
        )
}