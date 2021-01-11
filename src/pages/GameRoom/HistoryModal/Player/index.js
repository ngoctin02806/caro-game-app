import React from "react";
import { Card, Tooltip } from "antd";
import { connect } from "react-redux";

import CupIcon from "../../../../components/Icons/CupIcon";
import WreathIcon from "../../../../components/Icons/WreathIcon";

import { PlayerWrapper, WreathWrapper } from "./styled";

const { Meta } = Card;

const Player = (props) => {
  const { isWinner, left, right, player } = props;

  return (
    <PlayerWrapper left={left} right={right}>
      {isWinner && (
        <WreathWrapper>
          <WreathIcon />
        </WreathWrapper>
      )}
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

export default connect(mapStateToProps, null)(Player);
