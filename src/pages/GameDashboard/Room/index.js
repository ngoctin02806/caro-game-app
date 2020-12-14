import React from "react";

import { Card, Avatar, Badge, Tooltip } from "antd";
import { LoginOutlined } from "@ant-design/icons";

import { StyledCardCover } from "./styled";

const Room = (props) => {
  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      actions={[
        <Tooltip placement="bottom" title="Còn slot">
          <Badge status="processing" size="default" color="green" />
        </Tooltip>,
        <Tooltip placement="bottom" title="Vào phòng">
          <LoginOutlined />
        </Tooltip>,
        <Avatar.Group>
          <Avatar
            size="small"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <Avatar
            style={{
              backgroundColor: "#f56a00",
            }}
            size="small"
          >
            K
          </Avatar>
        </Avatar.Group>,
      ]}
      cover={<StyledCardCover>Room 1</StyledCardCover>}
      bodyStyle={{ padding: "0px" }}
    ></Card>
  );
};

export default Room;
