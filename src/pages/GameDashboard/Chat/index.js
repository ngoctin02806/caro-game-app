import React, { useState } from "react";
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

// import Message from "./Message";
import PartnerMessage from "./PartnerMessage";

import { addMessageToConverMiddleware } from "../../../redux/Conversation/conversation.actions";

const { Search } = Input;

const Chat = (props) => {
  const { chat, conversationId, addMessage, partner } = props;

  const [message, setMessage] = useState("");

  const conversationIndex = chat.conversations.findIndex(
    (con) => con.conversationId === conversationId
  );

  const addMessageToConver = () => {
    addMessage({
      message: { messageId: "2", content: message },
      conversationId,
    });
  };

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
            {/* <>
              <Skeleton.Avatar size="default" active={true} shape="circle" />
              <Skeleton.Button size="default" active={true} shape="default" />
            </> */}
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
        extra={<CloseOutlined color="white" />}
      >
        <MessageBoxWrapper>
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
              <PartnerMessage>{mess.content}</PartnerMessage>
            </div>
          ))}
        </MessageBoxWrapper>
      </Card>
      <Search
        placeholder="Nhập tin nhắn"
        enterButton={<SendOutlined />}
        onSearch={addMessageToConver}
        onChange={(e) => setMessage(e.target.value)}
      />
    </ChatBoxWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    chat: {
      ...state.chat,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: ({ message, conversationId }) =>
      dispatch(addMessageToConverMiddleware({ message, conversationId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
