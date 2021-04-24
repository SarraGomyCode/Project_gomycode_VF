import { combineReducers } from "redux";
import rapportReducers from "../reducers/rapport";
import clientReducers from "../reducers/client";
import userReducers from "../reducers/user";

const rootReducer = combineReducers({
  rapportReducers,
  clientReducers,
  userReducers,
});
export default rootReducer;
