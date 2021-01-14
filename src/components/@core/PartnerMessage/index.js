import React from "react";
import { Avatar } from "antd";

import { PartnerMessageWrapper, StyledPartnerMessage } from "./styled";

const PartnerMessage = (props) => {
  return (
    <PartnerMessageWrapper>
      <Avatar src={props.avatar} style={{ marginRight: "5px" }} />
      <StyledPartnerMessage>{props.children}</StyledPartnerMessage>
    </PartnerMessageWrapper>
  );
};

export default PartnerMessage;
