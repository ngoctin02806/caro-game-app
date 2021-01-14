import React, { useEffect, useState } from "react";
import { Modal, Avatar, Divider, Typography, Badge } from "antd";
import {
  UserOutlined,
  MoneyCollectOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

import axios from "axios";

const { Text } = Typography;

const UserInformationModal = (props) => {
  const { isModalVisible, handleCancel, handleOk } = props;

  const [userProfile, setUserProfile] = useState({});

  const { userId } = useParams();

  useEffect(() => {
    document.title = userProfile.user
      ? userProfile.user.username
      : "Trang chủ Game";
  }, [userProfile]);

  useEffect(() => {
    axios(`/users/${userId}/profile`, {
      method: "GET",
    })
      .then((res) => {
        setUserProfile({ ...userProfile, ...res.data });
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      style={{ position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: "-35px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Badge dot={true} offset={[-10, 55]} color="green">
          <Avatar
            style={{ border: "2px solid #fff" }}
            size={64}
            src={userProfile.user && userProfile.user.avatar}
          />
        </Badge>
      </div>
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        <Text strong>
          Tỉ lệ thắng:{" "}
          {userProfile.number_of_wins + userProfile.number_of_loses !== 0
            ? (
                (userProfile.number_of_wins /
                  (userProfile.number_of_wins + userProfile.number_of_loses)) *
                100
              ).toFixed(2)
            : 0}{" "}
          %
        </Text>
      </div>
      <Divider style={{ margin: "10px 0px 15px 0px" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>
            <UserOutlined style={{ marginRight: "5px" }} />
            Tên: {userProfile.user && userProfile.user.username}
          </Text>
          <Text strong>
            <MoneyCollectOutlined style={{ marginRight: "5px" }} />
            Số lượng cup: {userProfile.point}
          </Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>
            <ArrowUpOutlined style={{ marginRight: "5px" }} />
            Thắng: {userProfile.number_of_wins}
          </Text>
          <Text strong>
            <ArrowDownOutlined style={{ marginRight: "5px" }} />
            Thua: {userProfile.number_of_loses}
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default UserInformationModal;
