import {
  FAIL_RAPPORT,
  GET_RAPPORT,
  GET_RAPPORTS,
  LOAD_RAPPORT,
} from "../actionTypes/rapport";
import axios from "axios";

export const getRapports = () => async (dispatch) => {
  dispatch({ type: LOAD_RAPPORT });
  try {
    let result = await axios.get("/rapport");
    dispatch({ type: GET_RAPPORTS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_RAPPORT, payload: error.response.data });
  }
};

export const getRapport = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/rapport/${id}`);
    dispatch({ type: GET_RAPPORT, payload: result.data.rapport });
  } catch (error) {
    dispatch({ type: FAIL_RAPPORT, payload: error.response.data });
  }
};

export const postRapport = () => async (dispatch) => {
  try {
    await axios.post("/rapport");
    dispatch(getRapports);
  } catch (error) {
    dispatch({ type: FAIL_RAPPORT, payload: error.response.data });
  }
};

export const deleteRapport = (id) => async (dispatch) => {
  try {
    await axios.delete(`/rapport/${id}`);
    dispatch(getRapports);
  } catch (error) {}
};

export const editRapport = (id) => async (dispatch) => {
  try {
    await axios.put(`/rapport/${id}`);
    dispatch(getRapports);
  } catch (error) {
    dispatch({ type: FAIL_RAPPORT, payload: error.response.data });
  }
};
