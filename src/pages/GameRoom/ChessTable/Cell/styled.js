import styled from "styled-components";

export const StyledCell = styled.div`
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? "yellow" : "#fff")};
  display: flex;
  align-items: center;
  justify-content: center;
`;
