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
const publicMandatoryfields = [];
const privateMandatoryfields = [];
const publicCommonDatafields = [];
const privateCommonDatafields = [];

const Tables = () => {

  const[record,setRecord] = useState([])

  const [modeldata,setModeldata] = useState([])
  const [publicMandatoryCount,setpublicMandatoryCount] = useState([]);
  const [privateMandatoryCount,setprivateMandatoryCount] = useState([]);
  const [publicCommonDataCount,setpublicCommonDataCount] = useState([]);
  const [privateCommonDataCount,setprivateCommonDataCount] = useState([]);

    //  const getData = async() =>
    //  {
    //      const result=await axios.get('http://10.244.3.187:4000/api/v1/allAssets')
    //      console.log("Result::",result.data.getAllAssets);
    //      setRecord(result.data.getAllAssets)
    //      console.log("Record._id",result.data.getAllAssets._id);
    //  }
     
    //  useEffect(() => {
    //     getData();
    //  },[])
    // const getData = async() =>
    // {
    //     const result=await axios.get('http://10.244.3.187:4000/api/v1/allAssetFields')
    //     console.log("Result::",result.data.Result);
    //     setpublicMandatoryCount(result.data.publicMandatoryCount);
    //     setprivateMandatoryCount(result.data.privateMandatoryCount);
    //     setpublicCommonDataCount(result.data.publicCommonDataCount);
    //     setprivateCommonDataCount(result.data.privateCommonDataCount);

    //     console.log("Countssss:",typeof(publicMandatoryCount));
    //     console.log("Countssss1:",typeof(privateMandatoryCount));
    // }      

    
    // useEffect(() => {
    //    getData();
       
    // },[])


     
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

 console.log("Result::",result.data.Result);
 setpublicMandatoryCount(result.data.publicMandatoryCount);
 console.log("publicMandatoryCount::",result.data.publicMandatoryCount);

 setprivateMandatoryCount(result.data.privateMandatoryCount);
 console.log("privateMandatoryCount::",result.data.privateMandatoryCount);

 setpublicCommonDataCount(result.data.publicCommonDataCount);
 console.log("publicCommonDataCount::",result.data.publicCommonDataCount);

 setprivateCommonDataCount(result.data.privateCommonDataCount);
 console.log("privateCommonDataCount::",result.data.privateCommonDataCount);

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
    return posts.filter(row => row.orgName.toLowerCase().indexOf(searchQuery) > - 1)

  }

  //Get Data From JSON Placeholder
  const fetchUrl = "http://10.244.3.187:4000/api/v1/allAssetsFields";
  const domain = "http://10.244.3.187:4000/api/v1/domain";
  // const fetch="http://10.244.3.187:4000/api/v1/allAssetsFields";
  useEffect(() => {

    async function fetchData() {
      const data = await axios.get(fetchUrl)
      // setPosts(DomainNamess)
      setPosts(data.data.getAllAssets)

      console.log("getAllAssets::",data.data.getAllAssets);
    //   console.log("Domain",data.data.Domain);

      return data
    }
    async function handleEditPostForm() {
      // const data = await axios.get(fetch)
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
      handleEditPostForm
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
              comment.orgName.toLowerCase().includes(search1.toLowerCase()) ||
              comment.userName.toLowerCase().includes(search1.toLowerCase()) 
              // comment.publicMandatoryField.toLowerCase().includes(search1.toLowerCase()) ||
              // comment.publicMandatoryData.toLowerCase().includes(search1.toLowerCase()) ||
              // comment.privateMandatoryField.toLowerCase().includes(search1.toLowerCase())
      );
  }
  function search() {
    return posts.filter(row => row.orgName.toLowerCase().indexOf(searchQuery) > - 1 ||  row.userName.toLowerCase().indexOf(searchQuery) > - 1)

  }
    return computedComments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
}, [posts,currentPage,search1]);


//// upload File

const [file, setFile] = useState();
const [fileName, setFileName] = useState("");

const saveFile = (e) => {
  setFile(e.target.files[0]);
  setFileName(e.target.files[0].name);
};

 const uploadFile = async (e) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  try {
    const res = await axios.post(
      "http://10.244.3.200:8300/upload",
      formData
    ).then((res)=>alert("uploaded"));
    console.log(res);
  } catch (ex) {
    console.log(ex);
  }
};


 //// Add Public Mandatory Data

 const [inputFields, setInputFields] = useState([{
  publicMandatoryField:'',
    publicMandatoryData:''
} ]);

const addInputField = ()=>{
    setInputFields([...inputFields, {
      publicMandatoryField:'',
      publicMandatoryData:''
    } ])
  
}
const removeInputFields = (index)=>{
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
}

///// Public Common Data and Field

const [inputFields2, setInputFields2] = useState([{
publicDataField:'',
  publicData:''
} ]);

const addInputField2 = ()=>{
  setInputFields2([...inputFields2, {
    publicDataField:'',
  publicData:''
  } ])

}
const removeInputFields2 = (index)=>{
  const rows = [...inputFields2];
  rows.splice(index, 1);
  setInputFields2(rows);
}

//// Add Private Mandatory Data

const [inputFields1, setInputFields1] = useState([{
privateMandatoryField:'',
privateMandatoryData:''
} ]);

const addInputField1 = ()=>{
setInputFields1([...inputFields1, {
  privateMandatoryField:'',
  privateMandatoryData:''
} ])

}
const removeInputFields1 = (index)=>{
const rows = [...inputFields1];
rows.splice(index, 1);
setInputFields1(rows);
}


///// Private Common Data

const [inputFields3, setInputFields3] = useState([{
privateDataField:'',
  privateData:''
} ]);

const addInputField3 = ()=>{
  setInputFields3([...inputFields3, {
    privateDataField:'',
    privateData:''
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
  orgName:'',
  } ]);
  
  const addInputField4 = (event)=>{
    
    setInputFields4([...inputFields4, {
      orgName:'',
    } ])
  
  }
  const removeInputFields4 = (index)=>{
    const rows = [...inputFields4];
    rows.splice(index, 1);
    setInputFields4(rows);
  }
  
  const handleChangeOrg = (index, evnt, id)=>{
  
  const { name, value} = evnt.target;
  const list = [...inputFields4];
  list[index][name] = value;
  setInputFields4(list);
  console.log("Public Data::",JSON.stringify(inputFields4))
  }

  ////Username
  const [inputFields5, setInputFields5] = useState([{
    userName:'',
    } ]);
    
    const addInputField5 = ()=>{
      setInputFields5([...inputFields5, {
        userName:'',
      } ])
    
    }
    const removeInputFields5 = (index)=>{
      const rows = [...inputFields5];
      rows.splice(index, 1);
      setInputFields5(rows);
    }
    
    const handleChangeUsername = (index, evnt, id)=>{
    
    const { name, value} = evnt.target;
    const list = [...inputFields5];
    list[index][name] = value;
    setInputFields5(list);
    console.log("Public Data::",JSON.stringify(inputFields5))
    }
////Form Submit Data

const handleSubmit = async(event,evnt1,evnt2,evnt3,evnt4,evnt5,evnt6)=>{
event.preventDefault();
console.log("evnt1 Valuee::",evnt1);
console.log("evnt2 Valuee::",evnt2);
console.log("evnt3 Valuee::",evnt3);
console.log("evnt4 Valuee::",evnt4);
console.log("evnt5 Valuee::",evnt5);
console.log("evnt6 Valuee::",evnt6);
// const orgName=evnt5;
// const userName=evnt6;
const data = {
  orgName,
  userName,
  publicMandatory:evnt1,
  privateMandatory:evnt2,
  publicCommonData:evnt3,
  privateCommonData:evnt4
  
}
const result=await axios.post("http://localhost:4000/api/v1/assetCreation",data).then((res)=>toast.success("Asset Created Successfully!!"));
console.log("Data::",data);
 window.setTimeout(async function(){await window.location.reload('http://10.244.3.187:2000/assetCreation')},1000)  

// alert("success");
// await axios.delete(deletestring).then((res)=>toast.success("Stakeholder Deleted Successfully!!"));
    // console.log('Response for Delete',stakedelete)
    // window.location.reload();


}

for (let i = 1; i <= publicMandatoryCount; i++) {
  publicMandatoryfields.push("Enter public Mandatory Data: ");
 }
//  for (let i = 1; i <= privateMandatoryCount; i++) {
//   privateMandatoryfields.push("Enter private Mandatory Data: ");
// }
// for (let i = 1; i <= publicCommonDataCount; i++) {
//   publicCommonDatafields.push("Enter public Mutable Data: ");
//  }
//  for (let i = 1; i <= privateCommonDataCount; i++) {
//   privateCommonDatafields.push("Enter private Mutable Data: ");
// }
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
                        Create Asset +
                        </button>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          {/* <button type="button" style={{ color:"white",backgroundColor:"#137EA9"}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModalForm">
                        Create Asset +
                        </button> */}
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
                                <th>Actions</th>
                                {/* <th>Org Name</th>
                                <th>Owner Name</th> */}
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
      {/*Add Modal */}
      <div className="modal fade" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create an Asset</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
           
            <form onSubmit={data =>handleSubmit (data,inputFields,inputFields1,inputFields2,inputFields3,inputFields4,inputFields5)}>
            {/* <input type="text"  onChange={(evnt)=>addInputField4(evnt)} name="Number Of Org" className="form-control"  placeholder="Org Name" required/> */}

            <div className="row">
              <div className="col-lg-12">
                {
                    inputFields4.map((data, index)=>{
                        const {publicMandatoryData, publicMandatoryField, salary}= data;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-6">
                  <div className="form-group">
                    <label> Org Name</label>
                  <input type="text"  onChange={e => onInputChangeforOrg(e)} value={orgName} name="orgName" className="form-control" required/>
                  </div>
                  </div> 

       <div className="col-md-6">
                  <div className="form-group">
                  <label> User Name</label>

                  <input type="text"  onChange={e => onInputChangeforUsername(e)} value={userName} name="userName" className="form-control"  required/>
                  </div>
                  </div> 
                  <div className="col-md-6">
               {/* {(inputFields4.length!==1)? <button className="btn btn-outline-danger" onClick={removeInputFields4}>x</button>:''} */}
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
                             <div className="col-md-5" >
                  <div className="form-group">
                  <label> Public Mandatory Field</label>

                  <input type="text"  onChange={(evnt)=>handleChangePublicData(index, evnt,  id="publicMandatory")} value={data.publicMandatoryField} name="publicMandatoryField" className="form-control"   required/>
                  </div>
                  </div>
                  <div className="col-md-5">
                  <div className="form-group">
                  <label> Public Mandatory Data</label>

                  <input type="text"  onChange={(evnt)=>handleChangePublicData(index, evnt,  id="publicMandatory")} value={data.publicMandatoryData} name="publicMandatoryData" className="form-control"  required/>
                  </div>
                  </div>
                 
                  <div className="col-md-1">
                    
                 {/* <button className="btn btn-primary " style={{ color:"white",backgroundColor:"#137EA9"}} onClick={addInputField}>Add New</button> */}
                 <Button  style={{marginTop:"20px",marginLeft:"-20px"}}  startIcon={<AddCircleIcon />}
              onClick={addInputField}
            >
        {/* Transfer Ownership */}
      </Button>
                  </div>
                  <div className="col-md-1">
               {/* {(inputFields.length!==1)? <button className="btn btn-danger" onClick={removeInputFields}>x</button>:''} */}
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
                             <div className="col-md-5">
                  <div className="form-group">
                  <label>Private Mandatory Field</label>

                  <input type="text"  onChange={(evnt)=>handleChangePrivateData(index, evnt,  id="privateMandatory")} value={data.privateMandatoryField} name="privateMandatoryField" className="form-control"  required/>
                  </div>
                  </div>
                  <div className="col-md-5">
                  <div className="form-group">
                  <label>Private Mandatory Data</label>

                  <input type="text"  onChange={(evnt)=>handleChangePrivateData(index, evnt,  id="privateMandatory")} value={data.privateMandatoryData} name="privateMandatoryData" className="form-control" required/>
                  </div>
                  </div>        
                  {/* <div className="col-md-1">
               {(inputFields1.length!==1)? <button className="btn btn-danger" onClick={removeInputFields1}>x</button>:''}
                  </div> */}
                   <div className="col-md-1">
                 {/* <button className="btn btn-primary " style={{ color:"white",backgroundColor:"#137EA9"}} onClick={addInputField}>Add New</button> */}
                 <Button style={{marginTop:"20px",marginLeft:"-20px",width:"auto"}}   startIcon={<AddCircleIcon />}
              onClick={addInputField1}
            >
        {/* Transfer Ownership */}
      </Button>
                  </div>
                <div className="col-md-1">
               {/* {(inputFields.length!==1)? <button className="btn btn-danger" onClick={removeInputFields}>x</button>:''} */}
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
                             <div className="col-md-5">
                  <div className="form-group">
                  <label>Public Mutable Field</label>

                  <input type="text"  onChange={(evnt)=>handleChangePublicCommonData(index, evnt,  id="publicMandatory")} value={data.publicDataField} name="publicDataField" className="form-control"   required/>
                  </div>
                  </div>
                  <div className="col-md-5">
                  <div className="form-group">
                  <label>Public Mutable Data</label>

                  <input type="text"  onChange={(evnt)=>handleChangePublicCommonData(index, evnt,  id="publicMandatory")} value={data.publicData} name="publicData" className="form-control"  required/>
                  </div>
                  </div>
                  {/* <div className="col-md-2">
               {(inputFields2.length!==1)? <button className="btn btn-danger" onClick={removeInputFields2}>x</button>:''}
                  </div> */}
                  <div className="col-md-1">
                 {/* <button className="btn btn-primary " style={{ color:"white",backgroundColor:"#137EA9"}} onClick={addInputField}>Add New</button> */}
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
                             <div className="col-md-5">
                  <div className="form-group">
                  <label>Private Mutable Field</label>

                  <input type="text"  onChange={(evnt)=>handleChangePrivateCommonData(index, evnt,  id="privateMandatory")} value={data.privateDataField} name="privateDataField" className="form-control"  required/>
                  </div>
                  </div>
                  <div className="col-md-5">
                  <div className="form-group">
                  <label>Private Mutable Data</label>

                  <input type="text"  onChange={(evnt)=>handleChangePrivateCommonData(index, evnt,  id="privateMandatory")} value={data.privateData} name="privateData" className="form-control"  required/>
                  </div>
                  </div>        
                  {/* <div className="col-md-2">
               {(inputFields3.length!==1)? <button className="btn btn-danger" onClick={removeInputFields3}>x</button>:''}
                  </div> */}
                    <div className="col-md-1">
                 {/* <button className="btn btn-primary " style={{ color:"white",backgroundColor:"#137EA9"}} onClick={addInputField}>Add New</button> */}
                 <Button  style={{marginTop:"20px",marginLeft:"-20px"}} startIcon={<AddCircleIcon />}
              onClick={addInputField3}
            >
        {/* Transfer Ownership */}
      </Button>
                  </div>
                   <div className="col-md-1">
               {/* {(inputFields.length!==1)? <button className="btn btn-danger" onClick={removeInputFields}>x</button>:''} */}
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

              {/* <TableExample /> */}
            
      <br/>
      {publicMandatoryfields.map((str) => {
        return(
          <>
           <br/>
            <span>{str}</span>
            <input/>
            <br/>

          </>
        )
      })}

        {/* {privateMandatoryfields.map((str) => {
                return(
                  <>
                   <br/>
                    <span>{str}</span>
                    <input/>
                    <br/>
                  </>
                )
              })}
               {publicCommonDatafields.map((str) => {
                return(
                  <>
                   <br/>
                    <span>{str}</span>
                    <input/>
                    <br/>
                  </>
                )
              })}
               {privateCommonDatafields.map((str) => {
                return(
                  <>
                   <br/>
                    <span>{str}</span>
                    <input/>
                    <br/>
                  </>
                )
              })} */}
   
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Tables