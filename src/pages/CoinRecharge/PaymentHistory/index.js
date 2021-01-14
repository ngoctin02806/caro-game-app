import React, { useState, useEffect } from "react";

import { List, Avatar, Tag, Skeleton, Pagination } from "antd";
import { Row, Col } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import axios from "axios";

import VnPayLogo from "../../../public/images/vnpay-logo2.png";
import MomoLogo from "../../../public/images/momo-logo.png";
import NoPaymentType from "../../../public/images/broke.svg";

const PaymentHistory = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    offset: 1,
    limit: 20,
  });
  const [list, setList] = useState([]);

  const changePage = (page) => {
    axios(`/payments/transactions?offset=${page}&limit=${pagination.limit}`, {
      method: "GET",
    }).then((res) => {
      setPagination({
        ...pagination,
        offset: page,
      });
      setList(res.data.transactions);
    });
  };

  useEffect(() => {
    document.title = "Lịch sử giao dịch";
  }, []);

  useEffect(() => {
    axios(
      `/payments/transactions?offset=${pagination.offset}&limit=${pagination.limit}`,
      {
        method: "GET",
      }
    ).then((res) => {
      setPagination({
        total: res.data.total,
        offset: res.data.offset,
        limit: res.data.limit,
      });
      setList(res.data.transactions);
    });
  }, []);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  item.type === "VNPAY" ? (
                    <Avatar src={VnPayLogo} />
                  ) : item.type === "MOMO" ? (
                    <Avatar src={MomoLogo} />
                  ) : (
                    <Avatar src={NoPaymentType} />
                  )
                }
                title={item.data.description}
                description={new Date(item.created_at).toLocaleString()}
              />
              <Row>
                <Col span={12} style={{ width: "100px" }}>
                  <div>
                    {item.status === "PAID" ? (
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Paid
                      </Tag>
                    ) : item.status === "WAITING" ? (
                      <Tag icon={<ClockCircleOutlined />} color="processing">
                        Waiting
                      </Tag>
                    ) : (
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        Failed
                      </Tag>
                    )}
                  </div>
                </Col>
                <Col span={12} style={{ width: "100px" }}>
                  <div style={{ float: "right" }}>
                    <p style={{ fontWeight: "bold", color: "#058ab2" }}>
                      {item.amount} VND
                    </p>
                  </div>
                </Col>
              </Row>
            </Skeleton>
          </List.Item>
        )}
      />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Pagination
          onChange={changePage}
          defaultCurrent={pagination.offset}
          defaultPageSize={20}
          total={pagination.total}
        />
      </div>
    </>
  );
};

export default PaymentHistory;
