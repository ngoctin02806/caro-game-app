import React from "react";
import "./styles.css";
import Payment from "./Payment";
import PaymentHistory from "./PaymentHistory";

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
          <Row>
            <Col span={16} offset={4}>
              <Card
                style={{
                  width: "auto",
                  border: "1px solid #d6d6d6",
                  boxShadow: "5px 10px 18px #d6d6d6",
                }}
              >
                <PaymentHistory />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CoinRecharge;
