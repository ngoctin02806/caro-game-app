import React from "react";
import { Result, Button } from "antd";

const InternalErrorServer = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default InternalErrorServer;
