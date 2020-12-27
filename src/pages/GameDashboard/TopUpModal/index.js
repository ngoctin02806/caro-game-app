import React, { useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";

import CupIcon from "../../../components/Icons/CupIcon";
import { closeTopUpModal } from "../../../redux/Game/game.actions";

const StyledModal = styled(Modal)`
  & .ant-modal-content .ant-modal-header {
    text-align: center;
    padding: 20px 24px;
  }
`;

const TopUpModal = (props) => {
  const { isTopUp, closeTopUpModal } = props;

  const handleOk = () => {
    closeTopUpModal();
  };

  const handleCancel = () => {
    closeTopUpModal();
  };

  return (
    <StyledModal
      title="Quà tặng mỗi ngày"
      visible={isTopUp}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      footer={null}
    >
      <div
        style={{
          position: "absolute",
          top: "-42px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <CupIcon width={60} />
      </div>
      <div
        style={{
          fontSize: "30px",
          color: "rgb(255,215,9)",
          textAlign: "center",
        }}
      >
        +50
      </div>
    </StyledModal>
  );
};

const mapStateToProps = (state) => {
  return {
    isTopUp: state.game.isTopUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeTopUpModal: () => dispatch(closeTopUpModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopUpModal);
