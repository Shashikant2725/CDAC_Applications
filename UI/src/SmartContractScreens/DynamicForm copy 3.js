import React, { useEffect, useRef, useState,useMemo } from 'react'
import axios from 'axios'
import { Theme, useTheme } from '@mui/material/styles';
import nextId from "react-id-generator";
import DynamicFormTable from './DynamicFormTable';
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
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import TableExample from './TableExample'
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import arrow from '../images/arrow1.png';
import Footer from "../components/Footer";

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

var DomainIds = [""];
var DomainNamess = [""];
var StakeholderNames = "";
var DomainData = [];

var Domains1 = [];
var data2 = [];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

// const privateMandatoryfields = [];
// const publicCommonDatafields = [];
// const privateCommonDatafields = [];

const Tables = () => {

  const[record,setRecord] = useState([])

  const [modeldata,setModeldata] = useState([])
  const [publicMandatoryCount,setpublicMandatoryCount] = useState([]);
  const [privateMandatoryCount,setprivateMandatoryCount] = useState([]);
  const [publicCommonDataCount,setpublicCommonDataCount] = useState([]);
  const [privateCommonDataCount,setprivateCommonDataCount] = useState([]);

  const [pmfFields,setPmfFields] = useState([]);
  const [prmfFields,setPrmfFields] = useState([]);
  const [pcfFields,setPcfFields] = useState([]);
  const [prcfFields,setPrcfFields] = useState([]);


      const showDetail = async(e,_id) =>
      {
          console.log("_id:::",_id);
          // const Asset_Id=_id.toString();
          console.log("Asset_id::",_id._id);
          const result=await axios.get('http://10.244.3.187:4000/api/v1/allAssetFields/' + _id._id)
          console.log("Result123334::",result.data.Result);
          setModeldata(result.data.Result);
          // setpublicMandatoryCount(result.data.publicMandatoryCount);
          // console.log("publicMandatoryCount::",publicMandatoryCount);

          handleOpen();
      
      }
   
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () =>{
        console.log('Bhai Close Call Hua Hai')
        setOpen(false);
        // publicMandatoryfields=0
      } 
   









  const theme = useTheme();
  const [personName7, setPersonName7] = React.useState([]);
  const [posts, setPosts] = useState([])
  const [CountryData,setCountryData] = useState([]);
  const [personName,setPersonName] = useState([]);
  const [StakeholderName,setStakeholderName] = useState([]);
  const [StakeholdersList,setStakeholdersList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search1, setSearch1] = useState("");

  const [OrgName, setOrgName] = useState({
    orgName: ''
  });
  const { orgName } = OrgName;
  const onInputChangeforOrg = e => {
    setOrgName({ ...OrgName, [e.target.name]: e.target.value });
  };

  const [UserName, setUserName] = useState({
    userName: ''
  });
  const { userName } = UserName;
  const onInputChangeforUsername = e => {
    setUserName({ ...UserName, [e.target.name]: e.target.value });
  };


  const ITEMS_PER_PAGE = 6;
  const [addPost, setAddPost] = useState({
    userId: 10,
    title: '',
    body: ''
  })

  //Get ID
  const [editPostId, setEditPostId] = useState(null)

  const [editFormData, setEditFormData] = useState({
    userId: 10,
    title: '',
    StakeholderName: ''
  })

  const handleChange1 = async (event) => {
    DomainIds = event.target.value
    console.log("DomainIds::", DomainIds)
    setPersonName7(DomainIds)
    for (var i = 0; i < DomainIds.length; i++) {
        let domains2 = '';
        await axios.get('http://10.244.3.187:4300/api/v1/domain/' + DomainIds[i]).
            then(response => {
                Domains1[i] = response.data.Domain;
                domains2 = { DomainName: `${Domains1[i]}` }
            });
        // Domains1.push(domains2);
        console.log("Axios::Domains1::", Domains1)
        console.log("domains2::", domains2)
        data2.push(domains2);
     
    }
  

  
    console.log("data2", data2)
    const {
        target: { value },
    } = event;
    // typeof value === 'string' ? value.split(',') : value
    onInputChange(event);
};
const handleDomains=async(event)=>{
  const DoaminId=event.target.value;
  let Temp='';
  for(var i=0;i<DoaminId.length;i++)
  {
    await axios.get('http://10.244.3.187:4000/api/v1/allAssets/' + DoaminId[i]).then((res)=>console.log("Stakeholders::",(res.data),DomainNamess=res.data));
    console.log("DomainNamess:::",DomainNamess);
    // DomainNamess;
  }


  onInputChange(event);

}
const onInputChange = e => {
    console.log("e.target.value:", e.target.value);

    // this.setState({
    //     personName: e.target.value
    // }
    // );
    const Value = e.target.value; 
    setPersonName(Value)
    setStakeholdersList(Value);

};

const handleChange2=async(event) =>{
    StakeholderNames = event.target.value;
    // this.setState({ StakeholderName: event.target.value })
    setStakeholderName(StakeholderNames)
    console.log("StakeholderNames", StakeholderNames)

}
  //Get Form Values
  const handleChange = (input) => (e) => {
    e.preventDefault()
    console.log(addPost);
    setAddPost({ ...addPost, [input]: e.target.value });
  }


  //Add Data To Table
  const handleAddPost = async(e) => {
    e.preventDefault()

    const newPost = {
      id: nextId(),
      userId: addPost.userId,
      title: addPost.title,
      body: addPost.body
    }

    const newPosts = [...posts, newPost]
    setPosts(newPosts)
    // history.push('/home')
    console.log(newPosts);

    let data = {};

    for (var i = 0; i < DomainIds.length && i < Domains1.length; i++) {
        let domains2 = '';
        await axios.get('http://10.244.3.187:4000/api/v1/allAssets/' + DomainIds[i]).
            then(response => {
                Domains1[i] = response.data.Domain;
                domains2 = { DomainName: `${Domains1[i]}` }
            });

        let domainDetails = { DomainId: `${DomainIds[i]}`, DomainName: `${Domains1[i]}` }
        DomainData.push(domainDetails)
    }

    data = {
        StakeholderName: StakeholderNames,
        Domain: DomainData
    }
    console.log("Data Object::", data);

    const Temp = axios.post('http://10.244.3.187:4300/api/v1/stakeholder', data).then((res)=>toast.success("Stakeholder Added Successfully!!"))
    console.log("Temp:;", Temp);
    // const updateDomain = await axios.put(updatestring,article).then((res)=> toast.success("Domain Updated Successfully!!"))

    window.setTimeout(function () { window.location.reload() }, 3000)
  }

  //Edit data
  const handleEditPostForm = async(e, orgName) => {
    e.preventDefault()
    setEditPostId(orgName._id)
    console.log("orgName._id:",orgName._id);

    const formValues = {
    //   userId: post.userId,
    //   title: post.title,
    orgName: orgName.orgName,
    userName:orgName.userName,
    publicMandatoryField:orgName.publicMandatoryField,
    publicMandatoryData:orgName.publicMandatoryData,
    privateMandatoryField:orgName.privateMandatoryField,
    privateMandatoryData:orgName.privateMandatoryData,
    publicCommonData:orgName.publicCommonData,
    privateCommonData:orgName.privateCommonData

    }

    setEditFormData(formValues);
//     const result = "http://10.244.3.187:4000/api/v1/allAssetFields/" + editPostId
//  console.log("this is update string",result)
 
 const result=await axios.get('http://10.244.3.187:4000/api/v1/allAssetFields/'+ orgName._id)
 console.log("Result::",result.data.Result);
 for(let i=0;i<result.data.Result.length;i++)
 {
  setPmfFields(result.data.Result[i].publicMandatory);
  setPrmfFields(result.data.Result[i].privateMandatory);
  setPcfFields(result.data.Result[i].publicCommonData);
  setPrcfFields(result.data.Result[i].privateCommonData);
 }
  console.log("pmfFields::::",pmfFields);
  console.log("prmfFields::::",prmfFields);
  console.log("pcfFields::::",pcfFields);
  console.log("prcfFields::::",prcfFields);
 setpublicMandatoryCount(result.data.publicMandatoryCount);
 setprivateMandatoryCount(result.data.privateMandatoryCount);
 console.log("privateMandatoryCount::",result.data.privateMandatoryCount);
 setpublicCommonDataCount(result.data.publicCommonDataCount);
 console.log("publicCommonDataCount::",result.data.publicCommonDataCount);
 setprivateCommonDataCount(result.data.privateCommonDataCount);
 console.log("privateCommonDataCount::",result.data.privateCommonDataCount);

  }
  var publicMandatoryfields = [];
  var privateMandatoryfields = [];
  var publicCommonDatafields = [];
  var privateCommonDatafields = [];
  console.log("publicMandatoryCount::",publicMandatoryCount);

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
    console.log("EditForm Data:",editFormData.orgName)
    const article = {
        orgName:editFormData.orgName,
        userName:editFormData.userName
       
     
     };
     console.log()
     



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
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(fetchUrl)
      setPosts(data.data.getAllAssets)
      console.log("getAllAssets::",data.data.getAllAssets);
    //   console.log("Domain",data.data.Domain);
      return data
    }
      fetchData()
    
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


 
////Form Submit Data

const handleSubmit = async()=>{
event.preventDefault();

let arr = [];
let arr1=[];
let arr2=[];
let arr3=[];
  let caArr = [];
  let orgsNames = [];
  let count = 0;
  //fetching tables
  let orgDetails = document.getElementsByName("data");
  let orgDetails1 = document.getElementsByName("data1");
  let orgDetails2 = document.getElementsByName("data2");
  let orgDetails3 = document.getElementsByName("data3");


  //iterating over tables
  for (let i = 0; i < orgDetails.length; i++) {
    //fetching input values for specific table
    let tr = orgDetails[i].getElementsByTagName("input");
    let tr1 = orgDetails[i].getElementsByTagName("select");
    let errorfield = orgDetails[i].getElementsByTagName("p");
    //creating object from input values
    const org = new Object();
    org.name = tr[0].value;
    arr.push(org);
    caArr.push(org.ca)
    orgsNames.push(org.name)
    console.log("after pushing into array dats is:- ", arr)
  }
  let orgArray = []
  for (let i = 0; i < arr.length; i++) {

    let a = {
      "orgname": arr[i].name,
    }
    orgArray.push(a)
  }
  console.log("orgArray::",orgArray)
  // let finalDataformat = {
  //   "email": localStorage.getItem("email"),
  //   "appName": localStorage.getItem("rowAppName"),
  //   "data": orgArray
  // }
  // console.log("finalDataformat",finalDataformat);



  //iterating over tables
  for (let i = 0; i < orgDetails1.length; i++) {
    //fetching input values for specific table
    let tr = orgDetails1[i].getElementsByTagName("input");
    let tr1 = orgDetails1[i].getElementsByTagName("select");
    let errorfield = orgDetails1[i].getElementsByTagName("p");
    //creating object from input values
    const org1 = new Object();
    org1.name1 = tr[0].value;
    arr1.push(org1);
    caArr.push(org1.ca)
    orgsNames.push(org1.name1)
    console.log("after pushing into array1 dats is:- ", arr1)
  }
  let orgArray1 = []
  for (let i = 0; i < arr1.length; i++) {

    let a = {
      "orgname": arr1[i].name1,
    }
    orgArray1.push(a)
  }
  console.log("orgArray1::",orgArray1)
  // let finalDataformat1 = {
  //   "email": localStorage.getItem("email"),
  //   "appName": localStorage.getItem("rowAppName"),
  //   "data": orgArray
  // }
  // console.log("finalDataformat",finalDataformat1)
  




  //iterating over tables
  for (let i = 0; i < orgDetails2.length; i++) {
    //fetching input values for specific table
    let tr = orgDetails2[i].getElementsByTagName("input");
    let tr1 = orgDetails2[i].getElementsByTagName("select");
    let errorfield = orgDetails2[i].getElementsByTagName("p");
    //creating object from input values
    const org2 = new Object();
    org2.name2 = tr[0].value;
    arr2.push(org2);
    caArr.push(org2.ca)
    orgsNames.push(org2.name2)
    console.log("after pushing into array1 dats is:- ", arr2)
  }
  let orgArray2 = []
  for (let i = 0; i < arr2.length; i++) {

    let a = {
      "orgname": arr2[i].name2,
    }
    orgArray2.push(a)
  }
  console.log("org3::",org3)

}
let orgArray3 = []
for (let i = 0; i < arr3.length; i++) {

  let a = {
    "orgname": arr3[i].name3,
  }
  orgArray3.push(a)
}
console.log("orgArray3::",orgArray3);
console.log("orgsNames::",orgsNames);


}
  console.log("orgArray2::",orgArray2)
  // let finalDataformat2 = {
  //   "email": localStorage.getItem("email"),
  //   "appName": localStorage.getItem("rowAppName"),
  //   "data": orgArray
  // }
  // console.log("finalDataformat",finalDataformat1)





  //iterating over tables
  for (let i = 0; i < orgDetails3.length; i++) {
    //fetching input values for specific table
    let tr = orgDetails3[i].getElementsByTagName("input");
    const [organisationData, setOrgData] = useState([]);
    const [organisationData1, setOrgData1] = useState([]);
    let tr1 = orgDetails3[i].getElementsByTagName("select");
    let errorfield = orgDetails3[i].getElementsByTagName("p");
    //creating object from input values
    const org3 = new Object();
    org3.name3 = tr[0].value;
    arr3.push(org3);
    caArr.push(org3.ca)
    orgsNames.push(org3.name3)
    console.log("after pushing into array3 dats is:- ", arr3);
  }
for (let i = 0; i < publicMandatoryCount; i++) {
  publicMandatoryfields.push(`Public Mandatory:${pmfFields[i]}`);

 }
//  publicMandatoryfields = []
 for (let i = 0; i < privateMandatoryCount; i++) {
  privateMandatoryfields.push(`Private Mandatory:${prmfFields[i]}`);
}
for (let i = 0; i < publicCommonDataCount; i++) {
  publicCommonDatafields.push(`Public Mutable:${pcfFields[i]}`);
 }
 for (let i = 0; i < privateCommonDataCount; i++) {
  privateCommonDatafields.push(`Private Mutable:${prcfFields[i]}`);
  // inputFields=privateCommonDatafields;
}


  return (
    
    <div>
                          <Toast ref={toast} />
        <ToastContainer autoClose={2000} />
          <br></br>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
      <table className="table table-striped table-responsive" style={{marginTop:"4%"}}>
        <thead>
         
             <tr>
                           
                                <th>Asset Id</th>
                                <th>Actions</th>
                               
                            </tr>
        </thead>
        <tbody>
          <DynamicFormTable
            posts={(commentsData)}
            handleEditPostForm={handleEditPostForm} 
            showDetail={showDetail}/>
        </tbody>
        
      </table>
                  {/* <TableExample   posts={(commentsData)}/> */}

      <div style={{ float: "right" }}>
                                <Pagination
                                    total={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </div>
     
{/*Edit Row Modal */}
<div className="modal fade" id="editModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClose={handleClose}>
        
<div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create an Asset</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
           
            <form  onSubmit={handleSubmit} >
            
             
                {Number(publicMandatoryCount) > 0 && (
                  <div className="" style={{ width: '100%', height: '100%' }}>
                    <div className="row d-flex justify-content-center" style={{ width: '100%', height: '100%' }}>
                      {[...Array(publicMandatoryCount)].map((el, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between"
                          style={{ marginBottom: '10px', width: '100%', height: '100%', marginRight: '12px', borderLeft: '2px solid #137EA9', backgroundColor: '#F9F9F9', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', borderRadius: '5px' }}
                        >
                          <div style={{ width: '100%', height: '100%' }}>
                            <table className="" name="data" style={{ width: '100%', height: '100%', fontSize: '10px' }}>
                              <tbody>
                             
                                           {/* <th scope="row">Org-{index + 1} {el}</th> */}
                                           {/* <th scope="row" style={{fontSize:'18px',fontStyle:'bold'}}>{index + 1}{el}</th> */}

                                <tr>
                                {pmfFields.map((str,index1)  => {
                                 
              return(
              <th scope="row" key={index1}style={{fontSize:'18px',fontStyle:'bold'}}>{str}</th>

             )
                                })}
                                  <td>
                                    <p
                                      className="col-md-12 text-danger m-0"
                                    ></p>
                                    <input
                                      style={{ width: '100%', height: '100%', marginLeft: '10%' }}
                                      type="text"
                                      className="form-control"
                                      name="orgNameDetails"
                                      defaultValue={
                                        organisationData[index]
                                          ? organisationData[index].name
                                          : ""
                                      }
                                    ></input>
                                  </td>
                                </tr>

                               

                                
                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
         
                )}

{Number(privateMandatoryCount) > 0 && (
                  <div className="" style={{ width: '100%', height: '100%' }}>
                    <div className="row d-flex justify-content-center" style={{ width: '100%', height: '100%' }}>
                      {[...Array(privateMandatoryCount)].map((el, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between"
                          style={{ marginBottom: '10px', width: '100%', height: '100%', marginRight: '12px', borderLeft: '2px solid #137EA9', backgroundColor: '#F9F9F9', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', borderRadius: '5px' }}
                        >
                          <div style={{ width: '100%', height: '100%' }}>
                            <table className="" name="data1" style={{ width: '100%', height: '100%', fontSize: '10px' }}>
                              <tbody>
                                <tr>
                                {prmfFields.map((str,index) => {
              return(
              <th scope="row" key={index}style={{fontSize:'18px',fontStyle:'bold'}}>{str}</th>

             )
                                })}
                                  {/* <th scope="row" style={{fontSize:'18px',fontStyle:'bold'}}>Private Mandatory</th> */}
                                  <td>
                                    <p
                                      className="col-md-12 text-danger m-0"
                                    ></p>
                                    <input
                                      style={{ width: '100%', height: '100%', marginLeft: '10%' }}
                                      type="text"
                                      className="form-control"
                                      name="orgNameDetails"
                                      defaultValue={
                                        organisationData[index]
                                          ? organisationData[index].name1
                                          : ""
                                      }
                                    ></input>
                                  </td>
                                </tr>

                               
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                )}


              {Number(publicCommonDataCount) > 0 && (
                  <div className="" style={{ width: '100%', height: '100%' }}>
                    <div className="row d-flex justify-content-center" style={{ width: '100%', height: '100%' }}>
                      {[...Array(publicCommonDataCount)].map((el, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between"
                          style={{ marginBottom: '10px', width: '100%', height: '100%', marginRight: '12px', borderLeft: '2px solid #137EA9', backgroundColor: '#F9F9F9', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', borderRadius: '5px' }}
                        >
                          <div style={{ width: '100%', height: '100%' }}>
                            <table className="" name="data2" style={{ width: '100%', height: '100%', fontSize: '10px' }}>
                              <tbody>
                                <tr>
                                {pcfFields.map((str,index) => {
              return(
              <th scope="row" key={index}style={{fontSize:'18px',fontStyle:'bold'}}>{str}</th>

             )
                                })}
                                  {/* <th scope="row" style={{fontSize:'18px',fontStyle:'bold'}}>Public Mutable</th> */}
                                  <td>
                                    <p
                                      className="col-md-12 text-danger m-0"
                                    ></p>
                                    <input
                                      style={{ width: '100%', height: '100%', marginLeft: '10%' }}
                                      type="text"
                                      className="form-control"
                                      name="orgNameDetails"
                                      defaultValue={
                                        organisationData[index]
                                          ? organisationData[index].name2
                                          : ""
                                      }
                                    ></input>
                                  </td>
                                </tr>

                               
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                )}
                

            {Number(privateCommonDataCount) > 0 && (
                  <div className="" style={{ width: '100%', height: '100%' }}>
                    <div className="row d-flex justify-content-center" style={{ width: '100%', height: '100%' }}>
                      {[...Array(privateCommonDataCount)].map((el, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between"
                          style={{ marginBottom: '10px', width: '100%', height: '100%', marginRight: '12px', borderLeft: '2px solid #137EA9', backgroundColor: '#F9F9F9', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', borderRadius: '5px' }}
                        >
                          <div style={{ width: '100%', height: '100%' }}>
                            <table className="" name="data3" style={{ width: '100%', height: '100%', fontSize: '14px' }}>
                              <tbody>
                                <tr>
                                {prcfFields.map((str,index) => {
              return(
              <th key={index}style={{fontSize:'18px',fontStyle:'bold'}}>{str}</th>

             )
                                })}
                                  {/* <th scope="row" style={{fontSize:'18px',fontStyle:'bold'}}>Private Mutable</th> */}
                                  <td>
                                    <p
                                      className="col-md-12 text-danger m-0"
                                    ></p>
                                    <input
                                      style={{ width: '100%', height: '100%', marginLeft: '10%' }}
                                      type="text"
                                      className="form-control"
                                      name="orgNameDetails"
                                      defaultValue={
                                        organisationData[index]
                                          ? organisationData[index].name3
                                          : ""
                                      }
                                    ></input>
                                  </td>
                                </tr>

                               
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                )}
              {/* </div> */}
              <div className="d-flex " style={{ width: '30%', height: '9%', marginTop: '.5%', marginLeft: '70%' }}>
                <button type="submit" className="btn btn-primary" style={{ width:"100%",height:"100%", backgroundColor: '#137EA9', border: 'none',marginLeft:"0.2%",marginTop:"-1%",marginBottom:"2%"}} >Submit</button>
              </div>
            </form>
          {/* </div> */}
        {/* </div> */}
      </div>
    
           
          </div>
        </div>
      </div>




    </div>
  )
}

export default Tables