import React, { useRef, useEffect } from "react";
import { Card, Avatar, Input, Skeleton } from "antd";
import {
  CloseOutlined,
  UserOutlined,
  SendOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";

import "./style.css";
import { ChatBoxWrapper, MessageBoxWrapper } from "./styled";

import Message from "../../../components/@core/Message";
import PartnerMessage from "../../../components/@core/PartnerMessage";

import {
  addMessageToConverMiddleware,
  closeConversation,
} from "../../../redux/Conversation/conversation.actions";

const { Search } = Input;

const Chat = (props) => {
  const {
    userId,
    chat,
    conversationId,
    addMessage,
    partner,
    closeChatBox,
  } = props;

  const inputRef = useRef(null);
  const bodyMessageRef = useRef(null);

  const conversationIndex = chat.conversations.findIndex(
    (con) => con.conversationId === conversationId
  );

  const addMessageToConver = () => {
    addMessage({
      message: { content: inputRef.current.state.value },
      conversationId,
      senderId: userId,
    }).then(() => {
      const scrollHeight = bodyMessageRef.current.scrollHeight;
      const height = bodyMessageRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;

      bodyMessageRef.current.scrollTop =
        maxScrollTop > 0 ? maxScrollTop + 100 : 0;
    });

    inputRef.current.state.value = "";
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const scrollHeight = bodyMessageRef.current.scrollHeight;
    const height = bodyMessageRef.current.clientHeight;
    const maxScrollTop = scrollHeight - height;

    bodyMessageRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }, [chat.loading]);

  return (
    <ChatBoxWrapper>
      <Card
        className="caro-game-chat-box-title"
        headStyle={{
          backgroundColor: "#1890ff",
          border: "#1890ff",
          color: "white",
          padding: "0px 10px 0px 5px",
        }}
        bodyStyle={{ padding: "0px" }}
        type="inner"
        title={
          <>
            <Skeleton
              avatar={{ shape: "circle" }}
              title={{ width: "150px" }}
              paragraph={false}
              loading={chat.loading}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={partner && partner.avatar}
                  icon={<UserOutlined />}
                />
                <div style={{ marginLeft: "10px" }}>
                  {partner && partner.username}
                </div>
              </div>
            </Skeleton>
          </>
        }
        extra={
          <CloseOutlined
            style={{ color: "#fff" }}
            onClick={() => closeChatBox(conversationId)}
          />
        }
      >
        <MessageBoxWrapper ref={bodyMessageRef}>
          {chat.loading && (
            <LoadingOutlined
              style={{
                fontSize: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          )}
          {chat.conversations[conversationIndex].messages.map((mess) => (
            <div style={{ overflow: "auto" }}>
              {userId === mess.created_by ? (
                <Message hasReceived={mess.hasReceived}>{mess.content}</Message>
              ) : (
                <PartnerMessage avatar={partner && partner.avatar}>
                  {mess.content}
                </PartnerMessage>
              )}
            </div>
          ))}
        </MessageBoxWrapper>
      </Card>
      <Search
        placeholder="Nhập tin nhắn"
        enterButton={<SendOutlined />}
        onSearch={addMessageToConver}
        ref={inputRef}
      />
    </ChatBoxWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.profileId,
    chat: {
      ...state.chat,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: ({ message, conversationId, senderId }) =>
      dispatch(
        addMessageToConverMiddleware({ message, conversationId, senderId })
      ),
    closeChatBox: (conversationId) =>
      dispatch(closeConversation(conversationId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
