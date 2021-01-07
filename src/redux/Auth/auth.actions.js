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
  USER_LOGOUT,
  USER_AUTO_LOGOUT,
} from "./auth.types";

export const loginLoading = () => {
  return {
    type: LOGIN_LOADING,
  };
};

export const loginSucces = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    value: payload,
  };
};

export const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  };
};

export const registerLoading = () => {
  return {
    type: REGISTER_LOADING,
  };
};

export const registerSuccess = (payload) => {
  return {
    type: REGISTER_SUCCESS,
    value: payload,
  };
};

export const registerFail = () => {
  return {
    type: REGISTER_FAIL,
  };
};

export const reSendMailLoading = () => {
  return {
    type: USER_RESEND_MAIL_LOADING,
  };
};

export const reSendMailSuccess = () => {
  return {
    type: USER_RESEND_MAIL_SUCCESS,
  };
};

export const reSendMailFail = () => {
  return {
    type: USER_RESEND_MAIL_FAIL,
  };
};

export const validateEmailLoading = () => {
  return {
    type: USER_VALIDATE_EMAIL_LOADING,
  };
};

export const validateEmailSuccess = (cert) => {
  return {
    type: USER_VALIDATE_EMAIL_SUCCESS,
    value: cert,
  };
};

export const validateEmailFail = () => {
  return {
    type: USER_VALIDATE_EMAIL_FAIL,
  };
};

export const loginByGoogle = (payload) => {
  return {
    type: LOGIN_GOOGLE_SUCCESS,
    value: payload,
  };
};

export const loginByFacebook = (payload) => {
  return {
    type: LOGIN_FACEBOOK_SUCCESS,
    value: payload,
  };
};

export const logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const autoLogout = () => {
  return {
    type: USER_AUTO_LOGOUT,
  };
};
