import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { useParams } from "react-router-dom";

import Cell from "./Cell";
import Player from "./Player";

import { ChessTableWrapper, StyledStartGame } from "./styled";
import { startGameMiddleware } from "../../../redux/Game/game.middlewares";

const ChessTable = (props) => {
  const { steps, players, profileId, currentPlayer, startGame } = props;

  const { roomId } = useParams();

  return (
    <ChessTableWrapper>
      {steps.map((c, i) => (
        <Cell c={c} key={i} index={i} />
      ))}
      {players.map((p) => {
        if (profileId === p._id) {
          return <Player key={p._id} player={p} left={-100} />;
        }
        return <Player key={p._id} player={p} right={-100} />;
      })}
      {!currentPlayer && (
        <StyledStartGame>
          {players.length === 2 && (
            <Button onClick={() => startGame(roomId)} type="primary">
              Bắt đầu
            </Button>
          )}
        </StyledStartGame>
      )}
    </ChessTableWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    profileId: state.auth.profileId,
    players: state.game.information.room.players,
    currentPlayer: state.game.information.room.currentPlayer,
    steps: state.game.information.newGame.steps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: (roomId) => dispatch(startGameMiddleware(roomId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessTable);
