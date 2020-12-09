import axios from "axios";
import jwt_token from "jwt-decode";

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  GET_AUTH,
  LOGIN_FAIL,
  USER_RESEND_MAIL_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_LOADING,
  USER_RESEND_MAIL_LOADING,
  USER_VALIDATE_EMAIL_LOADING,
  USER_VALIDATE_EMAIL_SUCCESS,
  USER_VALIDATE_EMAIL_FAIL,
  USER_RESEND_MAIL_FAIL,
} from "./auth.types";

const existToken = localStorage.getItem("token");
const payload = existToken ? jwt_token(existToken) : { _verified: true };
const expireTime = localStorage.getItem("expire_time");
const profileId = localStorage.getItem("profile_id");

axios.defaults.headers.common["x-auth-token"] = existToken;

const INIT_STATE = {
  token: existToken,
  expireTime: expireTime,
  profileId: profileId,
  isAuthenticated: existToken ? true : false,
  isLoading: false,
  isValidated: payload._verified,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_RESEND_MAIL_LOADING:
    case USER_VALIDATE_EMAIL_LOADING:
    case LOGIN_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_RESEND_MAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isValidated: false,
      };
    }
    case USER_VALIDATE_EMAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isValidated: true,
      };
    }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.value.auth.token,
        expireTime: action.value.auth.expire_time,
        isAuthenticated: true,
        isLoading: false,
        isValidated: action.value.user.is_verified,
      };
    }
    case AUTH_ERROR:
    case USER_VALIDATE_EMAIL_FAIL:
    case USER_RESEND_MAIL_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL: {
      return {
        ...state,
        isAuthenticated: false,
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
