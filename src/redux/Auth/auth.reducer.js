import {
  LOGIN_SUCCESS,
  GET_AUTH,
  LOGIN_FAIL,
  USER_LOADING,
  USER_LOADED,
  LOGIN_LOADING,
} from "./auth.types";

const existToken = localStorage.getItem("token");
const expireTime = localStorage.getItem("expire_time");
const profileId = localStorage.getItem("profile_id");

const INIT_STATE = {
  token: existToken,
  expireTime: expireTime,
  profileId: profileId,
  isAuthenticated: existToken ? true : false,
  isLoading: false,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.value.auth.token,
        expireTime: action.value.auth.expire_time,
        isAuthenticated: true,
        isLoading: false,
      };
    }

    case GET_AUTH: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
