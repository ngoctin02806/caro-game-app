import axios from "axios";

import { LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_FAIL } from "./auth.types";
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
      localStorage.setItem("token", res.data.data.auth.token);
      localStorage.setItem("expire_time", res.data.data.auth.expire_in);
      localStorage.setItem("profile_id", res.data.data.user._id);

      dispatch({ type: LOGIN_SUCCESS, value: res.data.data });
    })
    .catch((e) => {
      console.log(e.response);
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
