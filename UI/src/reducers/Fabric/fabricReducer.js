// import { stat } from "fs";

//*********Login Api ***************************/
export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "login-api-request":
      return { loading: true }
    case "login-api-success":
      return { loading: false, response: action.payload }
    case "loading-api-fail":
      return { loading: false, error: action.payload }
    case "login-api-empty":
      return { loading: false, response: {} }
    default:
      return state;
  }
};

//*******************Register User  ***********/

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "register-api-request":
      return { loading: true }
    case "register-api-success":
      return { loading: false, response: action.payload }
    case "register-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

//**************NEW APP CREATE REDUCER ************/

export const newAppReducer = (state = {}, action) => {
  switch (action.type) {
    case "NewApp-api-request":
      return { loading: true };
    case "NewApp-api-success":
      return { loading: false, response: action.payload };
    case "NewApp-api-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


//*********Existing App Api **********************/
export const existingAppReducer = (state = {}, action) => {
  switch (action.type) {
    case "existingApp-api-request":
      return { loading: true }
    case "existingApp-api-success":
      return { loading: false, response: action.payload }
    case "existingApp-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

//*********APP STATUS API ****************************/
export const appStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case "appstatus-api-request":
      return { apploading: true }
    case "appstatus-api-success":
      return { apploading: false, appresponse: action.payload }
    case "appstatus-api-fail":
      return { apploading: false, apperror: action.payload }
    default:
      return state;
  }
}

// ***********GENERATING A DIAGRAM *********************/

export const getImageReducer = (state = {}, action) => {
  switch (action.type) {
    case "getImage-api-request":
      return { imageLoading: true }
    case "getImage-api-success":
      return { imageLoading: false, imageResponse: action.payload }
    case "getImage-api-fail":
      return { imageLoading: false, imageError: action.payload }
    default:
      return state;
  }
}


// ********** Generate Network Code **********
export const scriptReducer = (state = {}, action) => {
  switch (action.type) {
    case "api-request":
      return { loading: true };
    case "api-success":
      console.log("action.payload is", action.payload)
      return { loading: false, response: action.payload };
    case "api-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ************ Enroll Users *************
export const enrollUsersReducers = (state = {}, action) => {
  switch (action.type) {
    case "enroll-user-request":
      return { loading: true };
    case "enroll-user-success":
      return { loading: false, response: action.payload };
    case "enroll-user-fail":
      return { loading: false, error: action.payload };
  }
}

// ********** Start Network Code **********
export const startNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case "start-network-request":
      return { loading: true };
    case "start-network-success":
      return { loading: false, response: action.payload };
    case "start-network-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ********** Stop Network Code **********
export const stopNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case "network-stop-request":
      return { loading: true };
    case "network-stop-success":
      return { loading: false, response: action.payload };
    case "network-stop-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ********** channel Network Code **********
export const channelNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case "start-channel-request":
      return { loading: true };
    case "start-channel-success":
      return { loading: false, response: action.payload };
    case "start-channel-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ********** Remove Network Code **********
export const removeNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case "network-remove-request":
      return { rmNetworkloading: true };
    case "network-remove-success":
      return { rmNetworkloading: false, rmNetworkresponse: action.payload };
    case "network-remove-fail":
      return { rmNetworkloading: false, rmNetworkerror: action.payload };
    default:
      return state;
  }
};

//**********Fabric ChainCode Reducer*******************
export const FabricChaincodeReducer = (state = {}, action) => {
  switch (action.type) {
    case "fabric-cc-request":
      return { loading: true };
    case "fabric-cc-success":
      return { loading: false, response: action.payload };
    case "fabric-cc-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


//************Connector Reducer *****************/

export const connectorReducer = (state = {}, action) => {
  switch (action.type) {
    case "connector-api-request":
      return { loading: true }
    case "connector-api-success":
      return { loading: false, response: action.payload };
    case "connector-api-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export const orgDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "OrgData-api-request":
      return { loading: true }
    case "OrgData-api-success":
      return { loading: false, response: action.payload }
    case "OrgData-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

//**********Fabric ChainCode Reducer*******************
export const UpgradeFabricChaincodeReducer = (state = {}, action) => {
  switch (action.type) {
    case "upgradefabric-cc-request":
      return { upgradeloading: true };
    case "upgradefabric-cc-success":
      return { upgradeloading: false, upgraderesponse: action.payload };
    case "upgradefabric-cc-fail":
      return { upgradeloading: false, upgradeerror: action.payload };
    default:
      return state;
  }
};

export const departmentAllAdminsReducer = (state = {}, action) => {
  switch (action.type) {
    case "depatmentadmins-api-request":
      return { loading: true }
    case "depatmentadmins-api-success":
      return { loading: false, response: action.payload }
    case "depatmentadmins-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const chooseInfraReducer = (state = {}, action) => {
  switch (action.type) {
    case "chooseInfra-api-request":
      return { loading: true }
    case "chooseInfra-api-success":
      return { loading: false, response: action.payload }
    case "chooseInfra-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const newAppnAdminRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "appAdminregister-api-request":
      return { loading: true }
    case "appAdminregister-api-success":
      return { loading: false, response: action.payload }
    case "appAdminregister-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const newAppAdminlistReducer = (state = {},action) => {
  switch(action.type) {
    case "appAdminList-api-request" :
      return {loading :true}
      case "appAdminList-api-success":
        return{loading : false,response : action.payload}
      case "appAdminList-api-fail" : 
      return { loading: false, error: action.payload }
      default : 
      return state;

  }
}


export const departmentInfraListReducer = (state = {}, action) => {
  switch (action.type) {
    case "deptInfraList-api-request":
      return { loading: true }
    case "deptInfraList-api-success":
      return { loading: false, response: action.payload }
    case "deptInfraList-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const userInfraBindingAppAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "userInfraBindAppAdmin-api-request":
      return { loading: true }
    case "userInfraBindAppAdmin-api-success":
      return { loading: false, response: action.payload }
    case "userInfraBindAppAdmin-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const userenableDisableReducer = (state = {}, action) => {
  switch (action.type) {
    case "enableDisable-api-request":
      return { loading: true }
    case "enableDisable-api-success":
      return { loading: false, response: action.payload }
    case "enableDisable-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const allApiReducer = (state = {}, action) => {
  switch (action.type) {
    case "all_api_request":
      return { apiloading: true, appData: action.payload }
    case "all_api_success":
      return { apiloading: false, apiresponse: action.payload }
    case "all_api_fail":
      return { apiloading: false, apierror: action.payload }
      case "all_api_empty":
        return {apiLoading:false}
    default:
      return state;
  }
};

export const listOfPlatformsReducer = (state = {},action) => {


  switch (action.type) {
    case "platformList-api-request":
      return { loadings: true }
    case "platformList-api-success":
      return { loading: false, responses: action.payload }
    case "platformList-api-fail":
      return { loading: false, errors: action.payload }
    default:
      return state;
  }

}

// platformVersions 

export const  platformsVertionsReducer = (state = {},action) => {

  switch (action.type) {
    case "listOfvertions-api-request":
      return { loadinges: true }
    case "listOfvertions-api-success":
      return { loading: false, responsese: action.payload }
    case "listOfvertions-api-fail":
      return { loading: false, errores: action.payload }
    default:
      return state;
  }

} 

// dynamic channels 

export const dynamicChannelReducer = (state = {},action) => {
  switch (action.type) {
    case "channelNames-api-request":
      return { channelLoading: true }
    case "channelNames-api-success":
      return { channelLoading: false, channelResponse: action.payload }
    case "channelNames-api-fail":
      return { channelLoading: false, channelErrors: action.payload }
    default:
      return state;
  }
}

export const nbfAdminDeptRegMngReducer = (state = {}, action) => {
  switch (action.type) {
    case "nbfAdminDeptRegMng-api-request":
      return { loading: true }
    case "nbfAdminDeptRegMng-api-success":
      return { loading: false, response: action.payload }
    case "nbfAdminDeptRegMng-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}
// dynamic connector types  

export const conectorTypesReducer = (state = {},action) => {
  switch (action.type) {
    case "conectorTypes-api-request":
      return { conectorTypesLoading: true }
    case "conectorTypes-api-success":
      return { conectorTypesLoading: false, conectorTypesResponse: action.payload }
    case "conectorTypes-api-fail":
      return { conectorTypesLoading: false, conectorTypesErrors: action.payload }
    default:
      return state;
  }



}

// domainRolesTypes 

export const  domainRolesTypesReducers = (state = {},action) => {

  switch (action.type) {
    case "domainRolesTypes-api-request":
      return { domainRolesLoading: true }
    case "domainRolesTypes-api-success":
      return { domainRolesLoading: false, domainRolesResponse: action.payload }
    case "domainRolesTypes-api-fail":
      return { domainRolesLoading: false, domainRolesErrors: action.payload }
    default:
      return state;
  }

}
// DynamicRoles Using domainRoles Data

export const dynamicRolesTypesReducers = (state = {},action) => {

  switch (action.type) {
    case "dynamicRolesTypes-api-request":
      return { dynamicRolesLoading: true }
    case "dynamicRolesTypes-api-success":
      return { dynamicRolesLoading: false, dynamicRolesResponses: action.payload }
    case "dynamicRolesTypes-api-fail":
      return { dynamicRolesLoading: false, dynamicRolsError: action.payload }
    default:
      return state;
  }



}


//**********ORGS DATA SENDING *************/

export const orgsDataSendingReducer = (state = {},action) => {

  switch (action.type) {
    case "OrgDatasent-api-request":
      return { orgsDataLoading: true }
    case "OrgDatasent-api-success":
      return { orgsDataLoading: false, orgsDataResponse: action.payload }
    case "OrgDatasent-api-fail":
      return { orgsDataLoading: false, orgsDataError: action.payload }
    default:
      return state;
  }
}


//********ORGANIZATIONS DETAILS FETCH ********/

export const orgsDataFetchReducer = (state = {},action) => {

  switch (action.type) {
    case "OrgDatafetch-api-request":
      return { orgsDataFetchLoading: true }
    case "OrgDatafetch-api-success":
      return { orgsDataFetchLoading: false, orgsDataFetchResponse: action.payload }
    case "OrgDatafetch-api-fail":
      return { orgsDataFetchLoading: false, orgsDataFetchError: action.payload }
    default:
      return state;
  }
}

// nbfadminappConnectortypes 
export const nbfadminConnectorReducers = (state = {},action) => {
  switch (action.type) {
    case "adminConnectorNames-api-request":
      return { adminConnectorFetchLoading: true }
    case "adminConnectorNames-api-success":
      return {adminConnectorFetchLoading: false, adminConnectorFetchResponse: action.payload }
    case "adminConnectorNames-api-fail":
      return {adminConnectorFetchLoading: false, adminConnectorFetchError: action.payload }
    default:
      return state;
  }

}
// nbfadminLogin 

export const nbfAdminLoginData = (state = {},action) => {
  switch (action.type) {
    case "nbfAdminLogin-api-request":
      return { nbfAdminLoginLoading: true }
    case "nbfAdminLogin-api-success":
      return {nbfAdminLoginLoading: false, nbfAdminLoginResponse: action.payload }
    case "nbfAdminLogin-api-fail":
      return {nbfAdminLoginLoading: false, nbfAdminLoginError: action.payload }
    default:
      return state;
  }

}

export const nbfgetIPSReducer=(state={},action)=>{
  switch(action.type){
    case "nbfgetIPS-api-request":
      return { loading: true }
    case "nbfgetIPS-api-success":
      return { loading: false, response: action.payload }
    case "nbfgetIPS-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const chooseInfraStrReducer=(state={},action)=>{
  switch(action.type){
    case "chooseInfraStr-api-request":
      return { loading: true }
    case "chooseInfraStr-api-success":
      return { loading: false, response: action.payload }
    case "chooseInfraStr-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}
export const nbfgetNIPSReducer=(state={},action)=>{
  switch(action.type){
    case "nbfgetNIPS-api-request":
      return { loading: true }
    case "nbfgetNIPS-api-success":
      return { loading: false, response: action.payload }
    case "nbfgetNIPS-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}
export const nbfaddIPSReducer=(state={},action)=>{
  switch(action.type){
    case "nbfaddIPS-api-request":
      return { loading: true }
    case "nbfaddIPS-api-success":
      return { loading: false, response: action.payload }
    case "nbfaddIPS-api-fail":
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}
export const listOfInfraReducer = (state = {},action) => {
  switch (action.type) {
    case "infraList-api-request":
      return { loadings: true }
    case "infraList-api-success":
      return { loading: false, responses: action.payload }
    case "infraList-api-fail":
      return { loading: false, errors: action.payload }
    default:
      return state;
  }

}

export const nbfadminLocationReducer = (state = {},action) => {
  switch (action.type) {
    case "nbfAdminLocations-api-request":
      return { nbfAdminLocationsloadings: true }
    case "nbfAdminLocations-api-success":
      return { nbfAdminLocationsloading: false, nbfAdminLocationsresponses: action.payload }
    case "nbfAdminLocations-api-fail":
      return { nbfAdminLocationsloading: false, nbfAdminLocationserrors: action.payload }
    default:
      return state;
  }

}


export const nbfAdminConnectorNamesReducer = (state = {},action) => {
  switch (action.type) {
    case "nbfAdminConnectorNames-api-request":
      return { nbfAdminConnectorNamesloadings: true }
    case "nbfAdminConnectorNames-api-success":
      return { nbfAdminConnectorNamesloading: false, nbfAdminConnectorNamesresponses: action.payload }
    case "nbfAdminConnectorNames-api-fail":
      return { nbfAdminConnectorNamesloading: false, nbfAdminConnectorNameserrors: action.payload }
    default:
      return state;
  }

}



