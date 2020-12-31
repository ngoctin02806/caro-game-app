import React from "react";
import { Modal, Avatar, Divider, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const UserInformationModal = (props) => {
  const { isModalVisible, handleCancel, handleOk } = props;

  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      style={{ position: "relative" }}
    >
      <Avatar
        style={{
          position: "absolute",
          top: "-35px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        size={64}
      />
      <Divider />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text>
            <UserOutlined />
            Tên: Nguyễn Văn A
          </Text>
          <Text>Cup: 123</Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text>Thắng: 12</Text>
          <Text>Thua: 3</Text>
        </div>
      </div>
    </Modal>
  );
};

export default UserInformationModal;
