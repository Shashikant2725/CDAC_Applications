import React, { useEffect, useRef, useState,useMemo } from 'react'
import axios from 'axios'
import { Theme, useTheme } from '@mui/material/styles';
import nextId from "react-id-generator";
import DomainReadTable from './DomainReadTable';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Toast } from 'primereact/toast';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Pagination from "../components/SmartContractScript/DataTable/Pagination/index";
import Search from "../components/SmartContractScript/DataTable/Search/index";
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';


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

    // const toast= useRef(null);
  const [posts, setPosts] = useState([])
  const [CountryData,setCountryData] = useState([]);
  const [personName,setPersonName] = useState([]);
  const [StakeholderName,setStakeholderName] = useState([]);

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
const [Domain,setDomain]=useState([]);

  const [editFormData, setEditFormData] = useState({
    userId: 10,
    title: '',
    StakeholderName: ''
  })

  const handleChange1 = async (event) => {
    DomainIds = event.target.value
    console.log("DomainIds::", DomainIds)
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
const onInputChange = e => {
    console.log("e.target.value:", e.target.value);

    // this.setState({
    //     personName: e.target.value
    // }
    // );
    const Value = e.target.value; 
    setPersonName(Value)

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

    const Temp = axios.post('http://10.244.3.187:4300/api/v1/stakeholder', data).then((res)=>alert(JSON.stringify(res.data.Status)))
    console.log("Temp:;", Temp);
    // toast.success("Stakeholder Addedd Successfully !!");
    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Stakeholder Added Successfully', life: 3000 });

    // alert('Stakeholder Added Successfully');

    // Swal.fire({
    //     title: 'Success!',
    //     text: 'Your Stakeholder has been Saved Successfully',
    //     icon: 'success',
    //     confirmButtonText: 'Ok'

    // })
    window.setTimeout(function () { window.location.reload() }, 1000)
  }

  //Edit data
  const handleEditPostForm = (e, Domain) => {
    e.preventDefault()
    setEditPostId(Domain._id)
    console.log("Domain._id:",Domain._id);

    const formValues = {
    //   userId: post.userId,
    //   title: post.title,
    Domain: Domain.Domain
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
    console.log("Domain::",editPostId);
    console.log("EditForm Data:",editFormData.Domain)
    const article = {
        Domain:editFormData.Domain
     };
     console.log()
     const updatestring = "http://10.244.3.187:4300/api/v1/domain/" + editPostId
 console.log("this is update string",updatestring)
 
     const updateDomain = await axios.put(updatestring,article).then((res)=> toast.success("Domain Updated Successfully!!"))
     console.log("Updated ::updateDomain",updateDomain)
    //  const updateDomain = await axios.put(updatestring,article)
    // const updateDomain = await axios.put(updatestring,article);
   ;
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
    const deletestring = "http://10.244.3.187:4300/api/v1/domain/"+ editPostId
    // const deleteDomain = await axios.delete(deletestring).then((res)=>alert(JSON.stringify(res.data.Status)));
    const deleteDomain = await axios.delete(deletestring).then((res)=>toast.success("Domain Deleted Successfully!!"));

    console.log('Response for Delete',deleteDomain)
    // window.location.reload();

    window.setTimeout(function(){window.location.reload('http://10.244.3.187:3000/addstakeholder')},3000)  


  }


  //Search Filter Data
  const [searchQuery, setSearchQuery] = useState("")
  function search() {
    return posts.filter(row => row.Domain.toLowerCase().indexOf(searchQuery) > - 1) ||
    posts.filter(row => row.Domain.toUpperCase().indexOf(searchQuery) > - 1 )


  }

  //Get Data From JSON Placeholder
//   const fetchUrl = "http://10.244.3.187:4300/api/v1/stakeholder";
  const domain = "http://10.244.3.187:4300/api/v1/domain"

  useEffect(() => {
    // async function fetchData() {
    //   const data = await axios.get(fetchUrl)
    // //   setPosts(data.data)
    //   console.log(data.data);
    // //   console.log("Domain",data.data.Domain);

    //   return data
    // }

    async function fetchDomain() {
        const data = await axios.get(domain)
        // setPosts(data.data)
        setPosts(data.data)
        // setCountryData(data.data)
        console.log(data.data);
      //   console.log("Domain",data.data.Domain);
  
        return data
      }
    //   fetchData()
      fetchDomain()
    
  }, [domain])

  const commentsData = useMemo(() => {
    console.log("comments::", posts)
    let computedComments = posts;
    console.log("computedComments::", computedComments)

    setTotalItems(computedComments.length);
    if (search1) {
      search()
      computedComments = computedComments.filter(
          comment =>
              comment.Domain.toLowerCase().includes(search1.toLowerCase())

      );
  }
  function search() {
    return posts.filter(row => row.Domain.toLowerCase().indexOf(searchQuery) > - 1 ) ||
     posts.filter(row => row.Domain.toUpperCase().indexOf(searchQuery) > - 1 )


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
                        <div class="row">
                        <div class="col-sm"  style={{marginTop:"0.4%",marginLeft:"1%"}}>
                        </div>
                      

                        </div>
                        <Box sx={{ width: '40%' }} style={{marginLeft:"70%",marginTop:"-5.5%"}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={5}>
          <Item>
          <Search
                       
                       onSearch={value => {
                           setSearch1(value);
                           setCurrentPage(1);
                       }}
                      
                   />
          </Item>
        </Grid>
        {/* <Grid item xs={6}>
          <Item>

          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>

          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>

          </Item>
        </Grid> */}
      </Grid>
    </Box>
           {/* </div> */}
           <br></br>
      
   
      <table className="table table-bordered table-striped table-responsive" style={{backgroundColor:""}}>
        <thead>
          <tr>
            {/* <th scope="col">Stakeholder ID</th> */}
            {/* <th scope="col">ID</th> */}
            {/* <th scope="col">Domain</th> */}
            <th scope="col">Domain Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <DomainReadTable
            // posts={search(posts)}
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
              <h5 className="modal-title" id="exampleModalLabel">Add New Domain</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddPost}>
                <div className="mb-3">
                  <label className="form-label">Domain Name</label>
                  <input
                   value={StakeholderName}
                    onChange={handleChange2}
                    className="form-control"
                    name="body"
                    placeholder="Stakeholder"
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
              <h5 className="modal-title" id="exampleModalLabel">Edit Domain</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSave}>
                <div className="mb-3">
                  <label className="form-label">Domain Name</label>
                  <input
                    className="form-control"
                    name="Domain"
                    value={editFormData.Domain}
                    required
                    onChange={handleEditFormClick("Domain")}
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