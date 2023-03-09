import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, TextField, MenuItem } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector, useDispatch } from "react-redux";

import { ListofIps,nbfAddInfra,nbfAdminLocations,nbfAdminConnectorNames} from "../actions/Fabric/FabricAction";
import paginationFactory from "react-bootstrap-table2-paginator";

function NBFAdminAddInfra() {
  const dispatch = useDispatch();
  const [HDD, setHDD] = useState("");
  const [RAM, setRAM] = useState("");
  const [cores, setCores] = useState("");
  const [location, setLocation] = useState("");
  const [connectorType,setConnectorType] = useState("")
  const [IP, setIP] = useState("");
  const[MAC,setMAC]=useState("")
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [ipsData, setIpsData] = useState();
  const getIps = useSelector((x) => x.nbfgetIPS);
  console.log(getIps.response);
  useEffect(() => {
    getListOfIps()
  }, []);
  function getListOfIps(){
    dispatch(ListofIps());
  }
  useEffect(()=>{
    if(getIps.response){
        setIpsData(getIps.response)
    }
  },[getIps.response])
//   if (getIps.response !== undefined) {
//     getIps.response.forEach((element) => {
//       const body = {
//         uuid: element.uuid,
//         HDD: element.details.storage,
//         RAM: element.details.ram,
//         cores: element.details.cores,
//         location: element.details.location,
//         IP: element.ip,
//         user: element.loginDetails.userName,
//         password: element.loginDetails.userPassword,
//       };
//       console.log("body", body);
//       //ipsData.push(body)
//       //setIpsData([...ipsData,body])
//     });
//   }

  const nbfLocations  =  useSelector((nbfLoc) => nbfLoc.adminLocation) 
  let { nbfAdminLocationserrors, nbfAdminLocationsresponses, nbfAdminLocationsloadings } = nbfLocations;

  // console.log("nbfLocations",nbfAdminLocationsresponses)

  const nbfAdminConnectors = useSelector((nbfLoc) =>nbfLoc.adminConnector)
  let {nbfAdminConnectorNameserrors,nbfAdminConnectorNamesresponses,nbfAdminConnectorNamesloadings} = nbfAdminConnectors
  console.log("nbfAdminConnectorNamesresponses",nbfAdminConnectorNamesresponses)

  useEffect(() => {
    dispatch(nbfAdminLocations())
    dispatch(nbfAdminConnectorNames())

  },[])


  
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const data = [];
  let columns = [
    {
      dataField: "uuid",
      text: "UUID",
      align: "center",
      headerAlign: "center",
    },

    {
      dataField: "HDD",
      text: "HDD",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "RAM",
      text: "RAM",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "cores",
      text: "Cores",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "location",
      text: "Location",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "IP",
      text: "IP",
      align: "center",
      headerAlign: "center",
    },
    // {
    //   dataField: "user",
    //   text: "UserName",
    //   align: "center",
    //   headerAlign: "center",
    // },
    // {
    //   dataField: "password",
    //   text: "Password",
    //   align: "center",
    //   headerAlign: "center",
    // },
  ];
  function submitInfraHandler(event) {
    event.preventDefault();
    handleClose();
    console.log("working");
    dispatch(nbfAddInfra(HDD,RAM,cores,location,connectorType,IP,MAC,userName,password,getListOfIps))
  }
  console.log(ipsData)
  return (
    <div>
      <Box
        sx={{ minWidth: 120 }}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ width: "2px", height: "2px" }}></div>
        <Button
          style={{ marginLeft: "2%" }}
          onClick={() => setModalShow(true)}
          variant="contained"
          size="large"
        >
          Add Infra
        </Button>
      </Box>
      <div style={{ marginTop: "2%" }}>
        {ipsData!==undefined &&  <BootstrapTable keyField="uuid" data={ipsData} columns={columns} pagination={paginationFactory()}/>}
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        show={modalShow}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Infra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitInfraHandler}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2%",
              }}
            >
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                type="number"
                size="small"
                label="HDD"
                variant="outlined"
                required
                onChange={(e) => setHDD(e.target.value)}
              />
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                type="number"
                size="small"
                label="RAM"
                variant="outlined"
                required
                onChange={(e) => setRAM(e.target.value)}
              />
            </Box>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              type="number"
              size="small"
              label="Cores"
              variant="outlined"
              style={{ margin: "2% 0", marginBottom: "3%" }}
              fullWidth
              required
              onChange={(e) => setCores(e.target.value)}
            />
            <TextField
              fullWidth
              id="outlined"
              select
              size="small"
              defaultValue=""
              helperText=""
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: "2%" }}
              required
            >
              {nbfAdminLocationsresponses!== undefined && nbfAdminLocationsresponses.map((locnbF,index) => <MenuItem value={locnbF.locationName}>{locnbF.locationName}</MenuItem> )}
              {/* <MenuItem value={"hyderabad"}>Hyderabad</MenuItem> */}
            </TextField>
            <TextField
              fullWidth
              id="outlined"
              select
              size="small"
              defaultValue=""
              helperText=""
              label="Connector Type"
              onChange={(e) => setConnectorType(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: "2%" }}
              required
            >
             {nbfAdminConnectorNamesresponses!== undefined && nbfAdminConnectorNamesresponses.map((locnbF,index) => <MenuItem value={locnbF.connectorName}>{locnbF.connectorName}</MenuItem> )}
            </TextField>

            <TextField
              size="small"
              label="IP"
              variant="outlined"
              style={{ margin: "2% 0", marginBottom: "2%" }}
              fullWidth
              required
              onChange={(e) => setIP(e.target.value)}
            />
            <TextField
              size="small"
              label="MAC"
              variant="outlined"
              style={{ margin: "2% 0", marginBottom: "2%" }}
              fullWidth
              required
              onChange={(e) => setMAC(e.target.value)}
            />
            <TextField
              size="small"
              label="Username"
              variant="outlined"
              style={{ margin: "2% 0", marginBottom: "2%" }}
              fullWidth
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              type="password"
              size="small"
              label="Password"
              variant="outlined"
              style={{ margin: "2% 0", marginBottom: "2%" }}
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              style={{ marginLeft: "82.5%", marginTop: "4%" }}
              required
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NBFAdminAddInfra;
