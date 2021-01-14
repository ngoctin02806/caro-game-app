import React from "react";
import { Avatar, Typography } from "antd";

import { ParticipantWrapper } from "./styled";

const { Text } = Typography;

const Participant = (props) => {
  const { player } = props;

  return (
    <ParticipantWrapper>
      <Avatar src={player.avatar} shape="square" size="large" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "5px",
        }}
      >
        <Text style={{ fontSize: "13px" }}>{player.username}</Text>
        <Text style={{ fontSize: "12px" }}>Ant Design</Text>
      </div>
    </ParticipantWrapper>
  );
};

export default Participant;
