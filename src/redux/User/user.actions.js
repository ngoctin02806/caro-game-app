import axios from "axios";
import { get } from "lodash";
import { GET_ERRORS } from "../Error/error.types";

import { USER_PROFILE } from "./user.types";

const getUserProfile = (profile) => {
  return {
    type: USER_PROFILE,
    value: profile,
  };
};

export const getUserProfileMiddleware = () => {
  return (dispatch) => {
    return axios("/me/profile", {
      method: "GET",
    })
      .then((res) => {
        dispatch(getUserProfile(res.data.data));
      })
      .catch((e) => {
        dispatch({
          type: GET_ERRORS,
          value: {
            message: get(e, "response.data.message") || "Lỗi máy chủ",
            code: get(e, "response.data.errors.0.code") || 5000,
          },
        });
      });
  };
};
