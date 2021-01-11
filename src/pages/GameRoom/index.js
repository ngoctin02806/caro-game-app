import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "antd";

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

const GameRoom = (props) => {
  const {
    auth,
    openConversation,
    loadMessage,
    loadInformationRoom,
    guestJoinRoom,
    guestLeaveRoom,
    playerLeaveRoom,
  } = props;

  const { roomId } = useParams();

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
    <Row gutter={[10, 10]} style={{ width: "100%" }}>
      <HistoryProvider>
        <Col span={7}>
          <ParticipantSider />
        </Col>
        <Col span={10.5}>
          <ChessTable roomId={roomId} />
        </Col>
      </HistoryProvider>
      <ChatBox />
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: {
      ...state.auth,
    },
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
