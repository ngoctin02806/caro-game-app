import styled from "styled-components";

export const ChatBoxWrapper = styled.div`
  width: 350px;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px 5px 0 0;
  background: #fff;
  position: fixed;
  left: 20px;
  bottom: 0px;
`;

export const HiddenButtom = styled.button`
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px 5px 0 0;
  position: absolute;
  border: none;
  background: #fff;
  right: 10px;
  bottom: 5px;
  line-height: 12px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: -6px;
    background: #fff;
    height: 8px;
    width: 50px;
  }
`;
