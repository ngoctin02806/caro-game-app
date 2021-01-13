import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import CupIcon from "../../../components/Icons/CupIcon";

const StyledModal = styled(Modal)`
  & .ant-modal-content .ant-modal-header {
    text-align: center;
    padding: 20px 24px;
  }
`;

const ChargeUpModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const location = useLocation();

  let params = queryString.parse(location.search);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (params.vnp_ResponseCode === "00" || parseInt(params.errorCode) === 0) {
      setIsModalVisible(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledModal
      title="Nạp coin"
      visible={isModalVisible}
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
        {params.vnp_ResponseCode && `+${params.vnp_Amount / 100000}`}
        {params.errorCode && `+${params.amount / 1000}`}
      </div>
    </StyledModal>
  );
};

export default ChargeUpModal;
