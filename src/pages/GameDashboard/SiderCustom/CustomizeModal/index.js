import React, { useState, useEffect } from "react";
import { Modal, Select, Typography, Input, Form, Slider, Button } from "antd";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { createRoomGameMiddleware } from "../../../../redux/Game/game.middlewares";

import socket from "../../../../config/socket.config";

const { Option } = Select;
const { Text } = Typography;

const CustomizeModal = (props) => {
  const {
    profileId,
    game,
    isModalVisible,
    handleCancel,
    createRoomGame,
  } = props;

  const [isPrivate, setIsPrivate] = useState(false);

  const openPasswordInput = (e) => {
    if (e === "PRIVATE_ROOM") {
      setIsPrivate(true);
    } else {
      setIsPrivate(false);
    }
  };

  const history = useHistory();

  // Create a game room
  const createRoom = ({
    room_name: roomName,
    type,
    bet_level: betLevel,
    room_secret: roomSecret = "",
  }) => {
    createRoomGame({ roomName, type, betLevel, roomSecret }).then((room) => {
      if (room) {
        history.push("/trang-chu");
        socket.emit("emit-join-room-game", {
          room_id: room._id,
          user_id: profileId,
        });
        history.push(`/trang-chu/tro-choi/${room._id}`);
      }
    });
  };

  useEffect(() => {
    document.title = "Tạo phòng";
  }, []);

  return (
    <Modal
      title="Tạo phòng"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        onFinish={createRoom}
        initialValues={{
          type: "PUBLIC_ROOM",
          bet_level: 10,
        }}
      >
        <div style={{ marginBottom: "5px" }}>
          <Text strong={true} style={{ fontSize: "15px" }}>
            Tên phòng chơi
          </Text>
          <Form.Item
            name="room_name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên phòng !",
              },
            ]}
          >
            <Input placeholder="Tên phòng" />
          </Form.Item>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <Text strong={true} style={{ fontSize: "15px" }}>
            Lựa chọn loại phòng chơi
          </Text>
          <Form.Item name="type">
            <Select
              onChange={openPasswordInput}
              defaultValue="PUBLIC_ROOM"
              style={{ width: "100%" }}
            >
              <Option value="PUBLIC_ROOM">Công khai</Option>
              <Option value="PRIVATE_ROOM">Riêng tư</Option>
            </Select>
          </Form.Item>
        </div>
        {isPrivate && (
          <div style={{ marginBottom: "5px" }}>
            <Text strong={true} style={{ fontSize: "15px" }}>
              Nhập mật khẩu phòng chơi
            </Text>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu !",
                },
              ]}
              name="room_secret"
            >
              <Input placeholder="Mật khẩu" />
            </Form.Item>
          </div>
        )}
        <div style={{ marginBottom: "5px" }}>
          <Form.Item name="bet_level" label="Mức cược">
            <Slider
              value={10}
              step={20}
              min={10}
              marks={{
                10: "10",
                20: "20",
                40: "40",
                60: "60",
                80: "80",
                100: "100",
              }}
            />
          </Form.Item>
        </div>
        <Button
          htmlType="submit"
          type="primary"
          loading={game.dashboard.isCreateLoading}
        >
          Tạo phòng
        </Button>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    game: {
      ...state.game,
      users: state.game.users,
      dashboard: {
        ...state.game.dashboard,
      },
    },
    profileId: state.auth.profileId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoomGame: ({ roomName, type, roomSecret, betLevel }) =>
      dispatch(
        createRoomGameMiddleware({ roomName, type, roomSecret, betLevel })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeModal);
