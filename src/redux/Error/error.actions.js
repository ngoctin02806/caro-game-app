import { GET_ERRORS, CLEAR_ERRORS } from "./error.types";

export const getErrors = (dispatch, payload) => {
  dispatch({
    type: GET_ERRORS,
    value: { message: payload.message, code: payload.code },
  });
};

export const clearErrors = (dispatch, payload) => {
  dispatch({ type: CLEAR_ERRORS });
};
