import React, { useEffect, useRef, useState,useMemo } from 'react'
import axios from 'axios'
import nextId from "react-id-generator";
import { useNavigate } from "react-router-dom";
import ReadTableFunctions from './ReadTableFunctions';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from "../components/SmartContractScript/DataTable/Pagination/index";
import Search from "../components/SmartContractScript/DataTable/Search/index";
import { ScrollPanel } from 'primereact/scrollpanel';
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import '../css/SmartContractCSS/prism.css'; //Example style, you can use another
import OutlinedInput from '@mui/material/OutlinedInput';
import { Theme, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Toast } from 'primereact/toast';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';

var DomainNamess = [""];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 4;
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

var DomainData = [];
var StakeholderId = ''
var StakeholderName = ''
var FunctionNames='';
var Descriptions='';
var Codes='';
var Versions='';
var Domains1 = [];
var data2 = [];

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
  const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search1, setSearch1] = useState("");
    const ITEMS_PER_PAGE = 6;
  const [posts, setPosts] = useState([])
  const [CountryData,setCountryData] = useState([]);
  const [personName,setPersonName] = useState([]);
  const [FunctionName,setFunctionName] = useState([]);
  const [Description,setDescription] = useState([]);
  const [code,setCode] = useState([]);
  const [Version,setVersion] = useState([]);
  const [StakeholdersList,setStakeholdersList] = useState([]);
  const [personName7, setPersonName7] = React.useState([]);

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
    StakeholderName: '',
    FunctionName:'',
    Description:'',
    Code:'',
    Version:''

  })

  const handleStakeholder = async (event) => {
    StakeholderId = event.target.value
    console.log('StakeholderId::', StakeholderId);
    setPersonName7(StakeholderId)

    for (var i = 0; i < StakeholderId.length; i++) {
        let domains2 = '';
        await axios.get('http://10.244.3.187:4300/api/v1/stakeholder/' + StakeholderId[i]).
            then(response => {
                Domains1[i] = response.data.StakeholderName;
                domains2 = { DomainName: `${Domains1[i]}` }
            });
        console.log("Axios::Domains1::", Domains1)
        console.log("domains2::", domains2)
        data2.push(domains2);
    }
    axios.get('http://10.244.3.187:4300/api/v1/stakeholder/' + StakeholderId).
        then(response => {
            StakeholderName = response.data.StakeholderName
        });
    const {
        target: { value },
    } = event;
    onInputChange(event);
};
const handleStakeholders=async(event)=>{
  const StakeolderId=event.target.value;
  let Temp='';
  for(var i=0;i<StakeolderId.length;i++)
  {
    await axios.get('http://10.244.3.187:4300/api/v1/stakeholder_copy/' + StakeolderId[i]).then((res)=>console.log("Stakeholders::",(res.data),DomainNamess=res.data));
    console.log("DomainNamess:::",DomainNamess);
    // DomainNamess;
  }


  onInputChange(event);

}


const onInputChange = e => {
    console.log("e.target.value:", e.target.value);
    const Value = e.target.value; 
    setPersonName(Value)
    setStakeholdersList(Value);

};
const handleChange2=async(event) =>{
    FunctionNames = event.target.value;
    // this.setState({ StakeholderName: event.target.value })
    setFunctionName(FunctionNames)
    console.log("FunctionNames", FunctionNames)
}
const handleDescription=async(event) =>{
    Descriptions = event.target.value;
    // this.setState({ StakeholderName: event.target.value })
    setDescription(Descriptions)
    console.log("Descriptions", Descriptions)
}
const handleCode=async(event) =>{
    Codes = event.target.value;
    // this.setState({ StakeholderName: event.target.value })
    setCode(Codes)
    console.log("Codes", Codes)

}
const handleVersion=async(event) =>{
    Versions = event.target.value;
    // this.setState({ StakeholderName: event.target.value })
    setVersion(Versions)
    console.log("Versions", Versions)

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
        for (var i = 0; i < StakeholderId.length && i < Domains1.length; i++) {
            let domains2 = '';
            await axios.get('http://10.244.3.187:4300/api/v1/stakeholder/' + StakeholderId[i]).
                then(response => {
                    Domains1[i] = response.data.StakeholderName;
                    domains2 = { DomainName: `${Domains1[i]}` }
                });
            let domainDetails = { StakeholderName: `${Domains1[i]}`, StakeholderId: `${StakeholderId[i]}`, }
            DomainData.push(domainDetails)
        }

        data = {
            FunctionName: FunctionNames,
            Version: Versions,
            Description:Descriptions,
            Code: Codes,
            Stakeholders:DomainData
        }
        console.log("Data Object::", data);
        axios.post('http://10.244.3.187:4300/api/v1/nodefunction', data).then((res)=>toast.success("Function Added Successfully!!"))
        // alert("Functions Added Successfully");
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Functions Added Successfully', life: 3000 });
    window.setTimeout(function () { window.location.reload() }, 1000)
  }

  //Edit data
  const handleEditPostForm = (e, FunctionName) => {
    console.log("E:",FunctionName);
    e.preventDefault()
    setEditPostId(FunctionName._id)
    console.log("FunctionName._id:",FunctionName._id);
    const formValues = {
    FunctionName: FunctionName.FunctionName,
    Description:FunctionName.Description,
    Code:FunctionName.Code,
    Version: FunctionName.Version

    }

    setEditFormData(formValues)
  }

  const handleEditPostForm1 = (e, FunctionName) => {
    console.log("E:",FunctionName);
    e.preventDefault()
    setEditPostId(FunctionName._id)
    console.log("FunctionName._id:",FunctionName._id);
    const formValues = {
    FunctionName: FunctionName.FunctionName,
    Code:FunctionName.Code,
    }

    setEditFormData(formValues)
  }

  //Edit Form Data
  const handleEditFormClick = (input) => (e) => {
    e.preventDefault()
    console.log("handleEditFormClick:",e.target.value);
    console.log("Edit Form Data:",editFormData);
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
    FunctionName:editFormData.FunctionName,
 Description:editFormData.Description,
 Code:editFormData.Code,
 Version:editFormData.Version
 };
 const updatestring = "http://10.244.3.187:4300/api/v1/nodefunction/"+ editPostId
console.log("this is update string",updatestring);
toast.success("Function Updated Successfully!!")
window.setTimeout(function(){window.location.reload('http://10.244.3.187:3000/addfunctions')},3000)  

 const stakedelete1 = await axios.put(updatestring,article)
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
    const deletestring = "http://10.244.3.187:4300/api/v1/nodefunction/" + editPostId;
    const stakedelete = await axios.delete(deletestring);
    console.log('Response for Delete',stakedelete)
    toast.success("Function Deleted Successfully!!")
    // window.location.reload();
    window.setTimeout(function(){window.location.reload('http://10.244.3.187:3000/addfunctions')},3000)  


  }

  //Search Filter Data
  const [searchQuery, setSearchQuery] = useState("")
  function search() {
    return posts.filter(row => row.FunctionName.toLowerCase().indexOf(searchQuery) > - 1 || row.Version.toLowerCase().indexOf(searchQuery) > - 1)

  }

  //Get Data From JSON Placeholder
  const fetchUrl = "http://10.244.3.187:4300/api/v1/stakeholder";
  const functions = "http://10.244.3.187:4300/api/v1/nodefunction"

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(fetchUrl);
      setCountryData(data.data)

    //   setPosts(data.data)
      console.log("Stakeholder Data ::",data.data);
    //   console.log("Domain",data.data.Domain);

      return data
    }

    async function fetchFunction() {
        const data = await axios.get(functions)
        setPosts(data.data)
        console.log("Functions Data ::",data.data);
        return data
      }
      fetchData();
      fetchFunction();
     
  }, [fetchUrl])
  const commentsData = useMemo(() => {
    console.log("comments::", posts)
    let computedComments = posts;
    console.log("computedComments::", computedComments)

    setTotalItems(computedComments.length);
    if (search1) {
      search()
      computedComments = computedComments.filter(
          comment =>
              comment.FunctionName.toLowerCase().includes(search1.toLowerCase()) ||
              comment.Description.toLowerCase().includes(search1.toLowerCase()) ||
              comment.Version.toLowerCase().includes(search1.toLowerCase())

      );
  }
  function search() {
    return posts.filter(row => row.FunctionName.toLowerCase().indexOf(searchQuery) > - 1 )

  }
    return computedComments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
}, [posts,currentPage,search1]);
  return (
    
    <div>
                         <Toast ref={toast} />
        <ToastContainer autoClose={2000} />
                        <div className="addStakeholder">
                        {/* <div class="row">
                        <div class="col-sm" style={{marginTop:"2%",marginLeft:"1%"}}>
                        <button type="button"  style={{ color:"white",backgroundColor:"#137EA9"}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModalForm">
                        Add Functions +
                        </button>
                        
                         </div>
                         <div class="col-sm" style={{marginTop:"0.4%",marginLeft:"3%"}}>
                        <InputLabel id="demo-simple-select-label">Choose Stakeholders</InputLabel>

                        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          fullWidth
          multiple
          value={StakeholdersList}
          onChange={handleStakeholders}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          style={{border:"1px solid"}}
        >
          {CountryData.map((name) => (
            <MenuItem
              key={name}
              value={name._id}
            >
              {name.StakeholderName}
            </MenuItem>
          ))}
        </Select>
                        </div>

<div class="col-sm" style={{marginTop:"0.4%",marginLeft:"3%"}}>
                      
                      <InputLabel id="demo-simple-select-label">List of Functions</InputLabel>
  
                          <Select
                              
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            fullWidth
            value={personName7}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
            style={{border:"1px solid"}}
          >
              <ul>{DomainNamess.map((e, key) => {
                return (
                  <li value={e._id} key={key}>
                    {e.FunctionName}
                  </li>
                );
              })}  </ul>
          </Select>
                          </div>



<div class="col-sm-6" style={{maxWidth:"40%",marginLeft:"28%",marginTop:"2%"}}>
                        
                        <Search
                       
                       onSearch={value => {
                           setSearch1(value);
                           setCurrentPage(1);
                       }}
                   />
                        </div>

                        </div>  */}
                      
               </div><br></br>
               <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Item>
          <button type="button"  style={{ color:"white",backgroundColor:"#137EA9"}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModalForm">
                        Add Functions +
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
          <InputLabel id="demo-simple-select-label">Choose Stakeholders</InputLabel>

<Select
labelId="demo-multiple-name-label"
id="demo-multiple-name"
fullWidth
multiple
value={StakeholdersList}
onChange={handleStakeholders}
input={<OutlinedInput label="Name" />}
MenuProps={MenuProps}
>
{CountryData.map((name) => (
<MenuItem
key={name}
value={name._id}
>
{name.StakeholderName}
</MenuItem>
))}
</Select>

          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <InputLabel id="demo-simple-select-label">List of Functions</InputLabel>
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
{e.FunctionName}
</li>
);
})}  </ul>
</Select>
          </Item>
        </Grid>
      </Grid>
    </Box>
      <table className="table table-bordered table-striped table-responsive"style={{marginTop:"4%"}} >
        <thead>
          <tr>
            <th scope="col">Function Name</th>
            <th scope="col">Description</th>
            <th scope="col">Version</th>
            <th scope="col">Code</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <ReadTableFunctions
            posts={(commentsData)}
            handleEditPostForm={handleEditPostForm}
            handleEditPostForm1={handleEditPostForm1} />
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
              <h5 className="modal-title" id="exampleModalLabel">Add New Function</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPost}>
                <div className="mb-3">
                  <label className="form-label">Select Stakeholder</label>
                  {/* <Select
                                className="form-control"
                                labelId="demo1-simple-select-label"
                                required
                                id="demo-simple-select"
                                name="personName"
                                multiple
                                fullWidth
                                value={personName}
                                onChange={handleStakeholder}
                            >
                                {CountryData.map((name, key) => (
                                    <MenuItemWithCheckbox key={name._id} value={name._id} >
                                        {name.StakeholderName}
                                    </MenuItemWithCheckbox>
                                ))}
                            </Select> */}
                              <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          fullWidth
          value={personName}
           onChange={handleStakeholder}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {CountryData.map((name) => (
            <MenuItem
              key={name}
              value={name._id}
              style={getStyles(name, personName, theme)}
            >
              {name.StakeholderName}
            </MenuItem>
          ))}
        </Select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Function Name</label>
                  <input
                   value={FunctionName}
                    onChange={handleChange2}
                    className="form-control"
                    name="FunctionName"
                    placeholder="Enter Function Name"
                    required
                  ></input>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                   rows="4"
                   cols="50"
                   value={Description}
                    onChange={handleDescription}
                    className="form-control"
                    name="Description"
                    placeholder="Enter Description"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Code</label>
                  {/* <textarea
                   rows="4"
                   cols="50"
                   value={Code}
                    onChange={handleCode}
                    className="form-control"
                    name="Code"
                    placeholder="Enter Code "
                    required
                  ></textarea> */}
                     <ScrollPanel>
                                            <Editor 
     value={code} 
    //  onValueChange={code=>setCode(code)}
    TextareaAutosize
    onChange={handleCode}
    // onValueChange={Code=>setCode(Code)}  
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        border:"1px solid #2F6ECB",
        marginBottom:"10px",
        width:"100%",
        backgroundColor:"white",
        
      }}
    />
</ScrollPanel>
                </div>
                <div className="mb-3">
                  <label className="form-label">Version</label>
                  <input
                   type="text"
                   value={Version}
                    onChange={handleVersion}
                    className="form-control"
                    name="Version"
                    placeholder="Enter Version "
                    required
                  ></input>
                </div>
                <div className="modal-footer d-block">
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-success float-end">Submit</button>
                </div>
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
              <h5 className="modal-title" id="exampleModalLabel">Edit Function</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSave}>
                <div className="mb-3">
                </div>
                <div className="mb-3">
                  <label className="form-label">Function Name</label>
                  <input
                    className="form-control"
                    name="FunctionName"
                    value={editFormData.FunctionName}
                    required
                    onChange={handleEditFormClick("FunctionName")}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                   rows="4"
                   cols="50"
                    className="form-control"
                    name="Description"
                    value={editFormData.Description}
                    onChange={handleEditFormClick("Description")}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Code</label>
                  <ScrollPanel>
                                            <Editor 
     value={editFormData.Code} 
     onChange={handleEditFormClick("Code")}
    //  onValueChange={code=>setCode(code)}
    TextareaAutosize
    // onChange={handleCode}
    // onValueChange={Code=>setCode(Code)}  
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        border:"1px solid #2F6ECB",
        marginBottom:"10px",
        width:"100%",
        backgroundColor:"white",
        
      }}
    />
</ScrollPanel>
                  {/* <textarea
                   rows="4"
                   cols="50"
                   name="Code"
                   value={editFormData.Code}
                   onChange={handleEditFormClick("Code")}
                    className="form-control"
                    required
                  ></textarea> */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Version</label>
                  <input
                   type="text"
                   name="Version"
                   value={editFormData.Version}
                   onChange={handleEditFormClick("Version")}
                    className="form-control"
                    required
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
      
      {/*Edit Code Modal */}
      <div className="modal fade" id="editModalForm1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">View Code</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSave}>
                <div className="mb-3">
                  <label className="form-label">Code</label>
                  {/* <textarea
                   rows="4"
                   cols="50"
                   name="Code"
                   value={editFormData.Code}
                    className="form-control"
                    required
                  ></textarea> */}
                    <ScrollPanel>
                                            <Editor 
     value={editFormData.Code} 
    //  onValueChange={code=>setCode(code)}
    TextareaAutosize
    // onChange={handleCode}
    // onValueChange={Code=>setCode(Code)}  
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        border:"1px solid #2F6ECB",
        marginBottom:"10px",
        width:"100%",
        backgroundColor:"white",
        
      }}
    />
</ScrollPanel>
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