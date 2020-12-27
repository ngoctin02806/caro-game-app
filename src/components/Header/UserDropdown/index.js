import React, { useEffect } from "react";
import { Dropdown, Avatar, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { logoutMiddleware } from "../../../redux/Auth/auth.middlewares";
import { topUpLoginMiddleware } from "../../../redux/Game/game.middlewares";
import { topUpLogin } from "../../../redux/Game/game.actions";

const UserDropDown = (props) => {
  const { user, getUserProfile, logout, loginTopUp, openTopUpModal } = props;

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link
          to="/thong-tin-ca-nhan"
          style={{ fontWeight: "bold", color: "#555" }}
        >
          {user.username}
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/thong-tin-ca-nhan">
          <UserOutlined />
          <label>Thông tin cá nhân</label>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={logout}>
        <LogoutOutlined />
        <label>Đăng xuất</label>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    loginTopUp().then((res) => {
      if (res !== "has_top_up") {
        openTopUpModal();
      }
      getUserProfile();
    });
  }, []); // eslint-disable-line

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div
        style={{
          float: "right",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{ cursor: "pointer", marginTop: "0px" }}
          className="header-lang-button"
          src={user.avatar}
        />
        <CaretDownOutlined
          style={{ color: "white", fontSize: "13px", marginLeft: "3px" }}
        />
      </div>
    </Dropdown>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutMiddleware()),
    loginTopUp: () => dispatch(topUpLoginMiddleware()),
    openTopUpModal: () => dispatch(topUpLogin()),
  };
};

export default connect(null, mapDispatchToProps)(UserDropDown);
