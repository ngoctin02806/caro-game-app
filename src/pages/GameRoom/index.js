import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { ConfigProvider, Empty } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import socket from "../../config/socket.config";

import ParticipantSider from "./ParticipantSider";
import ChatBox from "./ChatBox";

import {
  openConversationMiddleware,
  loadMessageMiddleware,
  getInformationRoomMiddleware,
} from "../../redux/Game/game.middlewares";

const customizeRenderEmpty = () => (
  <div style={{ textAlign: "center" }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>Data Not Found</p>
  </div>
);

const GameRoom = (props) => {
  const { auth, openConversation, loadMessage, loadInformationRoom } = props;

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
