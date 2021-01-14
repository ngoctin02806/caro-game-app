import React, { useState, useEffect } from "react";
import { Card, Tooltip } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import CupIcon from "../../../../components/Icons/CupIcon";

import { PlayerWrapper } from "./styled";
import { nextPlayerMiddleware } from "../../../../redux/Game/game.middlewares";
import { changePlayer, createGame } from "../../../../redux/Game/game.actions";

import socket from "../../../../config/socket.config";

const { Meta } = Card;

const initialOffset = 420;
let timer = 20;

const Player = (props) => {
  const {
    // isXCharacter,
    profileId,
    left,
    right,
    player,
    currentPlayer,
    // nextPlayer,
    changePlayer,
    saveGame,
    // checkPosition,
    // randomPosition,
    // setCurrent,
    resetChessBoard,
    handleRunOffTimerLoser,
  } = props;

  const [count, setCount] = useState(0);

  const { roomId } = useParams();

  useEffect(() => {
    console.log("use Effect");

    socket.on("start-game-data", ({ game }) => {
      console.log(game);

      saveGame(game);
      resetChessBoard();
    });

    return () => socket.off("start-game-data");
  }, [saveGame, resetChessBoard]);

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
          // const { x, y } = randomPosition();
          // setCurrent(x, y);
          // checkPosition(x, y, isXCharacter ? "X" : "O");
          // nextPlayer(roomId, player._id, [x, y], isXCharacter ? "X" : "O");

          setCount(0);

          socket.emit("emit-run-off-time", {
            room_id: roomId,
            user_id: profileId,
          });

          handleRunOffTimerLoser();

          changePlayer(null);
        }
      }
    }

    return () => clearTimeout(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, count, handleRunOffTimerLoser]);

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
        <Tooltip title={player.username}>
          <Meta
            title={player.username}
            description={
              <div
                style={{
                  color: "rgb(255,215,9)",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "10px" }}>{player.point}</div>
                <CupIcon width={15} />
              </div>
            }
          />
        </Tooltip>
      </Card>
    </PlayerWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: state.game.information.room.currentPlayer,
    profileId: state.auth.profileId,
    isXCharacter: state.game.information.newGame.isXCharacter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextPlayer: (roomId, userId, step, character) =>
      dispatch(nextPlayerMiddleware(roomId, userId, step, character)),
    changePlayer: (userId) => dispatch(changePlayer(userId)),
    saveGame: (game) => dispatch(createGame(game)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
