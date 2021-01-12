import React, { useCallback } from "react";
import { Avatar, Badge, Button, notification } from "antd";
import { UserOutlined, ApiOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { connect } from "react-redux";

import "./style.css";

import socket from "../../../../config/socket.config";

const UserInfoWrapper = styled.div`
  background-color: #fff;
  display: flex;
  padding: 5px;
  align-items: center;
`;

const openNotification = (placement, message) => {
  notification.info({
    message: `Thông báo`,
    description: message,
    placement,
  });
};

const openAlertNotification = (placement, message) => {
  notification.warning({
    message: `Thông báo`,
    description: message,
    placement,
  });
};

const UserInfo = (props) => {
  const {
    roomId,
    profileId,
    userid,
    avatar,
    username,
    roomType,
    hidePopover,
  } = props;

  const sendInvation = useCallback(() => {
    socket.emit(
      "emit-invitation-join-room",
      "1",
      {
        room_id: roomId,
        partner_id: userid,
        user_id: profileId,
        room_type: roomType,
      },
      (response) => {
        if (response.status === "ok") {
          openNotification("topRight", "Đã gửi lời mời thành công !");
        }

        if (response.status === "fail") {
          openAlertNotification(
            "topRight",
            "Người chơi đã ở phòng chơi khác !"
          );
        }

        if (response.status === "offline") {
          openAlertNotification("topRight", "Người dùng không online !");
        }
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return (
    <UserInfoWrapper>
      <div style={{ marginRight: "10px" }}>
        <Badge dot={true} size={20} color="green" offset={[-3, 40]}>
          <Avatar size={50} icon={<UserOutlined />} src={avatar} />
        </Badge>
      </div>
      <div>
        <div style={{ color: "#333", fontSize: "16px", fontWeight: "bold" }}>
          {username}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button style={{ color: "#333", marginRight: "10px" }}>
            <UserOutlined style={{ marginRight: "5px" }} />
            Thông tin
          </Button>
          <Button
            style={{
              color: "#fff",
              width: "118.53px",
              backgroundColor: "#f5222d",
              border: "1px solid #f5222d",
            }}
            onClick={() => {
              sendInvation();
              hidePopover();
            }}
          >
            <ApiOutlined style={{ marginRight: "5px" }} />
            Mời chơi
          </Button>
        </div>
      </div>
    </UserInfoWrapper>
  );
};

const mapStateTpProps = (state) => {
  return {
    profileId: state.auth.profileId,
    roomType: state.game.information.room.type,
    roomId: state.game.information.room._id,
  };
};

export default connect(mapStateTpProps, null)(UserInfo);
