import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Choose_nw from "./screens/Choose_nw";
import OrganizationScreen from "../src/screens/OrganizationScreen";
import OrdererScreen from "./screens/OrdererScreen";
import ChannelScreen from "./screens/ChannelScreen";
import DisplayScreen from "./screens/DisplayScreen";
import Scripts from "./components/Script";
import NewComponentScript from "./components/NewComponentScript";
import LoginScreen from "./screens/LoginScreen";
import FirstScreen from "./screens/FirstScreen";
import DisplayScreenSawtooth from "./screens/DisplayScreenSawtooth";
import GenerateScriptSawtooth from "./screens/GenerateScriptSawtooth";
import StartNetworkSawtooth from "./screens/StartNetworkSawtooth";
import StopNetworkSawtooth from "./screens/StopNetworkSawtooth";

import GenerateScriptScreen from "./screens/GenerateScriptScreen";
import StartNetworkScreen from './screens/StartNetworkScreen';
import CreateChannel from './screens/CreateChannel';
import UploadChaincode from './screens/UploadChaincode';
import UpgradeChaincode from './screens/UpgradeChaincode';
import SettingScreen from './screens/SettingScreen';

import StopNetworkScreen from './screens/StopNetworkScreen';
import DemoScreen6 from './screens/RemoveNetwork';
import ImageDisplaySawtooth from "./screens/ImageDisplaySawtooth"
import SawtoothTPScreen from "./screens/SawtoothTPScreen";
import SmartContractScreen from "./screens/SmartContractScreen";
import RegisterUser from "./screens/RegisterUser";
import EnrollUsersScreen from "./screens/EnrollUsersScreen";
import ViewUserScreen from "./screens/ViewUserScreen";
import GenericConnectorScreen from "./screens/GenericConnectorScreen";

import SuperUserLogin from "./NBFsuperAdminScreens/SuperUserLogin";
import DashboardScreen from "./NBFsuperAdminScreens/DashboardScreen";
import NBFAdminLogin from "./NBFsuperAdminScreens/NBFAdminLogin";
import NBFAdminDashboard from "./NBFsuperAdminScreens/NBFAdminDashboard";
import DepartmentDashboard from "./NBFsuperAdminScreens/DepartmentDashboard";
import HomeDashboard from "../src/NBFsuperAdminComponents/HomeDashboard";
import DepartmentUserM from "./NBFsuperAdminComponents/DepartmentUserM";
import DepartmentInfrastructure from "./NBFsuperAdminComponents/DepartmentInfrastructure";
import UserInfraBinding from "./NBFsuperAdminComponents/UserInfraBinding";
import NBFAdminHome from "./NBFsuperAdminComponents/NBFAdminHome";
import NBFAdminNetworkMng from "./NBFsuperAdminComponents/NBFAdminNetworkMng";
import NBFAdminInfraMng from "./NBFsuperAdminComponents/NBFAdminInfraMng";
import NBFAdminInfra from "./NBFsuperAdminComponents/NBFAdminInfra";

import NBFAdminDeptReg from "./NBFsuperAdminComponents/NBFAdminDeptReg";
import AdminLoginScreen from "./screens/AdminLoginScreen"


//import TemplateLibrary from "../src/SmartContractScreens/TemplateLibrary";






// import ScriptSawtooth from './components/ScriptsSawtooth';
import ImageDisplay from "./screens/ImageDisplay";
import RemoveNetwork from "./screens/RemoveNetwork";
import ExistingApp from "./screens/ExistingApp";
import NotFound from "./screens/NotFound"



// Smart Contract Import Starts Here/////
import TemplateLibrary from "./screens/SmartContract/templateLibrary";
import ZipDownload from "./screens/SmartContract/ZipDownload";
import GenericApi from './screens/SmartContract/GenericApi'
import Domain from "./SmartContractScreens/addDomains"
import Stakeholders from "./SmartContractScreens/addStakeholders";
import Functions from "./SmartContractScreens/addFunctions";
import Stakeholders1 from "./SmartContractScreens/assetCreation";
// {/* e pramaan */}

import RegistrationFrom from './middleware/RegistrationFrom'
import SSOResponse from "./middleware/SSOResponse";
import {ssoLoginSuccessful} from "./middleware/ssoLoginSuccessful";
import TransferOwner from "./SmartContractScreens/TransferOwner";
import OwnerHistory from "./SmartContractScreens/OwnerHistoryDashboard";
import AssetHistory from "./SmartContractScreens/AssetHistoryDashboard";

import OwnerHistory1 from "./SmartContractScreens/OwnerHistory1";
import MaterialTimeLine1 from "./SmartContractScreens/OwnerHistoryDashboard2";
import TableExample from "./SmartContractScreens/TableExample";
import CreateAssetByAdmin from "./SmartContractScreens/DashboardassetCreationByAdmin"
import DynamicFormDashboard from "./SmartContractScreens/DynamicFormDashboard"
import RestApiDashboard from './SmartContractScreens/RestApiDashboard'
import AssetDetailsDashboard from './SmartContractScreens/AssetDetailsDashboard'

function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100%', backgroundColor: '#F2F2F2' }} >
      <Router >
        <div className="header_footer_dist" style={{
          width: '100%',
          height: '100%',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
          }}>
            <Routes>
              <Route exact path="/" element={<LoginScreen />} />
              <Route path="/first_screen" element={<FirstScreen />} />
              <Route path="/choose_nw" element={<Choose_nw />} />
              <Route path="/organizations" element={<OrganizationScreen />} />
              <Route path="/orderer" element={<OrdererScreen />} />
              <Route path="/channels" element={<ChannelScreen />} />
              <Route path="/network_details" element={<DisplayScreen />} />
              <Route path="/scripts" element={<Scripts />} />
              <Route path="/script_sawtooth" element={<ImageDisplaySawtooth />} />
              <Route path="/generate_script_sawtooth" element={<GenerateScriptSawtooth />} />
              <Route path="/start_script_sawtooth" element={<StartNetworkSawtooth />} />
              <Route path="/stop_script_sawtooth" element={<StopNetworkSawtooth />} />

              <Route path="/nw_dtl_sawtooth" element={<DisplayScreenSawtooth />} />
              <Route path="/generateScript" element={<GenerateScriptScreen />} />
              <Route path="/startNetwork" element={<StartNetworkScreen />} />
              <Route path="/createChannel" element={<CreateChannel />} />
              <Route path="/uploadCC" element={<UploadChaincode />} />
              <Route path="/upgradeCC" element={<UpgradeChaincode />} />
              <Route path="/stopNetwork" element={<StopNetworkScreen />} />
              <Route path="/removeNetwork" element={<RemoveNetwork />} />
              <Route path="/sawtooth_tp" element={<SawtoothTPScreen />} />
              <Route path="/smart_contract" element={<SmartContractScreen />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/enrollusers" element={<EnrollUsersScreen />} />
              <Route path="/viewusers" element={<ViewUserScreen />} />
              <Route path="/settingscreen" element={<SettingScreen />} />
              <Route path="/diagram" element={<ImageDisplay />} />
              <Route path="/eapp" element={<ExistingApp />} />
              <Route path="/genericConnectorScreen" element={<GenericConnectorScreen />} />
              <Route path="/superUser" element={<SuperUserLogin />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/nbflogin" element={<NBFAdminLogin />} />
              <Route path="/nbfadminDashboard" element={<NBFAdminDashboard />} />
              <Route path="/departmentDashboard" element={<DepartmentDashboard />} />
              <Route path="/homedashboard" element={<HomeDashboard />} />
              <Route path="/deptusermanagement" element={<DepartmentUserM />} />
              <Route path="/deptinfra" element={<DepartmentInfrastructure />} />
              <Route path="/userinfrabinding" element={<UserInfraBinding />} />
              <Route path="/nbfAdminHome" element={<NBFAdminHome />} />
              <Route path="/nbfAdminNetworkMng" element={<NBFAdminNetworkMng />} />
              <Route path="/nbfAdminInfraMng" element={<NBFAdminInfra />} />
              <Route path="/nbfAdminDeptReg" element={<NBFAdminDeptReg />} />
         
         

              {/* Smart Contract Screens Routes */}
              <Route path="/templatelibrary" element={<TemplateLibrary />} />
              <Route path="/templateStudio" element={<ZipDownload />} />
              <Route path="/genericapi" element={<GenericApi />} />
              <Route path="/addDomains" element={<Domain />} />
              <Route path="/addStakeholders" element={<Stakeholders />} />
              <Route path="/addFunctions" element={<Functions />} />
              <Route path="/assetCreation" element={<Stakeholders1 />} />
              <Route path="/transferowner" element={<TransferOwner/>}/>
              <Route path="/assethistory" element={<OwnerHistory/>}/>
              <Route path="/ownerhistory" element={<AssetHistory/>}/>

              <Route path="/ownerhistory1" element={<OwnerHistory1/>}/>
              <Route path="/materialTimeline" element={<MaterialTimeLine1/>}/>
              <Route path="/assetCreateByAdmin" element={<CreateAssetByAdmin/>}/>
              <Route path="/dynamicform" element={<DynamicFormDashboard/>}/>
              <Route path="/restapi" element={<RestApiDashboard/>}/>
              <Route path="/assetdetails" element={<AssetDetailsDashboard/>}/>

              {/* admin login screens */}

              <Route path="/adminLogin" element = {<AdminLoginScreen/>} />
              <Route path="/tablenew" element = {<TableExample/>} />


              {/* TODO -  global routes handle for sso */}
              <Route path="*" element={<SSOResponse />}></Route>

              <Route path="/registrationFrom" element={<RegistrationFrom />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
