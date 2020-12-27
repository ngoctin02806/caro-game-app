import React from "react";
import { Modal, Input, Typography, Form, Button } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { enterPasswordToJoinRoom } from "../../../redux/Game/game.middlewares";

const { Text } = Typography;

const EnterPassword = (props) => {
  const { visible, handleCancel, joinRoom } = props;

  const history = useHistory();

  const onFinish = ({ room_secret }) => {
    joinRoom(visible, room_secret).then((type) => {
      if (type === "HAS_JOINED") {
        history.push(`/trang-chu/tro-choi/${visible}`);
      }

      if (type === "FULL_SLOT") {
        history.push(`/trang-chu/tro-choi/${visible}`);
      }

      handleCancel();
    });
  };

  return (
    <Modal
      title="Nhập mật khẩu phòng chơi"
      visible={visible}
      onCancel={handleCancel}
      closable={true}
      footer={null}
    >
      <Form onFinish={onFinish}>
        <Text strong={true}>Mật khẩu</Text>
        <Form.Item
          name="room_secret"
          rules={[{ required: "true", message: "Không được phép trống" }]}
        >
          <Input autoFocus={true} />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Vào phòng
        </Button>
      </Form>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinRoom: (roomId, roomSecret) =>
      dispatch(enterPasswordToJoinRoom(roomId, roomSecret)),
  };
};

export default connect(null, mapDispatchToProps)(EnterPassword);
