import {
  scriptReducer,
  startNetworkReducer,
  stopNetworkReducer,
  removeNetworkReducer,
  FabricChaincodeReducer,
  channelNetworkReducer,
  loginUserReducer,
  registerUserReducer,
  newAppReducer,
  existingAppReducer,
  appStatusReducer,
  getImageReducer,
  connectorReducer,
  orgDataReducer,
  UpgradeFabricChaincodeReducer,
  departmentAllAdminsReducer,
  chooseInfraReducer,
  newAppnAdminRegisterReducer,
  newAppAdminlistReducer,
  departmentInfraListReducer,
  userInfraBindingAppAdminReducer,
  userenableDisableReducer,
  allApiReducer,
  listOfPlatformsReducer,
  platformsVertionsReducer,
  dynamicChannelReducer,
  nbfAdminDeptRegMngReducer,
  conectorTypesReducer,
  domainRolesTypesReducers,
  dynamicRolesTypesReducers,
  orgsDataSendingReducer,
  orgsDataFetchReducer,
  //enrollUsersReducers,
  nbfadminConnectorReducers,
  nbfAdminLoginData,
  nbfgetIPSReducer,
  chooseInfraStrReducer,
  listOfInfraReducer,
  nbfadminLocationReducer,
  nbfAdminConnectorNamesReducer
} from "./Fabric/fabricReducer";

import {
  SawtoothScriptReducer,
  SawtoothStartScriptReducer,
  SawtoothStopNetworkReducer,
  SawtoothTransactionProcessorReducer,
  GetSawtoothImageReducer
} from "./Sawtooth/sawtoothReducer";

import { combineReducers } from "redux";
import { nbfAdminLocations } from "../actions/Fabric/FabricAction";


 const reducers = combineReducers({
  login_api:loginUserReducer,
  register_api : registerUserReducer,
  newApp : newAppReducer,
  eApp:existingAppReducer,
  appStatus:appStatusReducer,
  imageData : getImageReducer,
  scripts: scriptReducer,
  start_network: startNetworkReducer,
  //enroll_user:enrollUsersReducers,
  start_channel: channelNetworkReducer,
  stop_network: stopNetworkReducer,
  remove_network: removeNetworkReducer,
  fabric_cc: FabricChaincodeReducer,
  connector : connectorReducer,
  sawtooth_gen_script: SawtoothScriptReducer,
  start_sawtooth_nw: SawtoothStartScriptReducer,
  stop_sawtooth_nw: SawtoothStopNetworkReducer,
  sawtooth_tp: SawtoothTransactionProcessorReducer,
  orgData:orgDataReducer,
  sawtoothImage:GetSawtoothImageReducer,
  upgradeFabricChaincode:UpgradeFabricChaincodeReducer,
  departmentAllAdmins:departmentAllAdminsReducer,
  chooseInfra:chooseInfraReducer,
  newAppnAdminRegister:newAppnAdminRegisterReducer,
  appAdminList : newAppAdminlistReducer,
  departmentInfraList:departmentInfraListReducer,
  userInfraBindingAppAdmin:userInfraBindingAppAdminReducer,
  userenableDisable:userenableDisableReducer,
  all_api:allApiReducer,
  userPlatformsList : listOfPlatformsReducer,
  userPlatformsVertions : platformsVertionsReducer,
  userDynamicChannels : dynamicChannelReducer,
  nbfAdminDeptRegMng:nbfAdminDeptRegMngReducer,
  userconectorTypes : conectorTypesReducer,
  userdomainRolesTypes : domainRolesTypesReducers,
  userdynamicRolesTypes : dynamicRolesTypesReducers,
  orgsData : orgsDataSendingReducer,
  orgsDataFetch : orgsDataFetchReducer,
  nbfConnectorNames : nbfadminConnectorReducers,
  adminLoginsuser : nbfAdminLoginData,
  nbfgetIPS:nbfgetIPSReducer,
  chooseInfraStr:chooseInfraStrReducer,
  infraList:listOfInfraReducer,
  adminLocation : nbfadminLocationReducer,
  adminConnector : nbfAdminConnectorNamesReducer
});

// export const rootReducer = (state = {}, action) => {
//   return reducers(state = {}, action)
// }

export default reducers;
