import { Button, Divider, List, notification } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import Participant from "./Participant";

import { useHistoryModal } from "../../../contexts/HistoryContext";

import CupIcon from "../../../components/Icons/CupIcon";

import { ParticipantWrapper, StyledTextBet } from "./styled";

import { registerLeavingRoomMiddleware } from "../../../redux/Game/game.middlewares";
import socket from "../../../config/socket.config";
import { playerJoinRoom } from "../../../redux/Game/game.actions";

const openNotification = (callback) => {
  notification.info({
    message: `Rời phòng`,
    description: "Bạn đã đăng ký rời phòng",
    placement: "topRight",
    onClose: callback,
  });
};

let leavingRoom = false;

const ParticipantSider = (props) => {
  const {
    roomName,
    profileId,
    currentPlayer,
    participants,
    guests,
    registerLeavingRoom,
    betLevel,
    playerJoinRoom,
    gameIds,
  } = props;

  const [openInforNoti, setOpenInforNoti] = useState(false);

  const { roomId } = useParams();
  const history = useHistory();

  const { setOpenHistory } = useHistoryModal();

  const closeInforNoti = useCallback(() => setOpenInforNoti(false), []);

  useEffect(() => {
    if (!currentPlayer && leavingRoom) {
      setTimeout(() => {
        history.goBack();
        registerLeavingRoom(roomId, profileId);
      }, 4000);
    }
  }, [leavingRoom, currentPlayer]);

  useEffect(() => {
    socket.on("player-join-room-game", ({ _id, username, avatar, point }) => {
      if (participants.length < 2) {
        playerJoinRoom({ _id, username, avatar, point });
      }
    });

    return () => socket.off("player-join-room-game");
  }, [playerJoinRoom, participants]);

  return (
    <ParticipantWrapper>
      {openInforNoti && openNotification(closeInforNoti)}
      <div style={{ fontSize: "18px", color: "#555", fontWeight: "bold" }}>
        <HomeOutlined style={{ marginRight: "10px" }} />
        {roomName}
      </div>
      <Divider style={{ marginTop: "10px" }} />
      <Button
        type="primary"
        style={{ width: "100%", marginBottom: "5px" }}
        onClick={() => {
          if (!currentPlayer) {
            history.goBack();
            registerLeavingRoom(roomId, profileId);
          } else {
            setOpenInforNoti(true);
            leavingRoom = true;
          }
        }}
      >
        Rời phòng
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={participants}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            style={{ padding: "0px", borderBottom: "none" }}
          >
            <Participant player={item} />
          </List.Item>
        )}
      ></List>
      <Divider>Mức cược</Divider>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CupIcon width={30} />
        <StyledTextBet>{betLevel}</StyledTextBet>
      </div>
      <Divider>Người tham gia</Divider>
      <List
        itemLayout="horizontal"
        dataSource={guests}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            style={{ padding: "0px", borderBottom: "none" }}
          >
            <Participant player={item} />
          </List.Item>
        )}
      ></List>
      {gameIds && (
        <Button
          onClick={() => setOpenHistory(true)}
          type="dashed"
          danger
          style={{ width: "100%", marginBottom: "5px" }}
        >
          Xem lịch sử
        </Button>
      )}
    </ParticipantWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    profileId: state.auth.profileId,
    participants: state.game.information.room.players,
    guests: state.game.information.room.guests,
    betLevel: state.game.information.room.bet_level,
    currentPlayer: state.game.information.room.currentPlayer,
    gameIds: state.game.information.room.game_ids,
    roomName: state.game.information.room.room_name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerLeavingRoom: (roomId, userId) =>
      dispatch(registerLeavingRoomMiddleware(roomId, userId)),
    playerJoinRoom: (user) => dispatch(playerJoinRoom(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantSider);
