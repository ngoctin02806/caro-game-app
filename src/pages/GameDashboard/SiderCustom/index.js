import React from "react";
import { Layout, Menu, Button } from "antd";
import { SettingOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useRouteMatch, useLocation, Link } from "react-router-dom";

const { Sider } = Layout;

const SiderCustom = (props) => {
  let { path } = useRouteMatch();

  const location = useLocation();

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

export default SiderCustom;
