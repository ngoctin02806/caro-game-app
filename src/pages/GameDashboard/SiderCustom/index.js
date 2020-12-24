import React from "react";
import { Layout, Menu, Button } from "antd";
import { SettingOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";

import { createRoomGameMiddleware } from "../../../redux/Game/game.middlewares";

const { Sider } = Layout;

const SiderCustom = (props) => {
  const { game, createRoomGame } = props;

  let { url } = useRouteMatch();

  const history = useHistory();

  // Create a game room
  const createRoom = () => {
    createRoomGame().then((room) => {
      history.push(`${url}/tro-choi/${room._id}`);
    });
  };

  return (
    <Sider
      width={258}
      className="site-layout-background"
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 80,
        background: "#f0f2f5",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        theme="dark"
        selectable={false}
      >
        <Menu.Item>
          <Button type="primary" style={{ width: "100%", textAlign: "center" }}>
            Chơi nhanh
          </Button>
        </Menu.Item>
        <Menu.Item
          danger={true}
          icon={<SettingOutlined />}
          style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
        >
          Tùy chỉnh game
        </Menu.Item>
        <Menu.Item
          icon={<AppstoreAddOutlined />}
          key="1"
          onClick={createRoom}
          style={{ backgroundColor: "transparent" }}
        >
          Tạo phòng
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    game: {
      ...state.game,
      users: state.game.users,
      dashboard: {
        ...state.game.dashboard,
      },
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoomGame: () => dispatch(createRoomGameMiddleware()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderCustom);
