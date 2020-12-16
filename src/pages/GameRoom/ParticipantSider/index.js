import React from "react";
import { connect } from "react-redux";

import Participant from "./Participant";

import { ParticipantWrapper } from "./styled";

const ParticipantSider = (props) => {
  const { participants } = props;

  return (
    <ParticipantWrapper>
      {participants && participants.map((p) => <Participant player={p} />)}
    </ParticipantWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    participants: state.game.information.participants,
  };
};

export default connect(mapStateToProps, null)(ParticipantSider);
