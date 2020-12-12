import axios from "axios";

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
      .catch((e) => {});
  };
};
