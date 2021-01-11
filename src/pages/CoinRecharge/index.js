import React from "react";
import "./styles.css";
import Payment from "./Payment";
import PaymentHistory from "./PaymentHistory";

import { Row, Col, Tabs, Card } from "antd";
import { HistoryOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { useRouteMatch, Route, Switch, Link } from "react-router-dom";

const { TabPane } = Tabs;

const CoinRecharge = () => {
  const { url, path } = useRouteMatch();

  return (
    <div className="root card-container">
      <Switch>
        <Tabs type="card" defaultActiveKey="1" centered>
          <TabPane
            tab={
              <Link to={`${path}`}>
                <span>
                  <DollarCircleOutlined />
                  Nạp xu
                </span>
              </Link>
            }
            key="1"
          >
            <Row>
              <Col span={18} offset={3}>
                <Route path={url}>
                  <Payment />
                </Route>
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <Link to={`${path}/lich-su`}>
                <span>
                  <HistoryOutlined />
                  Lịch sử giao dịch
                </span>
              </Link>
            }
            key="2"
          >
            <Row>
              <Col span={16} offset={4}>
                <Card
                  style={{
                    width: "auto",
                    border: "1px solid #d6d6d6",
                    boxShadow: "5px 10px 18px #d6d6d6",
                  }}
                >
                  <Route path={`${url}/lich-su`}>
                    <PaymentHistory />
                  </Route>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Switch>
    </div>
  );
};

export default CoinRecharge;
