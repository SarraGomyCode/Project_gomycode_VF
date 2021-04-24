import {
  FAIL_CLIENT,
  GET_CLIENT,
  GET_CLIENTS,
  LOAD_CLIENT,
} from "../actionTypes/client";
import axios from "axios";

export const getClients = () => async (dispatch) => {
  dispatch({ type: LOAD_CLIENT });
  try {
    let result = await axios.get("/clients");
    dispatch({ type: GET_CLIENTS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_CLIENT, payload: error.response.data });
  }
};

export const getClient = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/clients/${id}`);
    dispatch({ type: GET_CLIENT, payload: result.data.client });
  } catch (error) {
    dispatch({ type: FAIL_CLIENT, payload: error.response.data });
  }
};

export const postClient = () => async (dispatch) => {
  try {
    await axios.post("/client");
    dispatch(getClients);
  } catch (error) {
    dispatch({ type: FAIL_CLIENT, payload: error.response.data });
  }
};

export const deleteClient = (id) => async (dispatch) => {
  try {
    await axios.delete(`/client/${id}`);
    dispatch(getClients);
  } catch (error) {}
};

export const editClient = (id) => async (dispatch) => {
  try {
    await axios.put(`/client/${id}`);
    dispatch(getClients);
  } catch (error) {
    dispatch({ type: FAIL_CLIENT, payload: error.response.data });
  }
};
