import React from 'react'
import CDAC from '../images/photo/CDAC.png'
import sets from '../images/photo/sets-india-chennai.png'
import idrbt from '../images/photo/idrbt.png'
import iit_hyd from '../images/photo/iit-hydrabad-logo.png'
import iit_logo from '../images/photo/iiit-logo.png'
import nic from '../images/photo/nic-logo.png'
import digital_india from '../images/photo/digital-india.png'


function ModifiedFooter() {
  
    return (
<div className='footer'>
<footer className="text-center text-lg-start  text-muted" style={{width: "60%"}}>
<section
    className=" ">
  <div className="">
 <div style={{display:"flex"}} >
   <a href ="https://cdac.in/"><img src={CDAC} alt="" className="me-4 text-reset" id="cdac"  /></a>
   <a href="https://setsindia.in/"><img src={sets} alt="" className="me-4 text-reset" id="sets"  /></a>
   <a href="https://idrbt.ac.in/"><img src={idrbt} alt="" className="me-4 text-reset" id="idrbt"  /></a>
   <a href="https://www.iiit.ac.in/"><img src={iit_hyd} alt="" className="me-4 text-reset" id="iit_hyd"  /></a>
  
   </div>
   
   <div className='footer1' >
   <a href="https://www.iiit.ac.in/"><img src={iit_logo} alt="" className="me-4 text-reset" id="iit_logo"  /></a>
   <a href="https://www.nic.in/"><img src={nic} alt="" className="me-4 text-reset" id="nic"  /></a>
   <a href="https://digitalindia.gov.in/"><img src={digital_india} alt="" className="me-4 text-reset" id="digital_india"  /></a>
 
   </div>
 </div>
  </section>
</footer>
</div>
  )
}
export default ModifiedFooter;