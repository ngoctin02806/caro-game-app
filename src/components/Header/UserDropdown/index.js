import React, { useEffect } from "react";
import { Dropdown, Avatar, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { logoutMiddleware } from "../../../redux/Auth/auth.middlewares";

const UserDropDown = (props) => {
  const { user, getUserProfile, logout } = props;

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/thong-tin-ca-nhan">{user.username}</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/thong-tin-ca-nhan">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={logout}>
        <LogoutOutlined />
        <label>Đăng xuất</label>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    getUserProfile();
  }, []); // eslint-disable-line

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div
        style={{
          float: "right",
          display: "flex",
          alignItems: "center",
          marginTop: "29px",
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
  };
};

export default connect(null, mapDispatchToProps)(UserDropDown);
