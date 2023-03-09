import React, {Component } from 'react'
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { Toast } from 'primereact/toast';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { CssBaseline, Container, Paper } from "@material-ui/core";
import { Modal, Button2} from "react-bootstrap";
import Select1 from 'react-select'
import Form from 'react-bootstrap/Form';
import Alert from '@mui/material/Alert';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


// Tooltip Info Starts
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

// Tooltip Info Ends

import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@mui/material/Button';
import Button1 from 'react-bootstrap/Button';
import { makeStyles, Theme, createStyles }
	from '@material-ui/core/styles';
import { DisabledByDefaultTwoTone } from '@mui/icons-material';
import { render } from "react-dom";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


var count=[0];
var data=[{lable:"Go",value:"Go"},{lable:"Node",value:"Node"}]
var readWriteData=[{value:"Read",label:"Read"},{value:"Write",label:"Write"},{value:"ReadWrite",label:"ReadWrite"}]
var FormValuePDCA='';
var NameDomain='';
var temp={};
var stake=[];
var functions=[];
var assetItem=[];
var Languages=''
var AssetAdminCheckbox='';
var AssetOwnerCheckbox='';
var AllFunctions=[];
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


// Html Tooltip Starts

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

// Html tooltip Ends

export class CascadingDropdown extends Component {


   handleChangeMultiple = (event) => {
    console.log("event.target.value::",event.target.value)
  functions=event.target.value;
  console.log("functions::",functions);
  count=functions.length;
  console.log("Count::",count);
    const {
      target: { value },
    } = event;
    this.setState({personName7:typeof value === 'string' ? value.split(',') : value,})
    // setPersonName7(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    console.log("Personame7::",this.state.personName7);
    this.disabledButton()

  };
   useStyles = makeStyles((theme: Theme) =>
   
createStyles({
	root: {
	width: '100%',
	},
	button: {
	marginTop: theme.spacing(1),
	marginRight: theme.spacing(1),
	},
	actionsContainer: {
	marginBottom: theme.spacing(2),
	},
	resetContainer: {
	padding: theme.spacing(3),
	},
}),
);
constructor(props) {
super(props)
this.toast = React.createRef();

this.state = {
StateId: '',
CountryId: '',
CountryData: [],
StateData: [],
CityData: [],
functionname : '',
personName:[],
open:false,
openPDCA:false,
formValues: [{ collectionName: "", organizationName : "",readWrite:"" }],
showHideFName: true,
showHideLName: false,
showModalPDCA:false,
isDisabled:true,
showButton:false,
personName7:[],
showSelectStakeholder:false,
showAssetButton:true,
showHoverDiv:true,
showInfo:true
}
this.handleSubmit = this.handleSubmit.bind(this)
this.hideComponent = this.hideComponent.bind(this);
this.disabledButton=()=>this.setState({isDisabled:false});
}

hideComponent(name) {
  switch (name) {
    case "showHideFName":
      this.setState({ showHideFName: !this.state.showHideFName });
      break;
    case "showHideLName":
      this.setState({ showHideLName: !this.state.showHideLName });
      break;
    case "showModalPDCA":
      this.setState({ showModalPDCA: !this.state.showModalPDCA });
      break;
    default:
      // this.setState({ showHideFName: !this.state.showHideFName });
      // this.setState({ showHideLName: !this.state.showHideLName });
      
  }
  this.setState({ showHideFName: !this.state.showHideFName });
  // this.setState({ showHideLName: !this.state.showHideLName });
  this.disabledButton()

}




 handleOpen = () =>this.setState({open:true});
 handleClose = () =>{this.setState({open:false})
//  this.hideComponent("showHideLName")

};

 handleOpenPDCA = () =>{this.setState({openPDCA:true});

 this.hideComponent("showModalPDCA");
};
 handleClosePDCA = () => {this.setState({openPDCA:false})};

 onGetHistory=async()=>{
  this.btn1.setAttribute("disabled", "disabled");
  await axios.post('http://10.244.3.187:5000/historyCode', {
    Code: 
    `async GetHistoryForAsset(ctx, args) {

        let iterator = await ctx.stub.getHistoryForKey(args);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value) {
                const obj = JSON.parse(res.value.value.toString('utf8'));
                result.push(obj);
            }
            res = await iterator.next();
        }
        await iterator.close();
        return result;
    }`,
  })
  .then(function (response) {
    console.log(response);
    alert(response.data.message);
  })
//  alert('All data has been saved suceessfully click to download file');


}
onchooseDesignPattern=()=> {
  this.hideComponent("showHideLName")
}
 onRBA=()=> {
  this.btn2.setAttribute("disabled", "disabled");
}
 onEncryption=async()=>{
  this.btn3.setAttribute("disabled", "disabled");
  await axios.post('http://10.244.3.187:5000/encryptionCode', {
    Package:`const crypto = require("crypto")`,
    Code: `
    const content = JSON.stringify(TestReport);
                   const Hash = crypto
                       .createHash("sha1")
                       .update(content)
                       .digest("hex");`, })
    .then(function (response) {
      console.log(response);
      alert(response.data.message);
    })

}
 onPDCA=()=>{
 
this.handleOpenPDCA()
  this.btn4.setAttribute("disabled", "disabled");
  // handleOpenPDCA = () =>this.setState({openPDCA:true});

}
onDownload=()=>{
  // alert('Sure You want to Download Chaincode?')
  this.btn5.setAttribute("disabled", "disabled");
  axios.post(`http://10.244.3.187:5000/test`,functions);
  alert('Chaincode Downloaded Successfully');

  window.location.href='http://10.244.3.187:5000/Downloads';
  // this.toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Chaincode Downloaded Successfully', life: 3000 });

  window.setTimeout(function(){window.location.reload('10.244.3.187:3001/templateStudio')},2000)  
}

handleChangePDCA(i, e) {
  let formValues = this.state.formValues;
  formValues[i][e.target.name] = e.target.value;
  this.setState({ formValues });
  console.log("PDCA Values::",formValues);
  FormValuePDCA=formValues;
}

addFormFields() {
  this.setState(({
    formValues: [...this.state.formValues, { collectionName:"",organizationName:"",readWrite: "", }]
  }))
}

removeFormFields(i) {
  let formValues = this.state.formValues;
  formValues.splice(i, 1);
  this.setState({ formValues });
}

async handleSubmitPDCA(event) {
  event.preventDefault();
  console.log("Form Values:;",FormValuePDCA);
  let Json=[];
    Json=FormValuePDCA;
  
await axios.post('http://10.244.3.187:5000/pdc',Json);
  alert('All data has been saved suceessfully click to download file');
  // this.handleClosePDCA();
  // window.location.reload('10.244.3.187:300/templateStudio')
}


componentDidMount() {
    axios.get('http://10.244.3.187:4300/api/v1/domain').then(response => {
    console.log("response123::",response.data);
    this.setState({
    CountryData: response.data
    });
    });

      AllFunctions= axios.get('http://10.244.3.187:4300/api/v1/nodefunction').then(response => {
        console.log("AllFunctions::",response.data);
      });
      console.log("AllFunctions123::",AllFunctions)
    //API for Dynamic Organization
    }
    ChangeteState = (e) => {
      // console.log("Domain NAme:",event.target.value);
    this.setState({
    CountryId: e.target.value
    });
    console.log("Bhai Countery Id::",e.target.value)
    
        axios.get('http://10.244.3.187:4300/api/v1/domain/' + e.target.value).then(response => {
          NameDomain=response.data.Domain
          console.log('Domain NAme::',NameDomain);
          if(NameDomain=="Asset Management")
          {
            this.state.showButton=true;
            this.state.showSelectStakeholder=true;
            this.state.isDisabled=false;
            this.state.showAssetButton=false;
            this.state.showInfo=false;
          }
          else{
            this.state.showButton=false;
            this.state.showSelectStakeholder=false;
            this.state.isDisabled=true;
            this.state.showAssetButton=true;
            this.state.showInfo=true;


          }

    console.log('Aye Halkat',response.data.Stakeholders);
    stake=response.data.Stakeholders
    console.log('stake',stake);

    this.setState({
    StateData:  response.data.Stakeholders
    });
    console.log("Lo Bhai State Data",this.state.StateData)


    });
    // this.ChangeCity(e);
    }
    ChangeCity = (e) => {
      console.log("E value",e.target.value);
    this.setState({
    StateId: e.target.value
    
    });
    axios.get('http://10.244.3.187:4300/api/v1/stakeholder/' + e.target.value).then(response => {
    console.log("Aye Popat",response.data.NodeFunctions);
    this.setState({
    CityData: response.data.NodeFunctions
    });
    console.log("personName::::",this.state.CityData[0].FunctionName);
  temp=this.state.CityData[0].FunctionName;
    console.log("temp",temp);
    });
    }
   
    handleCheckbox=async(event)=>{
      
      console.log("Checkbox values::",event.target.checked);
      // functions=event.target.checked;
      let temp = event.target.checked
      functions.push( event.target.checked);
    }
    handleCheckAdmin=async(event)=>{
      
      console.log("Checkbox values::",event.target.checked);
      AssetAdminCheckbox=event.target.checked;
      // functions=event.target.checked;
      // functions.push(event.target.checked);
    }
    handleCheckAssetOwner=async(event)=>{
      
      console.log("Checkbox values::",event.target.checked);
      AssetOwnerCheckbox=event.target.checked
      // functions=event.target.checked;
      // functions.push(event.target.checked);
    }

    handleSubmit=async(event)=>{
      event.preventDefault();
      const user = {
        functionname: functions,
        asset:assetItem
      };
      if (Languages==="Node")
      {
      
        // if(NameDomain ==="Proof of Existance")
        // {
        //    axios.post(`http://10.244.3.187:5000/test-poe`,functions);
        //   alert ('Chaincode Downloaded Successfully');
        //   window.location.href='http://10.244.3.187:5000/Downloads';
        //   toast.success("Chaincode Downloaded Successfully");  
        //   window.setTimeout(function(){window.location.reload('10.244.3.187:3001/templateStudio')},2000)  
        // }
        //   else if(NameDomain ==="Supplychain"){
        //   axios.post(`http://10.244.3.187:5000/test-supplychain`,functions);
        //   alert ('Chaincode Downloaded Successfully');
        //   window.location.href='http://10.244.3.187:5000/Downloads1';
        //   toast.success("Chaincode Downloaded Successfully");  
        //   window.setTimeout(function(){window.location.reload('10.244.3.187:3001/templateStudio')},2000)  
        // }
       
         if(NameDomain ==="Asset Management")
         {
            if(AssetAdminCheckbox === true)
            {
              console.log("I am in if part")

              axios.post(`http://10.244.3.187:5000/test-assetAdmin`)
            alert ('Chaincode Downloaded Successfully');
            window.location.href='http://10.244.3.187:5000/AdminAssetDownloads';
            toast.success("Chaincode Downloaded Successfully");
            window.setTimeout(function(){window.location.reload('10.244.3.187:3001/templateStudio')},2000)  
            }
            else if(AssetOwnerCheckbox === true){
                    console.log("I am in else part")
                    axios.post(`http://10.244.3.187:5000/test-assetOwner`);
  
  
                    alert ('Chaincode Downloaded Successfully');
    
    
                      window.location.href='http://10.244.3.187:5000/AssetOwnerDownloads';
                      toast.success("Chaincode Downloaded Successfully");
                      
              
                      window.setTimeout(function(){window.location.reload('10.244.3.187:3001/templateStudio')},2000)  
                  }
                  else{
                    axios.post(`http://10.244.3.187:5000/test-assetAdmin`)
                    alert ('Chaincode Downloaded Successfully');
                    window.location.href='http://10.244.3.187:5000/AdminAssetDownloads';
                    toast.success("Chaincode Downloaded Successfully");
                    window.setTimeout(function(){window.location.reload('10.244.3.187:3001/templateStudio')},2000)  
                  }
            
        }
        
        else {
          console.log("I am in else part")
              console.log("Selected functions::",functions);
              axios.post(`http://10.244.3.187:5000/test`,functions).then((res)=>toast.success("chaincode downloaded Successfully!!"));
              alert ('Chaincode Downloaded Successfully');
              window.location.href='http://10.244.3.187:5000/Downloads';
              window.setTimeout(function(){window.location.reload('10.244.3.187:3001/templateStudio')},2000) 
        }
     
      }
     
    }
     selectLanguage = (e) => {
      console.log("E value",e.target.value);
    Languages=e.target.value;
    console.log("Language::::",Languages);
  
    }
     handleChange = (event) => {
console.log("event.target.value::",event.target.value)
  functions=event.target.value;
  console.log("functions::",functions);
  count=functions.length;
  console.log("Count::",count);
  const {
        target: { value },
      } = event;
      
    //   typeof value === 'string' ? value.split(',') : value
        this.onInputChange(event);
    };
     onInputChange = e => {
      console.log("e.target.value:",e.personName);
     
      this.setState({
        personName:e.target.value
      }

      );
    };
    render() {  
      // const names = [];
      const { showHideFName, showHideLName, showModalPDCA } = this.state;

      // names.push(stake);
    return (  
      <>
     {showHideFName && (

    <div className="d-flex col-12 justify-content-start" >
      {/* <div className="d-flex col-md-3 justify-content-start"> */}
        {/* <Script /> */}
        <Toast ref={this.toast} />
        <ToastContainer autoClose={2000} />
      {/* </div> */}
      <div className="container " style={{ backgroundColor: 'white', width: '73%', border: '1px solid #B0B5BB', height: '75%', paddingTop: '2.5%', marginTop: '4px' }}>
      <h3 style={{color:"black",textAlign:"center"}}>Chaincode Generator</h3>
      <form onSubmit={e =>this.handleSubmit (e)}>
      <div class="row">
    <div class="col-sm">
    <FormControl fullWidth style={{ marginBottom: '-18px' }}>
        <InputLabel id="demo-simple-select-label" style={{ marginTop: '15px',fontSize:"18px"}}>Select Language</InputLabel>
        <br />
        <Select
          labelId="demo-simple-select-label" style={{ marginTop: '7px'}}
          id="demo-simple-select"
          placeholder="Country"
          onChange={this.selectLanguage} 
          required
        >
           {data.map((value, key) => {
              return (
                <MenuItem value={value.value} key={key}>
                  {value.lable}
                </MenuItem>
              );
            })}  
        </Select>
      </FormControl>
    </div>
    <div class="col-sm">
    <FormControl fullWidth >
        <InputLabel id="demo1-simple-select-label" style={{ marginTop: '15px',fontSize:"18px" }}>Select Domain</InputLabel>
        <br />
        <Select
          labelId="demo1-simple-select-label" style={{ marginTop: '7px'}}
          required
          id="demo-simple-select"
          name="country"  onChange={this.ChangeteState}
        >
           {this.state.CountryData.map((e, key) => { 
             return(
              <MenuItem key={key} value={e._id}>
               {e.Domain}
               </MenuItem>
             ) 
           
          })}  
        </Select>
      </FormControl>
    </div>
    
  </div><br></br>
  <div class="row">
    <div class="col-sm">
    <FormControl fullWidth style={{ marginBottom: '12px' }} hidden={this.state.showSelectStakeholder}>
        <InputLabel id="demo1-simple-select-label" style={{ marginTop: '15px',fontSize:"18px" }} >Select Stakeholders</InputLabel>
        <br />
        <Select
          labelId="demo1-simple-select-label" style={{ marginTop: '7px'}}
          
          id="demo-simple-select"

          name="state" onChange={this.ChangeCity}
        >
            {this.state.StateData.map((e, key) => {
              return (
                <MenuItem value={e.StakeholderId} key={key}>
                  {e.StakeholderName}
                </MenuItem>
              );
            })}   
        </Select>
      </FormControl>
    </div>
    <div class="col-sm">
    <FormControl fullWidth style={{ marginBottom: '12px' }} hidden={this.state.showSelectStakeholder}>
        <InputLabel id="demo1-simple-select-label" style={{ marginTop: '15px',fontSize:"18px" }} >Select Functions</InputLabel>
        <br></br>
        <Select
          labelId="demo-multiple-name-label" style={{ marginTop: '7px'}}
          id="demo-multiple-name"
          multiple
          value={this.state.personName7}
          onChange={e=>this.handleChangeMultiple(e)}
          // input={<OutlinedInput label="Name" />}
         
          MenuProps={MenuProps}
          
        >
          {this.state.CityData.map((name) => (
            <MenuItem
              key={name}
              value={name.FunctionId}
              // style={getStyles(name,personName7, theme)}
            >
              {name.FunctionName}
            </MenuItem>
          ))}
           
        </Select>
       
      </FormControl>
    </div>
    
  </div>
    
    <Box sx={{ minWidth: 120,marginTop:10  }}>
      <FormControl fullWidth>
        <label htmlFor="selected_functions" style={{marginRight:20}}>You Have Selected <b>{count}</b> Functions</label>
               
      </FormControl>
      {/* {this.state.personName7.length ? (
          <div>
            <h3>Selected Functions</h3>
            <ul>
              {this.state.personName7.map((option) =>
                <li key={option}>
                  {option}
                </li>
              )}
            </ul>
          </div>) : ''
        } */}
    </Box> 
    
<br />

  <Box sx={{ minWidth: 120,marginTop:10  }}>
    
      <FormControlLabel control={<Switch  />} onChange={e => this.handleCheckbox(e)} label="Asset Management"   style={{color:'black'}} hidden={this.state.showButton}/>   
     
    </Box> 
<br/>
<Box sx={{ minWidth: 120,marginTop:1  }}>

    <FormControlLabel control={<Switch  />} onChange={e => this.handleCheckAdmin(e)} label="Admin"   style={{color:'black'}} hidden={this.state.showAssetButton}/>   
    <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Admin can Get Following Functions</Typography>
            <ul>
              <li>
                  Create Generic Asset  
              </li>
              <li>
                  Update Asset
              </li>
              <li>
                  View All Assets 
              </li>
              <li>
                 Transfer Asset Owner 
              </li>
              <li>
                View Private Asset Properties  
              </li>
              <li>
                View public Asset Properties  
              </li>
             </ul>
          </React.Fragment>
        }
        placement="top-start"
      >
        <Button><InfoIcon style={{marginLeft:"-12px"}} hidden={this.state.showInfo}/></Button>
      </HtmlTooltip>

    <FormControlLabel control={<Switch  />} onChange={e => this.handleCheckAssetOwner(e)} label="Asset Owner"   style={{color:'black'}} hidden={this.state.showAssetButton} />   

    <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Asset Owner can Get Following Functions</Typography>
            <ul>
              <li>
                  Create Generic Asset  
              </li>
              <li>
                  Update Asset
              </li>
              <li>
                 Transfer Asset Owner 
              </li>
              <li>
                View Public Asset Properties  
              </li>
             </ul>
          </React.Fragment>
        }
        placement="top-start"
      >
        <Button ><InfoIcon style={{marginLeft:"-12px"}} hidden={this.state.showInfo}/></Button>
      </HtmlTooltip>
  </Box> 
<br/>
{/* <Box sx={{ minWidth: 120,marginTop:10  }}>
    
    <FormControlLabel control={<Switch  />} onChange={e => this.handleCheckAssetOwner(e)} label="Asset Owner"   style={{color:'black'}} hidden={this.state.showButton}/>   
  </Box>  */}
<br/>
    <button type="submit" className="btn btn-primary" style={{ width:"100%",height:"35px", backgroundColor: '#137EA9', border: 'none',marginLeft:"0.2%",marginTop:"-1%",marginBottom:"2%"}} disabled={this.state.isDisabled}>Download Chaincode</button>

    </form>
      </div>
    </div>
 )}

    {/* Part 2 Starts Here */}
    {showHideLName && (


    <div className="d-flex col-12 justify-content-start">
    <div className="container " style={{ backgroundColor: 'white', width: '73%',height:'25%',border: '1px solid #B0B5BB', paddingTop: '2.5%', marginTop: '4px',paddingBottom:'2.5%' }}>
    <h6 style={{marginTop:"-1.5%",marginBottom:"3%",textAlign:"center",color:"red"}}>Note:If you Direct click Download button you will get Plain Chaincode without design pattern.</h6>
  
    <div class="row">
    <div class="col-sm">
    <Button1 className="btn btn-primary" style={{ backgroundColor: '#137EA9', border: 'none',}}   ref={btn1=> { this.btn1= btn1 }} 
  onClick={this.onGetHistory}>Get History</Button1>   
    </div>
    <div class="col-sm">
    <Button1  className="btn btn-primary" style={{ backgroundColor: '#137EA9', border: 'none',}}   ref={btn4 => { this.btn4 = btn4 }}
  onClick={this.onPDCA}>Private Data Collection</Button1>   
    </div>
    <div class="col-sm">
  <Button1  className="btn btn-primary" style={{ backgroundColor: '#137EA9', border: 'none',}}  ref={btn3 => { this.btn3 = btn3 }} 
  onClick={this.onEncryption}>Encryption on Chain</Button1> 
    </div>
  </div>
  <br></br>
  <div class="row">
  <div class="col-sm">
    <Button1  className="btn btn-primary" style={{ backgroundColor: '#137EA9', border: 'none',}}  ref={btn5 => { this.btn5 = btn5 }} 
  onClick={this.onDownload}>Download Chaincode</Button1>   
    </div>
    <div class="col-sm">
    <Button1  className="btn btn-primary" style={{ backgroundColor: '#137EA9', border: 'none',}}  ref={btn2 => { this.btn2 = btn2 }} 
  onClick={this.onRBA}>Role Base Authentication</Button1>    
    </div>
    <div class="col-sm">
    {/* <Button1  className="btn btn-primary" style={{ backgroundColor: '#137EA9', border: 'none',}}  ref={btn2 => { this.btn2 = btn2 }} 
  onClick={this.onRBA}>Role Base Authentication</Button1>     */}
    </div>
  </div>
    </div>
    </div>
)}
 {showModalPDCA && (
  
  <Modal show={this.state.openPDCA} onHide={this.handleClosePDCA}>
  <Modal.Header closeButton>
    <Modal.Title>Private Data Collection</Modal.Title>
  </Modal.Header>
  <Modal.Body>
       <Container component={Box} p={2}>
         <Paper component={Box} p={6}>     
        <form  onSubmit={this.handleSubmitPDCA}>
           {this.state.formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <div class="row">
              <div class="col-sm">
              <label>Collection Name</label>
              <input type="text" name="collectionName" value={element.collectionName || ""} onChange={e => this.handleChangePDCA(index, e)} />
              </div>
              <div class="col-sm">
              <label>Organization  Name</label>
              <input type="text" name="organizationName" value={element.organizationName || ""} onChange={e => this.handleChangePDCA(index, e)} />
              </div>
              </div>

              <div class="row">
              <div class="col-sm">
              <label>Select Permission</label><br></br>
              {/* <input type="text" name="readWrite" value={element.readWrite || ""} onChange={e => this.handleChangePDCA(index, e)} /> */}
              {/* <Select1 options={readWriteData} name="readWrite" value={element.readWriteData || ""} onChange={e => this.handleChangePDCA(index, e)} > */}
             {/* <select name="readWrite" value={element.readWrite || ""} onChange={e => this.handleChangePDCA(index, e)}>

            
             </select> */}
             <Form.Select aria-label="Default select example"  name="readWrite" value={element.readWrite || ""} onChange={e => this.handleChangePDCA(index, e)}>
                     {/* <option>Open this select menu</option> */}
                     <option value="Select" selected>Select</option>
              <option value="Read" >Read</option>
              <option value="Write" >Write</option>
              <option value="ReadWrite" >ReadWrite</option>
                   </Form.Select>

              {/* </Select1> */}
              </div>
              </div>
            
            
              
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => this.removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
              <button className="button submit" type="submit">Download Chaincode</button>
              {/* <button className="button submit" type="button" onClick={()=>this.setState({openPDCA:false})}>Close</button> */}

          </div>
      </form>
        </Paper>
      </Container>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary"  onClick={this.handleClosePDCA}>Close</Button>
  </Modal.Footer>
</Modal>
      )}
    </>
)  
}  
}  
export default CascadingDropdown  