import React from "react";
import { Avatar } from "antd";

import { TopUserWrapper, Username, Point } from "./styled";

const TopUser = (props) => {
  const { icon: Icon, width } = props;

  return (
    <TopUserWrapper>
      <div style={{ width: `${width}px`, textAlign: "center" }}>
        <Icon />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <Avatar shape="square" size="large" />
        </div>
        <div style={{ marginLeft: "5px" }}>
          <Username>User 1</Username>
          <Point>123B</Point>
        </div>
      </div>
    </TopUserWrapper>
  );
};

export default TopUser;
