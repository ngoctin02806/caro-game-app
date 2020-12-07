import React from "react";

import "./styles.css";
import { Menu, Row, Col, Button } from "antd";

import Logo from "../../public/images/logo.svg";

const Header = (props) => {
  const menu = [
    <Button className="header-lang-button" ghost size="small" key="lang">
      Register
    </Button>,
    <Button className="header-lang-button" ghost size="small" key="lang">
      Login
    </Button>,
    <Menu mode="horizontal" defaultSelectedKeys={["home"]} id="nav" key="nav">
      <Menu.Item key="home">Home</Menu.Item>
      <Menu.Item key="docs/spec">Guidelines</Menu.Item>
      <Menu.Item key="docs/react">Components</Menu.Item>
      <Menu.Item key="docs/pattern">Patterns</Menu.Item>
      <Menu.Item key="docs/resource">Resources</Menu.Item>
    </Menu>,
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
        <Col lg={20} md={19} sm={0} xs={0}>
          {menu}
        </Col>
      </Row>
    </header>
  );
};

export default Header;
