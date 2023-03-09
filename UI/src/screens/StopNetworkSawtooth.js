import SawtoothScript from "./../components/ScriptsSawtooth"
import Footer from "../components/Footer";
import Header from "../components/Header"
import home from '../images/home.png'
import eye from '../images/eye.png'

const StopNetworkSawtooth = () => {
  console.log(localStorage.getItem("Sawtooth_base64code"))
  let b64 = localStorage.getItem("Sawtooth_base64code")
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ECF2F6', position: 'relative' }}>
      <div className="" style={{ width: '100%', height: '14%' }}><Header /></div>
      <div style={{
        width: '100%',
        height: '72%',
        marginTop: '19px',
        marginBottom: '19px',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div className="leftScript"><SawtoothScript style={{ width: '100%', height: '100%' }} /></div>
        <div className="rightScript">
          <div className="rightNavScript">
            <div className="NavLeft">
              <img style={{ color: '#137EA9' }} src={home} width={18}></img>
              <p>/</p>
              <p style={{ color: '#137EA9' }}>Application Setup</p>
              <p>/</p>
              <p>Stop Network</p>
            </div>
            <div className="NavRight"><p data-bs-toggle="modal" data-bs-target="#exampleModal1"><img src={eye} width={18}></img> View Application Setup Details</p></div>                    </div>
          <div className="rightMainScript">
            <div style={{ width: "100%" }}>
              <img src={`data:image/png;base64,${b64}`} alt="Diagram" style={{ height: "50vh", width: "100%" }} />
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
                  <p>{localStorage.getItem("AppName")}</p>
                </div>
                <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                  <p>Version</p>
                  <p style={{ marginLeft: '110px', marginRight: '120px' }}>-</p>
                  <p>{localStorage.getItem("Version")}</p>
                </div>
                <div style={{ height: '25px', width: '100%', backgroundColor: '#F5F5F5', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                  <p>Platform</p>
                  <p style={{ marginLeft: '100px', marginRight: '120px' }}>-</p>
                  <p>{localStorage.getItem("Platform")}</p>
                </div>
                <div style={{ height: '25px', width: '100%', backgroundColor: 'white', display: 'flex', allignItems: 'center', fontSize: '12px', color: 'black', fontWeight: '800', paddingLeft: '16px' }}>
                  <p>ENV</p>
                  <p style={{ marginLeft: '126px', marginRight: '120px' }}>-</p>
                  <p>{localStorage.getItem("Environment")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default StopNetworkSawtooth;