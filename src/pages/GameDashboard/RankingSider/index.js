import React, { useState } from "react";
import { Layout, Menu } from "antd";

import CupIcon from "../../../public/images/cup.png";

import TopUser from "./TopUser";
import GoldMedalIcon from "../../../components/Icons/GoldMedalIcon";
import SilverMedalIcon from "../../../components/Icons/SilverMedalIcon";
import BronzeMedalIcon from "../../../components/Icons/BronzeMedalIcon";
import StripeIcon from "../../../components/Icons/StripeIcon";

import { TopRankWrapper } from "./styled";

const { Sider } = Layout;

const RankingSider = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Sider
      width={258}
      className="site-layout-background"
      style={{
        height: "100vh",
        position: "fixed",
        right: 0,
        top: 80,
        background: "#f0f2f5",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        theme="light"
        selectable={false}
      >
        <Menu.Item
          danger={true}
          icon={<img style={{ width: "20px" }} src={CupIcon} alt="cup" />}
          style={{
            background: "rgb(255,215,9)",
            background:
              "linear-gradient(90deg, rgba(255,215,9,1) 0%, rgba(255,235,115,1) 44%, rgba(255,236,184,1) 100%)",
            color: "rgb(107 91 9)",
            margin: "0px",
            fontWeight: "bold",
          }}
        >
          Bảng xếp hạng hàng tuần
        </Menu.Item>
        <TopRankWrapper
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          isHover={isHover}
        >
          <TopUser width={40} icon={GoldMedalIcon} />
          <TopUser width={40} icon={SilverMedalIcon} />
          <TopUser width={40} icon={BronzeMedalIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
          <TopUser width={40} icon={StripeIcon} />
        </TopRankWrapper>
      </Menu>
    </Sider>
  );
};

export default RankingSider;
