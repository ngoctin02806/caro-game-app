import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import socket from "../../config/socket.config";

import ParticipantSider from "./ParticipantSider";
import ChatBox from "./ChatBox";

import {
  openConversationMiddleware,
  loadMessageMiddleware,
} from "../../redux/Game/game.middlewares";

const GameRoom = (props) => {
  const { auth, openConversation, loadMessage } = props;

  const { roomId } = useParams();

  useEffect(() => {
    openConversation(roomId).then((conversationId) => {
      loadMessage(conversationId);
      socket.emit("emit-conversation-game", {
        room_id: conversationId,
        user_id: auth.profileId,
      });
    });
  }, []);

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
