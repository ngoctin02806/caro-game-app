import styled from "styled-components";

export const WrapperError = styled.div`
  border: 1px solid rgb(255, 149, 156);
  border-radius: 4px;
  background-color: rgb(255, 251, 251);
  padding: 10px 10px;
  width: 100%;
  color: rgb(255, 59, 39);
  font-size: ${(props) => props.fontSize}px;
  display: flex;
  align-items: center;
`;
