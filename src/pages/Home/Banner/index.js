import React from "react";
import PropTypes from "prop-types";

import "./styles.css";
import ScrollElement from "rc-scroll-anim/lib/ScrollElement";
import { DownOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim/lib/QueueAnim";

function typeFunc(a) {
  if (a.key === "line") {
    return "right";
  } else if (a.key === "button") {
    return "bottom";
  }
  return "left";
}

export default function Banner() {
  return (
    <section className="page banner-wrapper">
      <ScrollElement className="page" id="banner" playScale={0.9}>
        <QueueAnim
          className="banner-text-wrapper"
          type={typeFunc}
          delay={300}
          key="banner"
        >
          <h2 key="h2">
            WELCOME <p>HOME</p>
          </h2>
          <p key="content">Caro online game</p>
          <span className="line" key="line" />
          <div key="button1" className="start-button clearfix">
            <a>Register</a>
            <a>Login</a>
          </div>
        </QueueAnim>
        <DownOutlined className="down" />
      </ScrollElement>
    </section>
  );
}
Banner.propTypes = {
  onEnterChange: PropTypes.func,
};
