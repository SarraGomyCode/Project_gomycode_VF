import {
  GET_CLIENTS,
  GET_CLIENT,
  LOAD_CLIENT,
  FAIL_CLIENT,
} from "../actionTypes/client";
const intialState = {
  clientList: [],
  laodClient: false,
  errors: null,
  client: {},
};

const clientReducers = (state = intialState, { type, payload }) => {
  switch (type) {
    case LOAD_CLIENT:
      return { ...state, laodClient: true };
    case GET_CLIENTS:
      return { ...state, clientList: payload.clients, laodClient: false };
    case FAIL_CLIENT:
      return { ...state, errors: payload, laodClient: false };
    case GET_CLIENT:
      return { ...state, client: payload };
    default:
      return state;
  }
};

export default clientReducers;
