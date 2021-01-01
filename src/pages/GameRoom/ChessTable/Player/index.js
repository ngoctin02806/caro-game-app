import React, { useState } from "react";
import { Card } from "antd";
import { connect } from "react-redux";

import { PlayerWrapper } from "./styled";

const { Meta } = Card;

const initialOffset = 420;
let timer = 20;

const Player = (props) => {
  const { left, right, player, currentPlayer } = props;

  const [count, setCount] = useState(0);

  if (currentPlayer === player._id) {
    const intervalId = setTimeout(() => {
      console.log(count);

      setCount(count + 1);
    }, 1000);

    if (count === 20) {
      clearInterval(intervalId);
    }
  }

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
        <Meta title={count} description="www.instagram.com" />
      </Card>
    </PlayerWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: state.game.information.currentPlayer,
  };
};

export default connect(mapStateToProps, null)(Player);
