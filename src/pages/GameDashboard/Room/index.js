import React from "react";
import { connect } from "react-redux";

import { Card, Avatar, Badge, Tooltip } from "antd";
import { LoginOutlined } from "@ant-design/icons";

import { StyledCardCover } from "./styled";

const Room = (props) => {
  const { roomName, participants, dashboard } = props;

  return (
    <Card
      hoverable
      style={{ width: "100%", marginBottom: "5px" }}
      actions={[
        <Tooltip placement="bottom" title="Còn slot">
          <Badge status="processing" size="default" color="green" />
        </Tooltip>,
        <Tooltip placement="bottom" title="Vào phòng">
          <LoginOutlined />
        </Tooltip>,
        <Avatar.Group>
          {participants.map((participant) => (
            <Avatar size="small" src={participant.avatar} />
          ))}
        </Avatar.Group>,
      ]}
      cover={<StyledCardCover>Room {roomName}</StyledCardCover>}
      bodyStyle={{ padding: "0px" }}
    ></Card>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: {
      ...state.game.dashboard,
    },
  };
};

export default connect(mapStateToProps, null)(Room);
