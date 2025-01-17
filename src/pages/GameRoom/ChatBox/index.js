import React, { useState, useRef, useEffect } from "react";
import { Card, Input } from "antd";
import {
  DownOutlined,
  UpOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

import socket from "../../../config/socket.config";

import { ChatBoxWrapper, HiddenButtom } from "./styled";

import Message from "../../../components/@core/Message";
import PartnerMessage from "../../../components/@core/PartnerMessage";

import {
  addMessageMiddleware,
  addParticipantMiddleware,
  listenMessageMiddleware,
} from "../../../redux/Game/game.middlewares";

const { Search } = Input;

const ChatBox = (props) => {
  const {
    newGame,
    conversation,
    messages,
    auth,
    addMessage,
    addParticipant,
    listenMessage,
  } = props;

  const [openChatBox, setOpenChatBox] = useState(false);

  const inputRef = useRef(null);
  const bodyMsgRef = useRef(null);

  const addMessageToGame = () => {
    if (inputRef.current.state.value === "") return;

    addMessage({
      message: { content: inputRef.current.state.value },
      senderId: auth.profileId,
      conversationId: conversation._id,
      gameId: newGame._id,
    }).then(() => {
      const scrollHeight = bodyMsgRef.current.scrollHeight;
      const height = bodyMsgRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;

      bodyMsgRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    });

    inputRef.current.state.value = "";
  };

  useEffect(() => {
    const scrollHeight = bodyMsgRef.current.scrollHeight;
    const height = bodyMsgRef.current.clientHeight;
    const maxScrollTop = scrollHeight - height;

    bodyMsgRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }, [openChatBox]);

  useEffect(() => {
    const listener = ({ user_id, username, avatar }) => {
      addParticipant({ user_id, username, avatar });
    };

    socket.on("joined-game-room", listener);

    return () => socket.off("joined-game-room", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen message comming
  useEffect(() => {
    const listener = ({ room_id, sender_id, message }) => {
      // const partner = conversation.participants.find(
      //   (p) => p.user_id === sender_id
      // );

      listenMessage({
        message: {
          content: message.content,
        },
        senderId: sender_id,
        conversationId: conversation._id,
      });
    };

    socket.on("conversation-game-message", listener);

    return () => socket.off("conversation-game-message", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatBoxWrapper>
      <div style={{ position: "relative", padding: "3px 0px" }}>
        <HiddenButtom onClick={() => setOpenChatBox(!openChatBox)}>
          {openChatBox ? (
            <DownOutlined
              style={{ fontSize: "10px", width: "25px", fontWeight: "bold" }}
            />
          ) : (
            <UpOutlined
              style={{ fontSize: "10px", width: "25px", fontWeight: "bold" }}
            />
          )}
        </HiddenButtom>
      </div>
      <>
        <Card
          title={
            <div>
              <MessageOutlined />
              <label style={{ marginLeft: "10px" }}>Trò chuyện</label>
            </div>
          }
          headStyle={{ padding: "0px 10px" }}
          bordered={false}
          style={{ width: "100%", height: openChatBox ? "auto" : "0px" }}
          bodyStyle={{
            padding: "0px",
          }}
        >
          <div
            ref={bodyMsgRef}
            style={{ height: "300px", overflowY: "scroll", padding: "5px" }}
          >
            {messages.map((mess, index) =>
              mess.created_by === auth.profileId ? (
                <div style={{ overflow: "auto" }} key={mess._id}>
                  <Message hasReceived>{mess.content}</Message>
                </div>
              ) : (
                <div style={{ overflow: "auto" }} key={mess._id}>
                  <PartnerMessage avatar="">{mess.content}</PartnerMessage>
                </div>
              )
            )}
          </div>
          <Search
            placeholder="Nhập tin nhắn"
            onSearch={addMessageToGame}
            enterButton={<SendOutlined />}
            ref={inputRef}
          />
        </Card>
      </>
    </ChatBoxWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    conversation: {
      ...state.game.conversation,
    },
    auth: {
      ...state.auth,
    },
    messages: state.game.messages,
    newGame: state.game.information.newGame,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: ({ message, senderId, conversationId, gameId }) =>
      dispatch(
        addMessageMiddleware({ message, senderId, conversationId, gameId })
      ),
    listenMessage: ({ message, senderId }) =>
      dispatch(listenMessageMiddleware({ message, senderId })),
    addParticipant: (participant) =>
      dispatch(addParticipantMiddleware(participant)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
