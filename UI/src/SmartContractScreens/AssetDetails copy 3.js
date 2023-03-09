import React, { useEffect, useRef, useState,useMemo } from 'react'
import axios from 'axios'
import { Theme, useTheme } from '@mui/material/styles';
import nextId from "react-id-generator";
import { useNavigate } from "react-router-dom";
import ReadTablecopy from './ReadTablecopy';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Pagination from "../components/SmartContractScript/DataTable/Pagination/index";
import Search from "../components/SmartContractScript/DataTable/Search/index";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Toast } from 'primereact/toast';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@material-ui/core';

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
var  PublicMandatoryField = [];
var PublicMandatoryData=[];
var PublicDataField=[];
var PublicData=[];

var  PrivateMandatoryField = [];
var PrivateMandatoryData=[];
var PrivateDataField=[];
var PrivateData=[];

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


function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const MenuItemWithCheckbox = React.forwardRef(function MenuItemWithCheckbox(
    { children, selected, em = false, ...other },
    ref
) {
    return (
        <MenuItem {...other} selected={selected} ref={ref}>
            <Checkbox checked={selected} />
            {em && <em>{children}</em>}
            {!em && children}
        </MenuItem>
    );
});
const Tables = () => {
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
    await axios.get('http://10.244.3.187:4300/api/v1/domain_copy/' + DoaminId[i]).then((res)=>console.log("Stakeholders::",(res.data),DomainNamess=res.data));
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
        await axios.get('http://10.244.3.187:4300/api/v1/domain/' + DomainIds[i]).
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
  const handleEditPostForm = (e, StakeholderName) => {
    e.preventDefault()
    setEditPostId(StakeholderName._id)
    console.log("StakeholderName._id:",StakeholderName._id);

    const formValues = {
    //   userId: post.userId,
    //   title: post.title,
    StakeholderName: StakeholderName.StakeholderName
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
    console.log("EditForm Data:",editFormData.StakeholderName)
    const article = {
        Domain:"",
        StakeholderName:editFormData.StakeholderName
       
     
     };
     console.log()
     const updatestring = "http://10.244.3.187:4300/api/v1/stakeholder/" + editPostId
 console.log("this is update string",updatestring)
 
     const stakedelete1 = await axios.put(updatestring,article).then((res)=>toast.success("Stakeholder Updated Successfully!!"))
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

    console.log("Delete StakeholderId:",newPosts);

    console.log("editPostId:",editPostId);
    const deletestring = "http://10.244.3.187:4300/api/v1/stakeholder/"+ editPostId
    const stakedelete = await axios.delete(deletestring).then((res)=>toast.success("Stakeholder Deleted Successfully!!"));
    console.log('Response for Delete',stakedelete)
    // window.location.reload();
    window.setTimeout(function(){window.location.reload('http://10.244.3.187:3000/addstakeholder')},3000)  


  }


  //Search Filter Data
  const [searchQuery, setSearchQuery] = useState("")
  function search() {
    return posts.filter(row => row.StakeholderName.toLowerCase().indexOf(searchQuery) > - 1)

  }

  //Get Data From JSON Placeholder
  const fetchUrl = "http://localhost:4000/api/v1/allAssets";
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
              comment.StakeholderName.toLowerCase().includes(search1.toLowerCase())
      );
  }
  function search() {
    return posts.filter(row => row.StakeholderName.toLowerCase().indexOf(searchQuery) > - 1 )

  }
    return computedComments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
}, [posts,currentPage,search1]);


const [inputFields, setInputFields] = useState([{
  publicMandatoryField:'',
    publicMandatoryData:'',
    publicDataField:'',
    publicData:'',
} ]);

const addInputField = ()=>{
  setInputFields([...inputFields, {
    publicMandatoryField:'',
    publicMandatoryData:'',
    publicDataField:'',
    publicData:'',
  } ])

}

const removeInputFields = (index)=>{
  const rows = [...inputFields];
  rows.splice(index, 1);
  setInputFields(rows);
}



const [inputFields1, setInputFields1] = useState([{
  privateMandatoryField:'',
  privateMandatoryData:'',
  privateDataField:'',
  privateData:''
} ]);

const addInputField1 = ()=>{
  setInputFields1([...inputFields1, {
    privateMandatoryField:'',
    privateMandatoryData:'',
    privateDataField:'',
    privateData:''
  } ])

}
const removeInputFields1 = (index)=>{
  const rows = [...inputFields1];
  rows.splice(index, 1);
  setInputFields1(rows);
}


const handleChange5 = (index, evnt, id)=>{
  
  const { name, value} = evnt.target;
  const list = [...inputFields];
  list[index][name] = value;
  setInputFields(list);
  // console.log("Value::",value);
  // console.log("Index::", { name, value, index, id});
  console.log("Public Data::",JSON.stringify(inputFields))



}

const handleChange6 = (index, evnt, id)=>{
  
  const { name, value} = evnt.target;
  const list = [...inputFields1];
  list[index][name] = value;
  setInputFields1(list);
  // console.log("Value::",value);
  // console.log("Index::", { name, value, index, id});
console.log("Private Data::",JSON.stringify(inputFields1))


}
const handleSubmit = async(event,evnt1,evnt2)=>{
  event.preventDefault();
  console.log("event Valuee::",event.target.value);
  console.log("evnt1 Valuee::",evnt1);
  console.log("evnt2 Valuee::",evnt2);
  const data = {
    publicData:evnt1,
    privateData:evnt2
  }
  const result=await axios.post("http://localhost:4000/api/v1/assetCreation",data)
console.log("Data::",data);
alert("success");
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
          <button type="button" style={{ color:"white",backgroundColor:"#137EA9"}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModalForm">
                        Create Asset +
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
        <Grid item xs={3}>
          <Item>
          <InputLabel id="demo-simple-select-label">Choose Domains</InputLabel>

<Select
        selected
labelId="demo-multiple-name-label"
id="demo-multiple-name"
fullWidth
multiple
value={StakeholdersList}
onChange={handleDomains}
input={<OutlinedInput label="Name" />}
MenuProps={MenuProps}
>
{CountryData.map((name) => (
<MenuItem
key={name}
value={name._id}
>
{name.Domain}
</MenuItem>
))}
</Select>

          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <InputLabel id="demo-simple-select-label">List of Stakeholders</InputLabel>
  
  <Select          
labelId="demo-multiple-name-label"
id="demo-multiple-name"
multiple
fullWidth
value={personName7}
input={<OutlinedInput label="Name" />}
MenuProps={MenuProps}
>
<ul>{DomainNamess.map((e, key) => {
return (
<li value={e._id} key={key}>
{e.StakeholderName}
</li>
);
})}  </ul>
</Select>
          </Item>
        </Grid>
      </Grid>
    </Box>

      <table className="table table-bordered table-striped table-responsive" style={{marginTop:"4%"}}>
        <thead>
          <tr>
          <th scope="col">Public Mandatory Field</th>
            <th scope="col">Public Mandatory Data</th>
            <th scope="col">PublicDataField</th>
            <th scope="col">Public Data</th>

            <th scope="col">Private Mandatory Field</th>
            <th scope="col">Private Mandatory Data</th>
            <th scope="col">Private Data Field</th>
            <th scope="col">Private Data</th>
          </tr>
        </thead>
        <tbody>
          <ReadTablecopy
            posts={(commentsData)}
            handleEditPostForm={handleEditPostForm} />
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
              <h5 className="modal-title" id="exampleModalLabel">Create an Asset</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={data =>handleSubmit (data,inputFields,inputFields1)}>
          <div className="row">
              <div className="col-md-12">
                {
                    inputFields.map((data, index, id="publicMandatory")=>{
                        const {publicMandatoryData, publicMandatoryField, salary}= data;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col-md-6">        
                  <div className="form-group">
                  <input type="text"  onChange={(evnt)=>handleChange5(index, evnt,  id="publicMandatory")} value={data.publicMandatoryField} name="publicMandatoryField" className="form-control"  placeholder="Public Mandatory Field" required/>
                  </div>
                  <br />
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                  <input type="text"  onChange={(evnt)=>handleChange5(index, evnt,  id="publicMandatory")} value={data.publicMandatoryData} name="publicMandatoryData" className="form-control"  placeholder="Public Mandatory Data" required/>
                  </div>
                  </div>
                  <br />
                  <div className="col-md-6">
                  <div className="form-group">
                  <input type="text"  onChange={(evnt)=>handleChange5(index, evnt,  id="publicMandatory")} value={data.publicDataField} name="publicDataField" className="form-control"  placeholder="PublicDataField" required/>
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                  <input type="text"  onChange={(evnt)=>handleChange5(index, evnt,  id="publicMandatory")} value={data.publicData} name="publicData" className="form-control"  placeholder="Public Data" required/>
                  </div>
                  </div>
                  <div className="col">
               {(inputFields.length!==1)? <button className="btn btn-outline-danger" onClick={removeInputFields}>x</button>:''}
                  </div>
                </div>
                        )
                    })
                }
              <div className="row">
                  <div className="col-sm-12">
                  <button className="btn btn-outline-success " onClick={addInputField}>Add New</button>
                  </div>
              </div>
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputFields)}</div> */}
                </div>
              </div>
              <div className="col-sm-4">
              </div>
              <div className="row">
              <div className="col-sm-8">
                {
                    inputFields1.map((data, index, id="privateMandatory")=>{
                        const {privateMandatoryData, privateMandatoryField, salary}= data;
                        return(
                          <div className="row my-3" key={index}>
                             <div className="col">
                  <div className="form-group">
                  <input type="text"  onChange={(evnt)=>handleChange6(index, evnt,  id="privateMandatory")} value={data.privateMandatoryField} name="privateMandatoryField" className="form-control"  placeholder="Private Mandatory Field" required/>
                  </div>
                  </div>
                  <div className="col">
                  <div className="form-group">
                  <input type="text"  onChange={(evnt)=>handleChange6(index, evnt,  id="privateMandatory")} value={data.privateMandatoryData} name="privateMandatoryData" className="form-control"  placeholder="Private Mandatory Data" required/>
                  </div>
                  </div>

                  <div className="col">
                  <div className="form-group">
                  <input type="text"  onChange={(evnt)=>handleChange6(index, evnt,  id="privateMandatory")} value={data.privateDataField} name="privateDataField" className="form-control"  placeholder="PrivateDataField" required/>
                  </div>
                  </div>
                  <div className="col">
                  <div className="form-group">
                  <input type="text"  onChange={(evnt)=>handleChange6(index, evnt,  id="privateMandatory")} value={data.privateData} name="privateData" className="form-control"  placeholder="Private Data" required/>
                  </div>
                  </div>
                 
                  <div className="col">
              
              
               {(inputFields1.length!==1)? <button className="btn btn-outline-danger" onClick={removeInputFields1}>x</button>:''}
                
               
                  </div>
                </div>
                        )
                    })
                }
   
              <div className="row">
                  <div className="col-sm-12">
                  <button className="btn btn-outline-success " onClick={addInputField1}>Add New</button>
                  </div>
              </div>
              {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputFields1)}</div> */}

                </div>
              </div>
              <div className="col-sm-4">
              </div>
              <br/>
              <button type="submit" className="btn btn-primary" style={{ width:"12%",height:"35px", backgroundColor: '#137EA9', border: 'none',marginLeft:"0.2%",marginTop:"-1%",marginBottom:"2%"}} >Submit</button>

              </form>
            </div>
          </div>
        </div>
      </div>

      {/*Edit Row Modal */}
      <div className="modal fade" id="editModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Stekeholder</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSave}>
                {/* <div className="mb-3">
                  <label className="form-label">Domain Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userId"
                    value={editFormData.userId}
                    required
                    onChange={handleEditFormClick("userId")}
                    disabled
                  />
                </div> */}
                <div className="mb-3">
                  {/* <label className="form-label">Select Domain</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={editFormData.title}
                    required
                    onChange={handleEditFormClick("title")}
                  /> */}
                  
                </div>
                <div className="mb-3">
                  <label className="form-label">Public Mandatory Field</label>
                  <input
                   
                    className="form-control"
                    name="publicMandatoryField"
                    value={editFormData.PublicMandatoryField}
                    required
                    onChange={handleEditFormClick("publicMandatoryField")}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tables