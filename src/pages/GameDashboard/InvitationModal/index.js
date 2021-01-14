import React, { useState } from "react";
import { Avatar, Badge, Typography, Button } from "antd";
import { DraggableModal } from "ant-design-draggable-modal";
import { UserOutlined, ApiOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { enterPasswordToJoinRoom } from "../../../redux/Game/game.middlewares";

const { Text } = Typography;

const InvitationModal = (props) => {
  const { room_id, room_type, room_secret, bet_level, user } = props.invitation;

  const [isModalVisible, setIsModalVisible] = useState(true);

  const history = useHistory();

  const handleCancel = () => {
    setIsModalVisible(false);

    setTimeout(() => {
      const newInvitations = props.invitations.slice();
      const index = newInvitations.findIndex((i) => i.room_id === room_id);
      newInvitations.splice(index, 1);
      props.removeInvitation(newInvitations);
    }, 2000);
  };

  const handleJoinRoom = () => {
    props.joinRoom(room_id, room_secret, props.myself).then((type) => {
      if (type === "HAS_JOINED") {
        history.push(`/trang-chu/tro-choi/${room_id}`);
      }

      if (type === "FULL_SLOT") {
        history.push(`/trang-chu/tro-choi/${room_id}`);
      }

      handleCancel();
    });
  };

  return (
    <DraggableModal
      title={
        <>
          <ApiOutlined />
          <Text style={{ fontSize: "17px", marginLeft: "10px" }} strong>
            {user && user.username} mời bạn tham gia game
          </Text>
        </>
      }
      visible={isModalVisible}
      onCancel={handleCancel}
      width="600px"
      okText="Vào phòng"
      cancelText="Từ chối"
      cancelButtonProps={{ danger: true, style: { width: "99px" } }}
      okButtonProps={{ onClick: handleJoinRoom }}
      initialHeight={250}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <Badge dot={true} size={50} color="green" offset={[-4, 40]}>
            <Avatar
              size={50}
              src={user && user.avatar}
              icon={<UserOutlined />}
            />
          </Badge>
        </div>
        <div>
          <Button>
            <Text
              strong
              type="secondary"
              disabled
              style={{ fontSize: "15px" }}
              ellipsis
            >
              Mã phòng: {room_id}
            </Text>
          </Button>
          <div>
            <Text strong type="danger" style={{ fontSize: "15px" }}>
              Mức cược: {bet_level}
            </Text>
          </div>
          <div>
            <Text strong style={{ fontSize: "17px" }} type="secondary">
              Người mời chơi: {user && user.username}
            </Text>
          </div>
        </div>
      </div>
    </DraggableModal>
  );
};

const mapStateToProps = (state) => {
  return {
    myself: {
      id: state.user.id,
      username: state.user.username,
      avatar: state.user.avatar,
      point: state.user.point,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinRoom: (roomId, roomSecret, user) =>
      dispatch(enterPasswordToJoinRoom(roomId, roomSecret, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitationModal);
