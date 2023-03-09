import React, {Component } from 'react'
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Swal from 'sweetalert2'
// import Alert from 'react-popup-alert'
import { Toast } from 'primereact/toast';

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@mui/material/Button';
// import "../../css/SmartContractCSS/app.css";
// import '../../css/SmartContractCSS/header.css'
import { makeStyles, Theme, createStyles }
	from '@material-ui/core/styles';
var count=[0];
var data=[{lable:"Go",value:"Go"},{lable:"Node",value:"Node"}]
var NameDomain='';
var temp={};
var stake=[];
var functions=[];
var menuItems=[];
var Languages=''
  const MenuItemWithCheckbox = React.forwardRef(function MenuItemWithCheckbox(
    { children, selected, em = false, ...other },
    ref
  ){
    return (
      <MenuItem {...other} selected={selected} ref={ref}>
        <Checkbox checked={selected} />
        {em && <em>{children}</em>}
        {!em && children}
      </MenuItem>
    );
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    
    color: theme.palette.text.secondary,
  }));
  
export class CascadingDropdown extends Component {
  
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


}

}
componentDidMount() {
    axios.get('http://10.244.1.54:4300/api/v1/domain').then(response => {
    console.log("response123::",response.data);
    this.setState({
    CountryData: response.data
    });
    });
    }
    ChangeteState = (e) => {
      // console.log("Domain NAme:",event.target.value);
    this.setState({
    CountryId: e.target.value
    });
    console.log("Bhai Countery Id::",e.target.value)

        axios.get('http://10.244.1.54:4300/api/v1/domain/' + e.target.value).then(response => {
          NameDomain=response.data.Domain
          console.log('Domain NAme::',NameDomain);

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
    axios.get('http://10.244.1.54:4300/api/v1/stakeholder/' + e.target.value).then(response => {
    console.log("Aye Popat",response.data.NodeFunctions);
    this.setState({
    CityData: response.data.NodeFunctions
    });
    console.log("personName::::",this.state.CityData[0].FunctionName);
  temp=this.state.CityData[0].FunctionName;
    console.log("temp",temp);
    });
    }
   

    handleSubmit=async(event)=>{
      event.preventDefault();
      const user = {
        functionname: functions,
        Domain:NameDomain
      };
      if(Languages==="Node")
      {
        // console.log("Selected functions with User Object::",user);

        console.log("Selected functions::",functions);
         axios.post(`http://10.244.1.54:5000/test`,functions);
         alert('Chaincode Downloaded Successfully');
        this.toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Chaincode Downloaded Successfully', life: 3000 });

         window.location.href='http://10.244.1.54:5000/Downloads';

         window.setTimeout(function(){window.location.reload('10.244.1.54:3001/templateStudio')},2000)  
      }
     
      else 
    {
        
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
      
      // names.push(stake);
    return (  
     
<>
<Toast ref={this.toast} />

<form onSubmit={e =>this.handleSubmit (e)}>

<Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
        <Grid  item xs={6}>
          <Item className='templateLibrary1'>
          {/* <div className='selectLanguageforZip'></div> */}
          <InputLabel id="demo1-simple-select-label" style={{fontSize:"18px",marginTop:"-1%",marginLeft:"15%"}}>Select Language</InputLabel>

<FormControl  style={{width:"70%",marginLeft:"15%" }}>

<Select
labelId="demo-simple-select-label"
id="demo-simple-select"
placeholder="Country"
onChange={this.selectLanguage} 
required
style={{backgroundColor:"white",borderRadius: "4px", border: "0.5px solid #137EA9"}}
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
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item className='templateLibrary1'>
          {/* <div className='selectDomainforZip'></div> */}
          <InputLabel id="demo1-simple-select-label" style={{fontSize:"18px",marginTop:"-1%",marginLeft:"15%"}}>Select Domain</InputLabel>

        <FormControl style={{ width:"70%",marginLeft:"15%"}}>

        <Select
          labelId="demo1-simple-select-label"
          required
          id="demo-simple-select"
          name="country"  onChange={this.ChangeteState}
          style={{backgroundColor:"white",borderRadius: "4px", border: "0.5px solid #137EA9"}}
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
          </Item>
        </Grid>
        <Grid item xs={6}><br></br>
          <Item className='templateLibrary1'>
          {/* <div className='selectStakeholderforZip'></div> */}
          <InputLabel id="demo1-simple-select-label" style={{fontSize:"18px",marginTop:"-1%",marginLeft:"15%"}}>Select Stakeholder</InputLabel>

        <FormControl style={{ width:"70%",marginLeft:"15%" }}>

        <Select
          labelId="demo1-simple-select-label"
          required
          id="demo-simple-select"
          style={{backgroundColor:"white",borderRadius: "4px", border: "0.5px solid #137EA9"}}
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
          </Item>
        </Grid>
        <Grid item xs={6}><br></br>
          <Item className='templateLibrary1'>
          <InputLabel id="demo1-simple-select-label" style={{fontSize:"18px",marginTop:"-1%",marginLeft:"15%"}}>Select Functions</InputLabel>

          {/* <div className='selectFunctionsforZip'></div> */}
        <FormControl style={{ width:"70%",marginLeft:"15%" }}>

        <Select
          labelId="demo1-simple-select-label"
          id="demo-simple-select"
          placeholder="State"
          multiple
          name="personName"
          value={this.state.personName}
          onChange={e=>this.handleChange(e)}
          style={{backgroundColor:"white",borderRadius: "4px", border: "0.5px solid #137EA9"}}
          required
        >
         {this.state.CityData.map((name,key) => (
          
           <MenuItemWithCheckbox key={name._id} value={name.FunctionId}>
           {name.FunctionName}
         </MenuItemWithCheckbox>
              ))} 
        </Select>
      </FormControl>
          </Item>
        </Grid>
      </Grid>
    </Box>
    {/* <Box sx={{ minWidth: 120,marginTop:10  }}> */}
      {/* <FormControl fullWidth> */}
        <h6 htmlFor="selected_functions" style={{marginRight:20,color:"black"}}>You Have Selected {count} Functions</h6>
               
      {/* </FormControl> */}
    {/* </Box>  */}
    <Button  type="submit" size="large" style={{marginTop:"2%",width:"96px",height:"40px",borderRadius:'5px',opacity:1,float:"right"}}variant="contained">Submit</Button>
   
    {/* <button type="submit" class="btn btn-primary" style={{marginTop:"2%",width:"96px",height:"40px",borderRadius:'5px',opacity:1,float:"right"}}>Submit </button> */}
    </form>

</>
  
)  
}  
}  
export default CascadingDropdown  