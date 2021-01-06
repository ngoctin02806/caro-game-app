import socket from "../../config/socket.config";

import React, { useEffect, useState } from "react";
import { Layout, Menu, Tooltip, Dropdown, Row, Col, Pagination } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  useRouteMatch,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import queryString from "query-string";

import { WrapperDashboard, ChatBoxWrapper } from "./styled";

import Widget from "../../components/@core/Widget";
import UserOnline from "./UserOnline";
import RoomCard from "./Room";
import ChatBox from "./Chat";
import Sider from "./SiderCustom";
import RankingSider from "./RankingSider";
import GameRoom from "../GameRoom";
import CustomizeModal from "./SiderCustom/CustomizeModal";
import TopUpModal from "./TopUpModal";
import EnterPassword from "./EnterPasswordModal";
import Payment from "./Payment";

import {
  getUserOnlineMiddleware,
  loadRoomsGameMiddleware,
  enterPasswordToJoinRoom,
} from "../../redux/Game/game.middlewares";
import {
  addConversationMiddleware,
  addMessageFromSocketMiddleware,
} from "../../redux/Conversation/conversation.actions";
import UserInformationModal from "../../components/@core/UserInformationModal";

const { Content } = Layout;

const GameDashboard = (props) => {
  const {
    auth,
    game,
    user,
    getUserOnline,
    conversations,
    openChatBox,
    addMessageFromSocket,
    loadRooms,
    joinRoom,
  } = props;

  const [partnerData, setPartnerData] = useState(null);
  const [openPassword, setOpenPassword] = useState(false);

  let { path, url } = useRouteMatch();

  const history = useHistory();

  const location = useLocation();

  let background = location.state && location.state.background;

  const { page = 1 } = queryString.parse(location.search);

  const changePage = (currentPage) => {
    loadRooms({ offset: currentPage, limit: 20 });
    history.push(
      `${url}?${queryString.stringify({
        page: currentPage,
      })}`
    );
  };

  const checkPrivateRoom = (type, room_id, url, user_id) => () => {
    if (type === "PRIVATE_ROOM") {
      if (user_id === auth.profileId) {
        const roomGame = game.dashboard.rooms.find((r) => r._id === room_id);

        joinRoom(room_id, roomGame.room_secret, user).then((res) => {
          if (res) {
            socket.emit("emit-join-room-game", {
              room_id: room_id,
              user_id: auth.profileId,
            });
            history.push(`${url}/tro-choi/${room_id}`);
          }
        });
      } else {
        console.log("enter password");
        setOpenPassword(room_id);
      }
    } else {
      joinRoom(room_id, "", user).then((res) => {
        if (res) {
          socket.emit("emit-join-room-game", {
            room_id: room_id,
            user_id: auth.profileId,
          });
          history.push(`${url}/tro-choi/${room_id}`);
        }
      });
    }

    return;
  };

  useEffect(() => {
    document.title = "Trang chủ Game";
  }, []);

  // Load all rooms
  useEffect(() => {
    loadRooms({ offset: page, limit: 20 });
  }, []); // eslint-disable-line

  //Get list user online
  useEffect(() => {
    getUserOnline();
  }, []); // eslint-disable-line

  // Listen join room event
  useEffect(() => {
    socket.on("joined-room", (msg) => {
      console.log(msg);
      const { avatar, username, _id, point } = msg;

      setPartnerData({ avatar, username, _id, point });
    });

    return () => socket.off("joined-room");
  }, []);

  // Listen message event
  useEffect(() => {
    const callback = (msg) => {
      const { message, sender_id, room_id, partner_id } = msg;
      console.log(partner_id);

      let partnerInfo = game.users.find((u) => u._id === partner_id);

      if (!partnerInfo) {
        partnerInfo = game.users.find((u) => u._id === sender_id);
      }

      console.log(room_id);

      openChatBox({
        userId: auth.profileId,
        partnerId: partnerInfo._id,
        avatarPartner: partnerInfo ? partnerInfo.avatar : "",
        userNamePartner: partnerInfo ? partnerInfo.username : "",
      }).then((res) => {
        console.log(res);
        addMessageFromSocket({
          message: { content: message.content },
          senderId: sender_id,
          conversationId: res.conversationId,
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

      <TopUpModal />
      <EnterPassword
        visible={openPassword}
        handleCancel={() => setOpenPassword(false)}
      />

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
          <Layout className="site-layout-background">
            <Switch>
              <Route path={`${path}/thanh-toan`}>
                <>
                  <RankingSider />
                  <Sider />
                  <Content>
                    <Row>
                      <Col span={16} offset={4}>
                        <Payment />
                      </Col>
                    </Row>
                  </Content>
                </>
              </Route>
              <Route exact path={`${path}/tro-choi/:roomId`}>
                <RankingSider />
                <GameRoom />
              </Route>
              <Route path={`${path}`}>
                <>
                  <RankingSider />
                  <Sider />
                  <Content
                    style={{
                      padding: "0px 24px",
                      minHeight: 280,
                      marginLeft: "200px",
                    }}
                  >
                    <Row gutter={[10, 0]}>
                      <Col span={20}>
                        <Row gutter={[10, 0]}>
                          {game.dashboard.rooms.map((room, index) => (
                            <Col key={room._id} span={6}>
                              <div
                                onClick={checkPrivateRoom(
                                  room.type,
                                  room._id,
                                  url,
                                  room.created_by
                                )}
                              >
                                <RoomCard
                                  status={room.status}
                                  roomName={
                                    (game.dashboard.pagination.offset - 1) *
                                      20 +
                                    index +
                                    1
                                  }
                                  participants={room.players}
                                  betLevel={room.bet_level}
                                  roomType={room.type}
                                />
                              </div>
                            </Col>
                          ))}
                        </Row>
                        <Pagination
                          onChange={changePage}
                          style={{
                            textAlign: "center",
                            marginTop: "20px",
                          }}
                          defaultCurrent={
                            game.dashboard.pagination
                              ? game.dashboard.pagination.offset
                              : 1
                          }
                          defaultPageSize={
                            game.dashboard.pagination
                              ? game.dashboard.pagination.limit
                              : 20
                          }
                          total={
                            game.dashboard.pagination
                              ? game.dashboard.pagination.total
                              : 10
                          }
                        />
                      </Col>
                    </Row>
                  </Content>
                </>
              </Route>
            </Switch>
            {background && (
              <Route path={`${path}/tao-phong`}>
                <CustomizeModal
                  isModalVisible={true}
                  handleCancel={() => history.goBack()}
                  location={url}
                />
              </Route>
            )}
            {background && (
              <Route path={`${url}/nguoi-choi/:userId`}>
                <UserInformationModal
                  isModalVisible={true}
                  handleCancel={() => history.goBack()}
                />
              </Route>
            )}
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
    user: {
      id: state.user.id,
      username: state.user.username,
      avatar: state.user.avatar,
      point: state.user.point,
    },
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
    loadRooms: ({ offset, limit }) =>
      dispatch(loadRoomsGameMiddleware({ offset, limit })),
    joinRoom: (roomId, roomSecret, user) =>
      dispatch(enterPasswordToJoinRoom(roomId, roomSecret, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDashboard);
