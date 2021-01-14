import React from "react";

import { CloseCircleOutlined } from "@ant-design/icons";

import { WrapperError } from "./styled";

const Error = (props) => {
  const { message, fontSize } = props;

  return (
    <WrapperError fontSize={fontSize}>
      <CloseCircleOutlined style={{ marginRight: "5px" }} />
      {message}
    </WrapperError>
  );
};

export default Error;
