import React, { useEffect } from "react";
import { Layout, Button, Menu, Tooltip, Dropdown } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

import { WrapperDashboard } from "./styled";

import Widget from "../../components/@core/Widget";
import UserOnline from "./UserOnline";

import { getUserOnlineMiddleware } from "../../redux/UserOnline/userOnline.middlewares";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const GameDashboard = (props) => {
  const { game, getUserOnline } = props;

  useEffect(() => {
    document.title = "Trang chủ Game";
  }, []);

  useEffect(() => {
    getUserOnline();
  }, []);

  const menu = (
    <Menu style={{ width: "300px" }}>
      {game.users.map((user) => (
        <Menu.Item key={user._id}>
          <UserOnline isOnline={true} userName={user.username} />
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

      <Layout style={{ height: "100%" }}>
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0", width: "14%" }}
          >
            <Button type="primary">Tùy chỉnh game</Button>
          </Layout>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="subnav 3"
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              GameDashboard
            </Content>
          </Layout>
        </Content>
      </Layout>
    </WrapperDashboard>
  );
};

const mapStateToProps = (state) => {
  return {
    game: {
      ...state.game,
      users: state.game.users,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOnline: () => {
      dispatch(getUserOnlineMiddleware());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDashboard);
