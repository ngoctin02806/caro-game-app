import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import socket from "../../config/socket.config";

import ParticipantSider from "./ParticipantSider";
import ChatBox from "./ChatBox";

import {
  openConversationMiddleware,
  loadMessageMiddleware,
  getInformationRoomMiddleware,
} from "../../redux/Game/game.middlewares";
import { guestJoinRoom } from "../../redux/Game/game.actions";

const GameRoom = (props) => {
  const {
    auth,
    openConversation,
    loadMessage,
    loadInformationRoom,
    guestJoinRoom,
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

  useEffect(() => {
    socket.on("guest-join-room-game", ({ user }) => {
      guestJoinRoom(user);
    });

    return () => socket.off("guest-join-room-game");
  }, [guestJoinRoom]);

  return (
    <div>
      <ParticipantSider />
      <ChatBox />
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
