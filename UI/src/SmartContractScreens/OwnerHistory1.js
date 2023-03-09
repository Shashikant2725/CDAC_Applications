import React,{useState,useEffect} from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import  "../css/SmartContractCSS/timeline1.css";
// import "../css/SmartContractCSS/assetHistoryTimeline.css"
import axios from "axios";
export default function App() {

    const [assets,setAssets] = useState([]);
    const fetchUrl = "http://10.244.3.187:4000/api/v1/allAssets";
    // const domain = "http://10.244.3.187:4300/api/v1/domain";
    
    useEffect(() => {
  
      async function fetchData() {
        const data = await axios.get(fetchUrl)
        // setPosts(DomainNamess)
        setAssets(data.data.getAllAssets)
  
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


  return (
    <>


<div class="row d-flex justify-content-center mt-70 mb-70">

<div class="col-md-6">

  <div class="main-card mb-3 card">

                              <div class="card-body" style={{width : "100%"}}>
                                  <h5 class="card-title">Asset History</h5>

                                  <div class="scroll-area">
                                  {assets.map((asset) => (

                                  <div class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column" key={asset._id}>
                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      {asset.publicMandatory.map(detail => (
                                          <div key={detail._id}>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-success"></i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-danger">Public Mandatory Fields</h4>
                                                  <p>{detail.publicMandatoryField}</p>
                                                  <span class="vertical-timeline-element-date">9:30 AM</span>
                                              </div>
                                          </div>
                                               ))}
                                      </div>
                                 
                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      {asset.publicMandatory.map(detail => (
                                          <div  key={detail._id}>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-danger"> </i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-success">Public Mandatory Data</h4>
                                                  <p>{detail.publicMandatoryData}</p>
                                                  <span class="vertical-timeline-element-date">6:00 PM</span>
                                              </div>
                                          </div>
                                           ))}
                                      </div>
                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      {asset.privateMandatory.map(detail => (
                                          <div key={detail._id}>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-primary"> </i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title text-danger">Private Mandatory Fields</h4>
                                                  <p>{detail.privateMandatoryField}</p>
                                                  <span class="vertical-timeline-element-date">9:00 AM</span>
                                              </div>
                                          </div>
                                          ))}
                                      </div>
                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      {asset.privateMandatory.map(detail => (
                                          <div>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-success"> </i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-success">Private Mandatory Data</h4>
                                                  <p>{detail.privateMandatoryData}</p>
                                                  <span class="vertical-timeline-element-date">10:30 PM</span>
                                              </div>
                                          </div>
                                          ))}
                                      </div>
                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      {asset.publicCommonData.map(detail => (
                                          <div>
                                          <span class="vertical-timeline-element-icon bounce-in">
                                              <i class="badge badge-dot badge-dot-xl badge-success"> </i>
                                          </span>
                                          <div class="vertical-timeline-element-content bounce-in">
                                              <h4 class="timeline-title  text-warning">Public Mutable Field</h4>
                                              <p>{detail.publicDataField}</p>
                                              <span class="vertical-timeline-element-date">10:30 PM</span>
                                          </div>
                                      </div>
                                           ))}
                                      </div>


                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      {asset.publicCommonData.map(detail => (
                                          <div>
                                          <span class="vertical-timeline-element-icon bounce-in">
                                              <i class="badge badge-dot badge-dot-xl badge-success"> </i>
                                          </span>
                                          <div class="vertical-timeline-element-content bounce-in">
                                              <h4 class="timeline-title  text-warning">Public Mutable Data</h4>
                                              <p>{detail.publicData}</p>
                                              <span class="vertical-timeline-element-date">10:30 PM</span>
                                          </div>
                                      </div>
                                           ))}
                                      </div>
                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      {asset.privateCommonData.map(detail => (
                                          <div>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-danger"> </i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-warning">Private Mutable Field</h4>
                                                  <p>{detail.privateDataField}</p>
                                                  <span class="vertical-timeline-element-date">6:00 PM</span>
                                              </div>
                                              
                                          </div>
                                          ))}
                                      </div>
                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      {asset.privateCommonData.map(detail => (
                                          <div>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-danger"> </i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-warning">Private Mutable Data</h4>
                                                  <p>{detail.privateData}</p>
                                                  <span class="vertical-timeline-element-date">6:00 PM</span>
                                              </div>
                                              
                                          </div>
                                          ))}
                                      </div>
                                    
                                  </div>
                                  ))}
                               </div>


                                

                              </div>
                          </div>        
 
</div>
 </div> 

     
    </>
   
  );
}