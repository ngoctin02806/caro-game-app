import React from "react";
import { connect } from "react-redux";

import { Card, Avatar, Badge, Tooltip } from "antd";
import { LoginOutlined, LockOutlined } from "@ant-design/icons";

import { StyledCardCover, StyledBetLevel } from "./styled";

const Room = (props) => {
  const { roomName, participants, status, betLevel, roomType } = props;

  return (
    <div style={{ position: "relative" }}>
      <StyledBetLevel>
        {roomType === "PRIVATE_ROOM" && <LockOutlined />} Mức cược: {betLevel}
      </StyledBetLevel>
      <Card
        hoverable
        style={{ width: "100%", marginBottom: "5px" }}
        actions={[
          <Tooltip placement="bottom" title={!status ? "Còn slot" : "Hết slot"}>
            {!status ? (
              <Badge status="processing" size="default" color="green" />
            ) : (
              <Badge status="processing" size="default" color="red" />
            )}
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
    </div>
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
