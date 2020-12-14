import { combineReducers } from "redux";

import counterReducer from "./Counter/counter.reducer";
import authReducer from "./Auth/auth.reducer";
import errorReducer from "./Error/error.reducer";
import userOnlineReducer from "./UserOnline/userOnline.reducer";
import userReducer from "./User/user.reducer";
import conversationReducer from "./Conversation/conversation.reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
  error: errorReducer,
  game: userOnlineReducer,
  chat: conversationReducer,
});

export default rootReducer;
