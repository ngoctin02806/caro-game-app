import { USER_ONLINE } from "./userOnline.types";

const INIT_STATE = {
  users: [],
};

const userOnlineReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_ONLINE:
      return {
        ...state,
        users: action.value.users,
      };

    default:
      return state;
  }
};

export default userOnlineReducer;
