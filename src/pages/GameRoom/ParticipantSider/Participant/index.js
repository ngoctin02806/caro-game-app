import React from "react";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { ParticipantWrapper } from "./styled";

const { Text } = Typography;

const Participant = () => {
  return (
    <ParticipantWrapper>
      <Avatar shape="square" size="large" icon={<UserOutlined />} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "5px",
        }}
      >
        <Text style={{ fontSize: "13px" }}>Người dùng 1</Text>
        <Text style={{ fontSize: "12px" }}>Ant Design</Text>
      </div>
    </ParticipantWrapper>
  );
};

export default Participant;
