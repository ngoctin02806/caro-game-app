import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { insertXOMiddleware } from "../../../../redux/Game/game.middlewares";

import { StyledCell } from "./styled";

const Cell = (props) => {
  const { profileId, index, c: character, handlePlaying } = props;

  const { roomId } = useParams();

  return (
    <StyledCell
      onClick={() => {
        handlePlaying(roomId, profileId, index, "X");
      }}
    >
      {character}
    </StyledCell>
  );
};

const mapStateToProps = (state) => {
  return {
    profileId: state.auth.profileId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePlaying: (roomId, userId, step, character) =>
      dispatch(insertXOMiddleware(roomId, userId, step, character)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
