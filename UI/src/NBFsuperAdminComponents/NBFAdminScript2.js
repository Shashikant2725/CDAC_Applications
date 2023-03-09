import React from 'react'
import { useNavigate ,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { departmentAllAppAdmins, deptInfraList, nbfAdminDeptRegMng } from '../actions/Fabric/FabricAction';
import jwtDecode from 'jwt-decode';
import '../css/nbfScript.css'
import userM from '../images/userM.png'
import networkMng from '../images/networkMng.png'
import infra from '../images/infra.png'
import home from '../images/home1.png'
import smartC from '../images/smartC.png'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HistoryIcon from '@mui/icons-material/History';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TocIcon from '@mui/icons-material/Toc';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function DepartmentDashboardScript() {
        var history = useNavigate();
        const dispatch = useDispatch();
        const location = useLocation();
        console.log('pathname', location.pathname);
        React.useEffect(() => {
                // if(location.pathname==="/nbfAdminHome"){
                //         document.getElementById("but1").classList.add("nbfscriptCssActive")
                // }
                if(location.pathname==="/nbfAdminDeptReg"){
                        document.getElementById("but2").classList.add("nbfscriptCssActive")
                }
                if(location.pathname==="/nbfAdminInfraMng"){
                        document.getElementById("but3").classList.add("nbfscriptCssActive")
                }
                if(location.pathname==="/nbfAdminNetworkMng"){
                        document.getElementById("but4").classList.add("nbfscriptCssActive")
                }
                /////////////////--------------Add Domains for Smart Contract--------------/////////////// 
                if(location.pathname==="/addDomains"){
                        document.getElementById("but5").classList.add("nbfscriptCssActive")
                }
                ////////////////--------------Add Stakeholders based on Domain---------------//////////////
                if(location.pathname==="/addStakeholders"){
                        document.getElementById("but6").classList.add("nbfscriptCssActive")
                }
                ///////////////---------------Add Functions Based on Stakeholders-------------//////////////
                if(location.pathname==="/addFunctions"){
                        document.getElementById("but7").classList.add("nbfscriptCssActive")
                }
                if(location.pathname==="/assetCreation"){
                        document.getElementById("but8").classList.add("nbfscriptCssActive")
                }
               
        }, [location.pathname])
        
        //let Tokendata = useSelector((store) => store.login_api);
        //let { error, response, loading } = Tokendata;
        //console.log(response)

        function butHandler1() {
                //document.getElementById('but1').style.backgroundColor = 'white'
                //document.getElementById('but1').style.color = 'black'

                //document.getElementById('but2').style.backgroundColor = 'transparent'
                //document.getElementById('but2').style.color = 'white'

                //document.getElementById('but3').style.backgroundColor = 'transparent'
                //document.getElementById('but3').style.color = 'white'
                history('/nbfAdminHome')
               
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
                //let jwtTokenData = jwtDecode(response)
                //console.log(jwtTokenData.deptname)
              

                //dispatch(nbfAdminDeptRegMng())
                history('/nbfAdminDeptReg')

        }
        function butHandler3() {
                history('/nbfAdminInfraMng')
                //document.getElementById('but3').style.backgroundColor = 'white'
                //document.getElementById('but3').style.color = 'black'
                //document.getElementById('but1').style.backgroundColor = 'transparent'
                //document.getElementById('but1').style.color = 'white'
                //document.getElementById('but2').style.backgroundColor = 'transparent'
                //document.getElementById('but2').style.color = 'white'
                // document.getElementById('but4').style.backgroundColor = 'transparent'
                // document.getElementById('but4').style.color = 'white'
                //let jwtTokenData = jwtDecode(response)
                //console.log(jwtTokenData.deptname)
                //dispatch(departmentAllAppAdmins(jwtTokenData.deptname))
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

        function butHandler4() {
                history('/nbfAdminNetworkMng')
                //document.getElementById('but3').style.backgroundColor = 'white'
                //document.getElementById('but3').style.color = 'black'
                //document.getElementById('but1').style.backgroundColor = 'transparent'
                //document.getElementById('but1').style.color = 'white'
                //document.getElementById('but2').style.backgroundColor = 'transparent'
                //document.getElementById('but2').style.color = 'white'
                // document.getElementById('but4').style.backgroundColor = 'transparent'
                // document.getElementById('but4').style.color = 'white'
                //let jwtTokenData = jwtDecode(response)
                //console.log(jwtTokenData.deptname)
                //dispatch(departmentAllAppAdmins(jwtTokenData.deptname))
        }
        function butHandler5(){
                history("/addDomains")
                
        }
        function butHandler6(){
                history("/addStakeholders")
                
        }
        function butHandler7(){
                history("/assetCreateByAdmin")
                
        }

        function butHandler8(){
                history("/dynamicform")
                
        }
        
        function butHandler9(){
                history("/transferowner")
                
        }
        function butHandler10(){
                history("/assethistory")
                
        }
        function butHandler11(){
                history("/ownerhistory")
                
        }
        function butHandler12(){
                history("/assetdetails")
                
        }
        //nbfscriptCssActive
        return (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: '3%' }}>
                        {/* <div id="but1" className='nbfscriptCss' onClick={butHandler1}> <img style={{ marginLeft: '3%', marginRight: '2%' }} src={home} width={15} color="black"></img> Home Page</div> */}
                        {/* <div id="but2" className='nbfscriptCss' onClick={butHandler2} > <img style={{ marginLeft: '3%', marginRight: '2%' }} src={userM} width={17}></img> Dept Reg Mng</div>
                        <div id="but3" className='nbfscriptCss' onClick={butHandler3} > <img style={{ marginLeft: '3%', marginRight: '2%' }} src={infra} width={15}></img> Infra Management</div>
                        <div id="but4" className='nbfscriptCss' onClick={butHandler4} > <img style={{ marginLeft: '3%', marginRight: '2%' }} src={networkMng} width={18}></img> Network Management</div>
                        <div id="but5" className='nbfscriptCss' onClick={butHandler5} > <AppRegistrationIcon /> Register Domain</div>
                        <div id="but6" className='nbfscriptCss' onClick={butHandler6} > <PersonAddAlt1Icon /> Add Stakeholders</div>
                        <div id="but7" className='nbfscriptCss' onClick={butHandler7} ><PlaylistAddIcon />Add Functions</div> */}
                        <div id="but7" className='nbfscriptCss' onClick={butHandler7} ><BorderColorIcon  style={{ marginLeft: '3%', marginRight: '2%' }}/>Create Asset Defination</div>

                        <div id="but8" className='nbfscriptCss' onClick={butHandler8} ><AddBoxIcon  style={{ marginLeft: '3%', marginRight: '2%' }}/>Create Asset</div>
                        <div id="but12" className='nbfscriptCss' onClick={butHandler12} ><TocIcon  style={{ marginLeft: '3%', marginRight: '2%' }}/>Asset Details</div>

                        <div id="but9" className='nbfscriptCss' onClick={butHandler9} ><TransferWithinAStationIcon  style={{ marginLeft: '3%', marginRight: '2%' }}/>Transfer Ownership</div>
                        <div id="but10" className='nbfscriptCss' onClick={butHandler10} ><ManageSearchIcon  style={{ marginLeft: '3%', marginRight: '2%' }}/>Asset History</div>

                        <div id="but11" className='nbfscriptCss' onClick={butHandler11} ><HistoryIcon  style={{ marginLeft: '3%', marginRight: '2%' }}/>Ownership History</div>


                        
                </div>
        )
}
