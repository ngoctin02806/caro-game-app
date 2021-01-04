import { UPDATE_POINT_END_GAME, USER_PROFILE } from "./user.types";

const INIT_STATE = {
  isLoading: false,
  id: "",
  username: "",
  avatar: "",
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        id: action.value.user._id,
        username: action.value.user.username,
        avatar: action.value.user.avatar,
        point: action.value.user.point || 0,
      };
    case UPDATE_POINT_END_GAME: {
      return {
        ...state,
        point: state.point + action.value.point,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
