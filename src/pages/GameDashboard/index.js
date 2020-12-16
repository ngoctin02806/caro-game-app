import socket from "../../config/socket.config";

import React, { useEffect, useState } from "react";
import { Layout, Button, Menu, Tooltip, Dropdown, Row, Col } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  useRouteMatch,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";

import { WrapperDashboard, ChatBoxWrapper } from "./styled";

import Widget from "../../components/@core/Widget";
import UserOnline from "./UserOnline";
import RoomCard from "./Room";
import ChatBox from "./Chat";
import Sider from "./SiderCustom";
import GameRoom from "../GameRoom";

import {
  getUserOnlineMiddleware,
  createRoomGameMiddleware,
} from "../../redux/Game/game.middlewares";
import {
  addConversationMiddleware,
  addMessageFromSocketMiddleware,
} from "../../redux/Conversation/conversation.actions";

const { Content } = Layout;

const GameDashboard = (props) => {
  const {
    auth,
    game,
    getUserOnline,
    conversations,
    openChatBox,
    addMessageFromSocket,
    createRoomGame,
  } = props;

  const [partnerData, setPartnerData] = useState(null);

  let { path, url } = useRouteMatch();

  const history = useHistory();

  // Create a game room
  const createRoom = () => {
    createRoomGame().then((room) => {
      history.push(`${url}/tro-choi/${room._id}`);
    });
  };

  useEffect(() => {
    document.title = "Trang chủ Game";
  }, []);

  //Get list user online
  useEffect(() => {
    getUserOnline();
  }, []);

  // Listen join room event
  useEffect(() => {
    socket.on("joined-room", (msg) => {
      const { avatar, username, _id } = msg;

      setPartnerData({ avatar, username, _id });
    });

    return () => socket.off("joined-room");
  }, []);

  // Listen message event
  useEffect(() => {
    const callback = (msg) => {
      const { message, sender_id, room_id } = msg;

      const partnerInfo = game.users.find((u) => u._id === sender_id);

      openChatBox({
        userId: auth.profileId,
        partnerId: sender_id,
        avatarPartner: partnerInfo.avatar,
        userNamePartner: partnerInfo.username,
      }).then((res) => {
        console.log(res);
        addMessageFromSocket({
          message: { content: message.content },
          senderId: sender_id,
          conversationId: room_id,
        });
      });
    };
    socket.on("conversation-message", callback);

    return () => socket.off("conversation-message", callback);
  }, [partnerData]);

  const menu = (
    <Menu style={{ width: "300px" }}>
      {game.users.map((user) => (
        <Menu.Item key={user._id}>
          <UserOnline
            openChatBox={() =>
              openChatBox({
                userId: auth.profileId,
                partnerId: user._id,
                avatarPartner: user.avatar,
                userNamePartner: user.username,
              })
            }
            isOnline={user.online_state}
            userName={user.username}
            avatar={user.avatar}
          />
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <WrapperDashboard>
      <Tooltip placement="left" title="Danh sách người dùng online">
        <Dropdown overlay={menu} placement="topRight" arrow trigger={["click"]}>
          <Widget
            position="fixed"
            icon={UsergroupAddOutlined}
            index={100000}
            bottom={10}
            right={10}
          />
        </Dropdown>
      </Tooltip>

      <ChatBoxWrapper>
        {conversations.map((box, index) => {
          return (
            <ChatBox
              key={index}
              partner={box.participants[1]}
              conversationId={box.conversationId}
            />
          );
        })}
      </ChatBoxWrapper>

      <Layout style={{ height: "100%" }}>
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0", width: "14%" }}
          >
            <Button
              onClick={createRoom}
              loading={game.dashboard.isCreateLoading}
              type="primary"
            >
              Tạo bàn
            </Button>
          </Layout>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Switch>
              <Route exact path={`${path}`}>
                <>
                  <Sider />
                  <Content style={{ padding: "0 24px", minHeight: 280 }}>
                    <Row gutter={[10, 0]}>
                      {game.dashboard.rooms.map((room) => (
                        <Col key={room._id} span={4}>
                          <Link to={`${url}/tro-choi/${room._id}`}>
                            <RoomCard />
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </Content>
                </>
              </Route>
              <Route path={`${path}/tro-choi/:roomId`}>
                <GameRoom />
              </Route>
            </Switch>
          </Layout>
        </Content>
      </Layout>
    </WrapperDashboard>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: {
      ...state.auth,
    },
    game: {
      ...state.game,
      users: state.game.users,
      dashboard: {
        ...state.game.dashboard,
      },
    },
    conversations: state.chat.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessageFromSocket: ({ message, conversationId, senderId }) =>
      dispatch(
        addMessageFromSocketMiddleware({
          message,
          conversationId,
          senderId,
        })
      ),
    getUserOnline: () => {
      dispatch(getUserOnlineMiddleware());
    },
    openChatBox: ({ userId, partnerId, avatarPartner, userNamePartner }) =>
      dispatch(
        addConversationMiddleware({
          userId,
          partnerId,
          avatarPartner,
          userNamePartner,
        })
      ),
    createRoomGame: () => dispatch(createRoomGameMiddleware()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDashboard);
