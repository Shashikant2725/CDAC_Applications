import * as React from "react";
import PropTypes from "prop-types";
//import SwipeableViews from 'react-swipeable-views';
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { useState } from "react";

import Header from "../NBFsuperAdminComponents/NBFHeader";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import HomeDashboard from "../NBFsuperAdminComponents/HomeDashboard";
import NBFAdminScript from "../NBFsuperAdminComponents/NBFAdminScript";
import { Card } from "@themesberg/react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import trashh from "../images/trashh.png";

import "../css/imageDisplay.css";
import Switch from "@mui/material/Switch";
import { FaClosedCaptioning } from "react-icons/fa";
import { ListOfInfra, nbfInfraApprove } from "../actions/Fabric/FabricAction";

const label = { inputProps: { "aria-label": "Switch demo" } };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[600],
  },
};

export default function NBFAdminInfraMng() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [NBAAdminTable, setNBATable] = useState(false);
  const [infraData, setInfraData] = useState([]);
  const infraListData = useSelector((data) => data.infraList);
  React.useEffect(() => {
    getInfraList();
  }, []);

  function getInfraList(){
    dispatch(ListOfInfra());
  }
  const [appr, setrAppr] = useState(false);
  console.log("infralist data.............", infraListData);
  React.useEffect(() => {
    if (infraListData.responses) {
      setInfraData(infraListData.responses);
    }
  }, [infraListData.responses]);
  console.log("infraData", infraData);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  
  const onClickStatus = (row) => {
    console.log("row,status...............", row);
    let tempInfraData = infraData;
    /*const changedInfraData = tempInfraData.map((obj, index) =>
      index === rowIndex
        ? obj.status === "pending"
          ? { ...obj, status: "approved",activate:true }
          : { ...obj, status: "pending",activate:false }
        : obj
    );*/
    const changedInfraData = tempInfraData.map((obj, index) =>
      obj.connectorName === row.connectorName
        ? obj.status === "pending"
          ? { ...obj, status: "approved" }
          : { ...obj, status: "pending" }
        : obj
    );
    //const changedInfraData = tempInfraData[rowIndex]
    console.log(row.connectorName);
    console.log(
      row.connectorName,
      row.status==="pending"?"approved":"pending"
    );
   dispatch(
      nbfInfraApprove(
        row.connectorName,
      row.status==="pending"?"approved":"pending",
        getInfraList
      ))
    // setInfraData(changedInfraData);
  };

  let columns = [
    {
      dataField: "reqadmin",
      text: "Requested Email",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "departmentName",
      text: "Department Name",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "appAdmin",
      text: "Email",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "node",
      text: "Node",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "ip",
      text: "IP",
      align: "center",
      headerAlign: "center",
    },
    //     {
    //       dataField: "connectorType",
    //       text: "Connector Type",
    //       align: "center",
    //       headerAlign: "center",
    //     },
    {
      dataField: "connectorName",
      text: "Connector Name",
      align: "center",
      headerAlign: "center",
    },
    {
      dataField: "inset",
      text: "Enable / Disable",
      align: "center",
      headerAlign: "center",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <Switch
            checked={row.status === "approved" ? true : false}
            //inputProps={{ "aria-label": "controlled" }}
            onChange={() => onClickStatus(row)}
          />
        );
      },
    },
    //     {
    //       dataField: "action",
    //       text: "Action",
    //       align: "center",
    //       headerAlign: "center",
    //     },
  ];


  const expandRow = {
    renderer: (row) => (
      <div>
        <p>
          <strong>Status: </strong> {row.status}
        </p>
        <p>
          <strong>Connector Type: </strong>
          {row.connectorType.join(",")}
        </p>
      </div>
    ),
    onlyOneExpanding: true,
  };

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(rowIndex);
      /*let val = !(infraData[rowIndex].inset)
      infraData[rowIndex].inset = val*/
      let val = infraData[rowIndex].status;
      if (val === "approved") {
        setrAppr(true);
      } else {
        setrAppr(false);
      }
    },
  };

  return (
    <div
      style={{
        height: "50%",
        width: "100%",
        backgroundColor: "white",
        
      }}
    >
      
      {infraData !== undefined  && (
        <BootstrapTable
          keyField="_id"
          data={infraData}
          columns={columns}
          rowEvents={rowEvents}
          expandRow={expandRow}
          pagination={paginationFactory()}
        />
      )}
    </div>
  );
}
