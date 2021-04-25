import { combineReducers } from "redux";
import rapportReducers from "./rapport";
import clientReducers from "./client";
import userReducers from "./user";

const rootReducer = combineReducers({
  rapportReducers,
  clientReducers,
  userReducers,
});
export default rootReducer;
