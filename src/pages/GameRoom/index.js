import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Spin } from "antd";

import socket from "../../config/socket.config";

import ParticipantSider from "./ParticipantSider";
import ChatBox from "./ChatBox";
import ChessTable from "./ChessTable";

import { HistoryProvider } from "../../contexts/HistoryContext";

import {
  openConversationMiddleware,
  loadMessageMiddleware,
  getInformationRoomMiddleware,
} from "../../redux/Game/game.middlewares";
import {
  guestJoinRoom,
  guestLeaveRoom,
  playerLeaveRoom,
} from "../../redux/Game/game.actions";

import "./style.css";

const GameRoom = (props) => {
  const {
    roomName,
    auth,
    isRoomLoading,
    openConversation,
    loadMessage,
    loadInformationRoom,
    guestJoinRoom,
    guestLeaveRoom,
    playerLeaveRoom,
  } = props;

  const { roomId } = useParams();

  useEffect(() => {
    if (roomName) {
      document.title = roomName;
    }
  }, [roomName]);

  useEffect(() => {
    loadInformationRoom(roomId);
  }, [roomId, loadInformationRoom]);

  useEffect(() => {
    openConversation(roomId).then((conversationId) => {
      loadMessage(conversationId);
      socket.emit("emit-conversation-game", {
        room_id: conversationId,
        user_id: auth.profileId,
      });
    });
  }, [roomId, openConversation, loadMessage, auth.profileId]);

  // Listen that guest joins to room game
  useEffect(() => {
    socket.on("guest-join-room-game", ({ user }) => {
      guestJoinRoom(user);
    });

    return () => socket.off("guest-join-room-game");
  }, [guestJoinRoom]);

  // Listen that guest leaves room game
  useEffect(() => {
    socket.on("guest-leave-room-game", ({ user_id }) => {
      guestLeaveRoom(user_id);
    });

    return () => socket.off("guest-leave-room-game");
  }, [guestLeaveRoom]);

  // Listen that player leaves room game
  useEffect(() => {
    socket.on("player-leave-room-game", ({ user_id }) => {
      playerLeaveRoom(user_id);
    });

    return () => socket.off("player-leave-room-game");
  }, [playerLeaveRoom]);

  return (
    <Spin spinning={isRoomLoading} wrapperClassName="caro-game-spining">
      <Row
        gutter={[10, 10]}
        style={{ width: "100%", padding: "120px 50px 80px 50px" }}
      >
        <HistoryProvider>
          <Col span={8}>
            <ParticipantSider />
          </Col>
          <Col span={10.5}>
            <ChessTable roomId={roomId} />
          </Col>
        </HistoryProvider>
        <ChatBox />
      </Row>
    </Spin>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: {
      ...state.auth,
    },
    isRoomLoading: state.game.information.isLoading,
    roomName: state.game.information.room.room_name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openConversation: (roomId) => dispatch(openConversationMiddleware(roomId)),
    loadMessage: (conversationId) =>
      dispatch(loadMessageMiddleware(conversationId)),
    loadInformationRoom: (roomId) =>
      dispatch(getInformationRoomMiddleware(roomId)),
    guestJoinRoom: (user) => dispatch(guestJoinRoom(user)),
    guestLeaveRoom: (userId) => dispatch(guestLeaveRoom(userId)),
    playerLeaveRoom: (userId) => dispatch(playerLeaveRoom(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
