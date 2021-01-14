import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { insertXOMiddleware } from "../../../../redux/Game/game.middlewares";

import { StyledCell } from "./styled";

const Cell = (props) => {
  const {
    active,
    currentPlayer,
    isXCharacter,
    profileId,
    position,
    c: character,
    onClick,
    handlePlaying,
  } = props;

  const { roomId } = useParams();

  return (
    <StyledCell
      active={active}
      onClick={() => {
        if (!character && currentPlayer === profileId) {
          onClick();
          handlePlaying(roomId, profileId, position, isXCharacter ? "X" : "O");
        }
      }}
    >
      {character}
    </StyledCell>
  );
};

const mapStateToProps = (state) => {
  return {
    profileId: state.auth.profileId,
    isXCharacter: state.game.information.newGame.isXCharacter,
    currentPlayer: state.game.information.room.currentPlayer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePlaying: (roomId, userId, step, character) =>
      dispatch(insertXOMiddleware(roomId, userId, step, character)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
