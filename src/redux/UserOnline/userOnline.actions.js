import { USER_ONLINE } from "./userOnline.types";

export const getUserOnline = (payload) => {
  return {
    type: USER_ONLINE,
    value: payload,
  };
};
