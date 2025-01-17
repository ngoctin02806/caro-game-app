import { combineReducers } from "redux";

import counterReducer from "./Counter/counter.reducer";
import authReducer from "./Auth/auth.reducer";
import errorReducer from "./Error/error.reducer";
import gameReducer from "./Game/game.reducer";
import userReducer from "./User/user.reducer";
import conversationReducer from "./Conversation/conversation.reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
  error: errorReducer,
  game: gameReducer,
  chat: conversationReducer,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  return rootReducer(action.type === "USER_LOGOUT" ? undefined : state, action);
};
