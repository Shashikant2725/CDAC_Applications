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
              // comment.userName.toLowerCase().includes(search1.toLowerCase()) 
              // comment.publicMandatoryField.toLowerCase().includes(search1.toLowerCase()) ||
              // comment.publicMandatoryData.toLowerCase().includes(search1.toLowerCase()) ||
              // comment.privateMandatoryField.toLowerCase().includes(search1.toLowerCase())
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


 //// Add Public Mandatory Data

 let [inputFields, setInputFields] = useState([{
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

const handleChangePublicData = (index,evnt)=>{

const { name, value} = evnt.target;
const list = [...inputFields];
list[index][name] = value;
setInputFields(list);
console.log("Public Data::",JSON.stringify(inputFields));



// const newInputValues = [...inputValues];
// newInputValues[index] = event.target.value;
// setInputValues(newInputValues);
// console.log("inputValues::",inputValues)
}
// (index) => (e) => {
//   const newArray = data.map((item, i) => {
//     if (index === i) {
     

//       return { ...item, [e.target.name]: e.target.value };
//     } else {
//       console.log("publiccccc::",data);

//       return item;
//     }
//   });
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
  
 
  const removeInputFields4 = (index)=>{
    const rows = [...inputFields4];
    rows.splice(index, 1);
    setInputFields4(rows);
  }


  ////Username
  const [inputFields5, setInputFields5] = useState([{
    userName:'',
    } ]);
    
   
 
////Form Submit Data

const handleSubmit = async(event,evnt1,evnt2,evnt3,evnt4,evnt5,evnt6)=>{
event.preventDefault();
console.log("evnt1 Valuee::",evnt1);
console.log("evnt2 Valuee::",evnt2);
console.log("evnt3 Valuee::",evnt3);
console.log("evnt4 Valuee::",evnt4);
console.log("evnt5 Valuee::",evnt5);
console.log("evnt6 Valuee::",evnt6);
var sendingData = [{
  publicMandatoryData : pmfFields[0],
  value:inputFields[0].publicMandatoryData

},
{
  privateMandatoryData:prmfFields[0],
  value:inputFields1[0].privateMandatoryData
},{
  publicMutableData:pcfFields[0],
  value:inputFields2[0].publicCommonData
},
{
  privateMutableData:prcfFields[0],
  value:inputFields3[0].privateCommonData
}]
 
console.log('Axios Sending Data ', sendingData)
// const orgName=evnt5;
// const userName=evnt6;
alert('Asset Created Successfully')

const result1=await axios.post('http://10.244.2.142:8888/createGenericAsset',sendingData);
window.setTimeout(async function(){ window.location.reload('http://10.244.3.187:2000/dynamicform')},1000)  

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

const [inputValues, setInputValues] = useState(['', '', '']);

const handleInputChange = (index, event) => {
  const newInputValues = [...inputValues];
  newInputValues[index] = event.target.value;
  setInputValues(newInputValues);
  console.log("inputValues::",inputValues)
};

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
           
            <form onSubmit={handleSubmit}>
            
          <div className="row">
              <div className="col-lg-12">
                {
                    publicMandatoryfields.map((str, index, id="publicMandatory")=>{
                        const {publicMandatoryData1, publicMandatoryField1, salary}= str;
                        return(
                          <div className="row" key={index}>
                             <div className="col-md-12" >
                  <div className="form-group">
                  <label><b>{str}</b></label>
           
                  {/* <input type="text"  onChange={(evnt)=>handleChangePublicData(index,evnt)} name="publicMandatoryField" value={str}  hidden={true} className="form-control"/>
                  <input type="text"  onChange={(evnt)=>handleChangePublicData(index,evnt)} name="publicMandatoryData" value={inputFields.publicMandatory}  className="form-control" /> */}
                  <input type="text"  onChange={(evnt)=>handleChangePublicData(index, evnt,  id="privateMandatory")} value={str.publicMandatoryData} name="publicMandatoryData" className="form-control"  />

                  </div>
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
                    privateMandatoryfields.map((str, index, id="privateMandatory")=>{
                        const {privateMandatoryData, privateMandatoryField, salary}= str;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-12">
                  <div className="form-group">
                  <label><b>{str}</b></label>


                  <input type="text"  onChange={(evnt)=>handleChangePrivateData(index, evnt,  id="privateMandatory")} value={str.privateMandatoryData} name="privateMandatoryData" className="form-control"  />
                  </div>
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
                    publicCommonDatafields.map((str, index, id="publicMandatory")=>{
                        const {publicMandatoryData, publicMandatoryField, salary}= str;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-12">
                  <div className="form-group">
                  <label><b>{str}</b></label>

                  <input type="text"  onChange={(evnt)=>handleChangePublicCommonData(index, evnt,  id="publicMandatory")} value={str.publicCommonData} name="publicCommonData" className="form-control"   />
                  </div>
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
                    privateCommonDatafields.map((str, index, id="privateMandatory")=>{
                        const {privateMandatoryData, privateMandatoryField, salary}= str;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-12">
                  <div className="form-group">
                  <label><b>{str}</b></label>


                  <input type="text"  onChange={(evnt)=>handleChangePrivateCommonData(index, evnt,  id="privateMandatory")} value={str.privateCommonData} name="privateCommonData" className="form-control"  />
                  </div>
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




    </div>
  )
}

export default Tables