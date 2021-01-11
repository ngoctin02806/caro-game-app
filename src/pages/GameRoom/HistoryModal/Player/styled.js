import styled from "styled-components";

export const PlayerWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
`;

export const WreathWrapper = styled.div`
  position: absolute;
  z-index: 10;
`;
