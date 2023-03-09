import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  genSawtoothScript,
  startSawtoothScript,
  stopSawtoothScript,
  sawtoothTPScript,
} from "../actions/Sawtooth/SawtoothAction";

import "./../css/scripts.css";


const ScriptSawtooth = (props) => {
  const platform = localStorage.getItem("Platform");

  // const setup = localStorage.getItem("Setup");
  const nodes = localStorage.getItem("No. of Nodes");
  //const consensus = localStorage.getItem("Consensus").toLowerCase();
  const consensus = localStorage.getItem("Consensus")

  const tp = localStorage.getItem("SawtoothTP");

  const dispatch = useDispatch();

  //Generate Script Function for sawtooth
  function generateScript() {
    dispatch(genSawtoothScript(platform, nodes, consensus));
  }

  // Sawtooth Network Start Function
  function startSawtoothNetwork() {
    dispatch(startSawtoothScript());
  }

  // Sawtooth Network Stop Function
  function stopSawtoothNetwork() {
    dispatch(stopSawtoothScript());
  }

  return (
    <div style={{width: '100%', height: '100%',paddingLeft:'5%' }}>
      <nav style={{ width: '100%', height: '45%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',marginTop:'25px'}}>
        <Link to="/generate_script_sawtooth" className="sawtoothScriptcssLink">
          <a href="" onClick={generateScript} className="sawtoothScriptcssanchor">
            Generate Script
          </a>
        </Link>

        <Link to="/start_script_sawtooth" className="sawtoothScriptcssLink">
          <a href="" onClick={startSawtoothNetwork} className="sawtoothScriptcssanchor">
            Start Network
          </a>
        </Link>

        {/*<Link to="/sawtooth_tp" className="sawtoothScriptcssLink">
          <a href="" className="sawtoothScriptcssanchor">Deploy Smart Contract</a>
  </Link>*/}

        <Link to="/stop_script_sawtooth" className="sawtoothScriptcssLink">
          <a href="" onClick={stopSawtoothNetwork} className="sawtoothScriptcssanchor">
            Stop Network
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default ScriptSawtooth;
