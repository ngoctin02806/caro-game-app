import React from "react";
import { CheckCircleOutlined, CheckCircleFilled } from "@ant-design/icons";

import { MessageWrapper, StyledMessage } from "./styled";

const Message = (props) => {
  return (
    <MessageWrapper>
      <StyledMessage>{props.children}</StyledMessage>
      {props.hasReceived ? (
        <CheckCircleFilled style={{ color: "#cccccc", marginLeft: "3px" }} />
      ) : (
        <CheckCircleOutlined style={{ color: "#cccccc", marginLeft: "3px" }} />
      )}
    </MessageWrapper>
  );
};

export default Message;
