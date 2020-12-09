import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

export const WrapperLogin = styled.div`
  height: 100vh;
`;

export const WrapperForm = styled.div`
  padding: 20px;
  box-shadow: 0 8px 24px rgba(163, 177, 191, 0.35);
  border-radius: 4px;
`;

export const StyledGoogleLogin = styled(GoogleLogin)`
  width: 100%;
  display: flex;
  align-items: center !important;
  justify-content: center;
  padding: 0px !important;
  font-family: inherit;
  & > div {
    display: flex;
    align-items: center;
  }
  &:focus {
    outline: none;
  }
  & > span {
    font-weight: bold !important;
  }
`;

export const StyledFacebookLogin = styled(FacebookLogin)``;
