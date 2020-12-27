import { Button, Divider, List } from "antd";
import React from "react";
import { connect } from "react-redux";

import Participant from "./Participant";

import { ParticipantWrapper } from "./styled";

const ParticipantSider = (props) => {
  const { participants } = props;

  return (
    <ParticipantWrapper>
      <Button type="primary" style={{ width: "100%", marginBottom: "5px" }}>
        Rời phòng
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={participants}
        renderItem={(item) => (
          <List.Item style={{ padding: "0px", borderBottom: "none" }}>
            <Participant player={item} />
          </List.Item>
        )}
      ></List>
      <Divider>Mức cược</Divider>
    </ParticipantWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    participants: state.game.information.room.players,
  };
};

export default connect(mapStateToProps, null)(ParticipantSider);
