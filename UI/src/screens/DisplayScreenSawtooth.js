import React from "react";
import history from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSawtoothImage } from "../actions/Sawtooth/SawtoothAction";
import Header from "../components/Header";
import Footer from "../components/Footer";



const DisplayScreenSawtooth = () => {
  const history = useNavigate();

  const platform = localStorage.getItem("Platform");
  const nodes = localStorage.getItem("No. of Nodes");
  //const consensus = localStorage.getItem("Consensus").toLowerCase();
  const consensus = localStorage.getItem("Consensus")


  const dispatch = useDispatch();

  //Generate Script Function for sawtooth
  function imageDisplay() {
    console.log("Inside Getting Image for Sawtooth");
    dispatch(getSawtoothImage());
  }
  const navigateBack = () => {
    history("/choose_nw");
  };

  async function alertSubmit() {
    if (window.confirm("Are You Sure")) {
      await imageDisplay();
      console.log(localStorage.getItem("Sawtooth_base64code"))
      history("/script_sawtooth");

    }
  }
  // function alertSubmit(){
  //   history("/script_sawtooth");
  // }



  const navigateSawtoothScript = () => {
    history("/script_sawtooth");
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '14%' }}>
        <Header />
      </div>
      <div className="container" style={{
        border: '1px solid #B4B8BE',
        width: '75%',
        height: '65%',
        padding: '20px',
        marginBottom: '25px',
        marginTop: '25px',
        backgroundColor: 'white',
      }}>
        <div className="d-flex col-md-7 m-auto" style={{
          width: '100%',
          height: '8%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h6 style={{ fontSize: '14px', color: '#000000', fontWeight: '600', letterSpacing: '.5px' }}>Configured Network Details</h6>
        </div>

        <div className="d-flex col-md-12 align-middle justify-content-center mt-3">
          <table className="table table-striped" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th scope="row">Platform</th>
                <td>{localStorage.getItem("Platform")}</td>
              </tr>
              <tr>
                <th scope="row">Environment</th>
                <td>{localStorage.getItem("Environment")}</td>
              </tr>
              <tr>
                <th scope="row">Setup</th>
                <td>{localStorage.getItem("NodeType")}</td>
              </tr>
              {localStorage.getItem("Setup") === "single" && (
                <tr>
                  <th scope="row">Consensus</th>
                  <td>{localStorage.getItem("Consensus")}</td>
                </tr>
              )}
              {localStorage.getItem("Setup") === "multiNode" && (
                <tr>
                  <th scope="row">No of Nodes</th>
                  <td>{localStorage.getItem("NodeType")}</td>
                </tr>
              )}
              {localStorage.getItem("Setup") === "multi" && (
                <tr>
                  <th scope="row">Consensus</th>
                  <td>{localStorage.getItem("ConsensusMultiNode")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex " style={{ width: '30%', height: '9%', marginLeft: '70%', marginTop: '18%' }}>
          <button type="button" style={{ height: '100%', width: '40%', border: '1px solid #137EA9', color: '#137EA9' }} class="btn btn-outline-primary" onClick={navigateBack}>Back</button>
          <button className="btn btn-primary" style={{ height: '100%', width: '40%', marginLeft: '25px', backgroundColor: '#137EA9', border: 'none' }} onClick={alertSubmit}>Next</button>
        </div>
      </div>
      <div style={{ width: '100%', height: '8%', position: "fixed", bottom: 0, }}>
        <Footer className="footer_text" />
      </div>
    </div>
  );
};

export default DisplayScreenSawtooth;
