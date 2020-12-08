import { combineReducers } from "redux";

import counterReducer from "./Counter/counter.reducer";
import authReducer from "./Auth/auth.reducer";
import errorReducer from "./Error/error.reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  error: errorReducer,
});

export default rootReducer;
