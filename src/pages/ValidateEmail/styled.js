import styled from "styled-components";
import AuthBg from "../../public/images/auth-background.png";

export const WrapperLogin = styled.div`
  height: 100vh;
  background-image: url(${AuthBg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
`;

export const WrapperForm = styled.div`
  padding: 20px;
  box-shadow: 0 8px 24px rgba(163, 177, 191, 0.35);
  border-radius: 4px;
  background-color: #fff;
`;
