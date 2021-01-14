import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { StyledCell } from "./styled";

const Cell = (props) => {
  const { active, c: character } = props;

  const { roomId } = useParams();

  return <StyledCell active={active}>{character}</StyledCell>;
};

const mapStateToProps = (state) => {
  return {
    profileId: state.auth.profileId,
    isXCharacter: state.game.information.newGame.isXCharacter,
    currentPlayer: state.game.information.room.currentPlayer,
  };
};

export default connect(mapStateToProps, null)(Cell);
