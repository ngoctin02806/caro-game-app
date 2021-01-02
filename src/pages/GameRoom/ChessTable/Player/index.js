import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { PlayerWrapper } from "./styled";
import { nextPlayerMiddleware } from "../../../../redux/Game/game.middlewares";
import { changePlayer, createGame } from "../../../../redux/Game/game.actions";

import socket from "../../../../config/socket.config";

const { Meta } = Card;

const initialOffset = 420;
let timer = 20;

const Player = (props) => {
  const {
    profileId,
    left,
    right,
    player,
    currentPlayer,
    nextPlayer,
    changePlayer,
    saveGame,
  } = props;

  const [count, setCount] = useState(0);

  const { roomId } = useParams();

  useEffect(() => {
    socket.on("start-game-data", ({ game }) => {
      saveGame(game);
    });

    return () => socket.off("start-game-data");
  }, [saveGame]);

  useEffect(() => {
    const callback = ({ user_id }) => {
      console.log("emit-message-change-player");

      setCount(0);
      changePlayer(user_id);
    };

    socket.on("start-game", callback);

    return () => socket.off("start-game", callback);
  }, [changePlayer]);

  useEffect(() => {
    let intervalId = null;

    if (currentPlayer === player._id) {
      intervalId = setTimeout(() => {
        setCount(count + 1);
      }, 1000);

      if (count === 20) {
        clearTimeout(intervalId);
        if (player._id === profileId) {
          nextPlayer(roomId, player._id);
        }
      }
    }

    return () => clearTimeout(intervalId);
  }, [currentPlayer, count]);

  return (
    <PlayerWrapper left={left} right={right}>
      <Card
        hoverable
        style={{ width: 100, position: "relative" }}
        cover={
          <img
            alt={player.username}
            src={player.avatar}
            style={{ width: "100%", height: "100px", objectFit: "cover" }}
          />
        }
        bodyStyle={{ padding: "10px" }}
      >
        <svg
          style={{ position: "absolute", top: "0px", left: "-1px" }}
          width="100"
          height="100"
        >
          <rect
            width="100"
            height="100"
            style={{
              stroke: "red",
              "stroke-dasharray": 0,
              fill: "#fff0",
              strokeWidth: 8,
              borderRadius: "2px",
              strokeDashoffset: initialOffset - count * (initialOffset / timer),
              strokeDasharray: initialOffset,
              transition: "all 1s linear",
            }}
          ></rect>
        </svg>
        <Meta title={count} description={player.username} />
      </Card>
    </PlayerWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: state.game.information.room.currentPlayer,
    profileId: state.auth.profileId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextPlayer: (roomId, userId, step) =>
      dispatch(nextPlayerMiddleware(roomId, userId, step)),
    changePlayer: (userId) => dispatch(changePlayer(userId)),
    saveGame: (game) => dispatch(createGame(game)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
