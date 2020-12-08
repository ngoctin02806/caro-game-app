import React from "react";

import { WrapperError } from "./styled";

const Error = (props) => {
  const { message } = props;

  return <WrapperError>{message}</WrapperError>;
};

export default Error;
