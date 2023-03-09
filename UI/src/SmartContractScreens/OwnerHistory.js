import React,{useState,useEffect} from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import  "../css/SmartContractCSS/timeline.css";
import axios from "axios";
export default function App() {

    const [assets,setAssets] = useState([]);
    const fetchUrl = "http://localhost:4000/api/v1/allAssets";
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
     {assets.map((asset) => (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol md="12">
       
          <div id="content"  key={asset._id}>
         
            <ul className="timeline-1 text-black" >
                
            {asset.publicMandatory.map(detail => (
                
              <li className="event" data-date="12:30 - 1:00pm" key={detail._id}>
                <h4>Public Mandatory Fields</h4>
                <h6 className="mb-3">{detail.publicMandatoryField}</h6>
                <h4>Public Mandatory Data</h4>
                <h6 className="mb-3">{detail.publicMandatoryData}</h6> 
              </li>
              ))}

            {asset.privateMandatory.map(detail => (
                
              <li className="event" key={detail._id}>
                <h4>Private Mandatory Fields</h4>
                <h6 className="mb-3">{detail.privateMandatoryField}</h6>

                <h4>Private Mandatory Data</h4>
                <h6 className="mb-3">{detail.privateMandatoryData}</h6>
               
                
              </li>
              ))}
              {asset.publicCommonData.map(detail => (
                
                <li className="event" key={detail._id}>
                  <h4>Public Mutable Fields</h4>
                  <h6 className="mb-3">{detail.publicDataField}</h6>
  
                  <h4>Public Mutable Data </h4>
                  <h6 className="mb-3">{detail.publicData}</h6>
                 
                  
                </li>
                ))}

{asset.privateCommonData.map(detail => (
                
                <li className="event" key={detail._id}>
                  <h4>Private Mutable Fields</h4>
                  <h6 className="mb-3">{detail.privateDataField}</h6>
  
                  <h4>Private Mutable Data </h4>
                  <h6 className="mb-3">{detail.privateData}</h6>
                 
                  
                </li>
                ))}
            </ul>
       
          </div>
             
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      ))}
       
    </>
   
  );
}