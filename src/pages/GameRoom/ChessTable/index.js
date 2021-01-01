import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { useParams } from "react-router-dom";

import Cell from "./Cell";
import Player from "./Player";

import { ChessTableWrapper, StyledStartGame } from "./styled";
import { startGameMiddleware } from "../../../redux/Game/game.middlewares";

import socket from "../../../config/socket.config";
import { changePlayer } from "../../../redux/Game/game.actions";

const ChessTable = (props) => {
  const { players, profileId, currentPlayer, startGame, changePlayer } = props;

  console.log(currentPlayer);

  const tables = new Array(400).fill(0);

  const { roomId } = useParams();

  useEffect(() => {
    socket.on("start-game", ({ user_id }) => {
      console.log(user_id);
      changePlayer(user_id);
    });

    return () => socket.off("start-game");
  }, [changePlayer]);

  return (
    <ChessTableWrapper>
      {tables.map((c, i) => (
        <Cell key={i} />
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
    currentPlayer: state.game.information.currentPlayer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: (roomId) => dispatch(startGameMiddleware(roomId)),
    changePlayer: (userId) => dispatch(changePlayer(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessTable);
