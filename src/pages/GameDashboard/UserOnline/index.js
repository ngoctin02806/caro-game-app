import React from "react";
import { Avatar, Badge } from "antd";

import { WrapperUserOnline, StyledText } from "./styled";

const UserOnline = (props) => {
  const { userName, avatar, isOnline, openChatBox } = props;

  return (
    <WrapperUserOnline onClick={openChatBox}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
          src={avatar}
        />
        <StyledText>{userName}</StyledText>
      </div>
      {isOnline && <Badge size="small" status="success" />}
    </WrapperUserOnline>
  );
};

export default UserOnline;
