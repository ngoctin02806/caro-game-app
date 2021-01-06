import React from "react";
import "./styles.css";
import Payment from "./Payment";

import { Row, Col, Tabs, Card } from "antd";
import { HistoryOutlined, DollarCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const CoinRecharge = () => {
  return (
    <div className="root card-container">
      <Tabs type="card" defaultActiveKey="1" centered>
        <TabPane
          tab={
            <span>
              <DollarCircleOutlined />
              Nạp xu
            </span>
          }
          key="1"
        >
          <Row>
            <Col span={18} offset={3}>
              <Payment />
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <HistoryOutlined />
              Lịch sử giao dịch
            </span>
          }
          key="2"
        >
          history
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CoinRecharge;
