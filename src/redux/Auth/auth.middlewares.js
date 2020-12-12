import axios from "axios";
import socket from "../../config/socket.config";

import {
  loginLoading,
  loginSucces,
  loginFail,
  registerLoading,
  registerSuccess,
  registerFail,
  reSendMailFail,
  reSendMailLoading,
  reSendMailSuccess,
  validateEmailFail,
  validateEmailLoading,
  validateEmailSuccess,
  loginByGoogle,
  loginByFacebook,
  logout,
  autoLogout,
} from "./auth.actions";
import { GET_ERRORS } from "../Error/error.types";

export const loginMiddleware = ({ email, password }) => {
  return (dispatch) => {
    dispatch(loginLoading());

    return axios("/me/login", {
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        axios.defaults.headers.common["x-auth-token"] =
          res.data.data.auth.token;

        localStorage.setItem("token", res.data.data.auth.token);
        localStorage.setItem("expire_time", res.data.data.auth.expire_in);
        localStorage.setItem("profile_id", res.data.data.user._id);

        socket.emit("emit-user-login", { user_id: res.data.data.user._id });

        dispatch(loginSucces(res.data.data));
      })
      .catch((e) => {
        dispatch(loginFail());
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const registerMiddleware = ({ username, email, password }) => {
  return (dispatch) => {
    dispatch(registerLoading());

    return axios("/me/register", {
      method: "POST",
      data: {
        username: username,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        axios.defaults.headers.common["x-auth-token"] =
          res.data.data.auth.token;

        localStorage.setItem("token", res.data.data.auth.token);
        localStorage.setItem("expire_time", res.data.data.auth.expire_in);
        localStorage.setItem("profile_id", res.data.data.user._id);

        socket.emit("emit-user-login", { user_id: res.data.data.user._id });

        dispatch(registerSuccess(res.data.data));
      })
      .catch((e) => {
        dispatch(registerFail());
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const reSendMailMiddleware = () => {
  return (dispatch) => {
    dispatch(reSendMailLoading());

    return axios("/me/verified-code/send", {
      method: "POST",
    })
      .then((res) => {
        dispatch(reSendMailSuccess());
      })
      .catch((e) => {
        dispatch(reSendMailFail());
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const validateEmailMiddleware = ({ code }) => {
  return (dispatch) => {
    dispatch(validateEmailLoading());

    return axios("/me/account/activate", {
      method: "POST",
      data: {
        code,
      },
    })
      .then((res) => {
        dispatch(validateEmailSuccess());
      })
      .catch((e) => {
        dispatch(validateEmailFail());
        dispatch({
          type: GET_ERRORS,
          value: {
            message: e.response.data.message,
            code: e.response.data.errors[0].code,
          },
        });
      });
  };
};

export const loginByGoogleMiddleware = ({ accessToken }) => {
  return (dispatch) => {
    return axios("/me/google/login", {
      method: "POST",
      data: {
        access_token: accessToken,
      },
    })
      .then((res) => {
        axios.defaults.headers.common["x-auth-token"] =
          res.data.data.auth.token;

        localStorage.setItem("token", res.data.data.auth.token);
        localStorage.setItem("expire_time", res.data.data.auth.expire_in);
        localStorage.setItem("profile_id", res.data.data.user._id);

        socket.emit("emit-user-login", { user_id: res.data.data.user._id });

        dispatch(loginByGoogle(res.data.data));
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
};

export const loginByFacebookMiddleware = ({ accessToken }) => {
  return (dispatch) => {
    return axios("/me/facebook/login", {
      method: "POST",
      data: {
        access_token: accessToken,
      },
    })
      .then((res) => {
        axios.defaults.headers.common["x-auth-token"] =
          res.data.data.auth.token;

        localStorage.setItem("token", res.data.data.auth.token);
        localStorage.setItem("expire_time", res.data.data.auth.expire_in);
        localStorage.setItem("profile_id", res.data.data.user._id);

        socket.emit("emit-user-login", { user_id: res.data.data.user._id });

        dispatch(loginByFacebook(res.data.data));
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
};

export const logoutMiddleware = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("expire_time");
    localStorage.removeItem("profile_id");

    dispatch(logout());
  };
};

export const autoLogoutMiddleware = () => {
  return (dispatch, getState) => {
    const { auth } = getState();

    console.log(auth);

    const now = new Date().getTime();

    return setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("expire_time");
      localStorage.removeItem("profile_id");

      dispatch(autoLogout());
    }, auth.expireTime - now);
  };
};
