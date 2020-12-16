import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import socket from "../../config/socket.config";

import { Row } from "antd";

import { CenterCol } from "./styled";
import ParticipantSider from "./ParticipantSider";
import ChatBox from "./ChatBox";
import Board from "./Board";

import {
  openConversationMiddleware,
  loadMessageMiddleware,
} from "../../redux/Game/game.middlewares";

const GameRoom = (props) => {
  const { auth, openConversation, loadMessage } = props;

  const { roomId } = useParams();

  useEffect(() => {
    openConversation(roomId).then((conversationId) => {
      console.log(conversationId);
      loadMessage(conversationId);
      socket.emit("emit-conversation-game", {
        room_id: conversationId,
        user_id: auth.profileId,
      });
    });
  }, [roomId]);

  return (
    <div>
      <Row>
        <CenterCol span={4}>
          <ParticipantSider />
        </CenterCol>
        <CenterCol span={14}>
          <Board />
        </CenterCol>
        <CenterCol span={4}>
          <ParticipantSider />
        </CenterCol>
      </Row>
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
