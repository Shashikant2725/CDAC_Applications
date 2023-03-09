import React, { useEffect, useRef, useState,useMemo } from 'react'
import axios from 'axios'
import { Theme, useTheme } from '@mui/material/styles';
import nextId from "react-id-generator";
import { json, useNavigate } from "react-router-dom";
import AssetCreateByAdminTable from './assetCreateByAdminTable';
import MenuItem from '@mui/material/MenuItem';
import Pagination from "../components/SmartContractScript/DataTable/Pagination/index";
import Search from "../components/SmartContractScript/DataTable/Search/index";
import { Toast } from 'primereact/toast';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Modal from '@mui/material/Modal';

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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const AssetCreateByAdmin = () => {

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
     
      const showDetail = async(e,_id) =>
      {
          console.log("_id:::",_id);
          // const Asset_Id=_id.toString();
          console.log("Asset_id::",_id._id);
          const result=await axios.get('http://10.244.3.187:4000/api/v1/allAsset/' + _id._id)
          console.log("Result123334::",result.data);
          setModeldata(result.data)
          handleOpen();
      
      }
   
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);


  const [posts, setPosts] = useState([])
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search1, setSearch1] = useState("");

  const [AssetName, setAssetName] = useState({
    assetName: ''
  });
  const { assetName } = AssetName;
  const onInputChangeforOrg = e => {
    setAssetName({ ...AssetName, [e.target.name]: e.target.value });
  };


  const ITEMS_PER_PAGE = 6;
  //Get ID
  const [editPostId, setEditPostId] = useState(null)

  const [editFormData, setEditFormData] = useState({
    userId: 10,
    title: '',
    StakeholderName: ''
  })



  //Edit data
  const handleEditPostForm = (e, assetName) => {
    e.preventDefault()
    setEditPostId(assetName._id)
    console.log("assetName._id:",assetName._id);

    const formValues = {
    assetName: assetName.assetName,
    publicMandatoryField:assetName.publicMandatoryField,
    publicMandatoryData:assetName.publicMandatoryData,
    privateMandatoryField:assetName.privateMandatoryField,
    privateMandatoryData:assetName.privateMandatoryData,
    publicCommonData:assetName.publicCommonData,
    privateCommonData:assetName.privateCommonData

    }

    setEditFormData(formValues)
  }

  //Edit Form Data
  const handleEditFormClick = (input) => (e) => {
    e.preventDefault()
    console.log("handleEditFormClick:",e.target.value);
    setEditFormData({ ...editFormData, [input]: e.target.value });
    
  }

  //Save Form Data
  const handleFormSave = async(e) => {
    e.preventDefault()
console.log("Edit Save Data:",e);
    const savePost = {
      id: editPostId,
      userId: editFormData.userId,
      title: editFormData.title,
      body: editFormData.body
    }



    const newPosts = [...posts]

    const formIndex = posts.findIndex((post) => post.id === editPostId);

    newPosts[formIndex] = savePost

    setPosts(newPosts)
    setEditPostId(null)
    console.log("StakeholderID::",editPostId);
    console.log("EditForm Data:",editFormData.assetName)
    const article = {
      assetName:editFormData.assetName,
     };
     console.log()
     const updatestring = "http://10.244.3.187:4000/api/v1/updateasset/" + editPostId
 console.log("this is update string",updatestring)
 
     const stakedelete1 = await axios.put(updatestring,article).then((res)=>toast.success("Asset Updated Successfully!!"))
     console.log("Updated ::stakedelete1",stakedelete1)
     window.setTimeout(function(){window.location.reload('http://10.244.3.187:3000/addstakeholder')},3000)  

  }

  //Delete Data
  const handleDelete = async(e) => {
    e.preventDefault()
    const newPosts = [...posts]

    const formIndex = posts.findIndex((post) => post.id === editPostId);

    newPosts.splice(formIndex, 1);

    setPosts(newPosts)

    // console.log("Delete StakeholderId:",newPosts);

    console.log("editPostId:",editPostId);
    const deletestring = "http://10.244.3.187:4000/api/v1/deleteasset/"+ editPostId
    const stakedelete = await axios.delete(deletestring).then((res)=>toast.success("Asset Deleted Successfully!!"));
    console.log('Response for Delete',stakedelete)
    // window.location.reload();
    window.setTimeout(function(){window.location.reload('http://10.244.3.187:3000/addstakeholder')},3000)  


  }


  //Search Filter Data
  const [searchQuery, setSearchQuery] = useState("")
  function search() {
    return posts.filter(row => row.assetName.toLowerCase().indexOf(searchQuery) > - 1)

  }

  //Get Data From JSON Placeholder
  const fetchUrl = "http://10.244.3.187:4000/api/v1/allAssetsFields";
  const domain = "http://10.244.3.187:4300/api/v1/domain";
  
  useEffect(() => {

    async function fetchData() {
      const data = await axios.get(fetchUrl)
      // setPosts(DomainNamess)
      setPosts(data.data.getAllAssets)

      console.log("getAllAssets::",data.data.getAllAssets);
    //   console.log("Domain",data.data.Domain);

      return data
    }

    async function fetchDomain() {
        const data = await axios.get(domain)
        setCountryData(data.data)
        console.log(data.data);
      //   console.log("Domain",data.data.Domain);
  
        return data
      }
      fetchData()
      fetchDomain()
    
  }, [fetchUrl])

  const commentsData = useMemo(() => {
    console.log("comments::", posts)
    let computedComments = posts;
    console.log("computedComments::", computedComments)

    setTotalItems(posts.length);
    console.log("totalItems:",totalItems);
    if (search1) {
      search()
      computedComments = computedComments.filter(
          comment =>
              comment.assetName.toLowerCase().includes(search1.toLowerCase())
              // comment.userName.toLowerCase().includes(search1.toLowerCase()) 
      );
  }
  function search() {
    return posts.filter(row => row.assetName.toLowerCase().indexOf(searchQuery) > - 1 ||  row.userName.toLowerCase().indexOf(searchQuery) > - 1)

  }
    return computedComments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
}, [posts,currentPage,search1]);


//// upload File

const [file, setFile] = useState();
const [fileName, setFileName] = useState("");

 //// Add Public Mandatory Data

 const [inputFields, setInputFields] = useState([{
  publicMandatoryField:''
} ]);

const addInputField = ()=>{
    setInputFields([...inputFields, {
      publicMandatoryField:''
    } ])
  
}
const removeInputFields = (index)=>{
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
}

///// Public Common Data and Field

const [inputFields2, setInputFields2] = useState([{
publicDataField:''
} ]);

const addInputField2 = ()=>{
  setInputFields2([...inputFields2, {
    publicDataField:''
  } ])

}
const removeInputFields2 = (index)=>{
  const rows = [...inputFields2];
  rows.splice(index, 1);
  setInputFields2(rows);
}

//// Add Private Mandatory Data

const [inputFields1, setInputFields1] = useState([{
privateMandatoryField:''
} ]);

const addInputField1 = ()=>{
setInputFields1([...inputFields1, {
  privateMandatoryField:''
} ])

}
const removeInputFields1 = (index)=>{
const rows = [...inputFields1];
rows.splice(index, 1);
setInputFields1(rows);
}


///// Private Common Data

const [inputFields3, setInputFields3] = useState([{
privateDataField:''
} ]);

const addInputField3 = ()=>{
  setInputFields3([...inputFields3, {
    privateDataField:''
  } ])

}
const removeInputFields3 = (index)=>{
  const rows = [...inputFields3];
  rows.splice(index, 1);
  setInputFields3(rows);
}

const handleChangePublicData = (index, evnt, id)=>{

const { name, value} = evnt.target;
const list = [...inputFields];
list[index][name] = value;
setInputFields(list);
console.log("Public Data::",JSON.stringify(inputFields))
}
const handleChangePrivateData = (index, evnt, id)=>{

const { name, value} = evnt.target;
const list = [...inputFields1];
list[index][name] = value;
setInputFields1(list);
console.log("Private Data::",JSON.stringify(inputFields1))

}
const handleChangePublicCommonData = (index, evnt, id)=>{

const { name, value} = evnt.target;
const list = [...inputFields2];
list[index][name] = value;
setInputFields2(list);
console.log("Private Data::",JSON.stringify(inputFields2))

}
const handleChangePrivateCommonData = (index, evnt, id)=>{

const { name, value} = evnt.target;
const list = [...inputFields3];
list[index][name] = value;
setInputFields3(list);
console.log("Private Data::",JSON.stringify(inputFields3))

}

//////Org Name
const [inputFields4, setInputFields4] = useState([{
  assetName:'',
  } ]);
  
 
  const removeInputFields4 = (index)=>{
    const rows = [...inputFields4];
    rows.splice(index, 1);
    setInputFields4(rows);
  }
 
    
////Form Submit Data

const handleSubmit = async(event,evnt1,evnt2,evnt3,evnt4,evnt5)=>{
event.preventDefault();
var publicMandatoryFields=[];
var privateMandatoryFields=[];
var publicCommonDatas=[];
var privateCommonDatas=[];
// console.log('Length of array 1 :',length)
for(var i=0;i<evnt1.length;i++)
{
  publicMandatoryFields.push(evnt1[i].publicMandatoryField)

}
console.log("evnt1 Valuee::",publicMandatoryFields);

for(var i=0;i<evnt2.length;i++)
{
  privateMandatoryFields.push(evnt2[i].privateMandatoryField)

}
console.log("evnt2 Valuee::",privateMandatoryFields);

for(var i=0;i<evnt3.length;i++)
{
  publicCommonDatas.push(evnt3[i].publicDataField)

}
console.log("evnt3 Valuee::",publicCommonDatas);
for(var i=0;i<evnt4.length;i++)
{
  privateCommonDatas.push(evnt4[i].privateDataField)

}
console.log("evnt4 Valuee::",privateCommonDatas);


const data = {
  assetName,
  publicMandatory:publicMandatoryFields,
  privateMandatory:privateMandatoryFields,
  publicCommonData:publicCommonDatas,
  privateCommonData:privateCommonDatas
}
// const data=[];
// data[0]=evnt1
const result=await axios.post("http://10.244.3.187:4000/api/v1/assetfieldsCreation",data).then((res)=>toast.success("Asset Created Successfully!!"));
console.log("Data::",data);
 window.setTimeout(async function(){ window.location.reload('http://10.244.3.187:2000/assetCreateByAdmin')},1000)  

}

// const [publicMandatory, setPublicMandatory] = useState([]);

  return (
    
    <div>
                          <Toast ref={toast} />
        <ToastContainer autoClose={2000} />
          <br></br>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Item>
          <button type="button" style={{ color:"white",backgroundColor:"#137EA9"}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModalForm">
                        Create Asset Fields +
                        </button>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
                        <Search
                       
                       onSearch={value => {
                        setSearch1(value);
                           setCurrentPage(1);
                       }}
                   />
          </Item>
        </Grid>
      
      </Grid>
    </Box>
{/* <TablesExample /> */}
      <table className="table table-striped table-responsive" style={{marginTop:"4%"}}>
        <thead>
             <tr>
                            {/* <th>Show Details</th> */}
                                <th>Asset Id</th>
                                
                                <th>Asset Name</th>
                                {/* <th>Actions</th> */}
                            </tr>
        </thead>
        <tbody>
          <AssetCreateByAdminTable
            posts={(commentsData)}
            handleEditPostForm={handleEditPostForm} 
            showDetail={showDetail} />
        </tbody>
        
      </table>
      <div style={{ float: "right" }}>
                                <Pagination
                                    total={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </div>
      {/*Add Modal */}
      <div className="modal fade" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create an Asset Fields</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
           
            <form onSubmit={data =>handleSubmit (data,inputFields,inputFields1,inputFields2,inputFields3,inputFields4)}>
            <div className="row">
              <div className="col-lg-12">
                {
                    inputFields4.map((data, index)=>{
                        const {publicMandatoryData, publicMandatoryField, salary}= data;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-6">
                  <div className="form-group">
                    <label> Asset Name</label>
                  <input type="text"  onChange={e => onInputChangeforOrg(e)} value={assetName} name="assetName" className="form-control" required/>
                  </div>
                  </div> 
                  
                  <div className="col-md-6">
               {(inputFields4.length!==1)? <Button className="btn btn-danger"   startIcon={<RemoveCircleIcon />} onClick={removeInputFields4}>x</Button>:''}
                  </div>
                </div>
                        )
                    })
                }
                </div>
              </div>
          <div className="row">
              <div className="col-lg-12">
                {
                    inputFields.map((data, index, id="publicMandatory")=>{
                        const {publicMandatoryData, publicMandatoryField, salary}= data;
                        return(
                          <div className="row" key={index}>
                             <div className="col-md-10" >
                  <div className="form-group">
                  <label> Public Mandatory Field</label>

                  <input type="text"  onChange={(evnt)=>handleChangePublicData(index, evnt,  id="publicMandatory")} value={data.publicMandatoryField} name="publicMandatoryField" className="form-control"   required/>
                  </div>
                  </div>
                  <div className="col-md-1">
                                     <Button  style={{marginTop:"20px",marginLeft:"-20px"}}  startIcon={<AddCircleIcon />}
              onClick={addInputField}
            >
        {/* Transfer Ownership */}
      </Button>
                  </div>
                  <div className="col-md-1">
               {(inputFields.length!==1)? <Button  style={{marginTop:"20px",marginLeft:"-20px"}} startIcon={<RemoveCircleIcon />} onClick={removeInputFields}></Button>:''}
                  </div>
                  <br></br>
                </div>
                        )
                    })
                }
             
                </div>
              </div>
              <div className="row">
              <div className="col-lg-12">
                {
                    inputFields1.map((data, index, id="privateMandatory")=>{
                        const {privateMandatoryData, privateMandatoryField, salary}= data;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-10">
                  <div className="form-group">
                  <label>Private Mandatory Field</label>
                  <input type="text"  onChange={(evnt)=>handleChangePrivateData(index, evnt,  id="privateMandatory")} value={data.privateMandatoryField} name="privateMandatoryField" className="form-control"  required/>
                  </div>
                  </div>      
                   <div className="col-md-1">
                 <Button style={{marginTop:"20px",marginLeft:"-20px",width:"auto"}}   startIcon={<AddCircleIcon />}
              onClick={addInputField1}
            >
        {/* Transfer Ownership */}
      </Button>
                  </div>
                <div className="col-md-1">
               {(inputFields1.length!==1)? <Button  style={{marginTop:"20px",marginLeft:"-20px"}}   startIcon={<RemoveCircleIcon />} onClick={removeInputFields1}></Button>:''}

                  </div>
                 
                </div>
                        )
                    })
                }
                </div>
              </div>

              <div className="row">
              <div className="col-lg-12">
                {
                    inputFields2.map((data, index, id="publicMandatory")=>{
                        const {publicMandatoryData, publicMandatoryField, salary}= data;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-10">
                  <div className="form-group">
                  <label>Public Mutable Field</label>

                  <input type="text"  onChange={(evnt)=>handleChangePublicCommonData(index, evnt,  id="publicMandatory")} value={data.publicDataField} name="publicDataField" className="form-control"   required/>
                  </div>
                  </div>
                  <div className="col-md-1">
                 <Button  style={{marginTop:"20px",marginLeft:"-20px"}} startIcon={<AddCircleIcon />}
              onClick={addInputField2}
            >
        {/* Transfer Ownership */}
      </Button>
                  </div>
                   <div className="col-md-1">
               {/* {(inputFields.length!==1)? <button className="btn btn-danger" onClick={removeInputFields}>x</button>:''} */}
               {(inputFields2.length!==1)? <Button   style={{marginTop:"20px",marginLeft:"-20px"}} startIcon={<RemoveCircleIcon />} onClick={removeInputFields2}></Button>:''}

                  </div>
                  
                </div>
                  
                        )
                    })
                }
                </div>
              </div>
              <div className="col-sm-4">
              </div>
              <div className="row">
              <div className="col-lg-12">
                {
                    inputFields3.map((data, index, id="privateMandatory")=>{
                        const {privateMandatoryData, privateMandatoryField, salary}= data;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-10">
                  <div className="form-group">
                  <label>Private Mutable Field</label>

                  <input type="text"  onChange={(evnt)=>handleChangePrivateCommonData(index, evnt,  id="privateMandatory")} value={data.privateDataField} name="privateDataField" className="form-control"  required/>
                  </div>
                  </div>       
                    <div className="col-md-1">
                 <Button  style={{marginTop:"20px",marginLeft:"-20px"}} startIcon={<AddCircleIcon />}
              onClick={addInputField3}
            >
        {/* Transfer Ownership */}
      </Button>
                  </div>
                   <div className="col-md-1">
               {(inputFields3.length!==1)? <Button   style={{marginTop:"20px",marginLeft:"-20px"}} startIcon={<RemoveCircleIcon />} onClick={removeInputFields3}></Button>:''}
                  </div>
                </div>
                        )
                    })
                }
                </div>
              </div>

              <div className="col-sm-4">
              </div>
              <br/>
              <button type="submit" className="btn btn-primary" style={{ width:"18%",height:"35px", backgroundColor: '#137EA9', border: 'none',marginLeft:"0.2%",marginTop:"-1%",marginBottom:"2%"}} >Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>


      {/*Edit Row Modal */}
      <div className="modal fade" id="editModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            
            <div className="modal-body">
              {/* <form onSubmit={handleFormSave}>
                <div className="mb-3"> 
                <label className="form-label" style={{color:"black",float:"right"}}>Organisation Name</label>
                  <input
                    className="form-control"
                    name="orgName"
                    value={editFormData.orgName}
                    onChange={handleEditFormClick("orgName")}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{color:"black",float:"right"}}>Username</label>
                  <input
                   
                    className="form-control"
                    name="userName"
                    value={editFormData.userName}
                    required
                    onChange={handleEditFormClick("userName")}
                  ></input>
                </div>
                
                <div className="modal-footer d-block">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success float-end"
                  >Save Record</button>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-danger float-start"
                    onClick={handleDelete}
                  >Delete Record</button>
                </div>
              </form> */}

        
            </div>
          </div>
        </div>
      </div>

{/* 
 Model Box  */}

  <Modal  
   id="detailsModalForm" tabIndex="-1" aria-labelledby="detailsModalForm" aria-hidden="true"
        keepMounted
        open={open}
        onClose={handleClose}
        // aria-labelledby="keep-mounted-modal-title"
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

export default AssetCreateByAdmin