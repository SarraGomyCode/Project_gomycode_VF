import {
  GET_RAPPORTS,
  GET_RAPPORT,
  LOAD_RAPPORT,
  FAIL_RAPPORT,
} from "../actionTypes/rapport";

const intialState = {
  rapportList: [],
  laodRapport: false,
  errors: null,
  rapport: {},
};

const rapportReducers = (state = intialState, { type, payload }) => {
  switch (type) {
    case LOAD_RAPPORT:
      return { ...state, laodRapport: true };
    case GET_RAPPORTS:
      return { ...state, rapportList: payload.rapports, laodRapport: false };
    case FAIL_RAPPORT:
      return { ...state, errors: payload, laodRapport: false };
    case GET_RAPPORT:
      return { ...state, rapport: payload };
    default:
      return state;
  }
};

export default rapportReducers;
