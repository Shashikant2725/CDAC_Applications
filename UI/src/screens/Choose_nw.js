import React from "react";
import { useState, useEffect,createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createApp } from "../actions/Fabric/FabricAction";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import { ListOfPlatforms, listOfVertions, conectorTypes,domainRolesTypes,dynamicRoleTypes} from "../actions/Fabric/FabricAction"

import jwt_decode from "jwt-decode";



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from "../components/Header";
import up from '../images/trending-up.png'
import app from '../images/apps.png'
import dL from '../images/device-laptop.png'
import tick from '../images/whiteTickLogo.png'
import '../css/tracker.css'


const Choose_nw = (props) => {
  //const [state, setState] = useState("");
  //const [name, setName] = useState("");
  //const [plat, setPlat] = useState("");
  //const [nodes, setNodes] = useState("");
  //const [consensus, setConsensus] = useState("");
  // const [noOfNodes, setMultinode] = useState(0);




  const [applicationName, setApplicationName] = useState('');
  const [environment, setEnvironment] = useState('');
  const [nodeType, setNodeType] = useState('');
  const [version,setVersion] = useState('')
  const [platform, setPlatform] = useState('');
  const [domains, setDomain] = useState('');
  const [connectorType, setConnectorType] = useState('');
  const [connectorName, setConnectorName] = useState('');
  const UserContext = createContext()

  console.log("platformdata", platform)
  console.log("domains",domains)

  const dispatch = useDispatch();
  var history = useNavigate();

  let connectorToken = useSelector((store) => store.login_api);
  let dynamicTokenResponse = connectorToken.response.token 
  console.log("dynamicTokenResponse",dynamicTokenResponse)
        
  let decode = jwt_decode(connectorToken.response.token) 
  console.log("decodeEmail",decode.email)
  let mail = decode.email

  let PlatformsData = useSelector((stores) => stores.userPlatformsList);
  console.log("ListOfPlatforms", PlatformsData)
  let { errors, responses, loadings } = PlatformsData
  console.log("responsesData", responses)


  let platformVertions = useSelector((storeVertion) => storeVertion.userPlatformsVertions)
  console.log("platformsVertionData", platformVertions)
  let { errores, responsese, loadinges } = platformVertions
  console.log("responseseVertions", responsese)
  if(responsese){
    console.log("responseesvertions",responsese[0].version)
  }



  let connectorTypeas = useSelector((storeConectorTypes) => storeConectorTypes.userconectorTypes)
  console.log("userconectorTypes", connectorTypeas)
  let { conectorTypesErrors, conectorTypesResponse, conectorTypesLoading } = connectorTypeas
  console.log("responsiveConectorTypes", conectorTypesResponse)


  let domainTypes = useSelector((storeDomainTypes) => storeDomainTypes.userdomainRolesTypes)
  console.log("userdomainRolesTypes",domainTypes)
   let {domainRolesErrors,domainRolesResponse,domainRolesLoading} = domainTypes
  
  // let {domainRolesErrors,domainRolesLoading} = domainTypes
  // let domainRolesResponse = ["Supplychain","Drug Tracing"]

  // console.log("domainRolesResponse",domainRolesResponse) 
  


  let roleTypes = useSelector((storeRoleTypes) => storeRoleTypes.userdynamicRolesTypes)
  console.log("RoleTypes",roleTypes)
   let {dynamicRolsError,dynamicRolesResponses,dynamicRolesLoading} = roleTypes
  console.log("dynamicRolesResponses",dynamicRolesResponses)

 // let appCreateApIRes = useSelector((app) => app)

  

  useEffect(() => {
    dispatch(ListOfPlatforms(dynamicTokenResponse))

  }, [])


  useEffect(() => {
    if (platform !== "") {
      dispatch(listOfVertions(platform,dynamicTokenResponse))
    }
  }, [platform])


  useEffect(() => {
    dispatch(conectorTypes(localStorage.getItem("email")),dynamicTokenResponse)
  }, [])

  useEffect(() => {
    dispatch(domainRolesTypes())

  },[])

  useEffect(() => {
    dispatch(dynamicRoleTypes(domains))
  },[domains])


  // useEffect((props) => {
  //   if (localStorage.getItem("Platform")) {
  //     setPlat(localStorage.getItem("Platform"));

  //     if (localStorage.getItem("Environment")) {
  //       setState(localStorage.getItem("Environment"));

  //       if (localStorage.getItem("Version")) {
  //         setVersion(localStorage.getItem("Version"));
  //       }
  //     }
  //   }
  //   if (localStorage.getItem("Setup")) {
  //     setNodes(localStorage.getItem("Setup"));
  //   }
  //   if (localStorage.getItem("Consensus")) {
  //     setConsensus(localStorage.getItem("Consensus"));
  //   }
  //   if (localStorage.getItem("No. of Nodes")) {
  //     setMultinode(localStorage.getItem("Consensus"));
  //   }
  // }, []);

  //Use the dispatch function referance which is used to perform an action





  const navigateNextSawtooth = () => {
    history("/eapp");
  };

  function RouteToEApp(data){
    console.log("///////",data)
    if(data !== undefined){
      history("/eapp")
    }
  }

  const navigateNextOrderer = () => {
    window.localStorage.setItem("AppName", applicationName);
    window.localStorage.setItem("Environment", environment);
    window.localStorage.setItem("NodeType", nodeType);
    window.localStorage.setItem("Platform", platform);
    window.localStorage.setItem("Version", version);
    window.localStorage.setItem("ConnectorType", connectorType);
    window.localStorage.setItem("ConnectorName", connectorName);
    window.localStorage.setItem("domainName",domains)

    console.log(platform)
    if (platform === 'Hyperledger Fabric') {
      window.localStorage.setItem("Platform", 'fabric');
    }
    if (platform === 'Hyperledger Sawtooth') {
      window.localStorage.setItem("Platform", 'sawtooth');
    }

    if (!new RegExp(/^[a-z0-9]{1,16}$/m, "i").test(applicationName)) {
      toast.error("Please Enter Valid App Name !!");
    } else {
      //dispatch(createApp(name, plat))
      // history("/eapp");
      console.log(platform)
      if (localStorage.getItem("Platform") === 'fabric') {
        //history('/genericConnectorScreen')
        let master = ''
        let worker = ''
        dispatch(createApp(dynamicTokenResponse, localStorage.getItem("AppName"), localStorage.getItem("Platform"), localStorage.getItem("Environment"), master, worker, localStorage.getItem("domainName"), mail,localStorage.getItem("ConnectorName"),RouteToEApp))
      }
      else {
        let master = ''
        let worker = ''
        console.log("sawtooth Flow")
         //console.log("token in choooooose_nw" ,decode )
        
        let decodedToken = connectorToken.response
        console.log("decodedToken",decodedToken)
        dispatch(createApp(dynamicTokenResponse,localStorage.getItem("AppName"), localStorage.getItem("Platform"), localStorage.getItem("Environment"), master, worker,domains,mail,RouteToEApp))
        history("/orderer")
      }

    }

  };

  // let { error, response, loading } = useSelector((store) => store.newApp);
  // console.log(applicationName, environment, nodeType, platform, version, connectorName, connectorType)
  // localStorage.setItem("ApplicationName", applicationName)
  // let { error, response, loading } = data;

  // console.log("new response is",response)

  // useEffect(() => {
  //   console.log("new app error", error)
  //   console.log("new app response", response)
  //   console.log("new app loading", loading)


  //   if (response !== undefined) {
  //     history("/eapp")
  //   }
  // }, [response])


  


  const PlatformHandler = (e) => {
    console.log(e)
    if (e === 'Hyperledger Fabric') {
      setPlatform('fabric')
    }
    if (e === 'Hyperledger Sawtooth') {
      setPlatform('sawtooth')
    }
  }

  return (
    
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
      <div className="" style={{ width: '100%', height: '14%' }}>
        <Header />
      </div>
      <div style={{ width: '100%', height: '90%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div id="TrackerPortion" style={{ marginTop: '2%' }}>
          <div id="mainTrackerData">
            <div id="circleAndData">
              <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
              <p style={{ fontSize: '12px' }}>Apps</p>
            </div>

            <div className="lineDiv"></div>
            <div id="circleAndData">
              <div className="circleDiv"><img src={tick} alt="" width={12} ></img></div>
              <p style={{ fontSize: '12px' }}>Create</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">3</div>
              <p style={{ fontSize: '12px' }}>Orgs</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">4</div>
              <p style={{ fontSize: '12px' }}>Consensus</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">5</div>
              <p style={{ fontSize: '12px' }}>Channel</p>
            </div>
            <div className="lineDiv stepsL"></div>
            <div id="circleAndData">
              <div className="circleDiv stepsC">6</div>
              <p style={{ fontSize: '12px' }}>StartNetwork</p>
            </div>
          </div>
        </div>
        <div className="container " style={{ backgroundColor: 'white', width: '73%', border: '1px solid #B0B5BB', height: '75%', paddingTop: '2.5%', marginTop: '4px' }}>



          <div style={{ display: 'flex',width:'100%' }}>
            <Box style={{ marginBottom: '12px', width: '100%' }}
              sx={{
                maxWidth: '100%',
              }}
            >
              <TextField onChange={(e) => setApplicationName(e.target.value)} value={applicationName} fullWidth label="Enter Application Name" id="fullWidth" />
            </Box>
            <FormControl fullWidth style={{ marginBottom: '12px', marginLeft: '10px' }}>
              <InputLabel id="demo-simple-select-label">Domain Types</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={domains}
                label="Domain Types"
                onChange={(e) => {setDomain(e.target.value)}}
              >
                {domainRolesResponse !== undefined && domainRolesResponse.map((domainRoles, index) => <MenuItem value={`${domainRoles.domainName}`}>{domainRoles.domainName}</MenuItem>)}
                {/* {domainRolesResponse !== undefined && domainRolesResponse.map((domainRoles, index) => <MenuItem value={`${domainRoles}`}>{domainRoles}</MenuItem>)} */}


              </Select>
            </FormControl>
          </div>

          <FormControl fullWidth style={{ marginBottom: '12px' }}>
            <InputLabel id="demo-simple-select-label">Environment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={environment}
              label="Environment"
              onChange={(e) => setEnvironment(e.target.value)}
            >
              <MenuItem value={'test'}>Testing / Development</MenuItem>
              <MenuItem value={'prod'}>Production </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ marginBottom: '12px' }}>
            <InputLabel id="demo-simple-select-label">Node Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={nodeType}
              label="Node Type"
              onChange={(e) => setNodeType(e.target.value)}
            >
              <MenuItem value={'single'}>Single Node</MenuItem>
              <MenuItem value={'multi'}>Multi Node</MenuItem>
            </Select>
          </FormControl>

          <div style={{ display: 'flex' }}>
            <FormControl fullWidth style={{ marginBottom: '12px' }}>


              <InputLabel id="demo-simple-select-label">Platform</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={platform}
                label="Platform"
                //onChange={(e) => PlatformHandler(e.target.value)}
                onChange={(e) => setPlatform(e.target.value)}
              >

                {responses !== undefined && responses.map((dataPlatform, index) =>
                  <MenuItem value={`${dataPlatform.platform}`}>{dataPlatform.platform}</MenuItem>

                )}


              </Select>
            </FormControl>

            <FormControl fullWidth style={{ marginBottom: '12px', marginLeft: '10px' }}>
              <InputLabel id="demo-simple-select-label">Version</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={version}
                label="Version"
                onChange={(e) => setVersion(e.target.value)}
              >
                {responsese !== undefined && responsese[0].version.map((dataVertions, index) => <MenuItem value={`${dataVertions}`}>{dataVertions}</MenuItem>)}

             
              </Select>
            </FormControl>
          </div>

          <div style={{ display: 'flex' }}>
            <FormControl fullWidth style={{ marginBottom: '12px' }}>
              <InputLabel id="demo-simple-select-label">Connector Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={connectorType}
                label="Connector Type"
                onChange={(e) => setConnectorType(e.target.value)}
              >
                {/* <MenuItem value={'generic'}>Generic</MenuItem>
                <MenuItem value={'aws'}>AWS</MenuItem>
                <MenuItem value={'nic'}>NIC</MenuItem>
                <MenuItem value={'localhost'}>localhost</MenuItem> */}
                 {conectorTypesResponse !== undefined && conectorTypesResponse!=="no data" && conectorTypesResponse.map((dataConnectorName,index) =>  <MenuItem value={dataConnectorName.connectorType[0]}>{dataConnectorName.connectorType[0]}</MenuItem>)}

              </Select>
            </FormControl>

            <FormControl fullWidth style={{ marginLeft: '10px' }}>
              <InputLabel id="demo-simple-select-label">Connector Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={connectorName}
                label="Connector Name"
                onChange={(e) => setConnectorName(e.target.value)}
              >
                {conectorTypesResponse !== undefined &&  conectorTypesResponse!=="no data" && conectorTypesResponse.map((dataConnectorName,index) =>  <MenuItem value={dataConnectorName.connectorName[0]}>{dataConnectorName.connectorName[0]}</MenuItem>)}
               
                {/* <MenuItem value={330}>AWS</MenuItem> */}
              </Select>
            </FormControl>
          </div>

          <div className="d-flex " style={{ width: '30%', height: '9%', marginTop: '1.2%', marginLeft: '70%' }}>
            <button type="button" style={{ height: '100%', width: '40%', border: '1px solid #137EA9', color: '#137EA9' }} className="btn btn-outline-primary" onClick={navigateNextSawtooth}>Back</button>
            <button type="button" className="btn btn-primary" style={{ height: '100%', width: '40%', marginLeft: '25px', backgroundColor: '#137EA9', border: 'none' }} onClick={navigateNextOrderer}>Next</button>
          </div>

        </div>
        <ToastContainer autoClose={2000} />
      </div>
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}>
        <Footer className="footer_text" />
      </div>
    </div>
    
  );
};

export default Choose_nw;