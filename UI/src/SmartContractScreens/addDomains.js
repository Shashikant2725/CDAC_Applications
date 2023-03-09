import React from "react";
import { useState, useEffect,useRef } from "react";
import Header from "../NBFsuperAdminComponents/NBFHeader";
import Footer from "../components/Footer";
import NBFAdminScript from "../NBFsuperAdminComponents/NBFAdminScript"
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'primereact/toast';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import DomainDetail from "./DoaminDetails"
export default function Domain() {
  useEffect(() => {
    // WebFont.load({
    //   google: {
    //     families: ['Droid Sans', 'Chilanka']
    //   }
    // });
   }, []);
  const [domainName, setDomainName] = useState({
    Domain: ''
  });
  //  toast = useRef(null);
const[disableButton,setDisableButton] = useState();
  const { Domain } = domainName;
  const onInputChange = e => {
    setDomainName({ ...domainName, [e.target.name]: e.target.value, });

  };
  const data = useSelector((store) => store.start_network);
  const { error, response, loading } = data;
  let startTime = sessionStorage.getItem("startNTime")
  let imageBase64 = sessionStorage.getItem("base64code")
  var timeTaken
  if (loading === false) {
    let endTime = Date.now();
    var ms = Math.abs(endTime - startTime),
      min = Math.floor((ms / 1000 / 60) << 0),
      sec = Math.floor((ms / 1000) % 60);
    timeTaken = min + " min" + ":" + sec + " sec"
    console.log(min + " min" + ':' + sec + " sec");
  }
  // if (!new RegExp(/^[a-z0-9]{1,16}$/m, "i").test(domainName)) {
  //     toast.error("Please Enter Valid Domain Name !!");
  //   }
  const handleSubmit = async e => {
    e.preventDefault();
    // const response=await axios.post("http://10.244.3.187:4300/api/v1/domain", domainName).then((res)=>alert(JSON.stringify(res.data.Status)));
    const response=await axios.post("http://10.244.3.187:4300/api/v1/domain", domainName);
    toast.success("Domain Added Successfully!!");

    // console.log("Request Order Details::", response);
    // if(response!=null){
    //   alert("Domain Added Successfully");
   
    // }   
    window.setTimeout(function () { window.location.reload() }, 1000)

  };

  return (
    
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6' }}>
            <Toast ref={toast} />
        <ToastContainer autoClose={2000} />
      <div className="" style={{ width: '100%', height: '14%' }}><Header />
       <Toast ref={toast} position="bottom-center" />
      </div>
      <div style={{
        width: '100%',
        height: '72%',
        marginTop: '19px',
        marginBottom: '19px',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div className="leftScript">< NBFAdminScript style={{ width: '100%', height: '100%' }} /></div>
        <div className="rightScript">
          {/* <div className="rightNavScript">
            <div className="NavLeft">
              <p>/</p>
              <p style={{ color: '#137EA9' }}>Smart Contract</p>
              <p>/</p>
              <p>Add Domain</p>
            </div>
          </div> */}
          <div className="addDomain">
          <div className="createDomain"></div>
          {/* <div className="enterDomain"></div> */}
          <form onSubmit={e => handleSubmit(e)}>
            <div class="row">
              <div class="col-lg-6">
              {/* <div className="enterDomain"></div> */}
              <InputLabel id="demo1-simple-select-label" style={{fontSize:"14px",marginTop:"16px",marginLeft:"23px",color:"black"}}>Enter Domain</InputLabel>

          {/* <input type="text"></input> */}
              <TextField name="Domain"  
                    value={Domain}   style={{width:"400px",backgroundColor:"white",marginTop:"1%",marginLeft:"23px",fontFamily:"sans-serif",font:"24px"}}
                    onChange={e => onInputChange(e)}   id="fullWidth" required />
                            <button type="submit"  className="btn btn-primary" style={{ color:"white",backgroundColor:"#137EA9",marginLeft:"27px",width: "15%", height: "50px", marginTop: "1%", marginBottom: "20px",borderRadius:"5px" }}>Submit </button>

              </div>
              <div class="col-lg-6">
               
                </div>
            </div>
     
          </form>
          <DomainDetail />


       
          </div>

         
        </div>
      </div>
     
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}><Footer className="footer_text" /></div>
      <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '9%', marginLeft: '30%' }}>
        <div class="modal-dialog">
          <div class="modal-content" style={{ borderRadius: '12px', border: 'none' }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">View Application Setup details</h5>
              <button style={{ color: 'white' }} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div style={{ height: '25px', width: '100%', backgroundColor: '#F5F5F5', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>App Name</p>
                <p style={{ marginLeft: '90px', marginRight: '120px' }}>-</p>
              </div>
              <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                <p>Version</p>
                <p style={{ marginLeft: '110px', marginRight: '120px' }}>-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}