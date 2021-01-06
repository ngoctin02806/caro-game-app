import React from "react";
import { connect } from "react-redux";

import "./styles.css";
import { Menu, Row, Col, Button } from "antd";

import UserDropDown from "./UserDropdown";
import Point from "./Point";

import { getUserProfileMiddleware } from "../../redux/User/user.actions";

import Logo from "../../public/images/logo.svg";

const Header = (props) => {
  const { auth, user, getUserProfile } = props;

  const menu = [
    !auth.isAuthenticated ? (
      <>
        <Button className="header-lang-button" ghost size="small" key="key1">
          Đăng ký
        </Button>
        <Button className="header-lang-button" ghost size="small" key="key2">
          Đăng nhập
        </Button>
      </>
    ) : (
      <>
        <Point />
        <UserDropDown user={user} getUserProfile={getUserProfile} key="key3" />
      </>
    ),
    !auth.isAuthenticated && (
      <Menu mode="horizontal" defaultSelectedKeys={["home"]} id="nav" key="nav">
        <Menu.Item key="home">Trang chủ</Menu.Item>
      </Menu>
    ),
  ];

  return (
    <header id="header">
      <Row>
        <Col lg={4} md={5} sm={24} xs={24}>
          <a href="/" id="logo">
            <img alt="logo" src={Logo} />
            <span>Ant Design</span>
          </a>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          lg={20}
          md={19}
          sm={0}
          xs={0}
        >
          {menu}
        </Col>
      </Row>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: {
      ...state.auth,
    },
    user: {
      ...state.user,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: () => dispatch(getUserProfileMiddleware()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
