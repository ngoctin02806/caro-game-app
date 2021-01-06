import styled from "styled-components";

export const TopRankWrapper = styled.div`
  height: 90%;
  /* width */
  ${(props) =>
    props.isHover &&
    `
    overflow-y: scroll;
    &::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #bcc0c4;
  }`}
`;
