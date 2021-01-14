import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { DownOutlined, UpOutlined, MessageOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";

import { ChatBoxWrapper, HiddenButtom } from "./styled";

import Message from "../../../../components/@core/Message";
import PartnerMessage from "../../../../components/@core/PartnerMessage";

const ChatBox = (props) => {
  const { gameId } = props;

  const [openChatBox, setOpenChatBox] = useState(false);
  const [messages, setMessages] = useState([]);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    axios(`/games/${gameId}/messages`, {
      method: "GET",
    }).then((res) => {
      setMessages(res.data.messages);
    });
  }, [gameId]);

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
      {openChatBox && (
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
            style={{ width: "100%" }}
            bodyStyle={{
              height: "300px",
              overflowY: "scroll",
              padding: "10px",
            }}
          >
            {messages.map((mess, index) =>
              mess.created_by === auth.profileId ? (
                <div style={{ overflow: "auto" }}>
                  <Message hasReceived>{mess.content}</Message>
                </div>
              ) : (
                <div style={{ overflow: "auto" }}>
                  <PartnerMessage avatar="">{mess.content}</PartnerMessage>
                </div>
              )
            )}
          </Card>
        </>
      )}
    </ChatBoxWrapper>
  );
};

export default ChatBox;
