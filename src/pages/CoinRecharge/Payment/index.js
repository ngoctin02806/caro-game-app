import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import {
  Collapse,
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Radio,
  Alert,
  Image,
} from "antd";

import "./styles.css";

import VnPayIcon from "../../../public/images/vnpay-logo.png";
import MomoIcon from "../../../public/images/momo.png";

const { Panel } = Collapse;

const columns = [
  {
    title: "Giá",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "Coin",
    key: "coin",
    dataIndex: "coin",
    render: (coin) => <Tag color="gold">Coin x{coin}</Tag>,
  },
];

const data = [
  {
    key: "1",
    text: "10 000 VND",
    coin: 10,
    cost: 10000,
  },
  {
    key: "2",
    text: "20 000 VND",
    coin: 20,
    cost: 20000,
  },
  {
    key: "3",
    text: "50 000 VND",
    coin: 50,
    cost: 50000,
  },
  {
    key: "4",
    text: "100 000 VND",
    coin: 100,
    cost: 100000,
  },
  {
    key: "5",
    text: "200 000 VND",
    coin: 200,
    cost: 200000,
  },
  {
    key: "6",
    text: "500 000 VND",
    coin: 500,
    cost: 500000,
  },
];

const Payment = () => {
  const [selected, setSelected] = useState(data[0]);
  const [payMethod, setPayMethod] = useState("VNPAY");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    document.title = "Nạp xu";
  }, [location]);

  const VnPayLogo = (expand) => {
    return <Image src={VnPayIcon} />;
  };

  const MomoLogo = () => {
    return <Image src={MomoIcon} />;
  };

  const handlePayment = () => {
    setIsLoading(true);

    axios("/payments/transactions", {
      method: "POST",
      data: {
        amount: selected.cost,
        type: payMethod,
        option: {
          description: `Thanh toán bằng ${payMethod} với ${selected.cost} VND`,
        },
      },
    }).then((res) => {
      setIsLoading(false);
      window.location.href = res.data.pay_url;
    });
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setSelected(e.target.value);
  };
  return (
    <>
      <Collapse
        accordion
        defaultActiveKey="VNPAY"
        expandIcon={VnPayLogo}
        className="site-collapse-custom-collapse collapse "
        onChange={(method) => setPayMethod(method)}
      >
        <Panel
          className="panel site-collapse-custom-panel"
          header="Thanh toán với VnPay"
          key="VNPAY"
          showArrow={false}
        >
          <div className="site-card-wrapper">
            <Row gutter={32}>
              <Col span={8}>
                <Card className="card" style={{ width: "auto" }}>
                  <p className="step-text">
                    Bước 1: <span>&nbsp;Tham khảo bảng giá</span>
                  </p>
                  <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={false}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="card" style={{ width: "auto" }}>
                  <p className="step-text">
                    Bước 2: <span>&nbsp;Nhập số tiền chuyển</span>
                  </p>
                  <Radio.Group onChange={(e) => onChange(e)} value={selected}>
                    {data.map((option, pos) => (
                      <Radio style={radioStyle} value={option} key={pos}>
                        {option.text}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="card" style={{ width: "auto" }}>
                  <p className="step-text">
                    Bước 3: <span>&nbsp;Xác nhận thanh toán</span>
                  </p>
                  <Alert
                    style={{ marginBottom: "10px", padding: "10px" }}
                    message="Số tiền nạp:"
                    description={selected.text}
                    type="info"
                  />
                  <Alert
                    style={{ marginBottom: "10px", padding: "10px" }}
                    message="Số coin nhận được:"
                    description={selected.coin}
                    type="info"
                  />
                  <Alert
                    style={{ marginBottom: "10px", padding: "10px" }}
                    message="Phương thức thanh toán:"
                    description="VnPay"
                    type="info"
                  />
                  <VnPayLogo />
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                      onClick={handlePayment}
                      loading={isLoading}
                      type="primary"
                    >
                      Xác nhận thanh toán
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Panel>
        <Panel
          className="panel site-collapse-custom-panel"
          header="Thanh toán với Momo"
          key="MOMO"
          showArrow={false}
        >
          <div>
            <Row gutter={32}>
              <Col span={8}>
                <Card className="card" style={{ width: "auto" }}>
                  <p className="step-text">
                    Bước 1: <span>&nbsp;Tham khảo bảng giá</span>
                  </p>
                  <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={false}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card className="card" style={{ width: "auto" }}>
                  <p className="step-text">
                    Bước 2: <span>&nbsp;Nhập số tiền chuyển</span>
                  </p>
                  <Radio.Group onChange={(e) => onChange(e)} value={selected}>
                    {data.map((option, pos) => (
                      <Radio style={radioStyle} value={option} key={pos}>
                        {option.text}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="card" style={{ width: "auto" }}>
                  <p className="step-text">
                    Bước 3: <span>&nbsp;Xác nhận thanh toán</span>
                  </p>
                  <Alert
                    style={{ marginBottom: "10px", padding: "10px" }}
                    message="Số tiền nạp:"
                    description={selected.text}
                    type="info"
                  />
                  <Alert
                    style={{ marginBottom: "10px", padding: "10px" }}
                    message="Số coin nhận được:"
                    description={selected.coin}
                    type="info"
                  />
                  <Alert
                    style={{ marginBottom: "10px", padding: "10px" }}
                    message="Phương thức thanh toán:"
                    description="MoMo"
                    type="info"
                  />
                  <MomoLogo />
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                      onClick={handlePayment}
                      loading={isLoading}
                      type="primary"
                    >
                      Xác nhận thanh toán
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Panel>
        <Panel
          className="panel site-collapse-custom-panel"
          header="Thanh toán với ZaloPay"
          key="ZALOPAY"
          showArrow={false}
        >
          <p className="text">Tính năng đang phát triển</p>
        </Panel>
      </Collapse>
    </>
  );
};

export default Payment;
