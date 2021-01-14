import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, Badge, Tooltip } from "antd";

import { WrapperUserOnline, StyledText } from "./styled";

import UserInfo from "./UserInfo";

const UserOnline = (props) => {
  const { userId, userName, avatar, isOnline, openChatBox } = props;
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();

  const seperatePathname = () => {
    return location.pathname.toString().split("/")[2];
  };

  const hide = () => {
    setIsVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setIsVisible(visible);
  };

  return (
    <Tooltip
      placement="left"
      title={
        seperatePathname() && (
          <UserInfo
            avatar={avatar}
            username={userName}
            userid={userId}
            hidePopover={hide}
          />
        )
      }
      color="#fff"
      destroyTooltipOnHide={false}
      visible={isVisible}
      onVisibleChange={handleVisibleChange}
    >
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
    </Tooltip>
  );
};

export default UserOnline;
