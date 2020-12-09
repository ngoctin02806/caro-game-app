import React from "react";

import { WrapperWidget } from "./styled";

const Widget = (props) => {
  const { icon: Icon, ...rest } = props;
  return (
    <WrapperWidget {...rest}>
      <Icon />
    </WrapperWidget>
  );
};

export default Widget;
