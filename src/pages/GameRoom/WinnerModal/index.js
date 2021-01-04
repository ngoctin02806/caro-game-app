import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import { connect } from "react-redux";

import WinnerBanner from "../../../public/images/winner.png";

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

const WinnerModal = (props) => {
  const { betLevel, isWinner, closeWinnerModal } = props;

  const handleOk = () => {
    closeWinnerModal();
  };

  const handleCancel = () => {
    closeWinnerModal();
  };

  return (
    <StyledModal
      visible={isWinner}
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
          src={WinnerBanner}
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
        +{betLevel}
      </div>
    </StyledModal>
  );
};

const mapStateToProps = (state) => {
  return {
    betLevel: state.game.information.room.bet_level,
  };
};

export default connect(mapStateToProps, null)(WinnerModal);
