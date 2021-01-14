import styled from "styled-components";

export const ChatBoxWrapper = styled.div`
  z-index: 100;
  width: 330px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

export const MessageBoxWrapper = styled.div`
  overflow-y: scroll;
  height: 300px;
  padding: 5px;
`;
