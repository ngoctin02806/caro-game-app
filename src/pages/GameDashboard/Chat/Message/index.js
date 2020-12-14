import React from "react";
import { CheckCircleOutlined, CheckCircleFilled } from "@ant-design/icons";

import { MessageWrapper, StyledMessage } from "./styled";

const Message = (props) => {
  return (
    <MessageWrapper>
      <StyledMessage>Testing message</StyledMessage>
      <CheckCircleOutlined style={{ color: "#cccccc", marginLeft: "3px" }} />
    </MessageWrapper>
  );
};

export default Message;
