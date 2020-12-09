import React from "react";
import { Avatar, Badge } from "antd";

import { WrapperUserOnline, StyledText } from "./styled";

const UserOnline = (props) => {
  const { userName, isOnline } = props;

  return (
    <WrapperUserOnline>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          U
        </Avatar>
        <StyledText>{userName}</StyledText>
      </div>
      {isOnline && <Badge size="small" status="success" />}
    </WrapperUserOnline>
  );
};

export default UserOnline;
