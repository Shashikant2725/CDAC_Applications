import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
  import AppBar from '@material-ui/core/AppBar';
  import Toolbar from '@material-ui/core/Toolbar';
 
  import IconButton from '@material-ui/core/IconButton';
  import MenuIcon from '@material-ui/icons/Menu';
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(0),
        overflow:"hidden",
        width:"1000px",
         
      },
   
    },
    tableButton: {
        backgroundColor:"#e0e0e0",
        fontWeight:600,
        padding: theme.spacing(1),
        "&:hover": {
          backgroundColor: "#FF0010",
          color:"white"
        },
        height:"27px",
        fontSize: '13px'
         
      },
      icon:{
        fontSize: '13px'
      },
    headerWidth:
    {
        width:"170px"
    }  
  }));


const TableExample = () => {
   
  const[record,setRecord] = useState([])

const [modeldata,setModeldata] = useState([])
 
   const getData = async() =>
   {
       const result=await axios.get('http://10.244.3.187:4000/api/v1/allAssets')
       console.log("Result::",result.data.getAllAssets);
       setRecord(result.data.getAllAssets)
       
   }
   
   useEffect(() => {
      getData();
   },[])
   
    const showDetail = async(_id) =>
    {
        console.log("_id:::",_id);
        const result=await axios.get('http://10.244.3.187:4000/api/v1/allAsset/' + _id)
        console.log("Result123334::",result.data);
        setModeldata(result.data)
        handleOpen();
    
    }
    const classes = useStyles();
 
 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
    return (
    <div class="container mt-2">
        <div class="row mt-2 ">
            <div class="col-lg-1 col-md-6 col-sm-12">
            </div>  
            <div class="col-lg-11 col-md-6 col-sm-12">
              <h5 class="mt-3 mb-3 text-secondary">
             Asset  Details
              </h5>
                <div class=" mt-5">
                    <table class="table table-striped table-sm">
                        <thead class="thead-light">
                            <tr>
                            <th>Show Details</th>
                                <th>Asset Id</th>
                                
                                <th>Org Name</th>
                                <th>Owner Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                          {record.map((names,index)=>
                           <tr key={index}>
                             <td>
                                 <Button
                        onClick={(e)=>showDetail(names._id)} 
                        style={{textTransform: 'none'}}
                        size="small"
                      >
                        <VisibilityIcon style={{color: '#10346a'}}/>
                      </Button>
                      
                                </td>
                               <td>{names._id}</td>
                              <td>{names.orgName}</td>
                              <td>{names.userName}</td>
                              {/* <td>
                                {names.publicMandatory.map(detail => (
                                    <ul>
                                    <li>{detail.publicMandatoryField}</li>
                                    </ul>
                                ))}
                                </td>
                                <td>
                                {names.publicMandatory.map(detail => (
                                    <ul>
                                    <li>{detail.publicMandatoryData}</li>
                                    </ul>
                                ))}
                                </td>
                                <td>
                                {names.privateMandatory.map(detail => (
                                    <ul>
                                    <li>{detail.privateMandatoryField}</li>
                                    </ul>
                                ))}
                                </td>

                                <td>
                                {names.privateMandatory.map(detail => (
                                    <ul>
                                    <li>{detail.privateMandatoryData}</li>
                                    </ul>
                                ))}
                                </td>

                                <td>
                                {names.publicCommonData.map(detail => (
                                    <ul>
                                    <li>{detail.publicDataField}</li>
                                    </ul>
                                ))}
                                </td>
                                <td>
                                {names.publicCommonData.map(detail => (
                                    <ul>
                                    <li>{detail.publicData}</li>
                                    </ul>
                                ))}
                                </td>
                                <td>
                                {names.privateCommonData.map(detail => (
                                    <ul>
                                    <li>{detail.privateDataField}</li>
                                    </ul>
                                ))}
                                </td>
                                <td>
                                {names.privateCommonData.map(detail => (
                                    <ul>
                                    <li>{detail.privateData}</li>
                                    </ul>
                                ))}
                                </td>
                               */}
                                
                           </tr>
                           )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
 
 
{/* 
 Model Box  */}

  <Modal  
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
       
        <Box sx={style}>
<div class="modal-body" >
            <table class="table table-striped table-sm">
                        <thead class="thead-light">
                            <tr>
                                
                                <th>publicMandatoryField</th>
                                <th>publicMandatoryData</th>
                                <th>privateMandatoryField</th>
                                <th>privateMandatoryData</th>
                                <th>publicCommonField</th>
                                <th>publicCommonData</th>
                                <th>privateCommonField</th>
                                <th>privateCommonData</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        {modeldata.map((names,index)=>
                           <tr>
                              <td>
                                {names.publicMandatory.map(detail => (
                                    <ul>
                                    <li>{detail.publicMandatoryField}</li>
                                    </ul>
                                ))}
                                </td>

                                <td>
                                {names.publicMandatory.map(detail => (
                                    <ul>
                                    <li>{detail.publicMandatoryData}</li>
                                    </ul>
                                ))}
                                </td>

                                <td>
                                {names.privateMandatory.map(detail => (
                                    <ul>
                                    <li>{detail.privateMandatoryField}</li>
                                    </ul>
                                ))}
                                </td>


                                <td>
                                {names.privateMandatory.map(detail => (
                                    <ul>
                                    <li>{detail.privateMandatoryData}</li>
                                    </ul>
                                ))}
                                </td>



                                <td>
                                {names.publicCommonData.map(detail => (
                                    <ul>
                                    <li>{detail.publicDataField}</li>
                                    </ul>
                                ))}
                                </td>

                                <td>
                                {names.publicCommonData.map(detail => (
                                    <ul>
                                    <li>{detail.publicData}</li>
                                    </ul>
                                ))}
                                </td>


                                <td>
                                {names.privateCommonData.map(detail => (
                                    <ul>
                                    <li>{detail.privateDataField}</li>
                                    </ul>
                                ))}
                                </td>

                                <td>
                                {names.privateCommonData.map(detail => (
                                    <ul>
                                    <li>{detail.privateData}</li>
                                    </ul>
                                ))}
                                </td>

                           </tr>
                        )}
                      
                        </tbody>
                    </table>
            </div>
        </Box>          
      </Modal>
    </div>
    )


}
 
 
export default TableExample
