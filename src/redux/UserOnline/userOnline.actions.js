import axios from "axios";

import { USER_ONLINE } from "./userOnline.types";
import { GET_ERRORS } from "../Error/error.types";

export const getUserOnline = (dispatch) => {
  axios("/me/user-online", {
    method: "GET",
  })
    .then((res) => {
      dispatch({
        type: USER_ONLINE,
        value: { users: [...res.data.data.users] },
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: GET_ERRORS,
        value: {
          message: e.response.data.message,
          code: e.response.data.errors[0].code,
        },
      });
    });
};
