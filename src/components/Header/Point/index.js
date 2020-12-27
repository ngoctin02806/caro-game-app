import React from "react";
import { connect } from "react-redux";

import CupIcon from "../../Icons/CupIcon";

import { PointWrapper } from "./styled";

const Point = (props) => {
  const { point } = props;

  return (
    <PointWrapper>
      <CupIcon />
      <div style={{ fontWeight: "bold", marginLeft: "10px" }}>{point}</div>
    </PointWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    point: state.user.point,
  };
};

export default connect(mapStateToProps, null)(Point);
