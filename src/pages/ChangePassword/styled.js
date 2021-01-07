import styled from "styled-components";

import AuthBackground from "../../public/images/auth-background.png";

export const WrapperLogin = styled.div`
  height: 100vh;
  background-image: url("${AuthBackground}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  background-color: #f9fafc;
`;

export const WrapperForm = styled.div`
  padding: 40px 20px;
  box-shadow: 0 8px 24px rgba(163, 177, 191, 0.35);
  border-radius: 4px;
  background-color: #fff;
`;

export const StyledLine = styled.hr`
  border: none;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

export const BreakLineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -7px;
  margin-bottom: 20px;
`;
