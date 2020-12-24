import React from "react";

import CupIcon from "../../Icons/CupIcon";

import { PointWrapper } from "./styled";

const Point = () => {
  return (
    <PointWrapper>
      <CupIcon />
      <div style={{ fontWeight: "bold", marginLeft: "10px" }}>20,000</div>
    </PointWrapper>
  );
};

export default Point;
