import React, { useState } from "react";

import { List, Avatar, Tag, Skeleton } from "antd";
import { Row, Col } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import VnPayLogo from "../../../public/images/vnpay-logo2.png";
import MomoLogo from "../../../public/images/momo-logo.png";
import NoPaymentType from "../../../public/images/broke.svg";

const data = [
  {
    _id: "Dl2pra36RlGswA77-dxIufTv_CMQaB-jwgKxykb2",
    status: "WAITING",
    created_at: 1609858181229,
    transaction_id: {
      _id: "cVVDZCapRpCd3psgHFGQvZtIBZ6_qcdi9xdLuvOy",
      data: {
        description: "Chuyển cho vui",
      },
      amount: 10000,
      status: "WAITING",
      type: "VNPAY",
      created_at: 1609858180058,
      created_by: "QFDpQ0DbLPtR3cZBx4hLAzQEh8w8TJv7W5K_QMsP",
    },
  },

  {
    _id: "e-_afd_6AlNiW1ZhMuQ5s065myV0SU4Nsb1PR_jW",
    status: "WAITING",
    created_at: 1609909205599,
    transaction_id: {
      _id: "mcxpyDqckYIw3Wkdxn7ZsQqgxw0fMw8fVE9Css6x",
      data: {
        description: "Nhiều tiền để làm gì",
      },
      amount: 100000,
      status: "PAID",
      type: "VNPAY",
      created_at: 1609909205596,
      created_by: "QFDpQ0DbLPtR3cZBx4hLAzQEh8w8TJv7W5K_QMsP",
    },
  },
  {
    _id: "y3sgqVmTtjex-NZbYWe_kgiqiiVOAgiYJoVydiuv",
    status: "PAID",
    created_at: 1609909273607,
    transaction_id: {
      _id: "UD8W1TmUwh3x7ntRfh-WyuBU4cMWxUJMF8Ky2nnx",
      data: {
        description: "Thích thì chuyển",
      },
      amount: 100000,
      status: "WAITING",
      type: "MOMO",
      created_at: 1609909273605,
      created_by: "QFDpQ0DbLPtR3cZBx4hLAzQEh8w8TJv7W5K_QMsP",
    },
  },
  {
    _id: "y0qtBuggrfI63CadfQvNRpo3ati2avNHGX3bT7ly",
    status: "PAID",
    created_at: 1609909624019,
    transaction_id: {
      _id: "erHpuZCw7d4nc36KDAXBjdw5-6ocpaq9dhiuhxTH",
      data: {
        description: "Test payment by momo",
      },
      amount: 100000,
      status: "FAILED",
      type: "MOMO",
      created_at: 1609909624015,
      created_by: "QFDpQ0DbLPtR3cZBx4hLAzQEh8w8TJv7W5K_QMsP",
    },
  },
  {
    _id: "LWXButkZ2QanOtA9O4yqyuYZI3EOuhajOUWC6B14",
    status: "PAID",
    created_at: 1609946134176,
    transaction_id: {
      _id: "-eYRsZexptMiFlAC2Q_tgE26GsRIB3jAvM-tpFND",
      data: {
        description: "Test payment by momo",
      },
      amount: 10000,
      status: "PAID",
      type: "MOMO",
      created_at: 1609946134176,
      created_by: "QFDpQ0DbLPtR3cZBx4hLAzQEh8w8TJv7W5K_QMsP",
    },
  },
];

const PaymentHistory = () => {
  const [list, setList] = useState(data.reverse());

  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item key={item._id}>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                item.transaction_id.type === "VNPAY" ? (
                  <Avatar src={VnPayLogo} />
                ) : item.transaction_id.type === "MOMO" ? (
                  <Avatar src={MomoLogo} />
                ) : (
                  <Avatar src={NoPaymentType} />
                )
              }
              title={item.transaction_id.data.description}
              description={new Date(item.created_at).toLocaleString()}
            />
            <Row>
              <Col span={12} style={{ width: "100px" }}>
                <div>
                  {item.transaction_id.status === "PAID" ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      Paid
                    </Tag>
                  ) : item.transaction_id.status === "WAITING" ? (
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
                    {item.transaction_id.amount} VND
                  </p>
                </div>
              </Col>
            </Row>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default PaymentHistory;
