import styled from "styled-components";

import RoomGameCard from "../../../public/images/room-game.png";

export const StyledCardCover = styled.div`
  font-family: Arcade;
  background-image: url(${RoomGameCard});
  height: 110px;
  background-size: cover;
  background-position-y: 160px;
  color: #fff;
  font-size: 40px;
  text-shadow: 2px 2px black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat-x: no-repeat;
`;

export const StyledBetLevel = styled.div`
  padding: 5px;
  background-color: #ea686a;
  position: absolute;
  right: 0px;
  top: 0px;
  color: #fff;
  z-index: 20;
`;
