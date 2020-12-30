import { Button, Divider, List } from "antd";
import React from "react";
import { connect } from "react-redux";

import Participant from "./Participant";

import CupIcon from "../../../components/Icons/CupIcon";

import { ParticipantWrapper, StyledTextBet } from "./styled";

const ParticipantSider = (props) => {
  const { participants, guests } = props;

  return (
    <ParticipantWrapper>
      <Button type="primary" style={{ width: "100%", marginBottom: "5px" }}>
        Rời phòng
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={participants}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            style={{ padding: "0px", borderBottom: "none" }}
          >
            <Participant player={item} />
          </List.Item>
        )}
      ></List>
      <Divider>Mức cược</Divider>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CupIcon width={30} />
        <StyledTextBet>100</StyledTextBet>
      </div>
      <Divider>Người tham gia</Divider>
      <List
        itemLayout="horizontal"
        dataSource={guests}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            style={{ padding: "0px", borderBottom: "none" }}
          >
            <Participant player={item} />
          </List.Item>
        )}
      ></List>
    </ParticipantWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    participants: state.game.information.room.players,
    guests: state.game.information.room.guests,
  };
};

export default connect(mapStateToProps, null)(ParticipantSider);
