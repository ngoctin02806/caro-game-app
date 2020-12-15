import React from "react";

import Participant from "./Participant";

import { ParticipantWrapper } from "./styled";

const ParticipantSider = () => {
  return (
    <ParticipantWrapper>
      <Participant />
      <Participant />
    </ParticipantWrapper>
  );
};

export default ParticipantSider;
