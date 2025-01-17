import React, { useState, useEffect } from "react";
import { Layout, Menu, List } from "antd";
import { connect } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import CupIcon from "../../../public/images/cup.png";

import TopUser from "./TopUser";
import GoldMedalIcon from "../../../components/Icons/GoldMedalIcon";
import SilverMedalIcon from "../../../components/Icons/SilverMedalIcon";
import BronzeMedalIcon from "../../../components/Icons/BronzeMedalIcon";
import StripeIcon from "../../../components/Icons/StripeIcon";

import { TopRankWrapper } from "./styled";

import { getRankingsMiddleware } from "../../../redux/Game/game.middlewares";

const { Sider } = Layout;

const RankingSider = (props) => {
  const { rankings, getRankings } = props;

  const [isHover, setIsHover] = useState(false);

  let { path } = useRouteMatch();

  const location = useLocation();

  useEffect(() => {
    getRankings();
  }, [getRankings]);

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
        zIndex: 2,
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
          <List
            loading={rankings.isLoading}
            itemLayout="horizontal"
            dataSource={rankings.data}
            renderItem={(rank, index) => {
              switch (index) {
                case 0:
                  return (
                    <Link
                      to={{
                        pathname: `${path}/nguoi-choi/${rank._id}`,
                        state: { background: location },
                      }}
                    >
                      <TopUser ranking={rank} width={40} icon={GoldMedalIcon} />
                    </Link>
                  );
                case 1:
                  return (
                    <Link
                      to={{
                        pathname: `${path}/nguoi-choi/${rank._id}`,
                        state: { background: location },
                      }}
                    >
                      <TopUser
                        ranking={rank}
                        width={40}
                        icon={SilverMedalIcon}
                      />
                    </Link>
                  );
                case 2:
                  return (
                    <Link
                      to={{
                        pathname: `${path}/nguoi-choi/${rank._id}`,
                        state: { background: location },
                      }}
                    >
                      <TopUser
                        ranking={rank}
                        width={40}
                        icon={BronzeMedalIcon}
                      />
                    </Link>
                  );
                default:
                  return (
                    <Link
                      to={{
                        pathname: `${path}/nguoi-choi/${rank._id}`,
                        state: { background: location },
                      }}
                    >
                      <TopUser ranking={rank} width={40} icon={StripeIcon} />
                    </Link>
                  );
              }
            }}
          />
        </TopRankWrapper>
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state) => {
  return {
    rankings: {
      ...state.game.rankings,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRankings: () => dispatch(getRankingsMiddleware()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingSider);
