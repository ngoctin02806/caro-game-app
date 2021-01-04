import React from "react";
import { Layout, Menu, Button } from "antd";
import { SettingOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useRouteMatch, useLocation, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";

import { quicklyPlayMiddleware } from "../../../redux/Game/game.middlewares";

const { Sider } = Layout;

const SiderCustom = (props) => {
  const { quicklyPlay } = props;

  let { path } = useRouteMatch();

  const location = useLocation();

  const history = useHistory();

  const autoFindRoom = () => {
    quicklyPlay().then((res) => {
      if (res) {
        history.push(`/trang-chu/tro-choi/${res}`);
      }
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
          <Button
            type="primary"
            style={{ width: "100%", textAlign: "center" }}
            onClick={autoFindRoom}
          >
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
          style={{ backgroundColor: "transparent" }}
        >
          <Link
            to={{
              pathname: `${path}/tao-phong`,
              state: { background: location },
            }}
          >
            Tạo phòng
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    quicklyPlay: () => dispatch(quicklyPlayMiddleware()),
  };
};

export default connect(null, mapDispatchToProps)(SiderCustom);
