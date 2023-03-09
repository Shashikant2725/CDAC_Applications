import React,{useState,useEffect} from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import  "../css/SmartContractCSS/timeline1.css";
// import "../css/SmartContractCSS/assetHistoryTimeline.css"
import axios from "axios";
export default function App() {

    const [assets,setAssets] = useState([]);
    const fetchUrl = "http://10.244.3.187:4000/api/v1/ownerDetails";
    // const domain = "http://10.244.3.187:4300/api/v1/domain";
    
    useEffect(() => {
  
      async function fetchData() {
        const data = await axios.get(fetchUrl)
        // setPosts(DomainNamess)
        setAssets(data.data.transferAllAssets)
  
        console.log("getAllAssets::",data.data.transferAllAssets);
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
                                  <h5 class="card-title">Owner History</h5>

                                  <div class="scroll-area">
                                  {assets.map((asset) => (

                                  <div class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column" key={asset._id}>
                                      <div class="vertical-timeline-item vertical-timeline-element">
                                      
                                          <div key={asset._id}>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-success"></i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-danger">Old Org Name</h4>
                                                  <p>{asset.orgName}</p>
                                                  <span class="vertical-timeline-element-date">9:30 AM</span>
                                              </div>
                                          </div>
                                          <div key={asset._id}>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-success"></i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-danger">Old Owner Name</h4>
                                                  <p>{asset.userName}</p>
                                                  <span class="vertical-timeline-element-date">9:30 AM</span>
                                              </div>
                                          </div>
                                          <div key={asset._id}>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-success"></i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-success">New Org Name</h4>
                                                  <p>{asset.newOrgName}</p>
                                                  <span class="vertical-timeline-element-date">10:30 AM</span>
                                              </div>
                                          </div>
                                          <div key={asset._id}>
                                              <span class="vertical-timeline-element-icon bounce-in">
                                                  <i class="badge badge-dot badge-dot-xl badge-success"></i>
                                              </span>
                                              <div class="vertical-timeline-element-content bounce-in">
                                                  <h4 class="timeline-title  text-success">New Owner Name</h4>
                                                  <p>{asset.newOwnerName}</p>
                                                  <span class="vertical-timeline-element-date">10:30 AM</span>
                                              </div>
                                          </div>
                                      </div>
                                 
                                    
                                      
                                      {/* <div class="vertical-timeline-item vertical-timeline-element">
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
                                      </div> */}


                                      {/* <div class="vertical-timeline-item vertical-timeline-element">
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
                                      </div> */}
                                      {/* <div class="vertical-timeline-item vertical-timeline-element">
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
                                      </div> */}
                                      {/* <div class="vertical-timeline-item vertical-timeline-element">
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
                                      </div> */}
                                    
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