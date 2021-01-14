import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import { connect } from "react-redux";

import LoserBanner from "../../../public/images/loser.png";

const StyledModal = styled(Modal)`
  & .ant-modal-content .ant-modal-header {
    text-align: center;
    padding: 20px 24px;
  }

  & .ant-modal-content {
    background-color: transparent;
    box-shadow: none;
  }
`;

const LoserModal = (props) => {
  const { betLevel, isLoser, closeLoserModal } = props;

  const handleOk = () => {
    closeLoserModal();
  };

  const handleCancel = () => {
    closeLoserModal();
  };

  return (
    <StyledModal
      visible={isLoser}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      footer={null}
      width={200}
      bodyStyle={{ backgroundColor: "transparent" }}
      centered
    >
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          style={{ width: "200px", objectFit: "cover" }}
          src={LoserBanner}
          alt="winner"
        />
      </div>
      <div
        style={{
          fontSize: "30px",
          color: "rgb(255,215,9)",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        -{betLevel}
      </div>
    </StyledModal>
  );
};

const mapStateToProps = (state) => {
  return {
    betLevel: state.game.information.room.bet_level,
  };
};

export default connect(mapStateToProps, null)(LoserModal);
