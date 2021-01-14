import { GET_ERRORS, CLEAR_ERRORS } from "./error.types";

const INIT_STATE = {
  message: null,
  code: null,
};

const errorReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ERRORS: {
      return {
        ...state,
        message: action.value.message,
        code: action.value.code,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        message: null,
        code: null,
      };
    }

    default:
      return state;
  }
};

export default errorReducer;
