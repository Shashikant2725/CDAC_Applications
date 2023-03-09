// Generate Script endpoint for sawtooth

export const SawtoothScriptReducer = (state = {}, action) => {
  switch (action.type) {
    case "sawtooth-api-request":
      return { loading: true };
    case "sawtooth-api-success":
      return { loading: false, response: action.payload };
    case "sawtooth-api-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Sawtooth Start Network Reducer
export const SawtoothStartScriptReducer = (state = {}, action) => {
  switch (action.type) {
    case "sawtooth-start-request":
      return { loading: true };
    case "sawtooth-start-success":
      return { loading: false, response: action.payload };
    case "sawtooth-start-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Sawtooth Stop Network Reducer
export const SawtoothStopNetworkReducer = (state = {}, action) => {
  switch (action.type) {
    case "sawtooth-stop-request":
      return { loading: true };
    case "sawtooth-stop-success":
      return { loading: false, response: action.payload };
    case "sawtooth-stop-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Sawtooth Transaction Processor Reducer
export const SawtoothTransactionProcessorReducer = (state = {}, action) => {
  switch (action.type) {
    case "sawtooth-tp-request":
      return { loading: true };
    case "sawtooth-tp-success":
      return { loading: false, response: action.payload };
    case "sawtooth-tp-fail":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const GetSawtoothImageReducer = (state = {}, action) => {
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