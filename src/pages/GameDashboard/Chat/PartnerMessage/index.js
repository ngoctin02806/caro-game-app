import React from "react";
import { Avatar } from "antd";

import { PartnerMessageWrapper, StyledPartnerMessage } from "./styled";

const PartnerMessage = (props) => {
  return (
    <PartnerMessageWrapper>
      <Avatar style={{ marginRight: "5px" }} />
      <StyledPartnerMessage>Testing message</StyledPartnerMessage>
    </PartnerMessageWrapper>
  );
};

export default PartnerMessage;
