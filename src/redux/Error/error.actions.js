import { GET_ERRORS, CLEAR_ERRORS } from "./error.types";

export const getErrors = (dispatch, payload) => {
  dispatch({
    type: GET_ERRORS,
    value: { message: payload.message, code: payload.code },
  });
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
