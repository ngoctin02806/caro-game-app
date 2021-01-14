import styled from "styled-components";

export const WrapperWidget = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  cursor: pointer;
  position: ${(props) => props.position};
  z-index: ${(props) => props.index};
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
  bottom: ${(props) => props.bottom}px;
`;
