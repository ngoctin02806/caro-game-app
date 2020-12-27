import React from "react";
import { Avatar } from "antd";

import CupIcon from "../../../../components/Icons/CupIcon";

import { TopUserWrapper, Username, Point } from "./styled";

const TopUser = (props) => {
  const { icon: Icon, width, ranking } = props;

  return (
    <>
      <TopUserWrapper>
        <div style={{ width: `${width}px`, textAlign: "center" }}>
          <Icon />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Avatar shape="square" size="large" src={ranking.users.avatar} />
          </div>
          <div style={{ marginLeft: "5px" }}>
            <Username>{ranking.users.username}</Username>
            <div style={{ display: "flex" }}>
              <Point>{ranking.point_total}</Point>
              <CupIcon width={15} />
            </div>
          </div>
        </div>
      </TopUserWrapper>
    </>
  );
};

export default TopUser;
