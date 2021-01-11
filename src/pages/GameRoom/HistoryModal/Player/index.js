import React from "react";
import { Card, Tooltip } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import CupIcon from "../../../../components/Icons/CupIcon";

import { PlayerWrapper } from "./styled";

const { Meta } = Card;

const Player = (props) => {
  const { left, right, player } = props;

  const { roomId } = useParams();

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
