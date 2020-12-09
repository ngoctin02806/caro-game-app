import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_RESEND_MAIL_LOADING,
  USER_VALIDATE_EMAIL_SUCCESS,
  USER_VALIDATE_EMAIL_LOADING,
  USER_RESEND_MAIL_SUCCESS,
  USER_VALIDATE_EMAIL_FAIL,
  USER_RESEND_MAIL_FAIL,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_FACEBOOK_SUCCESS,
} from "./auth.types";
import { GET_ERRORS } from "../Error/error.types";

export const login = (dispatch, { email, password }) => {
  dispatch({ type: LOGIN_LOADING });

  axios("/me/login", {
    method: "POST",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => {
      axios.defaults.headers.common["x-auth-token"] = res.data.data.auth.token;

      localStorage.setItem("token", res.data.data.auth.token);
      localStorage.setItem("expire_time", res.data.data.auth.expire_in);
      localStorage.setItem("profile_id", res.data.data.user._id);

      dispatch({ type: LOGIN_SUCCESS, value: res.data.data });
    })
    .catch((e) => {
      dispatch({ type: LOGIN_FAIL });
      dispatch({
        type: GET_ERRORS,
        value: {
          message: e.response.data.message,
          code: e.response.data.errors[0].code,
        },
      });
    });
};

export const register = (dispatch, { email, password, username }) => {
  dispatch({ type: REGISTER_LOADING });

  axios("/me/register", {
    method: "POST",
    data: {
      username: username,
      email: email,
      password: password,
    },
  })
    .then((res) => {
      axios.defaults.headers.common["x-auth-token"] = res.data.data.auth.token;

      localStorage.setItem("token", res.data.data.auth.token);
      localStorage.setItem("expire_time", res.data.data.auth.expire_in);
      localStorage.setItem("profile_id", res.data.data.user._id);

      dispatch({ type: REGISTER_SUCCESS, value: res.data.data });
    })
    .catch((e) => {
      dispatch({ type: REGISTER_FAIL });
      dispatch({
        type: GET_ERRORS,
        value: {
          message: e.response.data.message,
          code: e.response.data.errors[0].code,
        },
      });
    });
};

export const reSendMail = (dispatch) => {
  dispatch({ type: USER_RESEND_MAIL_LOADING });

  axios("/me/verified-code/send", {
    method: "POST",
  })
    .then((res) => {
      dispatch({ type: USER_RESEND_MAIL_SUCCESS });
    })
    .catch((e) => {
      dispatch({ type: USER_RESEND_MAIL_FAIL });
      dispatch({
        type: GET_ERRORS,
        value: {
          message: e.response.data.message,
          code: e.response.data.errors[0].code,
        },
      });
    });
};

export const validateEmail = (dispatch, { code }) => {
  dispatch({ type: USER_VALIDATE_EMAIL_LOADING });

  axios("/me/account/activate", {
    method: "POST",
    data: {
      code,
    },
  })
    .then((res) => {
      dispatch({ type: USER_VALIDATE_EMAIL_SUCCESS });
    })
    .catch((e) => {
      dispatch({ type: USER_VALIDATE_EMAIL_FAIL });
      dispatch({
        type: GET_ERRORS,
        value: {
          message: e.response.data.message,
          code: e.response.data.errors[0].code,
        },
      });
    });
};

export const loginByGoogle = (dispatch, { accessToken }) => {
  axios("/me/google/login", {
    method: "POST",
    data: {
      access_token: accessToken,
    },
  })
    .then((res) => {
      axios.defaults.headers.common["x-auth-token"] = res.data.data.auth.token;

      localStorage.setItem("token", res.data.data.auth.token);
      localStorage.setItem("expire_time", res.data.data.auth.expire_in);
      localStorage.setItem("profile_id", res.data.data.user._id);

      dispatch({ type: LOGIN_GOOGLE_SUCCESS, value: res.data.data });
    })
    .catch((e) => {
      dispatch({
        type: GET_ERRORS,
        value: {
          message: e.response.data.message,
          code: e.response.data.errors[0].code,
        },
      });
    });
};

export const loginByFacebook = (dispatch, { accessToken }) => {
  axios("/me/facebook/login", {
    method: "POST",
    data: {
      access_token: accessToken,
    },
  })
    .then((res) => {
      axios.defaults.headers.common["x-auth-token"] = res.data.data.auth.token;

      localStorage.setItem("token", res.data.data.auth.token);
      localStorage.setItem("expire_time", res.data.data.auth.expire_in);
      localStorage.setItem("profile_id", res.data.data.user._id);

      dispatch({ type: LOGIN_FACEBOOK_SUCCESS, value: res.data.data });
    })
    .catch((e) => {
      dispatch({
        type: GET_ERRORS,
        value: {
          message: e.response.data.message,
          code: e.response.data.errors[0].code,
        },
      });
    });
};
